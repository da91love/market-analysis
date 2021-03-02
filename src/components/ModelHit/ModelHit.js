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
  const [yearData,setYearData] = useState(null);
  const [quarterData,setQuarterData] = useState(null);
  const [yearDataByShareCode,setYearDataByShareCode] = useState(null);
  const [quarterDataByShareCode,setQuarterDataByShareCode] = useState(null);

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
      <MDBContainer>
        <ModelBox/>
      </MDBContainer>
    </ShareDataContext.Provider>

    )
};

export default ModelHit;
