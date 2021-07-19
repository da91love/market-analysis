import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import AuthContext from '../contexts/AuthContext';
import {ROUTER_URL} from '../consts/router';
import Login from './Login';
import Main from './Main';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const App = () => {
  const [userId, setUserId] = useState(null);
  const [authId, setAuthId] = useState(null);

  return (
    <AuthContext.Provider value={{ authId, setAuthId, userId, setUserId }}>
    <AppContext.Provider value={{}}>
      <Router history={history}>
        <Switch>
          <Route path={ROUTER_URL.LOGIN} component={Login} exact/>
          <Route path={ROUTER_URL.CONTENTS} component={Main}/>
        </Switch>
      </Router>
    </AppContext.Provider>
    </AuthContext.Provider>

  )
};

export default App;
