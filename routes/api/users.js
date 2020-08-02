const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middleware/auth');
const UsersController = require('../../controllers/users');

/**
 * Get users list
 * @route GET api/users
 * @access Private
 */
router.get('/', auth, UsersController.getAllUsers);

/**
 * Delete user by ID
 * @route DELETE api/users/ID
 * @access Private
 */
router.delete('/:userId', auth, UsersController.delete);

/**
 * Register new user
 * @route POST api/users
 * @access Public
 */
router.post(
  '/',
  auth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters',
    ).isLength({ min: 6 }),
  ],
  UsersController.register,
);

module.exports = router;
