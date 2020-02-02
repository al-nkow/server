const express = require('express');
const router = express.Router();
const StaticController = require('../../controllers/static');

/**
 * Home page
 * @route GET /
 * @access Public
 */
router.get('/', StaticController.home);

/**
 * Products page
 * @route GET /products
 * @access Public
 */
router.get('/products', StaticController.products);

/**
 * Prices page
 * @route GET /prices
 * @access Public
 */
router.get('/prices', StaticController.prices);

module.exports = router;
