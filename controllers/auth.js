const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const JWT_SECRET = config.get('jwtSecret');
const JWT_SECRET_REFRESH_TOKEN = config.get('jwtSecretRefreshToken');

const getToken = (email, userId, secret, exp) => {
  return jwt.sign(
    {
      email: email,
      userId: userId,
    },
    secret,
    { expiresIn: exp },
  );
};

/**
 * SIGN IN USER
 */
exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // TODO !!!!! ADD TRY CATCH!!!!!

  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });

  if (!foundUser)
    return res.status(401).json({ message: 'Auth failed' });

  const isMatch = await foundUser.isValidPassword(password);

  if (!isMatch)
    return res.status(401).json({ message: 'Auth failed' });

  const userId = foundUser._id;
  const token = getToken(email, userId, JWT_SECRET, '1h');
  const refreshToken = getToken(
    email,
    userId,
    JWT_SECRET_REFRESH_TOKEN,
    '1d',
  );
  const decoded = jwt.verify(token, JWT_SECRET);

  foundUser.refreshToken = refreshToken;
  foundUser.save();

  return res.status(200).json({
    message: 'Auth successful',
    token: token,
    refreshToken: refreshToken,
    expiresIn: decoded ? decoded.exp : '',
    userId: userId,
    userName: foundUser.name,
    userEmail: foundUser.email,
  });
};

/**
 * REFRESH TOKEN
 */
exports.token = async (req, res) => {
  if (!req.body.token)
    res.status(401).json({ message: 'Auth failed' });

  let reqTokenInfo;

  try {
    reqTokenInfo = await jwt.verify(
      req.body.token,
      JWT_SECRET_REFRESH_TOKEN,
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

  const userId = foundUser._id;

  // return res.status(200).json({ error: 'pizda' });

  // New token
  const token = jwt.sign(
    {
      email: foundUser.email,
      userId: foundUser._id,
    },
    JWT_SECRET,
    { expiresIn: '1h' },
  );

  // New refreshToken
  const refreshToken = jwt.sign(
    {
      email: foundUser.email,
      userId: foundUser._id,
    },
    JWT_SECRET_REFRESH_TOKEN,
    { expiresIn: '1d' },
  );
  const decoded = jwt.verify(token, JWT_SECRET);
  // Save new refreshToken
  foundUser.refreshToken = refreshToken;
  foundUser.save();

  return res.status(200).json({
    message: 'Refresh token successful',
    token: token,
    refreshToken: refreshToken,
    expiresIn: decoded ? decoded.exp : '',
    userId: userId,
    userName: foundUser.name,
    userEmail: foundUser.email,
  });
};

// LOGOUT
exports.logout = async (req, res) => {
  if (!req.body.token)
    res.status(401).json({ message: 'No token is present' });

  let reqTokenInfo;
  try {
    reqTokenInfo = await jwt.verify(
      req.body.token,
      JWT_SECRET_REFRESH_TOKEN,
    );
    // req.logout();
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
