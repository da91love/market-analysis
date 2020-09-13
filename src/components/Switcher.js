import React, { useState } from 'react';
import AppContext from '../contexts/AppContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Main from './Main';

const Switcher = () => {

    return (
        <AppContext.Provider value={{}}>
            <Router>
                <Switch>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                </Switch>
                <Switch>
                    <Route path="/contents">
                        <Main />
                    </Route>
                </Switch>
            </Router>
        </AppContext.Provider>
    );
};

export default Switcher;
