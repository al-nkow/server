const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  bocoArticle: {
    type: String,
  },
  category: {
    type: ObjectId, // a product references a category _id with type ObjectId
  },
  link: {
    // TODO: заменить на IMAGE!!!!!!!
    type: String,
  },
  height: {
    type: Number,
  },
  width: {
    type: Number,
  },
  length: {
    type: Number,
  },
  value: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  color: {
    type: String,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
