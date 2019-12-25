const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const PositionsController = require('../../controllers/positions');

/**
 * Create new position
 * @route POST api/positions
 * @access Private
 */
router.post(
  '/',
  auth,
  [
    check('productId', 'productId is required').exists(),
    check('shopId', 'shopId is required').exists(),
    check('link', 'link is required').exists(),
  ],
  PositionsController.create,
);

/**
 * Get all positions
 * @route GET api/positions
 * @access Public
 */
router.get('/', PositionsController.getAll);

/**
 * Delete position by ID
 * @route DELETE api/positions/ID
 * @access Private
 */
router.delete('/:positionId', auth, PositionsController.delete);

/**
 * Update position by ID
 * @route PUT api/positions/ID
 * @access Private
 */
router.put('/:positionId', auth, PositionsController.update);

module.exports = router;
