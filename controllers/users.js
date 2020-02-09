const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

/**
 * SIGN IN USER
 */
// exports.userLogin = async (req, res) => {
//   const { email, password } = req.body;
//
//   const foundUser = await User.findOne({ email: email });
//   if (!foundUser)
//     return res.status(401).json({ message: 'Auth failed' });
//
//   const isMatch = await foundUser.isValidPassword(password); // isValidPassword - custom method
//
//   if (!isMatch)
//     return res.status(401).json({ message: 'Auth failed' });
//
//   const token = jwt.sign(
//     {
//       email: email,
//       userId: foundUser._id,
//     },
//     process.env.SECRET_OR_KEY,
//     { expiresIn: '1h' },
//   );
//
//   // ==========
//   const refreshToken = jwt.sign(
//     {
//       email: email,
//       userId: foundUser._id,
//     },
//     process.env.SECRET_REFRESH_TOKEN,
//     { expiresIn: '1d' },
//   );
//   const decoded = jwt.verify(token, process.env.SECRET_OR_KEY);
//   foundUser.refreshToken = refreshToken;
//   foundUser.save();
//   // ==========
//
//   return res.status(200).json({
//     message: 'Auth successful',
//     token: token,
//     refreshToken: refreshToken,
//     expires_in: decoded ? decoded.exp : '',
//     id: foundUser._id,
//   });
// };

// ============================================================
// ============================================================
// ============================================================
// ============================================================
// ============================================================
// ============================================================
// ============================================================

/*

// GET USERS LIST
exports.users_get_user = async (req, res) => {
  try {
    const users = await User.find().select('name email _id');
    res.status(200).json({ users: users });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// SIGN UP USER
exports.users_user_signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  const foundUser = await User.findOne({ email: email });
  if (foundUser)
    return res
      .status(409)
      .json({ message: 'Email is already in use' });

  try {
    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: email,
      password: hash,
      name: name,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// DELETE USERS
exports.users_user_delete = async (req, res) => {
  try {
    await User.remove({ _id: req.params.userId });
    return res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// REFRESH TOKEN
exports.users_user_token = async (req, res, next) => {
  if (!req.body.token)
    res.status(401).json({ message: 'Auth failed' });

  let reqTokenInfo;
  try {
    reqTokenInfo = await jwt.verify(
      req.body.token,
      process.env.SECRET_REFRESH_TOKEN,
    );
  } catch (e) {
    console.log('ERROR: ', e);
    return res.status(401).json({ message: 'Auth failed' });
  }

  // const reqTokenInfo = await jwt.verify(req.body.token, process.env.SECRET_REFRESH_TOKEN);
  // if (!reqTokenInfo) return res.status(401).json({ message: 'Auth failed' });
  if (reqTokenInfo.exp * 1000 < Date.now())
    res.status(401).json({ message: 'Auth failed' });

  const foundUser = await User.findOne({ _id: reqTokenInfo.userId });
  if (foundUser.refreshToken !== req.body.token)
    res.status(401).json({ message: 'Auth failed' });

  // New token
  const token = jwt.sign(
    {
      email: foundUser.email,
      userId: foundUser._id,
    },
    process.env.SECRET_OR_KEY,
    { expiresIn: '1h' },
  );

  // New refreshToken
  const refreshToken = jwt.sign(
    {
      email: foundUser.email,
      userId: foundUser._id,
    },
    process.env.SECRET_REFRESH_TOKEN,
    { expiresIn: '1d' },
  );
  const decoded = jwt.verify(token, process.env.SECRET_OR_KEY);
  // Save new refreshToken
  foundUser.refreshToken = refreshToken;
  foundUser.save();

  return res.status(200).json({
    message: 'Refresh token successful',
    token: token,
    refreshToken: refreshToken,
    expires_in: decoded ? decoded.exp : '',
  });
};

// LOGOUT
exports.users_user_logout = async (req, res) => {
  if (!req.body.token)
    res.status(401).json({ message: 'No token is present' });

  let reqTokenInfo;
  try {
    reqTokenInfo = await jwt.verify(
      req.body.token,
      process.env.SECRET_REFRESH_TOKEN,
    );
    req.logout();
  } catch (e) {
    console.log('ERROR: ', e);
    return res.status(401).json({ message: 'Auth failed' });
  }

  try {
    await User.findByIdAndUpdate(reqTokenInfo.userId, {
      refreshToken: '',
    });
    res.status(200).json({ message: 'Token deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// CHANGE PASSWORD
exports.users_user_change_password = async (req, res, next) => {
  const { id, password, newpassword } = req.body;
  const foundUser = await User.findById(id);
  const isMatch = await foundUser.isValidPassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Forbidden' });
  try {
    const hash = await bcrypt.hash(newpassword, 10);
    foundUser.password = hash;
    await foundUser.save();
    res.status(200).json({ message: 'Password updated' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

*/
