const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const defaultPassword = config.get('defaultUserPassword');
const defaultEmail = config.get('defaultUserEmail');

const addDefaultAdmin = async () => {
  try {
    const user = await User.findOne({ email: defaultEmail });
    if (!user) {
      const newUser = User({
        name: 'Admin',
        email: defaultEmail,
        password: defaultPassword,
      });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(defaultPassword, salt);
      await newUser.save();
      console.log('>>> default user created');
    } else {
      console.log('>>> default user already exists');
    }
  } catch (error) {
    console.log('>>> CREATE DEFAULT USER ERROR: ', error);
  }
};

module.exports = addDefaultAdmin;
