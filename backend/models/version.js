const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  name: { type: String},
  versionNumber: {type: String, required: true},
  usedFor: [{type: String, required: true}],
  content: { type: String, required: true},
  parameters: [{name: String, value: String}],
  timestamp: {type: Date, default: Date.now},
  signature: [{type: String}],
});

module.exports = mongoose.model('Version', versionSchema);