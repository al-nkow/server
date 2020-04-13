const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload');
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const CurrentUserController = require('../../controllers/me');

/**
 * Update current user data (name and image)
 * @route POST api/me
 * @access Private
 */
router.post(
  '/',
  auth,
  [check('name', 'Name is required').exists()],
  upload.single('userImage'),
  CurrentUserController.update,
);

/**
 * Get current user info
 * @route GET api/me
 * @access Private
 */
router.get('/', auth, CurrentUserController.info);

/**
 * Change password
 * @route POST api/me/password
 * @access Private
 */
router.post(
  '/password',
  auth,
  [
    check(
      'password',
      'Please enter a password with 6 or more characters',
    ).isLength({ min: 6 }),
  ],
  CurrentUserController.changePassword,
);

module.exports = router;
