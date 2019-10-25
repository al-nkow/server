const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log('MongoDB Connected...');
  } catch(error) {
    const error_text = error.message.indexOf('ECONNREFUSED') !== -1 ?
      `ERROR: The server was not able to reach MongoDB. Maybe it's not running?` :
      `Mongo connect ERROR: ${error.message}`;
    console.error(error_text);
    // throw err;
    process.exit(1);
  }
};

module.exports = connectDb;
