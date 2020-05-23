const Product = require('../models/Product');
const Position = require('../models/Position');
const Supply = require('../models/Supply');
const mongoose = require('mongoose');
const ProductService = require('../services/products');
const { redConsoleColor } = require('../config/constants');

/**
 * CREATE NEW PRODUCT
 */
exports.create = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
    });
    const created = await newProduct.save();
    res
      .status(201)
      .json({ message: 'Product created', id: created._id });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * GET PRODUCT BY ID
 */
exports.getById = async (req, res) => {
  try {
    const { productId } = req.params;
    const foundProduct = await Product.findById(productId);
    return res.status(200).json({ product: foundProduct });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * GET ALL PRODUCTS
 */
exports.getAll = async (req, res) => {
  const page = req.query.page || 0;
  const limit = +req.query.limit || 1000;
  const skip = limit * page;

  const filter = {};
  const productIds = req.query.id;

  const bocoArticle = req.query.bocoArticle;
  if (bocoArticle) filter.bocoArticle = bocoArticle;

  if (productIds) {
    const ids = productIds.map(item => mongoose.Types.ObjectId(item));
    filter._id = { $in: ids };
  }

  try {
    const count = await Product.find(filter).countDocuments();
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit);

    res.status(200).json({ list: products, count });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * DELETE PRODUCT
 */
exports.delete = async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.deleteOne({ _id: productId });
    // remove all positions associated with this product
    await Position.find({ productId }).remove();
    await Supply.find({ productId }).remove();
    return res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * UPDATE PRODUCT
 */
exports.update = async (req, res) => {
  const { productId } = req.params;
  const updates = { ...req.body };

  try {
    await Product.findByIdAndUpdate(productId, updates);
    res.status(200).json({ message: 'Product updated' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * SEARCH PRODUCT COMMON PART
 */
exports.commonSearch = async params => {
  try {
    const { search: searchStr, ...rest } = params;

    const fromToParams = getFromToParams(rest);
    
    const searchParams = {
      ...fromToParams,
      ...adddIfPresent(rest, 'category'),
      ...adddIfPresent(rest, 'brand'),
    };

    const products = searchStr 
      ? await fullTextSearch(searchParams, searchStr)
      : await Product.find({ ...searchParams })

    if (products && products.length) await ProductService.addExtraInfo(products);
    return products;
  } catch (e) {
    return commonSearchErrorHandler(e);
  }
};

/**
 * SEARCH PRODUCT
 */
exports.search = async (req, res) => {
  const result = await exports.commonSearch(req.body);
  res.status(200).json({ searchResult: result });
};

// =============================================================================

/**
 * Full text search. If no items found - search by regexp.
 * @param {object} searchParams 
 * @param {string} searchStr
 */
async function fullTextSearch(searchParams, searchStr) {
  const metaTextScore = { score: { $meta: 'textScore' } };
  const products =  await Product.find(
    {
      $text: { $search: searchStr },
      ...searchParams,
    },
    metaTextScore
  ).sort(metaTextScore); // sorts in descending order

  if (products && products.length) {
    return products;
  } else {
    // if no items found - search by regexp
    var searchRegex = new RegExp(searchStr, 'gi');
    var regexSearchOptions = {
      "name": {
        "$regex": searchRegex
      }
    };
    return await Product.find({ ...regexSearchOptions, ...searchParams});
  }
}

/**
 * Returns object with `from - to` params (`$gte`, `$lte`)
 * @param {object} params - filter params. Example: 
 * { width: '10', height: '200', area '62' }
 * @return {object}
 * example of returned value:
 * {
 *  height: { '$gte': '1', '$lte': '500' },
 *  width:  { '$gte': '4', '$lte': '600' },
 *  weight: { '$gte': '5', '$lte': '1000' },
 * }
 */
function getFromToParams(params) {
  const fields = [
    'height',
    'width',
    'thickness',
    'weight',
    'volumeL',
    'volumeM',
    'area',
  ];
  const query = {};

  fields.forEach(filterKey => {
    const keyFrom = `${filterKey}From`;
    const keyTo = `${filterKey}To`;
    const fromParam = params[keyFrom];
    const toParam = params[keyTo];

    if (fromParam || toParam) query[filterKey] = {};
    if (fromParam) query[filterKey].$gte = fromParam;
    if (toParam) query[filterKey].$lte = toParam;
  });

  return query;
}

/**
 * Return object {paramName: value} if paramName present in reqParams
 * @param {object} reqParams
 * @param {string} paramName
 * @return {object|null}
 */
function adddIfPresent(reqParams, paramName) {
  const value = reqParams[paramName];
  return value ? { [paramName]: value } : null;
}

/**
 * Common search error handler
 */
function commonSearchErrorHandler(e) {
  console.error(
    redConsoleColor,
    'ERROR GETTING DATA FOR PRODUCTS PAGE: ',
    e,
  );
  return [];
}
