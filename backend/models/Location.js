
const mongoose = require('mongoose');
// models/Location.js
const LocationSchema = new mongoose.Schema({
    location: { type: String, required: true },
  });
  
  module.exports = mongoose.model('Location', LocationSchema);
  