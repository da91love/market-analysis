import React, { useState, useContext } from 'react';
import {
  MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBCardTitle, MDBCardText, MDBDataTable
} from 'mdbreact';
import IconButton from '@material-ui/core/IconButton';
import _ from "lodash";

import TargetDataTable from './TargetDataTable';
import NoModelSelected from './NoModelSelected';
import RawData2TableData from './RawData2TableData';
import AlertContext from "../../contexts/AlertContext";
import ShareDataContext from "../../contexts/ShareDataContext";
import { DANGER } from "../../consts/alert";
import { MODELS, MODEL_TABLE_COL } from "../../consts/model";
import { MODEL_NAME } from "../../consts/model";
import { MSG } from "../../consts/message"

import ShareTargetModelEngine from '../../utils/ShareTargetModelEngine';


const ModelBox = (props) => {
   const {id, model, modelBoxStatus, setModelBoxStatus} = props;

   const {alertState,setAlertState} = useContext(AlertContext);
   const {quarterDataByShareCode} = useContext(ShareDataContext);
   const [datatable, setDatatable] = useState(null);   
   
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
         if (value === MODELS.VALUE) {

         } else if (value == MODELS.TURNAROUND) {
            const tgData = ShareTargetModelEngine.getTurnAroundModel(quarterDataByShareCode);
            setDatatable(RawData2TableData(tgData, MODEL_TABLE_COL.TURNAROUND));
         } else if (value === MODELS.GROWTH) {

         } else if (value === MODELS.COLLAPSE) {

         } else if (value === MODELS.BLUECHIP) {

         }

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

   return (
      <MDBCard className="mb-3">
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
                  <IconButton color="default" aria-label="upload picture" component="span">
                     <MDBIcon icon="filter" />
                  </IconButton>
                  <IconButton className="float-right" color="secondary" aria-label="upload picture" component="span">
                     <MDBIcon onClick={() => {removeModelBtn()}} icon="times" />
                  </IconButton>
               </div>
            </MDBCardTitle>
            <MDBCardText>
               {model !== "default"? <TargetDataTable datatable={datatable}/>:<NoModelSelected/>}
            </MDBCardText>
         </MDBCardBody>
      </MDBCard>
   )
   };

export default ModelBox;
