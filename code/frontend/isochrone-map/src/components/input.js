import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function input() {
  return (
    <Container className="mt-1 p-4" style={{width:"75%"}}>
      <Form>
        <Form.Group controlId="firstLoc">
          <Form.Control type="email" placeholder="Enter First Location..." />
        </Form.Group>

        <Form.Group controlId="secondLoc">
          <Form.Control type="password" placeholder="Enter Second Location..." />
        </Form.Group>
        
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

export default input;
