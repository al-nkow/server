const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const ProductsController = require('../../controllers/products');

/**
 * Get all products
 * @route GET api/products
 * @access Public
 */
router.get('/', ProductsController.getAll);

/**
 * Create new product
 * @route POST api/products
 * @access Private
 */
router.post(
  '/',
  auth,
  [check('name', 'Name is required').exists()],
  ProductsController.create,
);

/**
 * Get product by ID
 * @route GET api/products/ID
 * @access Private
 */
router.get('/:productId', auth, ProductsController.getById);

/**
 * Delete product by ID
 * @route GET api/products/ID
 * @access Private
 */
router.delete('/:productId', auth, ProductsController.delete);

/**
 * Update product by ID
 * @route PUT api/products/ID
 * @access Private
 */
router.put('/:productId', auth, ProductsController.update);

module.exports = router;
