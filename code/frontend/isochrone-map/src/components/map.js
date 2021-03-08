import React, { useEffect, useRef, useState } from 'react'
import { Container, Form, Row, Button, ButtonGroup} from 'react-bootstrap';
import mapboxgl from 'mapbox-gl';
import { createPopup, createMarker, addPlaceMarkers, handleMapStyleChange, addIsochroneContour, createPopupText, hidePlaceMarkers } from '../utils/helpers';
import { locOneDefault, locOneTextDefault, locTwoDefault, locTwoTextDefault } from '../utils/default';

function Map(props) {
  const mapContainer = useRef(null);
  let globalMap = useRef(null);
  let globalData = useRef(props.data);
  let currentMarkers = useRef([]);
  let commonPlacesMarkers = useRef([]);

  let [showCommonPlaces, setShowCommonPlaces] = useState(true);
  let [showLocOne, setShowLocOne] = useState(true);
  let [showLocTwo, setShowLocTwo] = useState(true);
  
  useEffect(() => {
    const mapParams = {lng: -79.640579, lat: 43.595310, zoom: 11};

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [mapParams.lng, mapParams.lat],
      zoom: mapParams.zoom
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('style.load', function() {
      addIsochroneContour(map);
      if(globalData.current != null){
        map.getSource('firstLoc').setData(globalData.current[0].features[0].geometry);
        map.getSource('secondLoc').setData(globalData.current[1].features[0].geometry);
      }
    })

    globalMap.current = map;
  }, []);

  useEffect(() => {
    let mapData = globalData.current = props.data;
    
    let locOne = locOneDefault;
    let locOneText = locOneTextDefault;

    let locTwo = locTwoDefault;
    let locTwoText = locTwoTextDefault;

    if(mapData != null){
      locOne = {lng: mapData[0].lng, lat:mapData[0].lat};

      locOneText = createPopupText(mapData, 0);

      locTwo = {lng: mapData[1].lng, lat:mapData[1].lat};

      locTwoText = createPopupText(mapData, 1);

      globalMap.current.flyTo({ center: [-79.6441, 43.5890], zoom: 10 });

      if(mapData[3] != null){
        let commonPlaces = addPlaceMarkers(mapData[3].slice(1), globalMap.current);
        commonPlacesMarkers.current = commonPlaces;
      }
      
      globalMap.current.getSource('firstLoc').setData(mapData[0].features[0].geometry);
      globalMap.current.getSource('secondLoc').setData(mapData[1].features[0].geometry);
    }

    let popup1 = createPopup(locOneText)
    let marker1 = createMarker("#003FFF", locOne.lng, locOne.lat, popup1, globalMap.current)

    let popup2 = createPopup(locTwoText)
    let marker2 = createMarker("#FFFF00", locTwo.lng, locTwo.lat, popup2, globalMap.current)
    
    currentMarkers.current.push(marker1, marker2);

    return () => {
      currentMarkers.current.forEach((marker) => marker.remove());
      currentMarkers.current = [];

      commonPlacesMarkers.current.forEach((marker) => marker.remove());
      commonPlacesMarkers.current = [];
    }
  }, [props.data]);

  const locOneVisibilityHandler = () => {
    setShowLocOne(prevState => !prevState);
    if(showLocOne){
      currentMarkers.current[0].remove();
      globalMap.current.setLayoutProperty('firstIsoLayer', 'visibility', 'none');
    }else{
      currentMarkers.current[0].addTo(globalMap.current);
      globalMap.current.setLayoutProperty('firstIsoLayer', 'visibility', 'visible');
    }
  }

  const locTwoVisibilityHandler = () => {
    if(showLocTwo){
      currentMarkers.current[1].remove();
      globalMap.current.setLayoutProperty('secondIsoLayer', 'visibility', 'none');
    }else{
      currentMarkers.current[1].addTo(globalMap.current);
      globalMap.current.setLayoutProperty('secondIsoLayer', 'visibility', 'visible');
    }

    setShowLocTwo(prevState => !prevState);
  }

  const commonPlacesVisibilityHandler = () => {
    if(showCommonPlaces && commonPlacesMarkers.current){
      commonPlacesMarkers.current.forEach(marker => marker.remove());
    }else if(!showCommonPlaces && commonPlacesMarkers.current){
      commonPlacesMarkers.current.forEach(marker => marker.addTo(globalMap.current));
    }
    setShowCommonPlaces(prevState => !prevState);
  }

  return (
    <Container className="mt-1 p-4">
      <div>
        <div className="settingsBar">
          <div>
            <Form.Group controlId="map-style-selection" as={Row}>
              <Form.Label style={{color:"#3C280C"}}>Choose Map Style: </Form.Label>
              <Form.Control as="select" onChange={(e) => handleMapStyleChange(e, globalMap.current)}>
                <option value="streets-v11">Streets</option>
                <option value="satellite-streets-v11">Satellite</option>
                <option value="light-v10">Light</option>
                <option value="dark-v10">Dark</option>
              </Form.Control>
            </Form.Group>
          </div>
        </div>
        <div ref={el => (mapContainer.current = el)} className="fit">
          {props.buttonGroup && <div className="toggleBar">
            <ButtonGroup vertical>
              <Button variant={showLocOne ? "primary" : "outline-primary"} className="mb-2" onClick={locOneVisibilityHandler}>{showLocOne ? <span>Hide Location One</span> : <span>Show Location One</span>}</Button>
              <Button variant={showLocTwo ? "warning" : "outline-warning"} className="mb-2" onClick={locTwoVisibilityHandler}>{showLocTwo ? <span>Hide Location Two</span> : <span>Show Location Two</span>}</Button>
              <Button variant={showCommonPlaces ? "success" : "outline-success"} className="mb-2" onClick={commonPlacesVisibilityHandler}>{showCommonPlaces ? <span>Hide Common Places</span> : <span>Show Common Places</span>}</Button>
            </ButtonGroup>
          </div>}
        </div>
      </div>
    </Container>
  )
}

export default Map;
