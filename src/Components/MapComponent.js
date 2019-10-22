import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import MapCard from './MapCard'

class MapComponent extends Component {

  render() {
    return (
      <>
        <Map
          google={this.props.google}
          zoom={16}
          style={mapStyles}
          initialCenter={{ lat: -15.762919, lng:-47.869899}}
        />
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