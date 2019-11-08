import React from "react";
import NavBar from '../../Components/NavBar'
import MapComponent from "./MapComponent";

function Map(props) {
    const content = <MapComponent/>;
    return <NavBar pathname="/map" content={content}/>
  }

export default Map;
