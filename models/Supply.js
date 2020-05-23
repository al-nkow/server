const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplySchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    options: [
      {
        wholesaleId: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      }
    ],
  },
);

module.exports = mongoose.model('Supply', SupplySchema);
