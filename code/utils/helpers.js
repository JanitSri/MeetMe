const fetch = require("node-fetch");
const buildUrl = require('build-url');
const turf = require('@turf/intersect');
const { default: intersect } = require("@turf/intersect");
const { default: convex } = require("@turf/convex");
const Location = require("../models/location");

// request template 
async function getRequest(url){
  try {
    console.log("<<< SENDING REQUEST TO..." + url + " >>>\n");
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) { 
    throw error;
  }
}

// build the url 
function getUrl(baseUrl, urlParams){
  return buildUrl(baseUrl, {
    disableCSV: true,
    queryParams: urlParams
  }); 
}

// get the geodata of the locations 
async function getGeocodeData(locations){
  let addresses = locations.map(loc => loc["address"])
  let url = getUrl('http://www.mapquestapi.com/geocoding/v1/batch', {
    key: process.env.MAPQUEST_KEY,
    location: addresses
  });
  try {
    let json = await getRequest(url);
    if(json){
      let latLng = json["results"].map(result => result['locations'][0]['latLng'])
      return latLng;
    }
    else{
      return {};
    }
  } catch (error) { 
    throw error;
  }
}

// get the isochrone contours of the geodatas
async function getIsochrones(locationData){
  let urls = locationData.map(l => 
    getUrl(`https://api.mapbox.com/isochrone/v1/mapbox/${l['profile']}/${l['lng']},${l['lat']}`, {
      contours_minutes: l['minutes'],
      polygons: "true",
      access_token: process.env.MAPBOX_KEY
    })
  );
  let result = [];
  for (let i = 0; i < urls.length; i++) {
    try{
      let json = await getRequest(urls[i]);
      result.push({...locationData[i], ...json});
    }catch(error){
      throw error;
    }
  }
  return result;
}

// get overlapping area of the isochrone contour 
function getOverlappingArea(locationData){
  polyCoords = locationData.map(l => {
    let coords = l['features'][0]['geometry'];
    return coords;
  })
  let intersections = intersect(...polyCoords);
  intersections = convex(intersections);
  locationData.push(intersections);
}

// the the common places in the area 
async function getPlacesWithin(overlappingArea){
  const polyArr = overlappingArea.length === 3 && overlappingArea[2] != null ? overlappingArea[2]['geometry'] : null;

  if(polyArr == null){
    return null;
  }

  try {
    let filteredPoly = [];
    for(let p of polyArr['coordinates']){
      let tempSet = new Set(p);
      let arr = Array.from(tempSet);
      arr.push(arr[0]);
      filteredPoly.push(arr);
    }

    let places = await Location.find({
      location:
      {
        $geoWithin:{
          $geometry:{
            type: polyArr['type'],
            coordinates: filteredPoly
          }
        }
      }
    });
    places.unshift({'size':places.length});  
    return places;
  } catch (error) {
    console.log(error);
    return null
  } 
}

async function getCommonPlaceData(locationData){
  let geoData = await getGeocodeData(locationData);
  if(geoData.length == locationData.length){
    locationData = locationData.map((loc, index) => {
      return {...loc, ...geoData[index]};
    });
    locationData = await getIsochrones(locationData);
    getOverlappingArea(locationData);
    let places = await getPlacesWithin(locationData);
    locationData.push(places);
    return locationData;
  }
}

exports.getCommonPlaceData = getCommonPlaceData;