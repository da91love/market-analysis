import React, { useState, useContext, useEffect } from 'react';
import {
  MDBRow, MDBContainer, MDBCol, MDBIcon
} from 'mdbreact';
import FixedSideTableTest from '../Share/FixedSideTableTest';

// Temp: import json
const DataTableWrapper = (props) => {
  const {modelName, modelRawData, tgColList} = props;
  const [filterStatus, setFilterStatus] = useState(null);

  const rawData2TableData = (modelName, modelRawData, tgColList) => {
    /** 
    // Create columns
    const columns = tgColList.map((v,i) => {
       return {
          label: v,
          field: v,
       }
    })

    // Create rows
    const rows = []
    for (const data of modelRawData) {
          const row = {};
          for (const col of tgColList) {
             if (col === OTHER_KEY_NAME.GRAPH) {
                if (modelName === MODELS.MRKGROWTH) {
                   row[col] = <GraphModalBtn
                      isMarket={true}
                      tgName={data[KEY_NAME.MARKET_NAME]} 
                      tgCode={data[KEY_NAME.MARKET_CODE]} 
                      yearRawDataPerUnit={yearRawDataByMrk[data[KEY_NAME.MARKET_CODE]]} 
                      quarterRawDataPerUnit={quarterRawDataByMrk[data[KEY_NAME.MARKET_CODE]]}
                   />
                } else {
                   row[col] = <GraphModalBtn
                      tgName={data[KEY_NAME.SHARE_NAME]} 
                      tgCode={data[KEY_NAME.SHARE_CODE]} 
                      yearRawDataPerUnit={yearRawDataByShare[data[KEY_NAME.SHARE_CODE]]} 
                      quarterRawDataPerUnit={quarterRawDataByShare[data[KEY_NAME.SHARE_CODE]]}
                   />
                }

             } else {
                row[col] = data[col];
             }
          }
          rows.push(row);
    }

    return ({
       cells: cells
    })
    */

    const header = tgColList;

    const records = modelRawData.map((data, i) => {
       const cells = [];
       tgColList.forEach((col, o) => {
          if (col === OTHER_KEY_NAME.GRAPH) {
             if (modelName === MODELS.MRKGROWTH) {
                cells.push({
                   value:<GraphModalBtn
                            isMarket={true}
                            tgName={data[KEY_NAME.MARKET_NAME]} 
                            tgCode={data[KEY_NAME.MARKET_CODE]} 
                            yearRawDataPerUnit={yearRawDataByMrk[data[KEY_NAME.MARKET_CODE]]} 
                            quarterRawDataPerUnit={quarterRawDataByMrk[data[KEY_NAME.MARKET_CODE]]}
                         />,
                   key: i+o,
                })
             } else {
                cells.push({
                   value: <GraphModalBtn
                      tgName={data[KEY_NAME.SHARE_NAME]} 
                      tgCode={data[KEY_NAME.SHARE_CODE]} 
                      yearRawDataPerUnit={yearRawDataByShare[data[KEY_NAME.SHARE_CODE]]} 
                      quarterRawDataPerUnit={quarterRawDataByShare[data[KEY_NAME.SHARE_CODE]]}
                   />,
                   key: i+o,
                })
             }
          } else {
             cells.push({
                value: data[col],
                key: i+o,
             })
          }
       })

       return ({
          cells: cells
       })
    })

    return {
       header: header,
       records: records
    }
  }

  return (
      <FixedSideTableTest
        header={datatable.header}
        records={datatable.records}
        isFilter={{filterStatus}}
      />
    )
};

export default DataTableWrapper;
