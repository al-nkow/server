const Product = require('../models/Product');
const Category = require('../models/Category');
const Shop = require('../models/Shop');
const Position = require('../models/Position');
const mongoose = require('mongoose');

/**
 * DELETE ALL PRODUCTS AND POSITIONS
 */
exports.deleteAllProductsAndPositions = async (req, res) => {
  try {
    Product.collection.drop();
    Position.collection.drop();
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
exports.publish = async (req, res) => {
  const importedProducts = req.body.data;

  try {
    for (const item of importedProducts) {
      const currentProduct = item.product;

      currentProduct.category = await getCategoryId(
        currentProduct.category,
      );

      const newProduct = new Product({
        ...currentProduct,
        _id: new mongoose.Types.ObjectId(),
      });
      const createdProduct = await newProduct.save();

      await createPositions(item.shops, createdProduct._id);
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }

  return res
    .status(201)
    .json({ message: 'Table imported successfully!' });
};

/**
 * Add category ID to the new product
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
  // TRY CATCH ????
  const newCategory = new Category({
    name: name,
    comments: 'Создана автоматически',
    _id: new mongoose.Types.ObjectId(),
  });
  return await newCategory.save();
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
async function createPositions(currentShops, createdProductId) {
  if (currentShops && Object.keys(currentShops).length) {
    const appShops = await Shop.find();

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
