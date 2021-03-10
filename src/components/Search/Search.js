import React, { useState, useContext, useEffect } from 'react';
import {
  MDBRow, MDBContainer, MDBCol, MDBIcon, MDBCard, MDBCardTitle, MDBCardText, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink
} from 'mdbreact';
import _ from "lodash";
import { useLocation } from 'react-router-dom';
import ShareDataContext from "../../contexts/ShareDataContext";
import FixedSideTable from '../Share/FixedSideTable';
import AnalysisGraph from '../Share/AnalysisGraph';
import rawData2GraphData from '../../utils/rawData2GraphData';
import { PERIOD_UNIT, DEFAULT_SHARE_INFO } from '../../consts/common';
import { KEY_NAME, OTHER_KEY_NAME } from '../../consts/keyName';
import { BY_SHARE_GRAPH_TYPE } from '../../consts/model';

// Temp: import json
const Search = () => {
  const location = useLocation();
  const shareInfoFromLoc = location.state;
  const {isInitDataLoaded, shareInfos, yearRawDataByShare, quarterRawDataByShare} = useContext(ShareDataContext);
  const [activeTab, setActiveTab] = useState(PERIOD_UNIT.YEAR);
  const [shareInfo, setShareInfo] = useState(DEFAULT_SHARE_INFO);
  const {shareCode, shareName} = shareInfo;
  const marketType = _.find(shareInfos, [KEY_NAME.SHARE_CODE, shareCode])?.[OTHER_KEY_NAME.MARKET_TYPE];

  // Ruturn nothing if init data is loaded
  if (!isInitDataLoaded) {
    return null
  }

  if (shareInfoFromLoc && shareInfoFromLoc !== shareInfo){
    setShareInfo(shareInfoFromLoc);
  };

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
        <div>

        </div>
        <div>
        <MDBNav className="nav-tabs mt-3">
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
                      header={['a', 'b', 'c', 'd', 'e']}
                      records={[{cells:[
                        {value:1, key: 1},
                        {value:2, key: 2},
                        {value:3, key: 3},
                        {value:4, key: 4},
                        {value:5, key: 5},
                      ]}, {cells:[
                        {value:1, key: 1},
                        {value:2, key: 2},
                        {value:3, key: 3},
                        {value:4, key: 4},
                        {value:5, key: 5},
                      ]} ,{cells:[
                        {value:1, key: 1},
                        {value:2, key: 2},
                        {value:3, key: 3},
                        {value:4, key: 4},
                        {value:5, key: 5},
                      ]}]}
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
                <MDBCardTitle>Financial Summary</MDBCardTitle>
                <MDBCardText>
                  <FixedSideTable
                    header={['a', 'b', 'c', 'd', 'e']}
                    records={[{cells:[
                      {value:1, key: 1},
                      {value:2, key: 2},
                      {value:3, key: 3},
                      {value:4, key: 4},
                      {value:5, key: 5},
                    ]}, {cells:[
                      {value:1, key: 1},
                      {value:2, key: 2},
                      {value:3, key: 3},
                      {value:4, key: 4},
                      {value:5, key: 5},
                    ]} ,{cells:[
                      {value:1, key: 1},
                      {value:2, key: 2},
                      {value:3, key: 3},
                      {value:4, key: 4},
                      {value:5, key: 5},
                    ]}]}
                    fixedNum={1}
                  />
                </MDBCardText>
              </MDBCard>
            </div>
            <div className="mt-3">
              <MDBCard className="card-body">
                <MDBCardTitle>주요지표 추세</MDBCardTitle>
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
