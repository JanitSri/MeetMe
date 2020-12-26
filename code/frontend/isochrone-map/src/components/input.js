import React from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function Input(props) {

  const numberOfPeople = ['first', 'second'];

  return (
    <Container className="mt-1 p-4">
      { props.invalidEntry && 
        <Alert variant="danger" onClose={props.onClose} dismissible>
          <Alert.Heading>Oh no! Something went wrong!</Alert.Heading>
          Maybe it's your fault, maybe it's ours. Try entering another city.
        </Alert>
      }
      <Form noValidate onSubmit={props.onSubmit}>
        {
          numberOfPeople.map((people, index) => {
            return (
              <div key={index.toString()}>
                <h4 style={{color:"#875b1c", fontWeight:'bold'}}>{people.charAt(0).toUpperCase() + people.slice(1)} Person:</h4>
                <Form.Row className="mb-3">
                  <Form.Group as={Col} controlId={`${people}Street`}>
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" placeholder="300 City Centre Dr"/>
                  </Form.Group>

                  <Form.Group as={Col} controlId={`${people}City`}>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Mississauga" readOnly/>
                  </Form.Group>

                  <Form.Group as={Col} controlId={`${people}Provience`}>
                    <Form.Label>Province</Form.Label>
                    <Form.Control type="text" placeholder="Ontario" readOnly/>
                  </Form.Group>

                  <Form.Group controlId={`${people}Profile`}>
                    <Form.Label>Mode of Transportation</Form.Label>
                    <Form.Control as="select">
                      <option value="walking">walking</option>
                      <option value="driving">driving</option>
                      <option value="cycling">cycling</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId={`${people}Minutes`} className="ml-3">
                    <Form.Label>Minutes of Travel</Form.Label>
                    <Form.Control as="select">
                      <option value="5">5 mins</option>
                      <option value="10">10 mins</option>
                      <option value="15">15 mins</option>
                      <option value="20">20 mins</option>
                      <option value="25">25 mins</option>
                      <option value="30">30 mins</option>
                      <option value="45">45 mins</option>
                      <option value="60">60 mins</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
              </div>
            );
          })
        }
        <Form.Text id="helpText" className="mb-4">
          <p style={{fontWeight:"bold"}}>
            To get started, enter two locations and the map will show potential areas to meet up based on common area. Conditions for meet up can be altered using the toolbar in the map. Currently, Mississauga (Ontario) is only supported. More cities will be added in the future. 
          </p>
        </Form.Text>
        
        <Row>
          <Col className="text-center">
            <Button variant="outline-dark" type="submit">
              GET LOCATIONS
            </Button>
          </Col>
        </Row>

      </Form>
    </Container> 
  )
}

export default Input;
