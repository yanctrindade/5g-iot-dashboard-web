import React, {Component} from "react";
import NavBar from '../../Components/NavBar/NavBar';
import EditVehicle from "../../Components/Vehicle/AddnEditVehicle";

class EditVehicles extends Component {
  render(){
  return (
    <NavBar pathname="/vehicles" content={<EditVehicle addOrEdit={false}/>}/>
    );
  }
}

export default EditVehicles;
