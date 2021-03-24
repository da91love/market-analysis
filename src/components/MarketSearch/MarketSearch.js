import React, { useState, useContext, useEffect } from 'react';
import {
  MDBContainer, MDBIcon, MDBCard, MDBCardTitle, MDBCardText, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn 
} from 'mdbreact';
import _ from "lodash";
import { useLocation, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import ShareDataContext from "../../contexts/ShareDataContext";
import CompareTgContext from "../../contexts/CompareTgContext";
import FixedSideTable from '../Share/FixedSideTable';
import AnalysisGraph from '../Share/AnalysisGraph';
import GraphTypeSelectModal from '../Share/GraphTypeSelectModal';
import rawData2GraphData from '../../utils/rawData2GraphData';
import rawData2FixedTableData from '../../utils/rawData2FixedTableData';
import getAllMatchedTgByModel from '../../utils/getAllMatchedTgByModel';
import SyncStatus from '../../utils/SyncStatus';
import { PERIOD_UNIT, DEFAULT_SHARE_INFO } from '../../consts/common';
import { KEY_NAME, OTHER_KEY_NAME } from '../../consts/keyName';
import { MODELS } from '../../consts/model';
import { STRG_KEY_NAME } from "../../consts/localStorage";
import { BY_SHARE_DEFAULT_GRAPH_TYPE, BY_SHARE_ALL_GRAPH_TYPE } from '../../consts/graph';
import { MODEL_SEARCH_TABLE_COL } from '../../consts/tbCol';
import { EXTERNAL_URL } from '../../consts/common';
import { FILTER } from '../../consts/filter';
import { SUCCESS, ERROR } from "../../consts/alert";
import { MSG } from "../../consts/message";

// Temp: import json
const MarketSearch = () => {
//     const location = useLocation();
//     const { enqueueSnackbar } = useSnackbar();
//     const params = useParams();
//     const mrkInfoFromExtnl = location.state || (params[KEY_NAME.MARKET_CODE]?params:undefined); // Search page gets locations or params
//     const {isInitDataLoaded, yearRawDataByMrk, quarterRawDataByMrk} = useContext(ShareDataContext);
//     const [activeTab, setActiveTab] = useState(PERIOD_UNIT.YEAR);
//     const [marketInfo, setMarketInfo] = useState(DEFAULT_SHARE_INFO);
//     const {marketCode, marketName} = marketInfo;

//     // Ruturn nothing if init data is loaded
//     if (!isInitDataLoaded) { 
//         return null
//     }

//     const rawData2TableData = (rawData, tgColList) => {
//         // Create columns
//         const columns = tgColList.map((v,i) => {
//            return {
//               label: v,
//               field: v,
//            }
//         })
  
//         // Create rows
//         const rows = []
//         for (const data of rawData) {
//               const row = {};
//               for (const col of tgColList) {
//                  if (col === OTHER_KEY_NAME.GRAPH) {
//                     row[col] = <GraphModalBtn
//                         tgName={data[KEY_NAME.SHARE_NAME]} 
//                         tgCode={data[KEY_NAME.SHARE_CODE]} 
//                         yearRawDataPerUnit={yearRawDataByShare[data[KEY_NAME.SHARE_CODE]]} 
//                         quarterRawDataPerUnit={quarterRawDataByShare[data[KEY_NAME.SHARE_CODE]]}
//                     />
//                  } else {
//                     row[col] = data[col];
//                  }
//               }
//               rows.push(row);
//         }
  
//         return {
//               columns: columns,
//               rows: rows
//         }
//     }

//     const filterByPeriod = (quarterRawDataByShare, filterStatus) => {
//         const tgShares = [];
    
//         _.forEach(quarterRawDataByShare, (v, k) => {
//           const periodFilter = filterStatus[MODELS.VALUE][FILTER_TYPE.PERIOD] || v[v.length-1][KEY_NAME.PERIOD];
//           const tgPeriodData = cutPeriodWithCondition(v, periodFilter);
//           const tgPeriodDataLen = tgPeriodData.length;
    
//           if (tgPeriodDataLen > 0) {
//                 tgShares.push(tgPeriodData[tgPeriodDataLen-1]);
//           }
//         });
    
//         return tgShares;
//       }

//     const dataTableData = rawData2TableData(rawData, MODEL_SEARCH_TABLE_COL);

//   return (
//       <MDBContainer className="mt-5 mb-5 pt-5 pb-5">
//         <MDBCard className="mb-4">
//             <MDBCardBody>
//                 <MDBCardTitle>
//                 {/* <div className="">
//                     <FilterModalBtn model={model} filterStatus={filterStatus} setFilterStatus={setFilterStatus}/>
//                 </div> */}
//                 </MDBCardTitle>
//                 <MDBCardText>
//                     <MDBDataTableV5 striped bordered small hover entriesOptions={[5, 10, 20, 30]} entries={10} pagesAmount={4} data={datatable} />
//                 </MDBCardText>
//             </MDBCardBody>
//         </MDBCard>
//       </MDBContainer>
//     )
};

export default MarketSearch;
