// models/PatientData.js
const mongoose = require('mongoose');

const patientDataSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  condition: { type: String, required: true },
  location: { type: String, required: true },
}, { timestamps: true }); // optional, for createdAt and updatedAt fields

const PatientData = mongoose.model('PatientData', patientDataSchema);

module.exports = PatientData;
