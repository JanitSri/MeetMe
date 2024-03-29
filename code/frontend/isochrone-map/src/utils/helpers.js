import axios from 'axios';
import mapboxgl from 'mapbox-gl';

// get the data from the backend 
export const retrieveLocs = async (queryBody) => {
  try {
    let result = await axios.post("http://localhost:8081/api/v1/locations/common", {
      body: queryBody
    });
    
    if(result.data.output && result.data.data != null){
      return result.data.data;
    }
    return null;
  } catch (error) {
    console.log(JSON.stringify(error));
    return null;
  }
}

export const createPopup = (text) => {
  return new mapboxgl.Popup({ offset: 25 }).setHTML(text);
}

export const createPopupText = (mapData, pos) => {
  return `<p>Address: ${mapData[pos].address}</p><p>Coordinates: ${mapData[pos].lat},${mapData[pos].lng}</p><p>Profile: ${mapData[pos].profile}</p><p>Minutes: ${mapData[pos].minutes}</p>`
}

export const createMarker = (markerColor, lng, lat, popup, map) => {
  return new mapboxgl.Marker({color: markerColor})
  .setLngLat([lng,lat])
  .setPopup(popup)
  .addTo(map);
}

// create the common place markers 
export const addPlaceMarkers = (placesArray, map) => {

  let placesMarker = [];

  placesArray.forEach(place => {
    let text = `<p>Place Name: ${place.name}</p><p>NAICS Code: ${place.naics_code}</p><p>Address: ${place.address.street}, ${place.address.postal_code}</p><p>Website: <a href='https://${place.web_address}' target="_blank">${place.web_address}</a></p>`;
    let popup = createPopup(text);
    
    let marker = createMarker("#00FF00", place.location.coordinates[0], place.location.coordinates[1], popup, map);

    placesMarker.push(marker);
  });
  
  return placesMarker;
}

export const handleMapStyleChange = (e, map) => {
  const BASE_STYLE_URL = "mapbox://styles/mapbox/";
  map.setStyle(BASE_STYLE_URL + e.target.value);
}

export const addIsochroneContour = (map) => {
  
  map.addSource('firstLoc', {
    type: 'geojson',
    data: {
      'type': 'FeatureCollection',
      'features': []
    }
  });
 
  map.addLayer({
    'id': 'firstIsoLayer',
    'type': 'fill',
    'source': 'firstLoc',
    'layout': {},
    'paint': {
      'fill-color': '#003FFF',
      'fill-opacity': 0.5
    }
  });

  map.addSource('secondLoc', {
    type: 'geojson',
    data: {
      'type': 'FeatureCollection',
      'features': []
    }
  });
 
  map.addLayer({
    'id': 'secondIsoLayer',
    'type': 'fill',
    'source': 'secondLoc',
    'layout': {},
    'paint': {
      'fill-color': '#FFFF00',
      'fill-opacity': 0.5
    }
  });
}