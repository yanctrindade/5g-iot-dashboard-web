import React from "react";
import auth from "../../Components/Login/Auth";
import NavBar from '../../Components/NavBar/NavBar'
import DriverComponent from "../../Components/Driver/Driver";
import DriverManager from "../../Components/Driver/DriverManager";


function Driver(props) {
    const content = auth.isAdmin() ? <DriverManager/> : <DriverComponent/>;
    return <NavBar pathname="/driver" content={content}/>
  }

export default Driver;
