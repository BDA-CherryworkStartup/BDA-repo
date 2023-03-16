const mongoose = require('mongoose');

const clauseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usedFor: [{type: String, required: true}],
  type: {type: String},
  status: {type: String, default: "new"},
  variant: [{type: mongoose.Schema.Types.ObjectId, ref: "Variant"}]
  
});

module.exports = mongoose.model('Clause', clauseSchema);