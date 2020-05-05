const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload');
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const ShopsController = require('../../controllers/shops');

/**
 * Create new shop
 * @route POST api/shops
 * @access Private
 */
router.post(
  '/',
  auth,
  [check('name', 'Name is required').exists()],
  upload.single('shopImage'),
  ShopsController.create,
);

/**
 * Get all shops
 * @route GET api/shops
 * @access Public
 */
router.get('/', ShopsController.getAll);

/**
 * Delete shop by ID
 * @route DELETE api/shops/ID
 * @access Private
 */
router.delete('/:shopId', auth, ShopsController.delete);

/**
 * Update shop
 * @route PUT api/shops/ID
 */
router.put(
  '/:shopId',
  auth,
  [check('name', 'Name is required').exists()],
  upload.single('file'),
  ShopsController.update,
);

module.exports = router;
