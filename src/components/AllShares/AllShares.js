import React, { useState, useContext, useEffect } from 'react';
import {
  MDBContainer, MDBIcon, MDBCard, MDBCardTitle, MDBCardText, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn 
} from 'mdbreact';
import _ from "lodash";

import ShareDataContext from "../../contexts/ShareDataContext";
import FixedSideTable from '../Share/FixedSideTable';
import { PERIOD_UNIT, DEFAULT_SHARE_INFO } from '../../consts/common';
import { KEY_NAME, OTHER_KEY_NAME } from '../../consts/keyName';
import { BY_SHARE_DEFAULT_GRAPH_TYPE, BY_SHARE_ALL_GRAPH_TYPE, MODELS } from '../../consts/model';
import { ALL_SHARE_TABLE_COL } from '../../consts/tbCol';
import { EXTERNAL_URL } from '../../consts/common';
import { FILTER } from '../../consts/filter';

// Temp: import json
const AllShares = () => {
  const {isInitDataLoaded, shareInfos, yearRawDataByShare, quarterRawDataByShare} = useContext(ShareDataContext);
  const [yearFilter, setYearFilter] = useState({});
  const [quarterFilter, setQuarterFilter] = useState({});
  const [activeTab, setActiveTab] = useState(PERIOD_UNIT.YEAR);

  // Ruturn nothing if init data is loaded
  if (!isInitDataLoaded) {
    return null
  }

  const filterRawData = (periodRawData, filter) => {
    const tgData = [];

    for (const sc in periodRawData) {
      const shareRawData = periodRawData[sc];

      // 1. Filter by period
      let tgPeriodRawData = null;
      if (filter.hasOwnProperty(KEY_NAME.PERIOD)) {
        tgPeriodRawData = _.find(shareRawData, [[KEY_NAME.PERIOD], filter[KEY_NAME.PERIOD]]);
      } else {
        tgPeriodRawData = shareRawData[shareRawData.length-1];
      }

      // 2. Filter by other indicators'
      let filteredTgPeriodRawData = tgPeriodRawData;
      for (const idc in filter) {
        const {min=Number.MIN_VALUE, max=Number.MAX_VALUE} = idc;

        if (min <= tgPeriodRawData[idc] && tgPeriodRawData[idc] <= max) {
          filteredTgPeriodRawData = tgPeriodRawData;
        }
      }

      tgData.push(filteredTgPeriodRawData);
    }

    return tgData;
  }

  const rawData2FixedTableData = (periodRawData, displayCol) => {
    const header = displayCol.map((col, i) => {
      return {
        value: col
      }
    });

    const records = Object.keys(periodRawData).map((sc, i) => {
      const cells = [];
      displayCol.forEach((col, o) => {
        cells.push({
          value: periodRawData[sc][col],
          key: i+o,
        })
      })

      return ({
        cells: cells
      })
    })

    return ({
      header: header,
      records: records,
    })
  };

  const yearDataTableData = rawData2FixedTableData(filterRawData(yearRawDataByShare, yearFilter), ALL_SHARE_TABLE_COL);
  const quarterDataTableData = rawData2FixedTableData(filterRawData(quarterRawDataByShare, quarterFilter), ALL_SHARE_TABLE_COL);

  const tabHandler = (tab) => {
    if (activeTab !== tab) {
        setActiveTab(tab);
    }
  }

  return (
      <MDBContainer>
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
                    header={yearDataTableData.header}
                    records={yearDataTableData.records}
                  />
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
                    header={quarterDataTableData.header}
                    records={quarterDataTableData.records}
                  />
                </MDBCardText>
              </MDBCard>
            </div>
          </MDBTabPane>
        </MDBTabContent>
        </div>
      </MDBContainer>
    )
};

export default AllShares;
