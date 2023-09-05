// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // Add other user-related fields as needed
});

module.exports = mongoose.model('User', userSchema);
