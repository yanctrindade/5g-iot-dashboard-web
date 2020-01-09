import React, {Component} from "react";
import NavBar from '../../../Components/NavBar/NavBar';
import AddVehicle from "../../../Components/Vehicle/AddnEditVehicle";

class AddVehicles extends Component {
  render(){
  return (
    <NavBar pathname="/vehicles" content={<AddVehicle />}/>
    );
  }
}

export default AddVehicles;
