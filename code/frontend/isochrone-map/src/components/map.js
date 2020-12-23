import React, { useState, useEffect, useRef } from 'react'
import { Container, Form, Row } from 'react-bootstrap';
import mapboxgl from 'mapbox-gl';



function Map(props) {
  const mapContainer = useRef(null);
  let globalMap = useRef(null);
  let currentMarkers = useRef([]);
  
  useEffect(() => {
    const mapParams = {lng: -79.640579, lat: 43.595310, zoom: 10};

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [mapParams.lng, mapParams.lat],
      zoom: mapParams.zoom
    });

    globalMap.current = map;
  }, []);

  useEffect(() => {
    currentMarkers.current.forEach((marker) => marker.remove());
    currentMarkers.current = [];

    let mapData = props.data;
  
    let locOne = {lng: -79.644320, lat: 43.588760};
    let locTwo = {lng: -79.642227, lat: 43.593330};

    if(mapData != null){
      locOne = {lng: mapData[0].lng, lat:mapData[0].lat};
      locTwo = {lng: mapData[1].lng, lat:mapData[1].lat};
    }

    var marker1 = new mapboxgl.Marker({
      color: "#FF0000",
    }).setLngLat([locOne.lng,locOne.lat])
    .addTo(globalMap.current);

    currentMarkers.current.push(marker1);

    var marker2 = new mapboxgl.Marker({
      color: "#0000FF",
    }).setLngLat([locTwo.lng,locTwo.lat])
    .addTo(globalMap.current);
    
    currentMarkers.current.push(marker2);

  }, [props.data])

  const handleMapStyleChange = (e) => {
    const BASE_STYLE_URL = "mapbox://styles/mapbox/";
    globalMap.current.setStyle(BASE_STYLE_URL + e.target.value);
  }
  
  return (
    <Container className="mt-1 p-4">
      <div>
        <div className="settingsBar">
          <div>
            <Form.Group controlId="map-style-selection" as={Row}>
              <Form.Label style={{color:"#3C280C"}}>Choose Map Style: </Form.Label>
              <Form.Control as="select" onChange={handleMapStyleChange}>
                <option value="streets-v11">Streets</option>
                <option value="satellite-streets-v11">Satellite</option>
                <option value="light-v10">Light</option>
                <option value="dark-v10">Dark</option>
              </Form.Control>
            </Form.Group>
          </div>
        </div>
        <div ref={el => (mapContainer.current = el)} className="fit"/>
      </div>
    </Container>
  )
}

export default Map;
