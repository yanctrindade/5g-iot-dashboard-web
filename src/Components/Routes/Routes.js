import React from "react";
import {Form} from 'antd';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Map from "../../Pages/Map/";
import Vehicles from "../../Pages/Vehicles/";
import Statistics from "../../Pages/Statistics/";
import Login from "../../Pages/Login/";
import Recover from "../../Pages/Recover/";
import Register from "../../Pages/Register/";
import Agreement from "../../Pages/Agreement/";
import { isAuthenticated } from "../Login/Auth";
import EditVehicles from "../../Pages/Vehicles/EditVehicles";
import AddVehicles from "../../Pages/Vehicles/AddVehicles";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Form.create()(Login)}/>   
            <Route exact path='/register' component={Form.create({ name: 'register' })(Register)}/>   
            <Route exact path='/recover' component={Form.create()(Recover)}/>
            <Route exact path='/agreement' component={Agreement}/>        
            <PrivateRoute path="/map" component={Map} />
            <PrivateRoute path="/vehicles/edit" component={Form.create()(EditVehicles)} />
            <PrivateRoute path="/vehicles/add" component={Form.create()(AddVehicles)} />
            <PrivateRoute path="/vehicles" component={Vehicles} />
            <PrivateRoute path="/statistics" component={Statistics} />
        </Switch>
    </BrowserRouter>
)

export default Routes;