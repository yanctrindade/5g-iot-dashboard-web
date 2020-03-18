import React, { Component } from 'react';
import { Polyline } from 'google-maps-react';
import axios from 'axios';

class RouteSection extends Component {

    constructor(props){
        super(props)
        this.state = {
            coords : []
        }
    }

    componentDidMount(){
        this.getRoute(this.props.start, this.props.end);
    }

    getRoute = (start, end) => {
        console.log("start : " + start[0]);
        console.log("end : " + end[0]);
        const params = {
          params : {
            'api_key' : '5b3ce3597851110001cf6248588f0970a97d457493639af7cb254012',
            'start' : start[0] + ',' + start[1],
            'end' : end[0] + ',' + end[1]
          }
        }
        let coords = [];
        axios('https://api.openrouteservice.org/v2/directions/driving-car', params)
        .then((res)=>{

          coords = res.data.features[0]["geometry"]["coordinates"]
          this.setState({coords : coords})

        }).catch((err)=>{
          console.log("Error")
          console.log(err);
        })
      }

    render(){

        if(this.state.coords.length !== 0){
            const coords = this.state.coords.map(e => ({lat : e[1], lng: e[0]}))
            const color = "#2ab8fa"
            console.log("State Coords " + this.props.key_value)
            console.log(coords)
            return (
                <Polyline
                    path={coords}
                    strokeColor={color}
                    strokeOpacity={0.9}
                    strokeWeight={6}
                    {...this.props}
                />
            )
        }else{
            return <></>
        }
    }
}

export default RouteSection;