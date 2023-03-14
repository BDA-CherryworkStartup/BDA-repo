const mongoose = require('mongoose');

const clauseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true},
  category: {type: String, required: true},
  variant: {type: String, required: true},
  version: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Clause', clauseSchema);