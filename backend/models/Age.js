const mongoose = require('mongoose');

const AgeSchema = new mongoose.Schema({
    age: { type: Number, required: true },
  });
  
  module.exports = mongoose.model('Age', AgeSchema);