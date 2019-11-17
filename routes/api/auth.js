const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check } = require('express-validator');

const AuthController = require('../../controllers/auth');

const errorHandler = (res, message) => {
  console.error(`ERROR: ${message}`);
  res.status(500).send('Server error');
};

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    errorHandler(res, error.message);
  }
});

/**
 * Authenticate user & get token
 * @route POST api/auth
 * @access Public
 */
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  AuthController.login,
);

/**
 * Refresh token
 * @route POST api/auth/token
 * @access Public
 */
router.post('/token', AuthController.token);

/**
 * Logout user
 * @route POST api/auth/logout
 * @access Public
 */
router.post('/logout', AuthController.logout);

module.exports = router;
