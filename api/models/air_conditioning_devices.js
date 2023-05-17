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
  temperature: {
    type: Number
  },
  type: {
    type: String
  }
});

module.exports = mongoose.model('AirConditioningSchema', controlSchema,'air_conditioning_devices');