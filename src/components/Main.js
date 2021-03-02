import React, { useState } from 'react';
import { BrowserRouter as Route, Switch} from 'react-router-dom';
import Header from './Share/Header';
import Footer from './Share/Footer';
import Alert from './Share/Alert';
import AlertContext from '../contexts/AlertContext';
import Targeting from './Targeting/Targeting';
import ModelHit from './ModelHit/ModelHit';

const Main = props => {
  const [alertState, setAlertState] = useState({
    eventType: '',
    eventMessage: '',
    eventCount: 0,
  });

  return (
    <AlertContext.Provider value={{ alertState, setAlertState }}>
      <Header />
      <Alert />
      <main className="blue-grey lighten-5">
        <Switch>
          <Route path="/contents/targeting" exact>
            <Targeting />
          </Route>
        </Switch>
        <Switch>
          <Route path="/contents/model-hit-list" exact>
            <ModelHit/>
          </Route>
        </Switch>
      </main>
      <Footer />
    </AlertContext.Provider>
  );
};

export default Main;
