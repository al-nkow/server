const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WholesaleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
});

module.exports = mongoose.model('Wholesale', WholesaleSchema);