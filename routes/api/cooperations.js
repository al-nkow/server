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
 * Get all cooperations
 * @route GET api/cooperations
 * @access Public
 */
router.get('/', CoopController.getAll);

module.exports = router;