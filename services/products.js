const Category = require('../models/Category');
const { redConsoleColor } = require('../config/constants');

/**
 * Add category name to each product
 * @param {array} products
 * @returns {Promise<[]>}
 */
exports.addCategoryNames = async products => {
  try {
    const categories = await Category.find();
    const matchCategory = categories.reduce((res, item) => {
      res[item._id] = item.name;
      return res;
    }, {});

    const result = [];
    products.forEach(item => {
      const prodItem = { ...item.toObject() };
      prodItem.categoryName = matchCategory[prodItem.category] || '';
      result.push(prodItem);
    });

    return result;
  } catch (e) {
    console.log(
      redConsoleColor,
      'ERROR ADDING CATEGORY NAMES TO PRODUCT: ',
      e,
    );
  }
};
