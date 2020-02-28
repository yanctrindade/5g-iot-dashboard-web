import React, { Component } from 'react';
import { Marker } from 'google-maps-react';
import { getDistance } from 'geolib';

class CarPin extends Component {

    constructor(props) {
      super(props);
      this.state = {
        lat: props.position.lat,
        lng: props.position.lng
      };
    }

    shouldComponentUpdate(nextProps){
      //console.log("render:" + nextProps.position.lat + nextProps.position.lng)
      const min_distance = 16;

      const next_lat = nextProps.position.lat
      const next_lng = nextProps.position.lng
      const lat = this.props.position.lat
      const lng = this.props.position.lng
      const last_lat = this.state.lat
      const last_lng = this.state.lng

      const is_new = !(next_lat === lat && next_lng === lng)
      let distance = 0

      if(is_new){
        distance = getDistance(
          { latitude: last_lat, longitude: last_lng },
          { latitude: next_lat, longitude: next_lng }
        );

        console.log(distance)

        if(distance > min_distance){
          this.setState({lat: next_lat, lng: next_lng})
          return true;
        }
      }
      return false;
    }
  
    render(){
      return <Marker { ...this.props } />;
    }
}

export default CarPin;