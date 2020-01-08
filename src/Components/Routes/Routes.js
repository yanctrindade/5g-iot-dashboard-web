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
import auth from "../Login/Auth";

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
            <PrivateRoute path="/map" component={Map} />
            <PrivateRoute path="/vehicles" component={Vehicles} />
            <PrivateRoute path="/statistics" component={Statistics} />
            <Route exact path='*' component={() => "404 - Not Found"}/>   
        </Switch>
    </BrowserRouter>
  </ConfigProvider>
)
// TO DO 404 page
export default Routes;