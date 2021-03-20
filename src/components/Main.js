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
import AllShares from './AllShares/AllShares';
import rawDataByMarket from '../utils/rawDataByMarket';
import {KEY_NAME} from '../consts/keyName';
import {PERIOD_UNIT} from '../consts/common';
import {ROUTER_URL} from '../consts/rounter';

import yData from "../statics/year_result.json";
import qData from "../statics/quarter_result.json";
import siData from "../statics/share_infos.json";

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
  const [isInitDataLoaded,setIsInitDataLoaded] = useState(false);
  const [shareInfos, setShareInfos] = useState(null);

  /**
   * isInitDataLoaded의 장점: 데이터가 로드되기 전에 컴포넌트를 표시하지 않을거면
   * useEffect에서 로드할 필요없이, 외부에서 로드한 후 실행시켜도 된다.
   * 하지만, isInitDataLoaded가 있으면, 로드할 동안 특정 컴포넌트만 표시할 수 있게 되어, 유저빌리티가 높아진다.
   */
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
    setShareInfos(siData);
    setIsInitDataLoaded(true);
  }, [])

  return (
    <AlertContext.Provider value={{ alertState, setAlertState }}>
      <ShareDataContext.Provider value={{
        isInitDataLoaded, shareInfos,
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
          <Route path={ROUTER_URL.SEARCH} component={Search} exact />
          <Route path={ROUTER_URL.TARGETING} component={Targeting}  exact />
          <Route path={ROUTER_URL.MODEL_HIT} component={ModelHit}  exact />
          <Route path={ROUTER_URL.ALL_SHARES} component={AllShares}  exact />
        </main>
        <Footer />
      </ShareDataContext.Provider>
    </AlertContext.Provider>
  );
};

export default Main;
