import React, { useState, useContext, useEffect } from 'react';
import {
  MDBRow, MDBContainer, MDBCol, MDBIcon, MDBCard, MDBCardTitle, MDBCardText, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink
} from 'mdbreact';
import _ from "lodash";
import { useLocation } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

import ShareDataContext from "../../contexts/ShareDataContext";
import FixedSideTable from '../Share/FixedSideTable';
import AnalysisGraph from '../Share/AnalysisGraph';
import rawData2GraphData from '../../utils/rawData2GraphData';
import rawData2FixedTableData from '../../utils/rawData2FixedTableData';
import getAllMatchedTgByModel from '../../utils/getAllMatchedTgByModel';
import { PERIOD_UNIT, DEFAULT_SHARE_INFO } from '../../consts/common';
import { KEY_NAME, OTHER_KEY_NAME } from '../../consts/keyName';
import { BY_SHARE_GRAPH_TYPE, MODELS } from '../../consts/model';
import { SEARCH_TABLE_COL } from '../../consts/search';
import { FILTER } from '../../consts/filter';

// Temp: import json
const Search = () => {
  const location = useLocation();
  const shareInfoFromLoc = location.state;
  const {isInitDataLoaded, shareInfos, quarterRawDataByMrk, yearRawDataByShare, quarterRawDataByShare} = useContext(ShareDataContext);
  const [activeTab, setActiveTab] = useState(PERIOD_UNIT.YEAR);
  const [shareInfo, setShareInfo] = useState(DEFAULT_SHARE_INFO);
  const {shareCode, shareName} = shareInfo;

  // Ruturn nothing if init data is loaded
  if (!isInitDataLoaded) {
    return null
  }

  if (shareInfoFromLoc && shareInfoFromLoc !== shareInfo){
    setShareInfo(shareInfoFromLoc);
  };

  // Get nessasary data from rawdata
  const marketType = _.find(shareInfos, [KEY_NAME.SHARE_CODE, shareCode])[OTHER_KEY_NAME.MARKET_TYPE];
  const marketCode = quarterRawDataByShare[shareCode][0][KEY_NAME.MARKET_CODE];

  // Get data for model compare table
  const allMatchedTgByModel = getAllMatchedTgByModel(quarterRawDataByMrk, yearRawDataByShare, quarterRawDataByShare, FILTER);
  const modelCompareTableData = function() {
    const header = Object.values(MODELS);

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
  const yearFixedTableData = rawData2FixedTableData(SEARCH_TABLE_COL, yearRawDataByShare[shareCode]);
  const quarterFixedTableData = rawData2FixedTableData(SEARCH_TABLE_COL, quarterRawDataByShare[shareCode]);

  // Get data for graphData
  const graphData = function(){
    const idcByYear = {};
    const idcByQuarter = {};

    BY_SHARE_GRAPH_TYPE.forEach((v, i) => {
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

  return (
      <MDBContainer>
        <div className="mt-3">
          <p className="h4">{marketType}</p>
          <p className="h1">{`${shareName}(${shareCode})`}</p>
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
                    <MDBCardTitle className="h3">주요지표 추세</MDBCardTitle>
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
                <MDBCardTitle className="h3">주요지표 추세</MDBCardTitle>
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
