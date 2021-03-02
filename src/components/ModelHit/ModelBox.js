import React, { useState, useContext, useEffect } from 'react';
import {
  MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBDataTableV5 
} from 'mdbreact';
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import _ from "lodash";

import RawData2TableData from '../Share/RawData2TableData';
import AlertContext from "../../contexts/AlertContext";
import ShareDataContext from "../../contexts/ShareDataContext";
import { DANGER } from "../../consts/alert";
import { MODELS, MODEL_HIT_TABLE_COL } from "../../consts/model";
import { KEY_NAME, OTHER_KEY_NAME } from "../../consts/keyName";
import { MSG } from "../../consts/message"

import ShareTargetModelEngine from '../../utils/ShareTargetModelEngine';


const ModelBox = (props) => {
   const {alertState,setAlertState} = useContext(AlertContext);
   const {yearDataByShareCode, quarterDataByShareCode} = useContext(ShareDataContext);
   const [datatable, setDatatable] = useState(null);   
   
   useEffect(() => {
      if (yearDataByShareCode && quarterDataByShareCode) {
         // Run model
         const valueModelData = ShareTargetModelEngine.getValueModel(quarterDataByShareCode);
         const turnAroundModelData = ShareTargetModelEngine.getTurnAroundModel(quarterDataByShareCode);
         const cpGrowthModelData = ShareTargetModelEngine.getCpGrowthModel(quarterDataByShareCode);
         const collapseModelData = ShareTargetModelEngine.getCollapseModel(yearDataByShareCode);
         const blueChipModelData = ShareTargetModelEngine.getBluechipModel(quarterDataByShareCode);

         const dataTableInput = (Object.keys(quarterDataByShareCode).map((shareCode, i) => {
            const tgShare = quarterDataByShareCode[shareCode];

            const isValueModelMatched = _.find(valueModelData, [KEY_NAME.SHARE_CODE, shareCode]);
            const isTurnAroundModelMatched = _.find(turnAroundModelData, [KEY_NAME.SHARE_CODE, shareCode]);
            const isCpGrowthModelMatched = _.find(cpGrowthModelData, [KEY_NAME.SHARE_CODE, shareCode]);
            const isCollapseModelMatched = _.find(collapseModelData, [KEY_NAME.SHARE_CODE, shareCode]);
            const isBlueChipModelMatched = _.find(blueChipModelData, [KEY_NAME.SHARE_CODE, shareCode]);
            const numOfMatched = [isValueModelMatched, isTurnAroundModelMatched, isCpGrowthModelMatched, isCollapseModelMatched, isBlueChipModelMatched].filter(Boolean).length;

            return {
               [KEY_NAME.PERIOD]: _.last(tgShare)[KEY_NAME.PERIOD],
               [KEY_NAME.SHARE_NAME]: _.last(tgShare)[KEY_NAME.SHARE_NAME],
               [KEY_NAME.SHARE_CODE]: _.last(tgShare)[KEY_NAME.SHARE_CODE],
               [KEY_NAME.MV]: _.last(tgShare)[KEY_NAME.MV],
               [KEY_NAME.SALES]: _.last(tgShare)[KEY_NAME.SALES],
               [OTHER_KEY_NAME.SCORE]: numOfMatched,
               [OTHER_KEY_NAME.GRAPH]: null,
               [MODELS.VALUE]: isValueModelMatched?"O":"X",
               [MODELS.TURNAROUND]: isTurnAroundModelMatched?"O":"X",
               [MODELS.CPGROWTH]: isCpGrowthModelMatched?"O":"X",
               [MODELS.COLLAPSE]: isCollapseModelMatched?"O":"X",
               [MODELS.BLUECHIP]: isBlueChipModelMatched?"O":"X",
               
            }
         }));
         
         setDatatable(RawData2TableData(dataTableInput, MODEL_HIT_TABLE_COL));
      }
   }, [yearDataByShareCode, quarterDataByShareCode])

   return (
      <MDBCard className="mt-3 mb-3">
         <MDBCardBody>
            <MDBCardTitle>
            </MDBCardTitle>
            <MDBCardText>
               {datatable?<MDBDataTableV5 striped bordered smallhover entriesOptions={[20, 30, 40, 50]} entries={20} pagesAmount={4} data={datatable} />: null}
            </MDBCardText>
         </MDBCardBody>
      </MDBCard>
   )
   };

export default ModelBox;
