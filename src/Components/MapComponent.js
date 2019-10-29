import React, { Component } from 'react';
import { Map, Polyline, GoogleApiWrapper } from 'google-maps-react';
import MapCard from './MapCard'
import coordinates from '../FakeData/Coordinates.js'

class MapComponent extends Component {

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
          <Polyline
          path={coords}
          strokeColor="#0000FF"
          strokeOpacity={0.5}
          strokeWeight={4} />
        </Map>
        <MapCard/>
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