import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import Login from './Login';
import Main from './Main';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const App = () => {

  return (
    <AppContext.Provider value={{}}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={Login} exact/>
          <Route path="/contents" component={Main}/>
        </Switch>
      </Router>
    </AppContext.Provider>
  )
};

export default App;
