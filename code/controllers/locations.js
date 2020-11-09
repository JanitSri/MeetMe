const Location = require('../models/location');
const { getGeocodeData } = require('../utils/helpers');

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
  let addresses = req.query.address;
  try {
    addressArray = JSON.parse(addresses);
    if(addresses){
      let geocodeData = await getGeocodeData(addressArray);
      res.status(200).json({output:'sucesss', data:geocodeData})
    }else{
      res.status(200).json({output:"No location passed"})
    } 
  } catch (err) {
    console.log(err)
    res.status(500).json({error:"Our server monkeys did something wrong. It will be fixed soon."})
  }
};
