import React, { useState, useContext, useEffect } from 'react';
import {
  MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBCardTitle, MDBCardText, MDBDataTableV5 
} from 'mdbreact';
import IconButton from '@material-ui/core/IconButton';
import _ from "lodash";
import { useSnackbar } from 'notistack';
import {useTranslation} from "react-i18next";

import NoModelSelected from './NoModelSelected';
import FilterWrapper from './FilterWrapper';
import ShareDataContext from "../../contexts/ShareDataContext";
import { ERROR } from "../../consts/alert";
import { MODELS } from "../../consts/model";
import { MODEL_TABLE_COL } from "../../consts/tbCol";
import { MODEL_NAME } from "../../consts/model";
import { KEY_NAME, OTHER_KEY_NAME } from "../../consts/keyName";
import { FILTER_BY_MDL } from "../../consts/filter";
import { MSG } from "../../consts/message";
import { BY_SHARE_ALL_TABLE_COL_TYPE } from "../../consts/tbCol";

import getModelData from '../../utils/getModelData';
import GraphModalBtn from '../Share/GraphModalBtn';
import GraphTypeSelectModal from '../Share/GraphTypeSelectModal';

const ModelBox = (props) => {
   const {id, model, modelBoxStatus, setModelBoxStatus} = props;
   const { t } = useTranslation();
   const { enqueueSnackbar } = useSnackbar();
   const {yearRawDataByShare, quarterRawDataByShare, yearRawDataByMrk, quarterRawDataByMrk} = useContext(ShareDataContext);
   const [datatable, setDatatable] = useState(null);
   const [filterStatus, setFilterStatus] = useState(FILTER_BY_MDL);
   const [selectedGraphType, setSelectedGraphType] = useState();

   const rawData2TableData = (modelName, rawData, tgColList) => {
      // Create columns
      const columns = tgColList.map((v,i) => {
         return {
            label: t(`common.rawData.${v}`),
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
         enqueueSnackbar(MSG.BOX_ALREADY_EXIST, {variant: ERROR});
      } else {
         // Run model
         const tgData = getModelData(value, yearRawDataByShare, quarterRawDataByShare, quarterRawDataByMrk, filterStatus);
         const colsByModel = MODEL_TABLE_COL[value];
         setSelectedGraphType(colsByModel);
         setDatatable(rawData2TableData(value, tgData, colsByModel));

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
         enqueueSnackbar(MSG.MIN_BOX_NUM, {variant: ERROR});
      }
   }
   
   useEffect(() => {
      if(model !== 'default'){ // Do not run on first running
         const tgData = getModelData(model, yearRawDataByShare, quarterRawDataByShare, quarterRawDataByMrk, filterStatus);
         setDatatable(rawData2TableData(model, tgData, selectedGraphType));
      }
   }, [filterStatus, selectedGraphType])

   return (
      <MDBCard className="mb-4">
         <MDBCardBody>
            <MDBCardTitle>
               <div className="float-left w-25">
                  <select className="browser-default custom-select" onChange={(e) => {applyModelBtn(e.target.value)}}>
                     <option value="default" selected={model=="default"}>{t('target.chooseModel')}</option>
                     {Object.keys(MODELS).map((v, i) => {
                        return <option value={MODELS[v]} selected={model==MODELS[v]}>{MODEL_NAME[v]}</option>
                     })}
                  </select>
               </div>
               <div className="">
                  <FilterWrapper model={model} filterStatus={filterStatus} setFilterStatus={setFilterStatus}/>
                  {model !== "default"? <GraphTypeSelectModal selectedGraphType={selectedGraphType} setSelectedGraphType={setSelectedGraphType} allGraphType={BY_SHARE_ALL_TABLE_COL_TYPE}/>:<></>}
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
