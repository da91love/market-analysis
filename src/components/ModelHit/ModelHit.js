import React, { useState, useContext, useEffect } from 'react';
import {
  MDBRow, MDBContainer, MDBCol, MDBIcon
} from 'mdbreact';
import AlertContext from '../../contexts/AlertContext';
import ShareDataContext from '../../contexts/ShareDataContext';
import ModelBox from './ModelBox';
import _ from "lodash";
import { DANGER } from "../../consts/alert";
import { MSG } from "../../consts/message";
import { MODELS } from "../../consts/model";

// Temp: import json
import yData from "../../statics/year_result.json";
import qData from "../../statics/quarter_result.json";

const ModelHit = () => {
  const [yearRawData,setYearRawData] = useState(null);
  const [quarterRawData,setQuarterRawData] = useState(null);
  const [yearRawDataByShare,setyearRawDataByShare] = useState(null);
  const [quarterRawDataByShare,setquarterRawDataByShare] = useState(null);

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

    setYearRawData(yData);
    setQuarterRawData(qData);
    setyearRawDataByShare(yearDataByGroup);
    setquarterRawDataByShare(quarterDataByGroup);
  }, [])

  return (
    <ShareDataContext.Provider value={{
      yearRawData, setYearRawData, 
      quarterRawData, setQuarterRawData,
      yearRawDataByShare, setyearRawDataByShare,
      quarterRawDataByShare, setquarterRawDataByShare
      }}>
      <MDBContainer>
        <ModelBox/>
      </MDBContainer>
    </ShareDataContext.Provider>

    )
};

export default ModelHit;
