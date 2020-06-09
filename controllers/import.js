const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Shop = require('../models/Shop');
const Position = require('../models/Position');
const Wholesale = require('../models/Wholesale');
const Supply = require('../models/Supply');
// const Cooperation = require('../models/Cooperation');
const mongoose = require('mongoose');
const { redConsoleColor } = require('../config/constants');

/**
 * DELETE ALL PRODUCTS AND POSITIONS
 */
exports.deleteAllProductsAndPositions = async (req, res) => {
  try {
    Product.collection.drop();
    Brand.collection.drop();
    Position.collection.drop();
    Supply.collection.drop();
    // Cooperation.collection.drop();
    return res
      .status(200)
      .json({ message: 'All products and collections removed' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * SAVE IMPORTED DATA TO SERVER
 */

// var arr = [{ name: 'Star Wars' }, { name: 'The Empire Strikes Back' }];
// Movies.insertMany(arr, function(error, docs) {});
exports.publish = async (req, res) => {
  const importedProducts = req.body.data;

  try {
    const wholesaleList = await Wholesale.find();
    const appShops = await Shop.find();

    for (const item of importedProducts) {
      const currentProduct = item.product;

      currentProduct.category = await getCategoryId(
        currentProduct.category,
      );

      await saveBrand(currentProduct.brand);

      const newProduct = new Product({
        ...currentProduct,
        _id: new mongoose.Types.ObjectId(),
      });
      const createdProduct = await newProduct.save();

      await createPositions(item.shops, createdProduct._id, appShops);
      await createSupply(item.wholesale, createdProduct._id, wholesaleList);

    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }

  Product.createIndexes();

  return res
    .status(201)
    .json({ message: 'Table imported successfully!' });
};

// =============================================================================
// =============================================================================
// =============================================================================
async function createSupply(importedWholesale, productId, wholesaleList) {
  try {
    const supply = {
      productId,
      options: []
    };
    
    for (let key in importedWholesale) {
      const { price, quantity } = importedWholesale[key];
      const foundWholesale = wholesaleList.find(wholesaleItem => {
        return wholesaleItem.key === key;
      });

      supply.options.push({
        wholesaleId: foundWholesale._id,
        price,
        quantity,
      });
    }

    // Supply
    const newSupply = new Supply({
      ...supply,
      _id: new mongoose.Types.ObjectId(),
    });
    const createdSupply = await newSupply.save();

    // console.log('RESULT: >>>>>>>', createdSupply);

  } catch(e) {
    console.log('SAVE SUPPLY ERROR: ', e);
  }
}
// =============================================================================
// =============================================================================
// =============================================================================

/**
 * Save brand if not found
 * @param {string} brandName
 * @returns {Promise}
 */
async function saveBrand(brandName) {
  if (!brandName) return;
  try {
    const foundBrand = await Brand.findOne({ name: brandName });
    if (!foundBrand) {
      const newBrand = new Brand({
        _id: new mongoose.Types.ObjectId(),
        name: brandName,
      });
      await newBrand.save();
    }
  } catch (error) {
    console.error(redConsoleColor, 'SAVE BRAND ERROR: ', error);
  }
}

/**
 * Add category ID to the new product
 * if no category is found - create a new one
 */
async function getCategoryId(currentProductCategoryName) {
  if (!currentProductCategoryName) return;
  const categories = await Category.find();

  const foundCategory = categories.find(itemCategory => {
    return (
      itemCategory.name.toLowerCase() ===
      currentProductCategoryName.toLowerCase()
    );
  });

  return foundCategory
    ? foundCategory._id
    : await createNewCategory(currentProductCategoryName);
}

/**
 * Create a new category
 */
async function createNewCategory(name) {
  try {
    const newCategory = new Category({
      name: name,
      comments: 'Создана автоматически',
      _id: new mongoose.Types.ObjectId(),
    });
    return await newCategory.save();
  } catch(e) {
    console.log('CREATE NEW CATEGORY ERROR: ', e);
  }
}

/**
 * Create a new position
 */
async function createNewPosition(
  productId,
  shopId,
  article,
  price,
  link,
) {
  const newPosition = new Position({
    productId,
    shopId,
    article,
    price,
    link,
    _id: new mongoose.Types.ObjectId(),
  });
  return await newPosition.save();
}

/**
 * Create positions for product item
 */
async function createPositions(currentShops, createdProductId, appShops) {
  if (currentShops && Object.keys(currentShops).length) {
    for (const shop of appShops) {
      const { key } = shop;
      if (key) {
        const currentPosition = currentShops[key];
        if (currentPosition) {
          await createNewPosition(
            createdProductId,
            shop._id,
            currentPosition[key + 'Art'],
            currentPosition[key + 'Price'],
            currentPosition[key + 'Link'],
          );
        }
      }
    }
  }
}
