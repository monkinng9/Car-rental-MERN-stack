const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  role: {
    type: String,
    require: [true, 'Please add a role'],
  }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema)