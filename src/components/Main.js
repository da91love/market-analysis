import React, { useState } from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
import Header from './Share/Header';
import Footer from './Share/Footer';
import Alert from './Share/Alert';
import AlertContext from '../contexts/AlertContext';
import Targeting from './Targeting/Targeting';

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
        <Route path="/targeting" exact>
          <Targeting />
        </Route>
      </main>
      <Footer />
    </AlertContext.Provider>
  );
};

export default Main;
