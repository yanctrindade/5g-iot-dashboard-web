import React, { Component } from 'react';
import {Polyline}  from 'google-maps-react';
class MapElements extends Component{
    render(){
        return (
            <Polyline
            path={this.props.coords}
            strokeColor="#0000FF"
            strokeOpacity={0.5}
            strokeWeight={4} />
        )
    }
}

export default MapElements;