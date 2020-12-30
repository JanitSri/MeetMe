import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image, Row, Col } from 'react-bootstrap';
import Input from './components/input';
import Map from './components/map';
import { retrieveLocs } from './utils/helpers'

function App(){  
  const [invalidEntry, setInvalidEntry] = useState(false);
  const [mapData, setMapData] = useState(null);
  const [showButtonGroup, setShowButtonGroup] = useState(false)

  const inputHandler = async (e) => {
    e.preventDefault()

    const firstStreet = e.target.elements.firstStreet.value || "300 City Centre Dr"; // 43.588760, -79.644320
    const firstCity = "Mississauga";
    const firstProvince = "Ontario";
    const firstMOT = e.target.elements.firstProfile.value;
    const firstMinutes = e.target.elements.firstMinutes.value;
    
    const secondStreet = e.target.elements.secondStreet.value || "100 City Centre Dr"; // 43.593330, -79.642227
    const secondCity = "Mississauga";
    const secondProvince = "Ontario";
    const secondMOT = e.target.elements.secondProfile.value;
    const secondMinutes = e.target.elements.secondMinutes.value;
    
    console.log(firstStreet, firstCity, firstProvince, firstMOT, firstMinutes);
    console.log(secondStreet, secondCity, secondProvince, secondMOT, secondMinutes);
  
    let requestBody = {"locations": [
        {
            "id": 1,
            "address": "1088 Galesway Blvd Mississauga Ontario Canada",
            "profile": "cycling",
            "minutes": 30
        },
        {
            "id":2,
            "address": "2708 Rena Rd Mississauga Ontario Canada",
            "profile": "cycling",
            "minutes": 30
        }
      ]
    };
    
    let result = await retrieveLocs(requestBody);
    console.log(result);
  
    if(result == null){
      setInvalidEntry(true);
      return;
    }
    setShowButtonGroup(true);
    setMapData(result);
  }

  return (
    <Container className="mt-3 p-1">
      <Row>
        <Col className="text-center">
          <Image src="../header_img.png" className="headerImage"/>
        </Col>
      </Row>
      <Input onSubmit={inputHandler} invalidEntry={invalidEntry} onClose={() => setInvalidEntry(false)}/>
      <Map data={mapData} buttonGroup={showButtonGroup}/>
    </Container>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));