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
                  mapCardVisible: false,
                  mapCardContent: null,
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
      { mapCardContent: marker.data,
        mapCardVisible: true}
    )    
  }

  closeMapCard = () => this.setState({mapCardVisible : false})
  
  addMarker = (marker) => {
    console.log(`addMarker ${marker.key} -> ${marker.currentLocation.lat} ${marker.currentLocation.lng}`);
    return(
      <Marker
        key={marker.key}
        position={marker.currentLocation}
        name={marker.plate}
        data={marker}
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
        <MapCard isVisible={this.state.mapCardVisible} onClose={this.closeMapCard} content={this.state.mapCardContent}/>
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