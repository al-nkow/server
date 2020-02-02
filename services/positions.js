const Shop = require('../models/Shop');
const { redConsoleColor } = require('../config/constants');

/**
 * Add shop data to each position
 * @param {array} positions
 * @returns {Promise<[]>}
 */
exports.addShopData = async positions => {
  try {
    const shops = await Shop.find();
    const matchShop = shops.reduce((res, item) => {
      res[item._id] = item;
      return res;
    }, {});

    const result = [];
    positions.forEach(item => {
      const posItem = { ...item.toObject() };
      posItem.shop = matchShop[posItem.shopId] || '';
      result.push(posItem);
    });

    return result;
  } catch (e) {
    console.log(
      redConsoleColor,
      'ERROR ADDING SHOP DAT TO POSITION: ',
      e,
    );
  }
};
