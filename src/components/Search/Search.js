import React, { useState, useContext, useEffect } from 'react';
import {
  MDBContainer, MDBIcon, MDBCard, MDBCardTitle, MDBCardText, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn 
} from 'mdbreact';
import _ from "lodash";
import { useLocation, useParams } from 'react-router-dom';

import ShareDataContext from "../../contexts/ShareDataContext";
import CompareTgContext from "../../contexts/CompareTgContext";
import AlertContext from "../../contexts/AlertContext";
import FixedSideTable from '../Share/FixedSideTable';
import AnalysisGraph from '../Share/AnalysisGraph';
import GraphTypeSelectModal from '../Share/GraphTypeSelectModal';
import rawData2GraphData from '../../utils/rawData2GraphData';
import rawData2FixedTableData from '../../utils/rawData2FixedTableData';
import getAllMatchedTgByModel from '../../utils/getAllMatchedTgByModel';
import { PERIOD_UNIT, DEFAULT_SHARE_INFO } from '../../consts/common';
import { KEY_NAME, OTHER_KEY_NAME } from '../../consts/keyName';
import { MODELS } from '../../consts/model';
import { STRG_KEY_NAME } from "../../consts/localStorage";
import { BY_SHARE_DEFAULT_GRAPH_TYPE, BY_SHARE_ALL_GRAPH_TYPE } from '../../consts/graph';
import { SEARCH_TABLE_COL } from '../../consts/tblCol';
import { EXTERNAL_URL } from '../../consts/common';
import { FILTER } from '../../consts/filter';
import { SUCCESS } from "../../consts/alert";
import { MSG } from "../../consts/message";

// Temp: import json
const Search = () => {
  const location = useLocation();
  const params = useParams();
  const shareInfoFromExtnl = location.state || (params[KEY_NAME.SHARE_CODE]?params:undefined); // Search page gets locations or params
  const {isInitDataLoaded, shareInfos, quarterRawDataByMrk, yearRawDataByShare, quarterRawDataByShare} = useContext(ShareDataContext);
  const {compareTg, setCompareTg} = useContext(CompareTgContext);
  const {alertState,setAlertState} = useContext(AlertContext);
  const [activeTab, setActiveTab] = useState(PERIOD_UNIT.YEAR);
  const [shareInfo, setShareInfo] = useState(DEFAULT_SHARE_INFO);
  const [selectedGraphType, setSelectedGraphType] = useState(BY_SHARE_DEFAULT_GRAPH_TYPE);
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
  const marketCode = quarterRawDataByShare[shareCode][0][KEY_NAME.MARKET_CODE];

  // Get data for model compare table
  const allMatchedTgByModel = getAllMatchedTgByModel(quarterRawDataByMrk, yearRawDataByShare, quarterRawDataByShare, FILTER);
  const modelCompareTableData = function() {
    const header = Object.values(MODELS).map((model, i) => {
      return {
        value: model
      }
    });

    const allMatchedResultByModel = {};
    for (const model in allMatchedTgByModel) {
      if (model === MODELS.MRKGROWTH) {
        allMatchedResultByModel[model] = allMatchedTgByModel[model].includes(marketCode);
      } else {
        allMatchedResultByModel[model] = allMatchedTgByModel[model].includes(shareCode);
      }
    }

    const records = [];
    const cells = Object.keys(allMatchedResultByModel).map((v, i) => {
      // TODO
      return ({
        value: "　",
        key: v,
        backgroundColor: allMatchedResultByModel[v]?"#00C851":"#ff4444"
      })
    })
    records.push({cells: cells});

    return ({
      header: header,
      records: records
    })
  }();

  // Get data for fixed table
  const yearFixedTableData = rawData2FixedTableData(yearRawDataByShare[shareCode], SEARCH_TABLE_COL);
  const quarterFixedTableData = rawData2FixedTableData(quarterRawDataByShare[shareCode], SEARCH_TABLE_COL);

  // Get data for graphData
  const graphData = function(){
    const idcByYear = {};
    const idcByQuarter = {};

    selectedGraphType.forEach((v, i) => {
        idcByYear[v] = rawData2GraphData(yearRawDataByShare[shareCode], v);
        idcByQuarter[v] = rawData2GraphData(quarterRawDataByShare[shareCode], v);
    })
    
    return ({
        [PERIOD_UNIT.YEAR]: idcByYear,
        [PERIOD_UNIT.QUARTER]: idcByQuarter
    })
  }();

  const tabHandler = (tab) => {
    if (activeTab !== tab) {
        setActiveTab(tab);
    }
  }

  const addToCompareList = (shareCode, shareName) => {
    // localStorage.setItem(STRG_KEY_NAME.COMPARE, {
    //   [KEY_NAME.SHARE_CODE]: shareCode,
    //   [KEY_NAME.SHARE_NAME]: shareName
    // }); 

    setCompareTg([...compareTg, {
      [KEY_NAME.SHARE_CODE]: shareCode,
      [KEY_NAME.SHARE_NAME]: shareName
    }]);

    setAlertState({
      eventType: SUCCESS, //ここでSUCCESS,WARNING,DANGERを選択
      eventMessage: `${MSG.ADD_COMPARE_TG}(${shareCode}:${shareName})`,
      eventCount: alertState.eventCount + 1,
    });
  };

  return (
      <MDBContainer className="mt-5 mb-5 pt-5 pb-5">
        <div className="mt-3">
          <p className="h4">{marketType}</p>
          <a href={`${EXTERNAL_URL.NAVER_SHARE_INFO}${shareCode}`} target="_blank">
            <span className="h1">{`${shareName}(${shareCode})`}</span>
          </a>
          <a href={`${EXTERNAL_URL.GOOGLE_SEARCH}${shareName}`} target="_blank">
            <MDBIcon fab icon="google" />
          </a>
          <a href={`${EXTERNAL_URL.NAVER_SEARCH}${shareName}`} target="_blank">
            <MDBIcon fab icon="neos" />
          </a>
          <MDBIcon onClick={() => {addToCompareList(shareCode, shareName)}}  icon="list-alt" />
        </div>
        <div className="mt-3">
          <FixedSideTable
            header={modelCompareTableData.header}
            records={modelCompareTableData.records}
          />
        </div>
        <div className="mt-3">
        <MDBNav className="nav-tabs">
          <MDBNavItem>
              <MDBNavLink link to="#" active={activeTab === PERIOD_UNIT.YEAR} onClick={() => tabHandler(PERIOD_UNIT.YEAR)} role="tab" >
                  Yearly
              </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
              <MDBNavLink link to="#" active={activeTab === PERIOD_UNIT.QUARTER} onClick={() => tabHandler(PERIOD_UNIT.QUARTER)} role="tab" >
                  Quarterly
              </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent activeItem={activeTab} >
          <MDBTabPane tabId={PERIOD_UNIT.YEAR} role="tabpanel">
              <div className="mt-3">
                <MDBCard className="card-body">
                  <MDBCardTitle className="h3">Financial Summary</MDBCardTitle>
                  <MDBCardText>
                    <FixedSideTable
                      header={yearFixedTableData.header}
                      records={yearFixedTableData.records}
                      fixedNum={1}
                    />
                  </MDBCardText>
                </MDBCard>
              </div>
              <div className="mt-3">
                <MDBCard className="card-body">
                  <MDBCardTitle className="h3">
                    <span>주요지표 추세</span>
                    <GraphTypeSelectModal selectedGraphType={selectedGraphType} setSelectedGraphType={setSelectedGraphType} allGraphType={BY_SHARE_ALL_GRAPH_TYPE}/>
                  </MDBCardTitle>
                  <MDBCardText>
                    {Object.keys(graphData[PERIOD_UNIT.YEAR]).map((v, i) => {
                      return <AnalysisGraph graphData={graphData[PERIOD_UNIT.YEAR][v]} id={i}/>})
                    }
                  </MDBCardText>
                </MDBCard>
              </div>                     
          </MDBTabPane>
          <MDBTabPane tabId={PERIOD_UNIT.QUARTER} role="tabpanel">
            <div className="mt-3">
              <MDBCard className="card-body">
                <MDBCardTitle className="h3">Financial Summary</MDBCardTitle>
                <MDBCardText>
                  <FixedSideTable
                    header={quarterFixedTableData.header}
                    records={quarterFixedTableData.records}
                    fixedNum={1}
                  />
                </MDBCardText>
              </MDBCard>
            </div>
            <div className="mt-3">
              <MDBCard className="card-body">
                <MDBCardTitle className="h3">
                  <span>주요지표 추세</span>
                  <GraphTypeSelectModal selectedGraphType={selectedGraphType} setSelectedGraphType={setSelectedGraphType} allGraphType={BY_SHARE_ALL_GRAPH_TYPE}/>
                </MDBCardTitle>
                <MDBCardText>
                  {Object.keys(graphData[PERIOD_UNIT.QUARTER]).map((v, i) => {
                      return <AnalysisGraph graphData={graphData[PERIOD_UNIT.QUARTER][v]} id={i}/>})
                  }     
                </MDBCardText>
              </MDBCard> 
            </div>
          </MDBTabPane>
        </MDBTabContent>
        </div>
        <div>

        </div>
      </MDBContainer>
    )
};

export default Search;
