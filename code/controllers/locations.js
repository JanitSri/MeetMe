const Location = require('../models/location');

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

exports.getLocation = (req, res, next) => {
  let locs = req.query.locs;
  if(req.query.locs){
    res.status(200).json({output:JSON.parse(locs)})
  }else{
    res.status(200).json({output:"No location passes"})
  }
};