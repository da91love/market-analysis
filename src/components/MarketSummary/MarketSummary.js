import React, { useState, useContext, useEffect } from 'react';
import {
  MDBContainer, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody,  MDBDataTableV5
} from 'mdbreact';
import _ from "lodash";
import { useLocation, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import ShareDataContext from "../../contexts/ShareDataContext";
import GraphModalBtn from "../Share/GraphModalBtn";
import FilterWrapper from "./FilterWrapper";
import RawDataFilter from "../../utils/RawDataFilter";

import { DEFAULT_MARKET_INFO } from '../../consts/common';
import { KEY_NAME, OTHER_KEY_NAME } from '../../consts/keyName';
import { MODEL_SEARCH_TABLE_COL } from '../../consts/tbCol';
import { MARKET_SEARCH_FILTER, FILTER_TYPE } from '../../consts/filter';

// Temp: import json
const MarketSummary = () => {
    const location = useLocation();
    const [filterStatus, setFilterStatus] = useState(MARKET_SEARCH_FILTER);
    const [dataTableData, setDataTableData] = useState();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const mrkInfoFromExtnl = location.state || (params[KEY_NAME.MARKET_CODE]?params:undefined); // Search page gets locations or params
    const {isInitDataLoaded, quarterRawData, yearRawDataByShare, quarterRawDataByShare} = useContext(ShareDataContext);
    const [marketInfo, setMarketInfo] = useState(DEFAULT_MARKET_INFO);
    const {marketCode, marketName} = marketInfo;

    if (mrkInfoFromExtnl && mrkInfoFromExtnl[KEY_NAME.MARKET_CODE] !== marketInfo[KEY_NAME.MARKET_CODE]){
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
            const rD = RawDataFilter.getRealData(data);
            const period = filterStatus[FILTER_TYPE.PERIOD] || rD[rD.length-1][KEY_NAME.PERIOD];
            const tgRawData = _.find(data, [[KEY_NAME.PERIOD], period]);

            if (tgRawData) {
                tgData.push(tgRawData);
            }
        });

        return tgData;
    }

    /**
     * useEffect를 사용하지 않고 외부에서 data를 관리하면, compare데이터 추가 시
     * 상부의 status 업데이트에 의해, useEffect 외부의 작업도 다시 한번 돌게 되므로
     * 테이블의 필터가 초기화되는 현상이 발생함.
     * 이처럼 상부의 status의 변화와 관계없이 필요할 때만 데이터를 업데이트해주는 부분에
     * useEffect를 사용하면, 어플의 효율이 높아짐
     **/
    useEffect(() => {
        if (isInitDataLoaded) {
            const quarterRawDataByMrk = _.groupBy(quarterRawData, v => v[KEY_NAME.MARKET_CODE]);
            const filteredRawData = filterRawData(quarterRawDataByMrk[marketCode], filterStatus);
            const dtData = rawData2TableData(filteredRawData, MODEL_SEARCH_TABLE_COL);
            setDataTableData(dtData);
        }
    }, [isInitDataLoaded, filterStatus, marketInfo])

    return (
      <MDBContainer className="mt-5 mb-5 pt-5 pb-5">
        <div className="h2 mb-3">Market Search</div> 
        <MDBCard className="mb-4">
            <MDBCardBody>
                <MDBCardTitle>
                    <div className="">
                        {dataTableData?<FilterWrapper filterStatus={filterStatus} setFilterStatus={setFilterStatus}/>
                        :null}
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

export default MarketSummary;
