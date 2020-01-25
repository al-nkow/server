const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PositionSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    shopId: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
      // unique: true
    },
    price: {
      type: Number,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Position', PositionSchema);
