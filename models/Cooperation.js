const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CooperationSchema = new Schema(
  {
    bocoArticle: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      expires: 0,
    },
    orgName: {
      type: String,
    },
    inn: {
      type: String,
    },
    fizName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    dateTo: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
    orgOnly: {
      type: String,
      required: true,
    },
  },
);

// CooperationSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 }); // same as db.createIndex

module.exports = mongoose.model('Cooperation', CooperationSchema);