import React, { useState, useContext, useEffect } from 'react';
import {
  MDBRow, MDBContainer, MDBCol, MDBIcon
} from 'mdbreact';
import IconButton from '@material-ui/core/IconButton';
import ModelBox from './ModelBox'
import AlertContext from '../../contexts/AlertContext';
import ShareDataContext from '../../contexts/ShareDataContext';
import _ from "lodash";
import { DANGER } from "../../consts/alert";
import { MSG } from "../../consts/message";
import { MODELS } from "../../consts/model";

// Temp: import json
import yData from "../../statics/year_result.json";
import qData from "../../statics/quarter_result.json";

const Targeting = () => {
  const {alertState,setAlertState} = useContext(AlertContext);
  const [yearData,setYearData] = useState(null);
  const [quarterData,setQuarterData] = useState(null);
  const [yearDataByShareCode,setYearDataByShareCode] = useState(null);
  const [quarterDataByShareCode,setQuarterDataByShareCode] = useState(null);
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

  useEffect(() => {
    // Get share data from DB(temporary from json)
    let yearDataByGroup = _.groupBy(yData, v => v.shareCode);
    let quarterDataByGroup = _.groupBy(qData, v => v.shareCode);

    // sortBy
    yearDataByGroup = _.forEach(yearDataByGroup, (v, k) => {
      yearDataByGroup[k] = _.sortBy(v, o => o.period);
    });

    quarterDataByGroup = _.forEach(quarterDataByGroup, (v, k) => {
      quarterDataByGroup[k] = _.sortBy(v, o => o.period);
    });

    setYearData(yData);
    setQuarterData(qData);
    setYearDataByShareCode(yearDataByGroup);
    setQuarterDataByShareCode(quarterDataByGroup);
  }, [])

  return (
    <ShareDataContext.Provider value={{
      yearData, setYearData, 
      quarterData, setQuarterData,
      yearDataByShareCode, setYearDataByShareCode,
      quarterDataByShareCode, setQuarterDataByShareCode
      }}>
      <div className="">
        <MDBContainer>
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
      </div>
    </ShareDataContext.Provider>

    )
};

export default Targeting;
