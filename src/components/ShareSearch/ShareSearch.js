import React, { useState, useContext, useEffect } from 'react';
import {MDBContainer, MDBIcon} from 'mdbreact';
import _ from "lodash";
import { useLocation, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import ModelHitTable from "./ModelHitTable";
import FinancialSummary from "./FinancialSummary";
import IndicatorGraph from "./IndicatorGraph";
import Valuation from "./Valuation";
import ShareDataContext from "../../contexts/ShareDataContext";
import CompareTgContext from "../../contexts/CompareTgContext";
import SyncStatus from '../../utils/SyncStatus';
import { PERIOD_UNIT, DEFAULT_SHARE_INFO } from '../../consts/common';
import { KEY_NAME, OTHER_KEY_NAME } from '../../consts/keyName';
import { STRG_KEY_NAME } from "../../consts/localStorage";
import { EXTERNAL_URL } from '../../consts/common';
import { ROUTER_URL } from '../../consts/router';
import { SUCCESS, ERROR } from "../../consts/alert";
import { MSG } from "../../consts/message";

// Temp: import json
const ShareSearch = () => {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const shareInfoFromExtnl = location.state || (params[KEY_NAME.SHARE_CODE]?params:undefined); // Search page gets locations or params
  const {isInitDataLoaded, shareInfos, quarterRawDataByMrk, yearRawDataByShare, quarterRawDataByShare} = useContext(ShareDataContext);
  const {compareTg, setCompareTg} = useContext(CompareTgContext);
  const [shareInfo, setShareInfo] = useState(DEFAULT_SHARE_INFO);
  const {shareCode, shareName} = shareInfo;

  // Ruturn nothing if init data is loaded
  if (!isInitDataLoaded) { 
    return null
  }

  if (shareInfoFromExtnl && shareInfoFromExtnl !== shareInfo){
    setShareInfo(shareInfoFromExtnl);
  };

  // Get nessasary data from rawdata
  const marketType = _.find(shareInfos, [KEY_NAME.SHARE_CODE, shareCode])[OTHER_KEY_NAME.MARKET_TYPE];
  const marketName = quarterRawDataByShare[shareCode][0][KEY_NAME.MARKET_NAME];
  const marketCode = quarterRawDataByShare[shareCode][0][KEY_NAME.MARKET_CODE];

  const addToCompareListHandler = (shareCode, shareName) => {
    if (_.find(compareTg, [[KEY_NAME.SHARE_CODE], shareCode])) {
        enqueueSnackbar(
            `${MSG.SHARE_CODE_ALREADY_EXIST}(${shareCode}:${shareName})`, 
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

  return (
      <MDBContainer className="mt-5 mb-5 pt-5 pb-5">
        <div className="mt-3">
          <p>
            <span className="h4">{marketType}</span>
            <a href={`${ROUTER_URL.MARKET_SEARCH}/${marketCode}/${marketName}`} target="_blank">
              <span className="h4">{`  ${marketName}`}</span>
            </a>
          </p>
          <a href={`${EXTERNAL_URL.NAVER_SHARE_INFO}${shareCode}`} target="_blank">
            <span className="h1">{`${shareName}(${shareCode})`}</span>
          </a>
          <a href={`${EXTERNAL_URL.GOOGLE_SEARCH}${shareName}`} target="_blank">
            <MDBIcon fab icon="google" />
          </a>
          <a href={`${EXTERNAL_URL.NAVER_SEARCH}${shareName}`} target="_blank">
            <MDBIcon fab icon="neos" />
          </a>
          <MDBIcon onClick={() => {addToCompareListHandler(shareCode, shareName)}}  icon="list-alt" />
        </div>
        <div className="mt-3">
          <ModelHitTable
            shareCode={shareCode}
            marketCode={marketCode}
            quarterRawDataByMrk={quarterRawDataByMrk}
            yearRawDataByShare={yearRawDataByShare}
            quarterRawDataByShare={quarterRawDataByShare}
          />
        </div>
        <div className="mt-3">
          <Valuation
            shareCode={shareCode}
            lastQuarterRawData={_.last(quarterRawDataByShare[shareCode])}
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
