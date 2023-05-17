const mongoose = require('mongoose');

const controlSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String
  },
  type: {
    type: String
  }
});

module.exports = mongoose.model('SecuritySchema', controlSchema,'security_devices');