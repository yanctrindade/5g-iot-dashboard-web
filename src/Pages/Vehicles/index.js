import React, {Component} from "react";
import NavBar from '../../Components/NavBar';
import DataTable from "../../Components/DataTable.js";

class Vehicles extends Component {
  render(){
  return (
    <NavBar pathname="/vehicles" content={<DataTable />}/>
    );
  }
}

export default Vehicles;
