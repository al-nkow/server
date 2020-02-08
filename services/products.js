const Category = require('../models/Category');
const Position = require('../models/Position');
const { redConsoleColor } = require('../config/constants');

/**
 * Add additional information to each product
 * @param {array} products
 * @returns {array}
 */
exports.addExtraInfo = async products => {
  try {
    const matchCategory = await getMatchCategory();
    const result = [];

    for (const item of products) {
      const prodItem = { ...item.toObject() };

      prodItem.categoryName = matchCategory[prodItem.category] || '';
      prodItem.minPrice = await getMinPrice(item._id);

      result.push(prodItem);
    }

    return result;
  } catch (e) {
    console.log(
      redConsoleColor,
      'ERROR ADDING CATEGORY NAMES TO PRODUCT: ',
      e,
    );
  }
};

/**
 * Get product min price
 * @param {string} productId
 */
async function getMinPrice(productId) {
  const positions = await Position.find({ productId });
  const prices = positions.map(posItem => posItem.price);
  return prices && prices.length ? Math.min(...prices) : null;
}

/**
 * Get object matching categories
 * @returns {array}
 */
async function getMatchCategory() {
  const categories = await Category.find();
  return categories.reduce((res, item) => {
    res[item._id] = item.name;
    return res;
  }, {});
}
