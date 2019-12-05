import React, { Component } from 'react';
import { Map, Polyline, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapCard from './MapCard';
import axios from 'axios';
import CarIcon from '../../Assets/CarPin.png'
import StartIcon from '../../Assets/StartIcon.png'
import MapDatePicker from  '../../Components/MapDatePicker'
import tinygradient from 'tinygradient';

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.state = 
                {
                  markers: [],
                  vehicleSelected: false,
                  vehicleContent: null,
                  mapCardKey: null,
                  filterState: false,
                  filterPaths: [],
                  gradientColors:[]
                };
  }

  renderPath = (coords, key, color) => {
    coords = coords.map(e => ({lat : e[1], lng: e[0]}))
    color = color != typeof(undefined) ? color : "#001529"
    key = key !=  typeof(undefined) ? key : 0
    return(
        <Polyline
          key = {key}
          path={coords}
          strokeColor={color}
          strokeOpacity={0.5}
          strokeWeight={4} 
        />
    )
  }

  getGradients = (gradients) => {
    console.log(gradients); // ["rgb(255, 51, 51)", "rgb(255, 102, 102)", "rgb(255, 153, 153)", "rgb(255, 204, 204)", "rgb(255, 255, 255)"]
    this.setState({gradientColors: gradients})
  }

  setFilterPaths = (startDate,endDate) => {
    const paths = this.state.vehicleContent.paths.map(item => item.coordinates)
    let gradient = tinygradient('red', 'green', 'blue');
    if(paths.length > 1){
      gradient = gradient.rgb(paths.length).map(color => color.toHexString())
    }else{
      gradient = ['#03fc28']
    }
    const paths_dictionary = paths.map((item, index) => ({'path': item, 'color': gradient[index]}))
    this.setState({filterPaths: paths_dictionary, filterState: true})
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

  closeMapCard = () => this.setState({vehicleSelected : false, filterState: false})
  
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
          containerStyle={{ width: '100%', height: '90vh', position: 'relative' }}
          google={this.props.google}
          className={'map'}
          zoom={15}
          streetViewControl={false}
          fullscreenControl={false}
          zoomControl= {true}
          //initialCenter={coords[Math.round(coords.length/2)]}
          initialCenter={{lat:-15.765577, lng:-47.857529}}
        >
          {!this.state.vehicleSelected ? this.state.markers.map( marker => this.addMarker(marker)) : <></>}
          {this.state.vehicleSelected && this.state.filterState ? this.state.filterPaths.map( (item, index) => this.renderPath(item.path, index, item.color)) : <></>}
          {this.state.vehicleSelected && !this.state.filterState ? this.renderPath(this.state.vehicleContent.currentPath) : <></>}
          {this.state.vehicleSelected && !this.state.filterState ? this.renderStart(this.state.vehicleContent.currentPath) : <></>}
          {this.state.vehicleSelected ? <MapDatePicker render={this.setFilterPaths}/> : <></>}
          <MapCard isVisible={this.state.vehicleSelected} onClose={this.closeMapCard} content={this.state.vehicleContent}/>
        </Map>
      </>
    );
  }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDHYWWkJ5p-Du3DKUuJgQoXUAcqyPmwjIQ',
  language: 'pt-br'
})(MapComponent);