const Product = require('../models/Product');
const Category = require('../models/Category');
const Shop = require('../models/Shop');
const Position = require('../models/Position');
// const mongoose = require('mongoose');
const { redConsoleColor } = require('../config/constants');
const ProductService = require('../services/products');
const PositionService = require('../services/positions');
const ProductsController = require('../controllers/products');

/**
 * PRODUCTS PAGE
 */
exports.products = async (req, res) => {
  const data = {};
  try {
    data.products = await ProductsController.commonSearch(req.query);
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
 * Home page
 * @route GET /
 * @access Public
 */
exports.home = async (req, res) => {
  // const content = await Content.findOne({ key: 'main_content' })
  //   .select('season main about programs benefits prizes teachers contacts');
  // const reviews = await Review.find().sort({ 'order': -1 });
  // const news = await News.find().sort({ 'date': -1 });
  // const faq = await Faq.find().select('_id answer question');
  // const partners = await Partners.find();
  // const docsList = await Doc.find();
  //
  // const docs = { policy: {}, offer: {}};
  // if (docsList) docsList.forEach(item => docs[item.name] = item);
  //
  // const data = { content, reviews, news, faq, partners, docs };
  // res.render('landing/index', data, function(err, html) {

  const data = {};

  try {
    data.categories = await Category.find();
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

    const data = { product, category };
    data.positions = await PositionService.addShopData(positions);

    res.render('prices', data, function(err, html) {
      res.send(html);
    });
  } catch (err) {
    console.log(redConsoleColor, 'ERROR GET PRODUCT BY ID', err);
  }
};
