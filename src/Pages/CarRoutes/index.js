import React from "react";
import NavBar from '../../Components/NavBar/NavBar'
import DriverComponent from "../../Components/Driver/Driver";

function CarRoutes(props) {
    return <NavBar pathname="/vehicles" content={<DriverComponent/>}/>
  }

export default CarRoutes;
