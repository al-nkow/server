const express = require('express');
const router = express.Router();
// const auth = require('../../middleware/auth');
const SupplyController = require('../../controllers/supply');

/**
 * Get all supplies
 * @route GET api/supply
 * @access Public
 */
router.get('/', SupplyController.getAll);

module.exports = router;