import React, { Component } from 'react';
import { Map, Polyline, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapCard from './MapCard';
import axios from 'axios';
import moment from "moment";
import CarIcon from '../../Assets/CarPin.png'
import StartIcon from '../../Assets/StartIcon.png'
import Start from '../../Assets/start.png'
import End from '../../Assets/end.png'
import MapDatePicker from  './MapDatePicker'
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

  componentDidMount() {
    axios.get('./database.json')
    .then((res)=>{
      this.setState({markers: res.data});
    }).catch((err)=>{
      console.log(err);
    })
  }

  clickMarker = (props, marker, e) => {
    this.setState(
      { vehicleContent: marker.data,
        vehicleSelected: true}
    )    
  }

  closeDatePicker = () => {
    this.setState({filterState: false})   
  }

  closeMapCard = () => this.setState({vehicleSelected : false, filterState: false})

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
  
  getFilterPaths = (startDate,endDate) => {
    // Get all data from the selected vehicle
    const vehiclePaths = this.state.vehicleContent.paths
    const pathLength = vehiclePaths.length;

    // Set the paths gradient colors
    let gradient;

    if(pathLength > 1){
      gradient = tinygradient('red', 'green', 'blue').rgb(pathLength).map(color => color.toHexString())
    }else{
      gradient = ['#03fc28']
    }

    // Filter the paths according to the Start and End dates selected
    startDate = startDate.toDate()
    endDate = endDate.toDate()

    let filteredPaths = vehiclePaths.filter(item => {
      let startMoment = moment(item.startTime,'YYYY-MM-DDTHH:mm:ss').toDate()
      let endMoment = moment(item.endTime,'YYYY-MM-DDTHH:mm:ss').toDate()

      return startMoment >= startDate && endMoment <= endDate;
    })

    // Orders the data as a dictionary, with each path having its corresponding color
    filteredPaths = filteredPaths.map((item,index) => ({'path':item.coordinates, 'color': gradient[index]}))

    // Sets the state with the filtered paths and sets filterstate to true
    this.setState({filterPaths: filteredPaths, filterState: true})
  }

  addMarker = (marker) => {
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

  addPoint = (location, iconUrl) => {
    return(
      <Marker
        position={location}
        clickable={false}
        icon = {{
          url: iconUrl, // The url containing the icon file
          scaledSize: new this.props.google.maps.Size(20,20),
        }}
      />
    )
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
          {this.state.vehicleSelected && this.state.filterState ? this.state.filterPaths.map( (item) => this.addPoint({lat : item.path[0][1], lng: item.path[0][0]}, Start))  : <></>}
          {this.state.vehicleSelected && this.state.filterState ? this.state.filterPaths.map( (item) => this.addPoint({lat : item.path[item.path.length -1][1], lng: item.path[item.path.length -1][0]},End))  : <></>}
          {this.state.vehicleSelected && !this.state.filterState ? this.renderPath(this.state.vehicleContent.currentPath) : <></>}
          {this.state.vehicleSelected && !this.state.filterState ? this.addPoint({lat : this.state.vehicleContent.currentPath[0][1], lng: this.state.vehicleContent.currentPath[0][0]}, StartIcon) : <></>}
          {this.state.vehicleSelected && !this.state.filterState ? this.addMarker(this.state.vehicleContent) : <></>}
          {this.state.vehicleSelected ? <MapDatePicker render={this.getFilterPaths} onClose={this.closeDatePicker}/> : <></>}
          <MapCard isVisible={this.state.vehicleSelected && !this.state.filterState} onClose={this.closeMapCard} content={this.state.vehicleContent}/>
        </Map>
      </>
    );
  }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDHYWWkJ5p-Du3DKUuJgQoXUAcqyPmwjIQ',
  language: 'pt-br'
})(MapComponent);