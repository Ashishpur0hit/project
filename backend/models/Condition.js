// models/Condition.js
const mongoose = require('mongoose');
const ConditionSchema = new mongoose.Schema({
    condition: { type: String, required: true },
  });

  module.exports = mongoose.model('Condition', ConditionSchema);