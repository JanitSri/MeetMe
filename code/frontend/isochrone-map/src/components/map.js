import React, { useState, useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap';
import mapboxgl from 'mapbox-gl';



function Map() {
  const [mapParams, setMapParams] = useState({lng: -79.640579, lat: 43.595310, zoom: 12});
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [mapParams.lng, mapParams.lat],
      zoom: mapParams.zoom
    });

    map.on('move', () => {
      setMapParams({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      })
    });

  }, [mapParams, mapContainer]);
  
  return (
    <Container className="mt-1 p-4" style={{width:"75%"}}>
      <div ref={el => (mapContainer.current = el)} className="fit" >
      </div>
    </Container>
  )
}

export default Map;
