import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image, Row, Col } from 'react-bootstrap';
import Input from './components/input';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_TOKEN;

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2
    };
  }

  componentDidMount() {
    // const map = new mapboxgl.Map({
    //   container: this.mapContainer,
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [this.state.lng, this.state.lat],
    //   zoom: this.state.zoom
    // });

    // map.on('move', () => {
    //   this.setState({
    //     lng: map.getCenter().lng.toFixed(4),
    //     lat: map.getCenter().lat.toFixed(4),
    //     zoom: map.getZoom().toFixed(2)
    //   });
    // });
  }

  render() {
    return (
      <Container className="mt-3 p-1" style={{backgroundColor:"#98651e"}} >
        <Row>
          <Col className="text-center">
            <Image src="../header_img.png" className="headerImage"/>
          </Col>
        </Row>
        <Input />
      </Container>
      // <div>
      //   <div className='sidebarStyle'>
      //     <div>
      //       Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}
      //     </div>
      //   </div>
      //   <div ref={el => this.mapContainer = el} className="mapContainer" />
      // </div>
    )
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));