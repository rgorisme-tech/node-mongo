const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  birthday: {
    type: Date
  },
  phoneNumber: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  emailToken: {
    type: String
  }
});

module.exports = mongoose.model('user', UserSchema);
