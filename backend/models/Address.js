// models/Address.js
const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    address: { type: String, required: true },
  });
  
  module.exports = mongoose.model('Address', AddressSchema);