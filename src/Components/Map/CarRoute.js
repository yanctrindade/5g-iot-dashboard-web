import React, { Component } from 'react';
import { Marker } from 'google-maps-react';
import RouteSection from './RouteSection';
import StopIcon from '../../Assets/StopIcon.png';
import StartIcon from '../../Assets/StartIcon.png';
import EndIcon from '../../Assets/end.png';

class CarRoute extends Component {

    constructor(props){
      super(props)
      this.state = {
        coords : []
      }
    }

    shouldComponentUpdate(nextProps){
      console.log("shouldUpdate : " + !(nextProps.vehicle === this.props.vehicle));
      console.log(this.props.vehicle);
      return !(nextProps.vehicle === this.props.vehicle)
    }
    

    drawRoute = (vehicle) => {
      let route = []
  
      //concatenate origin and stops with stops
      let coords  = JSON.parse(vehicle.route)
      console.log("coords:");
      console.log(coords);
  
      for(let i = 0; i < coords.length - 1; i++){
        let route_section = this.getRoute(coords[i], coords[i+1])
        console.log("route_section i - " + i + " coords: " + coords[i] + " " + coords[i+1])
        route.concat(route_section)
        console.log(route)
      }
      console.log("route")
      console.log(route)
      return this.renderRoute(route)
    }

    getRouteSectionsCoords = () => {
      const vehicle = this.props.vehicle;
      let route = JSON.parse(vehicle.route)
      let coords = []
      
      if (route.length >= 3){
        for(let i = 0; i < route.length - 1; i++){
          coords.push({start : route[i], end : route[i+1]})
        }
      }

      return coords
    }

    getStopsLocations = (route) => {
      let stops = route.slice()
      console.log("route -> " + stops)
      stops.pop()
      console.log("pop -> " + stops)
      stops.shift()
      console.log("shift -> " + stops)

      return stops
    }

    getStartLocation = (route) => {
      return route[0]
    }

    getEndLocation = (route) => {
      return route[route.length - 1]
    }

    renderMarkers = () => {
      const vehicle = this.props.vehicle;
      let route = JSON.parse(vehicle.route)

      if (route < 3){
        return (<></>);
      }
      else{
        const stops = this.getStopsLocations(route)
        const start = this.getStartLocation(route)
        const end = this.getEndLocation(route)
        console.log("stops ----> " + stops)
        return(
          <>
          <Marker
            google={this.props.google}
            map={this.props.map}
            key={101}
            position={{"lat": start[1], "lng": start[0]}}
            icon = {{
              url: StartIcon, // url
              scaledSize: new this.props.google.maps.Size(30,30), // scaled size
            }}
          />
          <Marker
            google={this.props.google}
            map={this.props.map}
            key={102}
            position={{"lat": end[1], "lng": end[0]}}
            icon = {{
              url: EndIcon, // url
              scaledSize: new this.props.google.maps.Size(30,30), // scaled size
            }}
          />
          {
            stops.map(
              (stop, index) =>
              <Marker
                google={this.props.google}
                map={this.props.map}
                key={index}
                position={{"lat": stop[1], "lng": stop[0]}}
                icon = {{
                  url: StopIcon, // url
                  scaledSize: new this.props.google.maps.Size(30,30), // scaled size
                }}
              />
            )
          }
          </>
        )
      }
    }

    render(){
      const route_sections = this.getRouteSectionsCoords()
      return (
        <>
          {route_sections.map((route, index) => 
            <RouteSection
              key={index}
              key_value={index} 
              start={route.start} 
              end={route.end}
              {...this.props}
            />)
          }
          {this.renderMarkers()}
        </>
      );
    }
}

export default CarRoute;