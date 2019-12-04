import React, { Component } from 'react';
import { Map, Polyline, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapCard from './MapCard';
import axios from 'axios';
import CarIcon from '../../Assets/CarPin.png'
import StartIcon from '../../Assets/StartIcon.png'

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.state = 
                {
                  markers: [],
                  vehicleSelected: false,
                  vehicleContent: null,
                  mapCardKey: null
                };
  }

  renderPaths = (coords) => {
    coords = coords.map(e => ({lat : e[1], lng: e[0]}))
    return(
        <Polyline
          path={coords}
          strokeColor="#f04337"
          strokeOpacity={0.5}
          strokeWeight={4} 
        />
    )
  }

  renderStart = (coords) => {
    let startPosition = {lat : coords[0][1], lng: coords[0][0]}
    console.log(startPosition)
    return <Marker
              position={startPosition}
              icon = {{
                url: StartIcon, // url
                scaledSize: new this.props.google.maps.Size(20,20), // scaled size
              }}
              clickable={false}
            />
    }

  clickMarker = (props, marker, e) => {
    this.setState(
      { vehicleContent: marker.data,
        vehicleSelected: true}
    )    
  }

  closeMapCard = () => this.setState({vehicleSelected : false})
  
  addMarker = (marker) => {
    console.log(`addMarker ${marker.key} -> ${marker.currentLocation.lat} ${marker.currentLocation.lng}`);
    return(
      <Marker
        key={marker.key}
        position={marker.currentLocation}
        name={marker.plate}
        data={marker}
        onClick={this.clickMarker}
        icon = {{
          url: CarIcon, // url
          scaledSize: new this.props.google.maps.Size(40,40), // scaled size
          //origin: new Point(0,0), // origin
          //anchor: new Point(0, 0) // anchor
        }}
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

    //const coords = coordinates.map(x => {return {lat: x[1],lng: x[0]} })
    return (
      <>
        <Map
          google={this.props.google}
          className={'map'}
          zoom={15}
          style={mapStyles}
          streetViewControl={false}
          fullscreenControl={false}
          //zoomControlOptions={{position: this.props.google.maps.ControlPosition.LEFT_TOP}}
          //initialCenter={coords[Math.round(coords.length/2)]}
          initialCenter={{lat:-15.765577, lng:-47.857529}}
        >
          {this.state.markers.map( marker => this.addMarker(marker))}
          {this.state.vehicleSelected ? this.renderPaths(this.state.vehicleContent.currentPath) : <></>}
          {this.state.vehicleSelected ? this.renderStart(this.state.vehicleContent.currentPath) : <></>}
        </Map>

        <MapCard isVisible={this.state.vehicleSelected} onClose={this.closeMapCard} content={this.state.vehicleContent}/>
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