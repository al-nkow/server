const Product = require('../models/Product');
const Position = require('../models/Position');
const mongoose = require('mongoose');

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
    // const count = await Product.countDocuments();
    const count = await Product.find(filter).countDocuments();
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit);

    // здесь надо возвращать count не все документы а столько сколько найдено!
    // db.restaurants.find( { "cuisine": "Italian", "address.zipcode": "10075" } ).count();
    // {
    //   "address": {
    //   "building": "1007",
    //     "coord": [ -73.856077, 40.848447 ],
    //     "street": "Morris Park Ave",
    //     "zipcode": "10462"
    // },
    //   "borough": "Bronx",
    //   "cuisine": "Bakery",
    //   ......

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
