import React from "react";
import NavBar from '../../Components/NavBar/NavBar'
import MapComponent from "../../Components/Map/MapComponent";

function Map(props) {
    const content = <MapComponent/>;
    return <NavBar pathname="/map" content={content}/>
  }

export default Map;
