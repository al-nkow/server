const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const WholesaleController = require('../../controllers/wholesale');

/**
 * Get all categories
 * @route GET api/wholesale
 * @access Public
 */
router.get('/', WholesaleController.getAll);

/**
 * Create new wholesale option
 * @route POST api/wholesale
 * @access Private
 */
router.post(
  '/',
  auth,
  [
    check('name', 'Name is required').exists(),
    check('key', 'Key is required').exists(),
  ],
  WholesaleController.create,
);

/**
 * Delete wholesale option by ID
 * @route GET api/wholesale/ID
 * @access Private
 */
router.delete('/:wholesaleId', auth, WholesaleController.delete);

/**
 * Update wholesale by ID
 * @route PUT api/wholesale/ID
 * @access Private
 */
router.put('/:wholesaleId', auth, WholesaleController.update);

module.exports = router;
