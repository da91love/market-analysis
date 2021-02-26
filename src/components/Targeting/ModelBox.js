import React, { useState, useContext } from 'react';
import {
  MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBCardTitle, MDBCardText, MDBDataTable
} from 'mdbreact';
import IconButton from '@material-ui/core/IconButton';
import _ from "lodash";

import TargetDataTable from './TargetDataTable';
import NoModelSelected from './NoModelSelected';
import AlertContext from "../../contexts/AlertContext";
import { DANGER } from "../../consts/alert";
import { MODELS } from "../../consts/model";
import { MSG } from "../../consts/message"

const ModelBox = (props) => {
   const {alertState,setAlertState} = useContext(AlertContext);
   const {id, model, modelBoxStatus, setModelBoxStatus} = props;
   
   const applyModelBtn = (value) => {
      const dcModelBoxStatus = [...modelBoxStatus];
      dcModelBoxStatus[_.findIndex(dcModelBoxStatus, ['id', id])].model = value;
      setModelBoxStatus(dcModelBoxStatus);
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
                     <option value={MODELS.VALUE} selected={model==MODELS.VALUE}>Value Stock Model</option>
                     <option value={MODELS.GROWTH} selected={model==MODELS.GROWTH}>Growth Stock Model</option>
                     <option value={MODELS.TURNOVER} selected={model==MODELS.TURNOVER}>Turnover Stock Model</option>
                     <option value={MODELS.BLUECHIP} selected={model==MODELS.BLUECHIP}>BlueChip Stock Model</option>
                     <option value={MODELS.COLLAPSE} selected={model==MODELS.COLLAPSE}>Collapse Stock Model</option>
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
               {model !== "default"? <TargetDataTable/>:<NoModelSelected/>}
            </MDBCardText>
         </MDBCardBody>
      </MDBCard>
   )
   };

export default ModelBox;
