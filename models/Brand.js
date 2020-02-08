const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
});

module.exports = mongoose.model('Brand', BrandSchema);
