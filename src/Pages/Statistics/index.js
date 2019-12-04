import React, {Component} from "react";
import NavBar from '../../Components/NavBar';
import Dashboard from './Dashboard';

class Statistics extends Component {

  render()
  {
    return (
      <NavBar pathname="/statistics" content={<Dashboard />}/>
    ); 
  }  
}

export default Statistics;
