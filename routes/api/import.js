const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const ImportController = require('../../controllers/import');

// TODO!!!! ОБЯЗАТЕЛЬНО СДЕЛАТЬ РОЛЬ АДМИНА!!!
// ТОЛЬКО АДМИН МОЖЕТ УДАЛЯТЬ ТОВАРЫ ИЗ БАЗЫ!!!

/**
 * Delete all products and positions
 * @route DELETE api/import
 * @access Private
 */
router.delete(
  '/',
  auth,
  ImportController.deleteAllProductsAndPositions,
);

/**
 * Save data
 * @route POST api/import
 * @access Private
 */
router.post(
  '/',
  auth,
  ImportController.publish,
);

module.exports = router;
