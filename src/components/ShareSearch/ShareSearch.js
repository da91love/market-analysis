import React, { useState, useContext, useEffect } from 'react';
import {MDBContainer, MDBIcon} from 'mdbreact';
import _ from "lodash";
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import ModelHitTable from "./ModelHitTable";
import FinancialSummary from "./FinancialSummary";
import IndicatorGraph from "./IndicatorGraph";
import Valuation from "./Valuation";
import ShareDataContext from "../../contexts/ShareDataContext";
import CompareTgContext from "../../contexts/CompareTgContext";
import AuthContext from "../../contexts/AuthContext";
import SyncStatus from '../../utils/SyncStatus';
import RawDataFilter from '../../utils/RawDataFilter';
import { PERIOD_UNIT, DEFAULT_SHARE_INFO } from '../../consts/common';
import { KEY_NAME, OTHER_KEY_NAME } from '../../consts/keyName';
import { STRG_KEY_NAME } from "../../consts/localStorage";
import { EXTERNAL_URL } from '../../consts/common';
import { ROUTER_URL } from '../../consts/router';
import { API } from '../../consts/api';
import { SUCCESS, ERROR } from "../../consts/alert";
import { MSG } from "../../consts/message";
import naverBtnImg from '../../statics/image/naver_btn_green.png';
import googleBtnImg from '../../statics/image/googe_btn.png';

// Temp: import json
const ShareSearch = () => {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const {authId} = useContext(AuthContext);
  const shareInfoFromExtnl = location.state || (params[KEY_NAME.SHARE_CODE]?params:undefined); // Search page gets locations or params
  const [yearRawDataByShare, setYearRawDataByShare] = useState();
  const [quarterRawDataByShare, setQuarterRawDataByShare] = useState();

  const {isInitDataLoaded} = useContext(ShareDataContext);
  const {compareTg, setCompareTg} = useContext(CompareTgContext);
  const {bookMark, setBookMark} = useContext(CompareTgContext);
  const [shareInfo, setShareInfo] = useState(DEFAULT_SHARE_INFO);
  const {shareCode, shareName} = shareInfo;

  // Ruturn nothing if init data is loaded
  if (!isInitDataLoaded) { 
    return null
  }

  if (shareInfoFromExtnl && shareInfoFromExtnl[KEY_NAME.SHARE_CODE] !== shareInfo[KEY_NAME.SHARE_CODE]){
    setShareInfo(shareInfoFromExtnl);
  };

  // Get nessasary data from rawdata
  const marketType = _.last(yearRawDataByShare?.[shareCode])[OTHER_KEY_NAME.MARKET_TYPE];
  const marketName = _.last(yearRawDataByShare?.[shareCode])[KEY_NAME.MARKET_NAME];
  const marketCode = _.last(yearRawDataByShare?.[shareCode])[KEY_NAME.MARKET_CODE];

  const addToCompareListHandler = (shareCode, shareName) => {
    if (_.find(compareTg, [[KEY_NAME.SHARE_CODE], shareCode])) {
        enqueueSnackbar(
            `${MSG.SHARE_CODE_ALREADY_EXIST_IN_CP}(${shareCode}:${shareName})`, 
            {variant: ERROR}
        );
    } else {
      SyncStatus.set({
        storageKey: STRG_KEY_NAME.COMPARE,
        statusSetter: setCompareTg,
        data: [...compareTg, {
          [KEY_NAME.SHARE_CODE]: shareCode,
          [KEY_NAME.SHARE_NAME]: shareName
        }]
      });

      enqueueSnackbar(
        `${MSG.ADD_COMPARE_TG}(${shareCode}:${shareName})`, 
        {variant: SUCCESS}
      );
    }
  };

  const addToBookMarkListHandler = (shareCode, shareName) => {
    const addedBookMark = [...bookMark, {
      [KEY_NAME.SHARE_CODE]: shareCode,
      [KEY_NAME.SHARE_NAME]: shareName
    }]

    if (authId) {
      axios({
        method: API.PUT_BOOKMARK.METHOD,
        url: API.PUT_BOOKMARK.URL,
        headers: {
          authId: authId,
        },
        data: {
          data: {
            value: addedBookMark
          }
        }
      })
      .then(res => {
        if(res.data.status === "success" ) {
          setBookMark(addedBookMark);
          enqueueSnackbar(`${MSG.ADD_BOOKMARK_TG}(${shareCode}:${shareName})`, {variant: SUCCESS});
        } else {
          // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
        }
      })
    } else {
      enqueueSnackbar(`${MSG.NOT_LOGED_IN}`, {variant: ERROR});
    }
  };

  return (
      <MDBContainer className="mt-5 mb-5 pt-5 pb-5">
        <div className="mt-3">
          <p>
            <span className="h4">{marketType}</span>
            <a href={`${ROUTER_URL.MARKET_SEARCH}/${marketCode}/${marketName}`} target="_blank">
              <span className="h4">{`  ${marketName}`}</span>
            </a>
          </p>
          <a className="mr-1" href={`${EXTERNAL_URL.NAVER_SHARE_INFO}${shareCode}`} target="_blank">
            <span className="h1">{`${shareName}(${shareCode})`}</span>
          </a>
          <a className="mr-1" href={`${EXTERNAL_URL.GOOGLE_SEARCH}${shareName}`} target="_blank">
           <img className="img-size-2" src={googleBtnImg}/>
          </a>
          <a className="mr-1" href={`${EXTERNAL_URL.NAVER_SEARCH}${shareName}`} target="_blank">
            <img className="img-size-2" src={naverBtnImg}/>
          </a>
          <MDBIcon className="mr-1 indigo-text" size="lg" onClick={() => {addToCompareListHandler(shareCode, shareName)}}  icon="plus-square" />
          <MDBIcon className="mr-1 indigo-text" size="lg" onClick={() => {addToBookMarkListHandler(shareCode, shareName)}}  icon="bookmark" />
        </div>
        <div className="mt-3">
          <ModelHitTable
            shareCode={shareCode}
            marketCode={marketCode}
            // quarterRawDataByMrk={quarterRawDataByMrk}
            yearRawDataByShare={yearRawDataByShare}
            quarterRawDataByShare={quarterRawDataByShare}
          />
        </div>
        <div className="mt-3">
          <Valuation
            shareCode={shareCode}
            lastQuarterRawData={_.last(RawDataFilter.getRealData(quarterRawDataByShare[shareCode]))}
          />
        </div>
        <div className="mt-3">
          <FinancialSummary
            yearRawDataByShare={yearRawDataByShare[shareCode]}
            quarterRawDataByShare={quarterRawDataByShare[shareCode]}
          />
        </div>
        <div className="mt-3">
          <IndicatorGraph
            yearRawDataByShare={yearRawDataByShare[shareCode]}
            quarterRawDataByShare={quarterRawDataByShare[shareCode]}
          />
        </div>  
      </MDBContainer>
    )
};

export default ShareSearch;
