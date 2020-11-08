const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEO_PROVIDER,
  apiKey: process.env.GEO_KEY, 
  formatter: null 
};

const geocoder = NodeGeocoder(options);

exports.geocoder = geocoder;