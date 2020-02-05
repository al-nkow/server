const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
  image: {
    type: String,
  },
  height: {
    type: Number,
  },
  width: {
    type: Number,
  },
  thickness: {
    type: Number,
  },
  volumeL: {
    type: Number,
  },
  volumeM: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  area: {
    type: Number,
  },
});

// db.messages.createIndex( { "year":1, "name": "text"} )
ProductSchema.index({ name: 'text' });
// ProductSchema.index({name: 'text', 'profile.something': 'text'});

module.exports = mongoose.model('Product', ProductSchema);
