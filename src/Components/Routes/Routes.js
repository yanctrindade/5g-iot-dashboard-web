import React from "react";
import {Form} from 'antd';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import Map from "../../Pages/Map/";
import Vehicles from "../../Pages/Vehicles/";
import Statistics from "../../Pages/Statistics/";
import Login from "../../Pages/Login/";
import Recover from "../../Pages/Recover/";
import Register from "../../Pages/Register/";
import Agreement from "../../Pages/Agreement/";
import EditVehicles from "../../Pages/Vehicles/EditVehicles";
import AddVehicles from "../../Pages/Vehicles/AddVehicles";
import auth from "../Login/Auth";
import NotFound from "./NotFound";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render={props =>
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
)

const Routes = () => (
  <ConfigProvider locale={ptBR}>
    <BrowserRouter>
        <Switch> 
            <Route exact path='/' component={Form.create()(Login)}/>   
            <Route exact path='/register' component={Form.create({ name: 'register' })(Register)}/>   
            <Route exact path='/recover' component={Form.create()(Recover)}/>
            <Route exact path='/agreement' component={Agreement}/>        
            <PrivateRoute exact path="/map" component={Map} />
            <PrivateRoute exact path="/vehicles/edit" component={EditVehicles} />
            <PrivateRoute exact path="/vehicles/add" component={AddVehicles} />
            <PrivateRoute exact path="/vehicles" component={Vehicles} />
            <PrivateRoute exact path="/statistics" component={Statistics} />
            <Route exact path='*' component={NotFound}/> 
        </Switch>
    </BrowserRouter>
  </ConfigProvider>
)

export default Routes;