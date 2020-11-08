const Location = require('../models/location');
const { geocoder } = require('../utils/helpers');

exports.getAllLocations = async (req, res, next) => {
  try {
    const all_locations = await Location.find();
    
    return res.status(200).json({
      success: true,
      count: all_locations.length,
      loc_data: all_locations
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:'Internal Server Error'});
  }
};

// geowithin to get locations in a polygon from DB
// in MongoDB [longitude, latitude]
// turf.js to find the intersection of polygons

exports.getLocation = async (req, res, next) => {
  let address = req.query.address;
  try {
    if(address){
      const geoData = await geocoder.geocode(address);
      console.log(geoData[0]['formattedAddress']);
      res.status(200).json({output:geoData[0]})
    }else{
      res.status(200).json({output:"No location passed"})
    } 
  } catch (err) {
    res.status(500).json({error:err.message})
  }
};
