import React, { Component } from 'react';
import { Map, Polyline, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import MapCard from './MapCard';
import moment from "moment";
import CarIcon from '../../Assets/CarPin.png'
import StartIcon from '../../Assets/StartIcon.png'
import Start from '../../Assets/start.png'
import End from '../../Assets/end.png'
import MapDatePicker from  './MapDatePicker'
import tinygradient from 'tinygradient';
import auth from "../../Components/Login/Auth";
import API from "../../api/fiware";

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
                  gradientColors:[],
                  infoMarker: {},
                  infoMarkerVisible: false,
                  infoPathVisible: false,
                  infoPathPosition: {lat: 0, lng: 0},
                  infoPathTime: {}
                };
  }

  componentDidMount() {
    const headers = {
      headers : {         
                  'fiware-servicepath' : '/',
                  'fiware-service' : 'openiot'
                }
    }

    API.get(`v2/entities/?type=Car&options=keyValues`, headers)
    .then((res)=>{
      console.log("GET Done")
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
    this.intervalId = setInterval(() => this.updateMarkers(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  updateMarkers = () => {
    const headers = {
      headers : {         
                  'fiware-servicepath' : '/',
                  'fiware-service' : 'openiot'
                }
    }

    API.get(`/v2/entities/?type=Car&options=keyValues`, headers)
    .then((res)=>{
      this.setState({markers: this.filterMarkers(res.data)});
      console.log(this.state.markers);
    }).catch((err)=>{
      console.log(err);
    })

    // axios.get('/database.json')
    // .then((res)=>{
    //   this.setState({markers: this.filterMarkers(res.data)});
    // }).catch((err)=>{
    //   console.log(err);
    // })
  }

  filterMarkers = (data) => {
    if(auth.isAdmin()) 
      return data
    else  
      return data.filter(item => (item.isPublic || auth.getUserPlate() === item.plate ))
  }

  clickMarker = (props, marker, e) => {
    this.setState(
      { vehicleContent: marker.data,
        vehicleSelected: true,
        infoMarkerVisible: false
      }
    )    
  }

  closeDatePicker = () => {
    this.setState({
      infoPathVisible: false,
      filterState: false
    })   
  }

  closeMapCard = () => this.setState({vehicleSelected : false, filterState: false})

  renderPath = (coords, key, color, startTime, endTime) => {
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
          onMouseover = {() => this.onMouseOverPolyline(coords, startTime, endTime)}
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
    filteredPaths = filteredPaths.map((item,index) => ({'path':item.coordinates, 'color': gradient[index], 'startTime': item.startTime, 'endTime': item.endTime}))

    // Sets the state with the filtered paths and sets filterstate to true
    this.setState({filterPaths: filteredPaths, filterState: true})
  }

  transformLocation = (location) => {
    const coords = location.coordinates;
    return {"lat": coords[0], "lng": coords[1]}
  };

  addMarker = (marker) => {
    return(
      <Marker
        key={marker.id}
        position={this.transformLocation(marker.location)}
        name={marker.plate}
        data={marker}
        onClick={this.clickMarker}
        onMouseover = {this.onMouseOverMarker}
        icon = {{
          url: CarIcon, // url
          scaledSize: new this.props.google.maps.Size(40,40), // scaled size
          //origin: new Point(0,0), // origin
          //anchor: new Point(0, 0) // anchor
        }}
      />
    )
  }

  onMouseOverMarker = (prop, marker) => {
    if (!this.state.vehicleSelected){
      if (this.state.infoMarker.name !== marker.name){
        this.setState({infoMarker : marker, infoMarkerVisible : true})
        //console.log(marker)
      }
  
      if (this.state.infoMarkerVisible !== true){
        this.setState({infoMarkerVisible : true})
      }
    }
  }

  onMouseOverPolyline = (coords, startTime, endTime) => {

    const newCoords = coords[Math.round(coords.length/2)]

    if (this.state.filterState && this.state.infoPathPosition.lat !== newCoords.lat && this.state.infoPathPosition.lng !== newCoords.lng){            
      this.setState({ 
          infoPathPosition: newCoords,
          infoPathVisible: true,
          infoPathTime: {'startTime': startTime, 'endTime': endTime}
      });
    }

    if (this.state.filterState && this.state.infoPathVisible !== true){
      this.setState({infoPathVisible : true})
    }
  }

  addPoint = (key, location, iconUrl) => {
    return(
      <Marker
        key={key}
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
          {this.state.vehicleSelected && this.state.filterState ? this.state.filterPaths.map( (item, index) => this.renderPath(item.path, index, item.color, item.startTime, item.endTime)) : <></>}
          {this.state.vehicleSelected && this.state.filterState ? this.state.filterPaths.map( (item, index) => this.addPoint(index, {lat : item.path[0][1], lng: item.path[0][0]}, Start))  : <></>}
          {this.state.vehicleSelected && this.state.filterState ? this.state.filterPaths.map( (item, index) => this.addPoint(index, {lat : item.path[item.path.length -1][1], lng: item.path[item.path.length -1][0]},End))  : <></>}
          {this.state.vehicleSelected && !this.state.filterState ? this.renderPath(this.state.vehicleContent.currentPath) : <></>}
          {this.state.vehicleSelected && !this.state.filterState ? this.addPoint(0, {lat : this.state.vehicleContent.currentPath[0][1], lng: this.state.vehicleContent.currentPath[0][0]}, StartIcon) : <></>}
          {this.state.vehicleSelected && !this.state.filterState ? this.addMarker(this.state.vehicleContent) : <></>}
          {this.state.vehicleSelected ? <MapDatePicker render={this.getFilterPaths} onClose={this.closeDatePicker}/> : <></>}
          <MapCard isVisible={this.state.vehicleSelected && !this.state.filterState} onClose={this.closeMapCard} content={this.state.vehicleContent}/>

          {/* All Vehicles infoview */}
          <InfoWindow
            marker={this.state.infoMarker}
            visible={this.state.infoMarkerVisible}
            onClose={()=> this.setState({infoMarkerVisible : false})}>
              <div>
                <h2>{this.state.infoMarker.name}</h2>
                <h1>{this.state.infoMarker.data === undefined ? "" : this.state.infoMarker.data.model}</h1>
              </div>
          </InfoWindow>

          {/* Vehicle Paths infoview */}
          <InfoWindow
            position={this.state.infoPathPosition}
            visible={this.state.infoPathVisible}
            onClose={()=> this.setState({infoPathVisible : false})}>
              <div>
                <h2>{"Inicio da rota: " + new Date(this.state.infoPathTime.startTime).toLocaleDateString() + " às " + new Date(this.state.infoPathTime.startTime).toLocaleTimeString()}</h2>
                <h2>{"Fim da rota: " + new Date(this.state.infoPathTime.endTime).toLocaleDateString() + " às " + new Date(this.state.infoPathTime.endTime).toLocaleTimeString()}</h2>
              </div>
          </InfoWindow>
          
        </Map>
      </>
    );
  }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDHYWWkJ5p-Du3DKUuJgQoXUAcqyPmwjIQ',
  language: 'pt-br'
})(MapComponent);