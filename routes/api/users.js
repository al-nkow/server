const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// ======
const UsersController = require('../../controllers/users');
// =====

// @route   GET api/users
// @desc    Get users list
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('name email _id');
    res.status(200).json({ users: users });
  } catch (err) {
    return res.status(500).send('Server error');
  }
});

// @route   DELETE api/users
// @desc    Delete user
// @access  Public
router.delete('/:userId', auth, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.userId });
    return res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exist
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'User already exists' }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      const newUser = User({
        name,
        email,
        gravatar,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: newUser.id, // _id
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 * 100 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );

      // res.send('USER REGISTERED!');
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
      res.status(500).send('Server error');
    }
  },
);

module.exports = router;
