const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const RentController = require('../../controllers/rent');

/**
 * Create new rent
 * @route POST api/rent
 * @access Private
 */
router.post(
  '/',
  [check('name', 'Name is required').exists()],
  RentController.create,
);

module.exports = router;