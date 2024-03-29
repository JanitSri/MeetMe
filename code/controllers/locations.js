const Location = require('../models/location');
const { getCommonPlaceData } = require('../utils/helpers');

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

exports.getLocation = async (req, res, next) => {
  let locations = req.body.locations || req.body.body.locations;
  try {
    if(locations.length > 0){
      let result = await getCommonPlaceData(locations);
      res.status(200).json({output:'sucesss', data:result});
      return;
    }
    res.status(200).json({output:"failure", data:null})
  } catch (err) {
    console.log(err)
    res.status(500).json({error:"Our server monkeys did something wrong. It will be fixed soon."})
  }
};
