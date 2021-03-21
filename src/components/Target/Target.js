import React, { useState, useContext } from 'react';
import {
  MDBRow, MDBContainer, MDBCol, MDBIcon
} from 'mdbreact';
import IconButton from '@material-ui/core/IconButton';
import ModelBox from './ModelBox'
import AlertContext from '../../contexts/AlertContext';
import _ from "lodash";
import { DANGER } from "../../consts/alert";
import { MSG } from "../../consts/message";
import { MODELS } from "../../consts/model";


const Targeting = () => {
  const {alertState,setAlertState} = useContext(AlertContext);
  const [modelBoxStatus, setModelBoxStatus] = useState([{
    id: 0,
    model: "default"
  }]);

  const appendModelBtn = (id) => {
    if (modelBoxStatus.length === Object.keys(MODELS).length) {
      setAlertState({
        eventType: DANGER, //ここでSUCCESS,WARNING,DANGERを選択
        eventMessage: MSG.BOX_OVER_MODEL,
        eventCount: alertState.eventCount + 1,
     });
    } else {
      setModelBoxStatus([...modelBoxStatus, {
        id: id,
        model: "default"
      }]);  
    }
 }  

  return (
    <MDBContainer className="mt-5 mb-5 pt-5 pb-5">
      <div>
        <span>Add model</span>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <MDBIcon onClick={() => appendModelBtn(modelBoxStatus[modelBoxStatus.length - 1].id+1)} icon="plus-square" />
        </IconButton>
      </div>
      <div>
        {modelBoxStatus.map((v, i) => {
          return <ModelBox className="w-75" id={v.id} model={v.model} modelBoxStatus={modelBoxStatus} setModelBoxStatus={setModelBoxStatus}/>
        })}
      </div>
    </MDBContainer>
  )
};

export default Targeting;
