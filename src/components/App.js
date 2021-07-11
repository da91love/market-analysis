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
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
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
