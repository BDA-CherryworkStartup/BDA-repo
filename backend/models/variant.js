const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    default: { type: Boolean, required: true },
    content: { type: String, required: true },
    parameters: [{name: String, value: String}],
    version: [{type: mongoose.Schema.Types.ObjectId, ref: "Version"}]
})

module.exports = mongoose.model('Variant', variantSchema);