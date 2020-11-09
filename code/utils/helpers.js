const fetch = require("node-fetch");
const buildUrl = require('build-url');

function getURL(addressArray){
  return buildUrl('http://www.mapquestapi.com/geocoding/v1/batch', {
    disableCSV: true,
    queryParams: {
    key: process.env.GEO_KEY,
    location: addressArray
    } 
  });
}

async function getGeocodeData(addressArray){
  let url = getURL(addressArray);
  console.log("<<SENDING REQUEST TO..." + url + ">>>\n");
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) { 
    throw error;
  }
}

exports.getGeocodeData = getGeocodeData;