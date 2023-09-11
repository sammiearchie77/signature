// models/user.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name us required',
    index: {
      unique: true
    }
  },
  email: {
    type: String,
    trime: true,
    unique: 'Email already exists',
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});


export default mongoose.model('User', UserSchema);
