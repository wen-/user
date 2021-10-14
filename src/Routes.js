import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from './view/home';
import Test from './view/test';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/test">
                    <Test />
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;
