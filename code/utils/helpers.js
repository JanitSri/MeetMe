const fetch = require("node-fetch");
const buildUrl = require('build-url');
const turf = require('@turf/intersect');
const { default: intersect } = require("@turf/intersect");

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

function getUrl(baseUrl, urlParams){
  return buildUrl(baseUrl, {
    disableCSV: true,
    queryParams: urlParams
  }); 
}

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

function getOverlappingArea(locationData){
  polyCoords = locationData.map(l => {
    let coords = l['features'][0]['geometry'];
    return coords;
  })
  let intersections = intersect(...polyCoords);
  console.log(intersections)
  locationData.push(intersections);
}

async function getCommonPlaceData(locationData){
  let geoData = await getGeocodeData(locationData);
  if(geoData.length == locationData.length){
    locationData = locationData.map((loc, index) => {
      return {...loc, ...geoData[index]};
    });
    locationData = await getIsochrones(locationData);
    getOverlappingArea(locationData);
    return locationData;
  }
}

exports.getCommonPlaceData = getCommonPlaceData;