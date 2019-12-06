import React, {Component} from "react";
import NavBar from '../../Components/NavBar/NavBar';
import Dashboard from '../../Components/Statistics/Dashboard';

class Statistics extends Component {

  render()
  {
    return (
      <NavBar pathname="/statistics" content={<Dashboard />}/>
    ); 
  }  
}

export default Statistics;
