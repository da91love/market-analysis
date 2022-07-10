import React, { useState, useEffect, useContext } from 'react';
import { Route } from 'react-router-dom';
import _ from "lodash";
import axios from 'axios';

import Header from './Share/Header';
import Navigator from './Share/Navigator';
import AuthContext from '../contexts/AuthContext';
import CompareTgContext from '../contexts/CompareTgContext';
import ShareDataContext from '../contexts/ShareDataContext';
import ShareSearch from './ShareSearch/ShareSearch';
import MarketSearch from './MarketSearch/MarketSearch';
import Target from './Target/Target';
import Compare from './Compare/Compare';
import ModelHit from './ModelHit/ModelHit';
import AllShares from './AllShares/AllShares';
import MarketSummary from './MarketSummary/MarketSummary';
import CTest from './CTest/CTest';
import {ROUTER_URL} from '../consts/router';
import {API} from '../consts/api';
import SyncStatus from '../utils/SyncStatus';
import {STRG_KEY_NAME} from "../consts/localStorage";

const Main = (props) => {
  const {authId} = useContext(AuthContext);
  const [quarterRawDataByMrk, setQuarterRawDataByMrk] = useState(null);
  const [compareTg, setCompareTg] = useState([]);
  const [bookMark, setBookMark] = useState([]);
  const [country, setCountry] = useState('ko');
  const [isInitDataLoaded,setIsInitDataLoaded] = useState(false);

  /**
   * isInitDataLoaded의 장점: 데이터가 로드되기 전에 컴포넌트를 표시하지 않을거면
   * useEffect에서 로드할 필요없이, 외부에서 로드한 후 실행시켜도 된다.
   * 하지만, isInitDataLoaded가 있으면, 로드할 동안 특정 컴포넌트만 표시할 수 있게 되어, 유저빌리티가 높아진다.
   */
  useEffect(() => {
    setCompareTg(SyncStatus.get({storageKey: STRG_KEY_NAME.COMPARE}) || []);
    setIsInitDataLoaded(true);
  }, [])

  useEffect(() => {
    // get bookmark info
    if (authId) {
      axios({
        method: API.GET_BOOKMARK.METHOD,
        url: API.GET_BOOKMARK.URL,
        headers: {
          authId: authId,
        }
      })
      .then(res => {
        if(res.data.status === "success" ) {
          setBookMark(res.data.payload.value);
        } else {
          // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
        }
      })  
    } else {
      setBookMark([]);
    }

  }, [authId])

  return (
    <CompareTgContext.Provider value={{ compareTg, setCompareTg, bookMark, setBookMark }}>
    <ShareDataContext.Provider value={{
      isInitDataLoaded, country, quarterRawDataByMrk, setQuarterRawDataByMrk
    }}>
      <Header/>
      <Navigator />
      <main className="blue-grey lighten-5">
        <Route path={`${ROUTER_URL.SHARE_SEARCH}/:shareCode?/:shareName?`} component={ShareSearch} exact />
        <Route path={`${ROUTER_URL.MARKET_SEARCH}/:marketCode?/:marketName?`} component={MarketSearch} exact />
        <Route path={`${ROUTER_URL.TARGET}`} component={Target}  exact />
        <Route path={`${ROUTER_URL.MODEL_HIT}`} component={ModelHit}  exact />
        <Route path={`${ROUTER_URL.ALL_SHARES}`} component={AllShares}  exact />
        <Route path={`${ROUTER_URL.COMPARE}`} component={Compare}  exact />
        <Route path={`${ROUTER_URL.MARKET_SUMMARY}`} component={MarketSummary}  exact />
        <Route path={'/contents/test'} component={CTest}  exact />
      </main>
    </ShareDataContext.Provider>
    </CompareTgContext.Provider>
  );
};

export default Main;
