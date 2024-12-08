const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define Login schema
const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Pre-save hook to hash passwords
loginSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
loginSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create and export the model
const Login = mongoose.model('Login', loginSchema);

module.exports = Login;