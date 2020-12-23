import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image, Row, Col } from 'react-bootstrap';
import Input from './components/input';
import Map from './components/map';
import axios from 'axios';

function App(){  
  const [invalidEntry, setInvalidEntry] = useState(false);
  const [mapData, setMapData] = useState(null);

  const retrieveLocs = async (queryBody) => {
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

  const inputHandler = async (e) => {
    e.preventDefault()
    const firstStreet = e.target.elements.firstStreet.value || "300 City Centre Dr"; // 43.588760, -79.644320
    const secondStreet = e.target.elements.secondStreet.value || "100 City Centre Dr"; // 43.593330, -79.642227
    console.log(firstStreet, secondStreet);

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
      <Map data={mapData}/>
    </Container>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));