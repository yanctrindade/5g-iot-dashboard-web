import React, {Component} from "react";
import NavBar from '../../../Components/NavBar/NavBar';
import MaintenceHistory from "../../../Components/Vehicle/MaintenceHistory";

class Maintence extends Component {
  render(){
  return (
    <NavBar pathname="/vehicles" content={<MaintenceHistory />}/>
    );
  }
}

export default Maintence;
