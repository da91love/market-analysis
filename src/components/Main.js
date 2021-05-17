import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import _ from "lodash";

import Header from './Share/Header';
import Navigator from './Share/Navigator';
import CompareTgContext from '../contexts/CompareTgContext';
import ShareDataContext from '../contexts/ShareDataContext';
import ShareSearch from './ShareSearch/ShareSearch';
import MarketSearch from './MarketSearch/MarketSearch';
import Target from './Target/Target';
import Compare from './Compare/Compare';
import ModelHit from './ModelHit/ModelHit';
import AllShares from './AllShares/AllShares';
import CTest from './CTest/CTest';
import rawDataByMarket from '../utils/rawDataByMarket';
import {KEY_NAME} from '../consts/keyName';
import {PERIOD_UNIT} from '../consts/common';
import {ROUTER_URL} from '../consts/router';
import SyncStatus from '../utils/SyncStatus';
import { STRG_KEY_NAME } from "../consts/localStorage";

import yData from "../statics/year_result.json";
import qData from "../statics/quarter_result.json";
import siData from "../statics/share_infos.json";

const Main = (props) => {
  const [yearRawData,setYearRawData] = useState(null);
  const [quarterRawData,setQuarterRawData] = useState(null);
  const [yearRawDataByShare,setYearRawDataByShare] = useState(null);
  const [quarterRawDataByShare,setQuarterRawDataByShare] = useState(null);
  const [yearRawDataByMrk,setYearRawDataByMrk] = useState(null);
  const [quarterRawDataByMrk,setQuarterRawDataByMrk] = useState(null);
  const [compareTg, setCompareTg] = useState([]);
  const [bookMark, setBookMark] = useState([]);
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


    setCompareTg(SyncStatus.get({storageKey: STRG_KEY_NAME.COMPARE}) || []);
    setBookMark(SyncStatus.get({storageKey: STRG_KEY_NAME.BOOKMARK}) || []);
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
    <CompareTgContext.Provider value={{ compareTg, setCompareTg, bookMark, setBookMark}}>
    <ShareDataContext.Provider value={{
      isInitDataLoaded, shareInfos,
      yearRawData, setYearRawData, 
      quarterRawData, setQuarterRawData,
      yearRawDataByShare, setYearRawDataByShare,
      quarterRawDataByShare, setQuarterRawDataByShare,
      yearRawDataByMrk, setYearRawDataByMrk,
      quarterRawDataByMrk, setQuarterRawDataByMrk
    }}>
      <Header rawDataByShare={quarterRawDataByShare} rawDataByMrk={quarterRawDataByMrk}/>
      <Navigator />
      <main className="blue-grey lighten-5">
        <Route path={`${ROUTER_URL.SHARE_SEARCH}/:shareCode?/:shareName?`} component={ShareSearch} exact />
        <Route path={`${ROUTER_URL.MARKET_SEARCH}/:marketCode?/:marketName?`} component={MarketSearch} exact />
        <Route path={`${ROUTER_URL.TARGET}`} component={Target}  exact />
        <Route path={`${ROUTER_URL.MODEL_HIT}`} component={ModelHit}  exact />
        <Route path={`${ROUTER_URL.ALL_SHARES}`} component={AllShares}  exact />
        <Route path={`${ROUTER_URL.COMPARE}`} component={Compare}  exact />
        <Route path={'/contents/test'} component={CTest}  exact />
      </main>
    </ShareDataContext.Provider>
    </CompareTgContext.Provider>
  );
};

export default Main;
