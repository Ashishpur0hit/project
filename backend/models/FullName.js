// models/FullName.js
const mongoose = require('mongoose');

const FullNameSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('FullName', FullNameSchema);

// models/Age.js






