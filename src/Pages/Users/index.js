import React from "react";
import NavBar from '../../Components/NavBar/NavBar'
import UsersComponent from "../../Components/Users/UsersComponent";


function Users(props) {
    return <NavBar pathname="/users" content={ <UsersComponent/>}/>
  }

export default Users;
