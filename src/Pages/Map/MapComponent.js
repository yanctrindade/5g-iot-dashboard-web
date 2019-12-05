import React, { Component } from 'react';
import { Map, Polyline, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapCard from './MapCard';
import axios from 'axios';
import moment from "moment";
import CarIcon from '../../Assets/CarPin.png'
import StartIcon from '../../Assets/StartIcon.png'
import Start from '../../Assets/start.png'
import End from '../../Assets/end.png'
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

  renderFilterPath = (coords, key, color) => {
    coords = coords.map(e => ({lat : e[1], lng: e[0]}))
    return(
        <Polyline
          key = {key+2000}
          path={coords}
          strokeColor={color}
          strokeOpacity={0.5}
          strokeWeight={4} 
        />
    )
  }

  setFilterPaths = (startDate,endDate) => {
    const paths = this.state.vehicleContent.paths

    // gradient
    let gradient = tinygradient('red', 'green', 'blue');
    if(paths.length > 1){
      gradient = gradient.rgb(paths.length).map(color => color.toHexString())
    }else{
      gradient = ['#03fc28']
    }

    startDate = startDate.toDate()
    endDate = endDate.toDate()
    let paths_filtered = paths.filter(item => {
      let startMoment = moment(item.startTime,'YYYY-MM-DDTHH:mm:ss').toDate()
      let endMoment = moment(item.endTime,'YYYY-MM-DDTHH:mm:ss').toDate()

      return startMoment >= startDate && endMoment <= endDate;
    })

    paths_filtered = paths_filtered.map((item,index) => ({'path':item.coordinates, 'color': gradient[index]}))

    this.setState({filterPaths: paths_filtered, filterState: true})
  }

  renderStart = (coords) => {
    let startPosition = {lat : coords[0][1], lng: coords[0][0]}
    return <Marker
              position={startPosition}
              icon = {{
                url: StartIcon, // url
                scaledSize: new this.props.google.maps.Size(20,20), // scaled size
              }}
              clickable={false}
            />
  }

  closeDatePicker = () => {
    this.setState({filterState: false})   
  }

  clickMarker = (props, marker, e) => {
    this.setState(
      { vehicleContent: marker.data,
        vehicleSelected: true}
    )    
  }

  closeMapCard = () => this.setState({vehicleSelected : false, filterState: false})
  
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

  addPoint = (key, path, type) => {
    let location
    let url

    if(type === 'start'){
      location = {lat : path[0][1], lng: path[0][0]}
      url = Start
    }else{
      location = {lat : path[path.length -1][1], lng: path[path.length -1][0]}
      url = End
    }

    return(
      <Marker
        key={key}
        position={location}
        icon = {{
          url: url, // url
          scaledSize: new this.props.google.maps.Size(20,20), // scaled size
          //origin: new Point(0,0), // origin
          //anchor: new Point(0, 0) // anchor
        }}
      />
    )
  }

  componentDidMount() {
    axios.get('./database.json')
    .then((res)=>{
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
          {this.state.vehicleSelected && this.state.filterState ? this.state.filterPaths.map( (item, index) => this.renderFilterPath(item.path, index, item.color)) : <></>}
          {this.state.vehicleSelected && this.state.filterState ? this.state.filterPaths.map( (item,index) => this.addPoint(index,item.path,'start'))  : <></>}
          {this.state.vehicleSelected && this.state.filterState ? this.state.filterPaths.map( (item,index) => this.addPoint(index,item.path,'end'))  : <></>}
          {this.state.vehicleSelected && !this.state.filterState ? this.renderPath(this.state.vehicleContent.currentPath) : <></>}
          {this.state.vehicleSelected && !this.state.filterState ? this.renderStart(this.state.vehicleContent.currentPath) : <></>}
          {this.state.vehicleSelected && !this.state.filterState ? this.addMarker(this.state.vehicleContent) : <></>}
          {this.state.vehicleSelected ? <MapDatePicker render={this.setFilterPaths} onClose={this.closeDatePicker}/> : <></>}
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