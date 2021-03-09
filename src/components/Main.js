import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import _ from "lodash";

import Header from './Share/Header';
import Footer from './Share/Footer';
import Alert from './Share/Alert';
import AlertContext from '../contexts/AlertContext';
import ShareDataContext from '../contexts/ShareDataContext';
import Search from './Search/Search';
import Targeting from './Targeting/Targeting';
import ModelHit from './ModelHit/ModelHit';
import rawDataByMarket from '../utils/rawDataByMarket';
import {KEY_NAME} from '../consts/keyName';
import {PERIOD_UNIT} from '../consts/common';

import yData from "../statics/year_result.json";
import qData from "../statics/quarter_result.json";

const Main = (props) => {
  const [alertState, setAlertState] = useState({
    eventType: '',
    eventMessage: '',
    eventCount: 0,
  });
  const [yearRawData,setYearRawData] = useState(null);
  const [quarterRawData,setQuarterRawData] = useState(null);
  const [yearRawDataByShare,setYearRawDataByShare] = useState(null);
  const [quarterRawDataByShare,setQuarterRawDataByShare] = useState(null);
  const [yearRawDataByMrk,setYearRawDataByMrk] = useState(null);
  const [quarterRawDataByMrk,setQuarterRawDataByMrk] = useState(null);

  useEffect(() => {
    // Get share data from DB(temporary from json)
    let yearDataByGroup = _.groupBy(yData, v => v[KEY_NAME.SHARE_CODE]);
    let quarterDataByGroup = _.groupBy(qData, v => v[KEY_NAME.SHARE_CODE]);

    // sortBy
    yearDataByGroup = _.forEach(yearDataByGroup, (v, k) => {
      yearDataByGroup[k] = _.sortBy(v, o => o[KEY_NAME.PERIOD]);
    });

    quarterDataByGroup = _.forEach(quarterDataByGroup, (v, k) => {
      quarterDataByGroup[k] = _.sortBy(v, o => o[KEY_NAME.PERIOD]);
    });

    setYearRawData(yData);
    setQuarterRawData(qData);
    setYearRawDataByShare(yearDataByGroup);
    setQuarterRawDataByShare(quarterDataByGroup);
    setYearRawDataByMrk(rawDataByMarket(PERIOD_UNIT.YEAR, yData));
    setQuarterRawDataByMrk(rawDataByMarket(PERIOD_UNIT.QUARTER, qData));
  }, [])

  return (
    <AlertContext.Provider value={{ alertState, setAlertState }}>
      <ShareDataContext.Provider value={{
      yearRawData, setYearRawData, 
      quarterRawData, setQuarterRawData,
      yearRawDataByShare, setYearRawDataByShare,
      quarterRawDataByShare, setQuarterRawDataByShare,
      yearRawDataByMrk, setYearRawDataByMrk,
      quarterRawDataByMrk, setQuarterRawDataByMrk
      }}>
        <Header quarterRawData={quarterRawData}/>
        <Alert />
        <main className="blue-grey lighten-5">
          <Route path="/contents/search" component={Search} exact />
          <Route path="/contents/targeting" component={Targeting}  exact />
          <Route path="/contents/model-hit-list" component={ModelHit}  exact />
        </main>
        <Footer />
      </ShareDataContext.Provider>
    </AlertContext.Provider>
  );
};

export default Main;
