import React, { Component } from 'react';
import { Marker } from 'google-maps-react';

class CarPin extends Component {

    shouldComponentUpdate(nextProps){
      return !(nextProps.location === this.props.location)
    }
  
    render(){
      return <Marker { ...this.props } />;
    }
}

export default CarPin;