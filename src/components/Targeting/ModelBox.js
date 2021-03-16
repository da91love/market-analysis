import React, { useState, useContext, useEffect } from 'react';
import {
  MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBCardTitle, MDBCardText, MDBDataTableV5 
} from 'mdbreact';
import IconButton from '@material-ui/core/IconButton';
import _ from "lodash";

import NoModelSelected from './NoModelSelected';
import FilterModalBtn from './FilterModalBtn';
import AlertContext from "../../contexts/AlertContext";
import ShareDataContext from "../../contexts/ShareDataContext";
import { DANGER } from "../../consts/alert";
import { MODELS, MODEL_TABLE_COL } from "../../consts/model";
import { MODEL_NAME } from "../../consts/model";
import { KEY_NAME, OTHER_KEY_NAME } from "../../consts/keyName";
import { FILTER } from "../../consts/filter";
import { MSG } from "../../consts/message"

import getModelData from '../../utils/getModelData';
import GraphModalBtn from '../Share/GraphModalBtn';
import FixedSideTableTest from '../Share/FixedSideTableTest';

const ModelBox = (props) => {
   const {id, model, modelBoxStatus, setModelBoxStatus} = props;

   const {alertState,setAlertState} = useContext(AlertContext);
   const {yearRawDataByShare, quarterRawDataByShare, yearRawDataByMrk, quarterRawDataByMrk} = useContext(ShareDataContext);
   const [datatable, setDatatable] = useState(null);
   const [filterStatus, setFilterStatus] = useState(FILTER);
   
   const rawData2CTableData = (modelName, rawData, tgColList) => {
      
      const header = tgColList;

      const records = rawData.map((data, i) => {
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

   const rawData2TableData = (modelName, rawData, tgColList) => {
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

      return {
            columns: columns,
            rows: rows
      }
   }

   const applyModelBtn = (value) => {
      // Validation
      if (_.find(modelBoxStatus, ['model', value])) {
         // Show status msg
         setAlertState({
            eventType: DANGER, //ここでSUCCESS,WARNING,DANGERを選択
            eventMessage: MSG.BOX_ALREADY_EXIST,
            eventCount: alertState.eventCount + 1,
         });
      } else {
         // Run model
         const tgData = getModelData(value, yearRawDataByShare, quarterRawDataByShare, quarterRawDataByMrk, filterStatus);
         setDatatable(rawData2TableData(value, tgData, MODEL_TABLE_COL[_.findKey(MODELS, v => v === value)]));

         // update modelBoxStatus
         const dcModelBoxStatus = [...modelBoxStatus];
         dcModelBoxStatus[_.findIndex(dcModelBoxStatus, ['id', id])].model = value;
         setModelBoxStatus(dcModelBoxStatus);
      }
   }

   const removeModelBtn = () => {
      if (modelBoxStatus.length > 1) {
         const dcModelBoxStatus = [...modelBoxStatus];
         dcModelBoxStatus.splice(_.findIndex(dcModelBoxStatus, ['id', id]), 1);
         setModelBoxStatus(dcModelBoxStatus);
      } else {
         // Show status msg
         setAlertState({
            eventType: DANGER, //ここでSUCCESS,WARNING,DANGERを選択
            eventMessage: MSG.MIN_BOX_NUM,
            eventCount: alertState.eventCount + 1,
         });
      }
   }
   
   useEffect(() => {
      if(model !== 'default'){ // Do not run on first running
         const tgData = getModelData(model, yearRawDataByShare, quarterRawDataByShare, quarterRawDataByMrk, filterStatus);
         setDatatable(rawData2TableData(model, tgData, MODEL_TABLE_COL[_.findKey(MODELS, v => v === model)]));
      }
   }, [filterStatus])

   return (
      <MDBCard className="mt-3 mb-3">
         <MDBCardBody>
            <MDBCardTitle>
               <div className="float-left w-25">
                  <select className="browser-default custom-select" onChange={(e) => {applyModelBtn(e.target.value)}}>
                     <option value="default" selected={model=="default"}>Choose your model</option>
                     {Object.keys(MODELS).map((v, i) => {
                        return <option value={MODELS[v]} selected={model==MODELS[v]}>{MODEL_NAME[v]}</option>
                     })}
                  </select>
               </div>
               <div className="">
                  <FilterModalBtn model={model} filterStatus={filterStatus} setFilterStatus={setFilterStatus}/>
                  <IconButton className="float-right" color="secondary" aria-label="upload picture" component="span">
                     <MDBIcon onClick={() => {removeModelBtn()}} icon="times" />
                  </IconButton>
               </div>
            </MDBCardTitle>
            <MDBCardText>
               {/* {model !== "default"? <FixedSideTableTest header={datatable.header} records={datatable.records}/>:<NoModelSelected/>} */}
               {model !== "default"? <MDBDataTableV5 striped bordered small hover entriesOptions={[5, 10, 20, 30]} entries={10} pagesAmount={4} data={datatable} />:<NoModelSelected/>}
            </MDBCardText>
         </MDBCardBody>
      </MDBCard>
   )
   };

export default ModelBox;
