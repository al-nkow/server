const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const CategoriesController = require('../../controllers/categories');

/**
 * Get all categories
 * @route GET api/categories
 * @access Public
 */
router.get('/', CategoriesController.getAll);

/**
 * Get product by ID
 * @route GET api/products/ID
 * @access Private
 */
router.get('/:categoryId', auth, CategoriesController.getById);

/**
 * Create new category
 * @route POST api/categories
 * @access Private
 */
router.post(
  '/',
  auth,
  [check('name', 'Name is required').exists()],
  CategoriesController.create,
);

/**
 * Delete category by ID
 * @route DELETE api/categories/ID
 * @access Private
 */
router.delete('/:categoryId', auth, CategoriesController.delete);

/**
 * Update category by ID
 * @route PUT api/categories/ID
 * @access Private
 */
router.put('/:categoryId', auth, CategoriesController.update);

module.exports = router;
