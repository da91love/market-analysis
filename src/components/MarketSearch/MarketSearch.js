import React, { useState, useContext, useEffect } from 'react';
import {
  MDBContainer, MDBIcon, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody,  MDBDataTableV5
} from 'mdbreact';
import _ from "lodash";
import { useLocation, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import ShareDataContext from "../../contexts/ShareDataContext";
import GraphModalBtn from "../Share/GraphModalBtn";
import Filter from "../../utils/Filter";
import FilterWrapper from "./FilterWrapper";

import { PERIOD_UNIT, DEFAULT_MARKET_INFO } from '../../consts/common';
import { KEY_NAME, OTHER_KEY_NAME } from '../../consts/keyName';
import { MODEL_SEARCH_TABLE_COL } from '../../consts/tbCol';
import { MARKET_SEARCH_FILTER, FILTER_TYPE } from '../../consts/filter';

import { EXTERNAL_URL } from '../../consts/common';
import { FILTER } from '../../consts/filter';
import { SUCCESS, ERROR } from "../../consts/alert";
import { MSG } from "../../consts/message";

// Temp: import json
const MarketSearch = () => {
    const location = useLocation();
    const [filterStatus, setFilterStatus] = useState(MARKET_SEARCH_FILTER);
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const mrkInfoFromExtnl = location.state || (params[KEY_NAME.MARKET_CODE]?params:undefined); // Search page gets locations or params
    const {isInitDataLoaded, quarterRawData, yearRawDataByShare, quarterRawDataByShare} = useContext(ShareDataContext);
    const [marketInfo, setMarketInfo] = useState(DEFAULT_MARKET_INFO);
    const {marketCode, marketName} = marketInfo;

    // Ruturn nothing if init data is loaded
    if (!isInitDataLoaded) { 
        return null
    }

    if (mrkInfoFromExtnl && mrkInfoFromExtnl !== marketInfo){
        setMarketInfo(mrkInfoFromExtnl);
    };

    const rawData2TableData = (rawData, tgColList) => {
        // Create columns
        const columns = tgColList.map((v,i) => {
           return {
              label: v,
              field: v,
           }
        })
  
        // Create rows
        const rows = []
        for (const data of rawData) {
              const row = {};
              for (const col of tgColList) {
                 if (col === OTHER_KEY_NAME.GRAPH) {
                    row[col] = <GraphModalBtn
                        tgName={data[KEY_NAME.SHARE_NAME]} 
                        tgCode={data[KEY_NAME.SHARE_CODE]} 
                        yearRawDataPerUnit={yearRawDataByShare[data[KEY_NAME.SHARE_CODE]]} 
                        quarterRawDataPerUnit={quarterRawDataByShare[data[KEY_NAME.SHARE_CODE]]}
                    />
                 } else {
                    row[col] = data[col];
                 }
              }
              rows.push(row);
        }
  
        return {
              columns: columns,
              rows: rows
        }
    }

    const filterRawData = (rawData, filterStatus) => {
        const rawDataByShare = _.groupBy(rawData, v => v[KEY_NAME.SHARE_CODE]);

        const tgData = [];

        // Filter by period
        _.forEach(rawDataByShare, (data, shareCode) => {
            if (filterStatus[FILTER_TYPE.PERIOD]) {
                const tgRawData = _.find(data, [[KEY_NAME.PERIOD], filterStatus[FILTER_TYPE.PERIOD]]);
                if (tgRawData) {
                    tgData.push(tgRawData);
                }
            } else {
                tgData.push(data[data.length-1]);
            }
        });

        return tgData;
    }

    const quarterRawDataByMrk = _.groupBy(quarterRawData, v => v[KEY_NAME.MARKET_CODE]);

    const filteredRawData = filterRawData(quarterRawDataByMrk[marketCode], filterStatus);
    const dataTableData = rawData2TableData(filteredRawData, MODEL_SEARCH_TABLE_COL);

  return (
      <MDBContainer className="mt-5 mb-5 pt-5 pb-5">
        <MDBCard className="mb-4">
            <MDBCardBody>
                <MDBCardTitle>
                <div className="">
                    <FilterWrapper filterStatus={filterStatus} setFilterStatus={setFilterStatus}/>
                </div>
                </MDBCardTitle>
                <MDBCardText>
                    <MDBDataTableV5 striped bordered small hover entriesOptions={[5, 10, 20, 30]} entries={10} pagesAmount={4} data={dataTableData} />
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    )
};

export default MarketSearch;
