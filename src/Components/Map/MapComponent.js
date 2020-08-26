import React, { Component } from 'react';
import { Map, Polyline, Marker, GoogleApiWrapper, InfoWindow, Circle } from 'google-maps-react';
import MapCard from './MapCard';
import CarIcon from '../../Assets/CarPin.png'
import StopIcon from '../../Assets/StopIcon.png'
import auth from "../../Components/Login/Auth";
import API from "../../api/fiware";
import CarPin from './CarPin';
import CarRoute from './CarRoute';

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

  transformLocation = (location) => {
    const coords = location.coordinates;
    return {"lat": coords[1], "lng": coords[0]}
  };

  addMarker = (marker) => {
    
    if (marker.location.coordinates[0] === 0 && marker.location.coordinates[1] === 0){
      return (<></>);
    }

    return(
      <CarPin
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

  addStop = (stop) => {
    return(
      <Marker
        key={stop.id}
        position={this.transformLocation(stop.location)}
        icon = {{
          url: StopIcon, // url
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
        console.log("marker")
        console.log(marker)
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

  renderCircle = (location, radius) => {
    return <Circle
      defaultCenter={{
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng)
      }}
      radius={radius}
      options= {{
        strokeColor: "#ff0000"
      }}
    />
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
          {!this.state.vehicleSelected ? this.state.markers.map( marker => this.addMarker(marker)) : this.addMarker(this.state.vehicleContent)}
          {this.state.vehicleSelected ? <CarRoute isVisible = {this.state.vehicleSelected} vehicle={this.state.vehicleContent}/> : <></>}
          
          <MapCard isVisible={this.state.vehicleSelected && !this.state.filterState} onClose={this.closeMapCard} content={this.state.vehicleContent}/>

          {/* All Vehicles infoview */}
          <InfoWindow
            marker={this.state.infoMarker}
            visible={this.state.infoMarkerVisible}
            onClose={()=> this.setState({infoMarkerVisible : false})}>
              <div>
                <h1>{this.state.infoMarker.name}</h1>
                <p>{this.state.infoMarker.data === undefined ? "" : this.state.infoMarker.data.carModel}</p>
              </div>
          </InfoWindow>
          
        </Map>
      </>
    );
  }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB302SSSQnK6VUvQs_CBNDNy87Ii2J_gQI',
  language: 'pt-br'
})(MapComponent);