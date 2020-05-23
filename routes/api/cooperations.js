const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
// const auth = require('../../middleware/auth');
const CoopController = require('../../controllers/cooperations');

/**
 * Create new cooperation
 * @route POST api/cooperations
 * @access Private
 */
router.post(
  '/',
  [check('name', 'Name is required').exists()],
  CoopController.create,
);

/**
 * Get all supplies
 * @route GET api/supply
 * @access Public
 */
// router.get('/', SupplyController.getAll);

module.exports = router;