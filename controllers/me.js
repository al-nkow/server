const mongoose = require('mongoose');
const User = require('../models/User');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const deleteImage = async foundUser => {
  if (foundUser && foundUser.avatar) {
    await fs.unlink('static' + foundUser.avatar, err => {
      if (err) console.log('DELETE USER AVATAR ERROR: ', err);
    });
  }
};

/**
 * GET CURRENT USER INFO
 */
exports.info = async (req, res) => {
  try {
    const { userId } = req;
    const foundUser = await User.findById(userId);
    return res.status(200).json({ user: foundUser });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * UPDATE CURRENT USER
 */
exports.update = async (req, res) => {
  const { userId } = req;
  const updates = { ...req.body };

  if (req.file && req.file.filename) {
    updates.avatar = '/uploads/' + req.file.filename;
  }

  try {
    const foundUser = await User.findById(userId);

    if (foundUser && foundUser.avatar && updates.avatar) {
      await deleteImage(foundUser);
    }

    if (updates.avatar) foundUser.avatar = updates.avatar;
    foundUser.name = updates.name;
    foundUser.save();

    const { name, avatar } = foundUser;

    res.status(200).json({ data: { name, avatar } });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * CHANGE PASSWORD
 */
exports.changePassword = async (req, res, next) => {
  const { userId } = req;
  const { oldPass, newPass } = req.body;
  const foundUser = await User.findById(userId);
  const isMatch = await foundUser.isValidPassword(oldPass);

  if (!isMatch) return res.status(400).json({ message: 'Forbidden' });

  try {
    const salt = await bcrypt.genSalt(10);

    foundUser.password = await bcrypt.hash(newPass, salt);
    await foundUser.save();

    res.status(200).json({ message: 'Password updated' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
