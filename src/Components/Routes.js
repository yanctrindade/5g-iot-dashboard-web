import React from "react"
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import MainSider from "./MainSider";
import { isAuthenticated } from "./Auth";

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
            <Route exact path='/' component={() => <h1>Login</h1>}/>        
            <PrivateRoute path="/mainSider" component={() => <MainSider/>} />
        </Switch>
    </BrowserRouter>
)

export default Routes;