const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const config = require('config');

/**
 * DELETE USER
 */
exports.delete = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.userId });
    return res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * GET USERS LIST
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email _id avatar');
    res.status(200).json({ users: users });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

/**
 * REGISTER NEW USER
 */
exports.register = async (req, res) => {
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

    const newUser = User({
      name,
      email,
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

  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    res.status(500).send('Server error');
  }
};