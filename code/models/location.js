const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: String,
  naics_code: Number,
  web_address: String,
  address: { 
    street: String, 
    postal_code: String,
    building_number: String,
    unit_number: String
    },
  location: {
    type: {
      type: String, 
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  }
});

locationSchema.set('timestamps, true');

module.exports = mongoose.model('Location', locationSchema);