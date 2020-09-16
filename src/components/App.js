import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import Login from './Login';
import Main from './Main';

const App = () => (
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

export default App;
