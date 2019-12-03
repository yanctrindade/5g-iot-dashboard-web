import React from "react";
import NavBar from '../../Components/NavBar';
import Dashboard from './Dashboard';
import VehicleData from '../../FakeData/DataTableData'

function Statistics(props) {
  const content = <Dashboard vehicleData={VehicleData}/>;
  return <NavBar pathname="/statistics" content={content}/> 
}

export default Statistics;
