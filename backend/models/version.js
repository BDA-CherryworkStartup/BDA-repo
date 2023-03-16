const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true},
  parameters: [{name: String, value: String}],
  timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Version', versionSchema);