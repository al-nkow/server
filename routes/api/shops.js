const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check } = require('express-validator');
const ShopsController = require('../../controllers/shops');

const multer = require('multer'); // file upload

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './static/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname); // cb(null, file.filename)
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 mb file size allowed
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png'
    ) {
      cb(null, true); // accept file
    } else {
      cb(null, false); // reject file
    }
  },
});

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

module.exports = router;
