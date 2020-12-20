import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image, Row, Col } from 'react-bootstrap';
import Input from './components/input';
import Map from './components/map';


function App(){  
  const [invalidEntry, setInvalidEntry] = useState(false);

  const inputHandler = (e) => {
    e.preventDefault()
    const firstStreet = e.target.elements.firstStreet.value || "300 City Centre Dr";
    const secondStreet = e.target.elements.secondStreet.value || "100 City Centre Dr";
    console.log(firstStreet, secondStreet);
  }

  return (
    <Container className="mt-3 p-1" style={{backgroundColor:"#98651e"}} >
      <Row>
        <Col className="text-center">
          <Image src="../header_img.png" className="headerImage"/>
        </Col>
      </Row>
      <Input onSubmit={inputHandler} invalidEntry={invalidEntry} onClose={() => setInvalidEntry(false)}/>
      <Map/>
    </Container>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));