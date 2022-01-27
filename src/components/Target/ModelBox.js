import React, { useState, useContext, useEffect } from 'react';
import {
  MDBCard, MDBCardBody, MDBIcon, MDBCardTitle, MDBCardText, MDBDataTableV5 
} from 'mdbreact';
import IconButton from '@material-ui/core/IconButton';
import _ from "lodash";
import { useSnackbar } from 'notistack';
import {useTranslation} from "react-i18next";
import axios from 'axios';

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
import { API } from '../../consts/api';

import GraphModalBtn from '../Share/GraphModalBtn';
import GraphTypeSelectModal from '../Share/GraphTypeSelectModal';

const ModelBox = (props) => {
   const {id, model, rawData, displayCols, modelBoxStatus, setModelBoxStatus} = props;
   const { t } = useTranslation();
   const { enqueueSnackbar } = useSnackbar();
   const {country} = useContext(ShareDataContext);
   const [filterStatus, setFilterStatus] = useState(FILTER_BY_MDL);
   const [selectedGraphType, setSelectedGraphType] = useState(displayCols);

   const rawData2TableData = (rawData, tgColList) => {
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
                  row[col] = <GraphModalBtn
                     tgName={data[KEY_NAME.SHARE_NAME]} 
                     tgCode={data[KEY_NAME.SHARE_CODE]} 
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

   const applyModelBtn = (selectedModel) => {
      // Validation
      if (_.find(modelBoxStatus, ['model', selectedModel])) {
         // Show status msg
         enqueueSnackbar(MSG.BOX_ALREADY_EXIST, {variant: ERROR});
      } else {
         axios({
            method: API.POST_MODEL.METHOD,
            url: API.POST_MODEL.URL,
            data: {
               data: {
                  model: selectedModel,
                  country: country,
                  filter: filterStatus[selectedModel]
               }
            }
         })
         .then(res => {
            if(res.data.status === "success" ) {
               const tgData = res.data.payload.value;

               // Select showing cols
               const colsByModel = MODEL_TABLE_COL[selectedModel];
               setSelectedGraphType(colsByModel);

               // update modelBoxStatus
               const dcModelBoxStatus = [...modelBoxStatus];
               const tgIdx = _.findIndex(dcModelBoxStatus, ['id', id]);
               dcModelBoxStatus[tgIdx].model = selectedModel;
               dcModelBoxStatus[tgIdx].rawData = rawData2TableData(tgData, colsByModel);
               setModelBoxStatus(dcModelBoxStatus);
            } else {
            // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
            }
         });
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
      if (model !== "default") {
         axios({
            method: API.POST_MODEL.METHOD,
            url: API.POST_MODEL.URL,
            data: {
               data: {
                  model: model,
                  country: country,
                  filter: filterStatus[model]
               }
            }
         })
         .then(res => {
            if(res.data.status === "success" ) {
               const tgData = res.data.payload.value;

               // Select showing cols
               const colsByModel = MODEL_TABLE_COL[model];
               setSelectedGraphType(colsByModel);

               // update modelBoxStatus
               const dcModelBoxStatus = [...modelBoxStatus];
               const tgIdx = _.findIndex(dcModelBoxStatus, ['id', id]);
               dcModelBoxStatus[tgIdx].model = model;
               dcModelBoxStatus[tgIdx].rawData = tgData;
               setModelBoxStatus(dcModelBoxStatus);
            } else {
            // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
            }
         });
      }
   }, [filterStatus])

   // 아래의 API는 컬럼조정을 위한 useEffect
   // 위의 useEffect에서 컨트롤하지 않는 이유는 API통신을 최대한 자제하기 위함
   useEffect(() => {
      if (model !== "default") {
         // update modelBoxStatus
         const dcModelBoxStatus = [...modelBoxStatus];
         const tgIdx = _.findIndex(dcModelBoxStatus, ['id', id]);
         dcModelBoxStatus[tgIdx].displayCols = selectedGraphType;
         setModelBoxStatus(dcModelBoxStatus);
      }
   }, [selectedGraphType])

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
                  {rawData? <GraphTypeSelectModal selectedGraphType={selectedGraphType} setSelectedGraphType={setSelectedGraphType} allGraphType={BY_SHARE_ALL_TABLE_COL_TYPE}/>:<></>}
                  <IconButton className="float-right" color="secondary" aria-label="upload picture" component="span">
                     <MDBIcon onClick={() => {removeModelBtn()}} icon="times" />
                  </IconButton>
               </div>
            </MDBCardTitle>
            <MDBCardText>
               {rawData? <MDBDataTableV5 striped bordered small hover entriesOptions={[5, 10, 20, 30]} entries={10} pagesAmount={4} data={rawData} />:<NoModelSelected/>}
            </MDBCardText>
         </MDBCardBody>
      </MDBCard>
   )
   };

export default ModelBox;
