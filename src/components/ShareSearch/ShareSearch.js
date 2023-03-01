import React, { useState, useContext, useEffect } from 'react';
import {MDBContainer, MDBIcon} from 'mdbreact';
import _ from "lodash";
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {useTranslation} from "react-i18next";

import ModelHitTable from "./ModelHitTable";
import FinancialSummary from "./FinancialSummary";
import FinancialStatus from "./FinancialStatus";
import IndicatorGraph from "./IndicatorGraph";
import Valuation from "./Valuation";
import StockPrice from "./StockPrice";
import ShareDataContext from "../../contexts/ShareDataContext";
import CompareTgContext from "../../contexts/CompareTgContext";
import AuthContext from "../../contexts/AuthContext";
import SyncStatus from '../../utils/SyncStatus';
import RawDataFilter from '../../utils/RawDataFilter';
import { convertNumAsUnit } from '../../utils/numUtil';
import comma from '../../utils/convertComma';
import { DEFAULT_SHARE_INFO } from '../../consts/common';
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
  const { t, i18n } = useTranslation();
  const crtLang = i18n.language;
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const {authId} = useContext(AuthContext);
  const {country} = useContext(ShareDataContext);
  const [isApiDataLoaded, setIsApiDataLoaded] = useState(false);
  const [yearSummaryByShare, setYearSummaryByShare] = useState([]);
  const [quarterSummaryByShare, setQuarterSummaryByShare] = useState([]);
  const [financialStatusByShare, setFinancialStatusByShare] = useState([]);
  const shareInfoFromExtnl = location.state || (params[KEY_NAME.SHARE_CODE]?params:undefined); // Search page gets locations or params

  const {compareTg, setCompareTg} = useContext(CompareTgContext);
  const {bookMark, setBookMark} = useContext(CompareTgContext);
  const [shareInfo, setShareInfo] = useState(DEFAULT_SHARE_INFO);
  const {shareCode, shareName} = shareInfo;

  if (shareInfoFromExtnl && shareInfoFromExtnl[KEY_NAME.SHARE_CODE] !== shareInfo[KEY_NAME.SHARE_CODE]){
    setShareInfo(shareInfoFromExtnl);
  };

  // Get nessasary data from rawdata
  const marketType = _.last(yearSummaryByShare)?.[OTHER_KEY_NAME.MARKET_TYPE];
  const marketName = _.last(yearSummaryByShare)?.[KEY_NAME.MARKET_NAME];
  const marketCode = _.last(yearSummaryByShare)?.[KEY_NAME.MARKET_CODE];

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


  useEffect(() => {
    axios({
        method: API.POST_FINANCIAL_SUMMARY.METHOD,
        url: API.POST_FINANCIAL_SUMMARY.URL,
        data: {
          data: {
            country: country,
            shareCode: [shareCode]
          }
        }
      })
     .then(res => {
        if(res.data.status === "success" ) {
          const {year_result: f_smr_year_result, quarter_result: f_smr_quarter_result} = res.data.payload.value;
          setYearSummaryByShare(f_smr_year_result);
          setQuarterSummaryByShare(f_smr_quarter_result);

          setIsApiDataLoaded(true);
        } else {
          // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
        }
     })
     .catch((err) => {

     });
    }, [shareInfo, crtLang]);

  return (
      <>
        {!isApiDataLoaded?null
        :<MDBContainer className="mt-5 mb-5 pt-5 pb-5">
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
            <StockPrice shareCode={shareCode}></StockPrice>
          </div>
          <div className="mt-3">
            {/* <ModelHitTable
              shareCode={shareCode}
              marketCode={marketCode}
              // quarterRawDataByMrk={quarterRawDataByMrk}
              yearSummaryByShare={yearSummaryByShare}
              quarterSummaryByShare={quarterSummaryByShare}
            /> */}
          </div>
          <div className="mt-3">
            <Valuation
              shareCode={shareCode}
              lastQuarterRawData={_.last(RawDataFilter.getRealData(quarterSummaryByShare))}
            />
          </div>
          <div className="mt-3">
            <FinancialSummary
              yearSummaryByShare={yearSummaryByShare}
              quarterSummaryByShare={quarterSummaryByShare}
            />
          </div>
          <div className="mt-3">
            <FinancialStatus
              shareCode={shareCode} country={country}
            />
          </div>
          <div className="mt-3">
            <IndicatorGraph
              yearSummaryByShare={yearSummaryByShare}
              quarterSummaryByShare={quarterSummaryByShare}
            />
          </div>  
        </MDBContainer>
        }
      </>
    )
};

export default ShareSearch;
