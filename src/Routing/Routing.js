import React from "react";
import { Route, Switch } from 'react-router';
import RegisterPage from '../containers/RegisterPage';
import VirtualCardPage from "../containers/VirtualCardPage";



const Routing = () => {
    return (
        <Switch>
            <Route path='/' component={RegisterPage} exact />
            <Route path='/virtualcard/:id' component={VirtualCardPage} />
        </Switch>
    )

}

export default Routing;