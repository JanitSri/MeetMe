import React from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function Input(props) {
  return (
    <Container className="mt-1 p-4">
      { props.invalidEntry && 
        <Alert variant="danger" onClose={props.onClose} dismissible>
          <Alert.Heading>Oh no! Something went wrong!</Alert.Heading>
          Maybe it's your fault, maybe it's ours. Try entering another city.
        </Alert>
      }
      <Form noValidate onSubmit={props.onSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="firstStreet">
            <Form.Label>First Street</Form.Label>
            <Form.Control type="text" placeholder="300 City Centre Dr"/>
          </Form.Group>

          <Form.Group as={Col} controlId="firstCity">
            <Form.Label>First City</Form.Label>
            <Form.Control type="text" placeholder="Mississauga" readOnly/>
          </Form.Group>

          <Form.Group as={Col} controlId="firstProvience">
            <Form.Label>First Province</Form.Label>
            <Form.Control type="text" placeholder="Ontario" readOnly/>
          </Form.Group>
        </Form.Row>


        <Form.Row>
          <Form.Group as={Col} controlId="secondStreet">
            <Form.Label>Second Street</Form.Label>
            <Form.Control type="text" placeholder="100 City Centre Dr"/>
          </Form.Group>

          <Form.Group as={Col} controlId="secondCity">
            <Form.Label>Second City</Form.Label>
            <Form.Control type="text" placeholder="Mississauga" readOnly/>
          </Form.Group>

          <Form.Group as={Col} controlId="secondProvience">
            <Form.Label>Second Province</Form.Label>
            <Form.Control type="text" placeholder="Ontario" readOnly/>
          </Form.Group>
        </Form.Row>

        <Form.Text id="passwordHelpBlock" className="mb-4">
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
