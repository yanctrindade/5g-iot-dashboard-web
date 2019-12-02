import React from "react";
import NavBar from '../../Components/NavBar';
import Dashboard from './Dashboard';

function Statistics(props) {
  const content = <Dashboard/>;
  return <NavBar pathname="/statistics" content={content}/> 
}

export default Statistics;
