const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Shop = require('../models/Shop');
const Position = require('../models/Position');
const Supply = require('../models/Supply');
const Cooperation = require('../models/Cooperation');
const PositionService = require('../services/positions');
const ProductsController = require('../controllers/products');
const { redConsoleColor } = require('../config/constants');

/**
 * PRODUCTS PAGE
 */
exports.products = async (req, res) => {
  const data = {};
  try {
    // data.products = await ProductsController.commonSearch(req.query);
    data.brands = await Brand.find();
    data.categories = await Category.find();
  } catch (e) {
    console.error(
      redConsoleColor,
      'ERROR GETTING DATA FOR PRODUCTS PAGE: ',
      e,
    );
  }

  res.render('products', data, function(err, html) {
    res.send(html);
  });
};

/**
 * HOME PAGE
 */
exports.home = async (req, res) => {
  const data = {};
  const cooperations = await Cooperation.find();

  if (cooperations && cooperations.length) {
    const bocoArticles = cooperations.map(c => c.bocoArticle);
    data.cooProducts = await Product.find({ bocoArticle: { $in: bocoArticles }}).limit(4);
  }

  try {
    data.categories = await Category.find().select('name _id image');
    data.shops = await Shop.find();
  } catch (e) {
    console.error(
      redConsoleColor,
      'ERROR GETTING DATA FOR MAIN PAGE: ',
      e,
    );
  }

  res.render('index', data, function(err, html) {
    res.send(html);
  });
};

/**
 * PRICES PAGE
 */
exports.prices = async (req, res) => {
  try {
    const { product: productId } = req.query;
    const product = await Product.findById(productId);
    const category = await Category.findById(product.category);

    const positions = await Position.find({
      productId: product._id,
    }).sort({ price: 1 });

    const cooperations = await Cooperation.find({
      bocoArticle: product.bocoArticle,
    });
    const amount = cooperations.reduce((res, item) => res + +item.amount, 0)

    const supply = await Supply.findOne({
      productId: product._id,
    });

    const data = { product, category, supply: supply, amount };
    
    data.positions = await PositionService.addShopData(positions);

    res.render('prices', data, function(err, html) {
      res.send(html);
    });
  } catch (err) {
    console.log(redConsoleColor, 'ERROR GET PRODUCT BY ID', err);
  }
};
