import React, { Component } from 'react';
import { Map, Polyline, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapCard from './MapCard';
import coordinates from '../../FakeData/Coordinates.js';
import axios from 'axios';

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.state = 
                {
                  markers: [],
                  mapCardVisible: true,
                  mapCardKey: null
                };
  }

  renderPaths = (coords) => {
    coords = coords.map(e => ({lat : e[1], lng: e[0]}))
    return(
      <Polyline
      path={coords}
      strokeColor="#0000FF"
      strokeOpacity={0.5}
      strokeWeight={4} />
    )
  }

  clickMarker = (props, marker, e) => {
    this.setState(
      {mapCardVisible: true}
    )
    console.log(props);
  }
  
  addMarker = (marker) => {
    const {key, plate, currentLocation} = marker;
    console.log(`addMarker ${key} -> ${currentLocation.lat} ${currentLocation.lng}`);
    return(
      <Marker
      key={key}
      position={currentLocation}
      name={plate}
      onClick={this.clickMarker}
      />
    )
  }

  componentDidMount() {

    axios.get('./database.json')
    .then((res)=>{
      console.log(res.data);
      this.setState({markers: res.data});
    }).catch((err)=>{
      console.log(err);
    })
  }

  render() {

    const coords = coordinates.map(x => {return {lat: x[1],lng: x[0]} })
    return (
      <>
        <Map
          google={this.props.google}
          className={'map'}
          zoom={14}
          style={mapStyles}
          initialCenter={coords[Math.round(coords.length/2)]}
        >
        {this.state.markers.map( marker => this.addMarker(marker))}
        {this.renderPaths(coordinates)}
        </Map>
        <MapCard isVisible={this.state.mapCardVisible}/>
      </>
    );
  }

}

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDHYWWkJ5p-Du3DKUuJgQoXUAcqyPmwjIQ'
})(MapComponent);