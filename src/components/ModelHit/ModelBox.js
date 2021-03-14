import React, { useState, useContext, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBDataTableV5 } from 'mdbreact';
import _ from "lodash";

import ShareDataContext from "../../contexts/ShareDataContext";
import ShareTargetModelEngine from '../../utils/ShareTargetModelEngine';
import GraphModalBtn from '../Share/GraphModalBtn';

import { MODELS, MODEL_HIT_TABLE_COL } from "../../consts/model";
import { FILTER } from "../../consts/filter";
import { KEY_NAME, OTHER_KEY_NAME } from "../../consts/keyName";
import { EXTERNAL_URL } from "../../consts/common"

const ModelBox = (props) => {
   const {isInitDataLoaded, yearRawDataByShare, quarterRawDataByShare} = useContext(ShareDataContext);
   const [datatable, setDatatable] = useState(null);
  
   const rawData2TableData = (rawData, tgColList) => {
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
                  row[col] = <GraphModalBtn
                     tgName={data[KEY_NAME.SHARE_NAME]} 
                     tgCode={data[KEY_NAME.SHARE_CODE]} 
                     yearRawDataPerUnit={yearRawDataByShare[data[KEY_NAME.SHARE_CODE]]} 
                     quarterRawDataPerUnit={quarterRawDataByShare[data[KEY_NAME.SHARE_CODE]]}
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

   useEffect(() => {
      if (isInitDataLoaded) {
         // Run model
         const valueModelData = ShareTargetModelEngine.getValueModel(quarterRawDataByShare, FILTER);
         const turnAroundModelData = ShareTargetModelEngine.getTurnAroundModel(quarterRawDataByShare, FILTER);
         const cpGrowthModelData = ShareTargetModelEngine.getCpGrowthModel(quarterRawDataByShare, FILTER);
         const collapseModelData = ShareTargetModelEngine.getCollapseModel(yearRawDataByShare, FILTER);
         const blueChipModelData = ShareTargetModelEngine.getBluechipModel(quarterRawDataByShare, FILTER);

         const dataTableInput = (Object.keys(quarterRawDataByShare).map((shareCode, i) => {
            const tgShareData = quarterRawDataByShare[shareCode];

            const isValueModelMatched = _.find(valueModelData, [KEY_NAME.SHARE_CODE, shareCode]);
            const isTurnAroundModelMatched = _.find(turnAroundModelData, [KEY_NAME.SHARE_CODE, shareCode]);
            const isCpGrowthModelMatched = _.find(cpGrowthModelData, [KEY_NAME.SHARE_CODE, shareCode]);
            const isCollapseModelMatched = _.find(collapseModelData, [KEY_NAME.SHARE_CODE, shareCode]);
            const isBlueChipModelMatched = _.find(blueChipModelData, [KEY_NAME.SHARE_CODE, shareCode]);
            const numOfMatched = [isValueModelMatched, isTurnAroundModelMatched, isCpGrowthModelMatched, isCollapseModelMatched, isBlueChipModelMatched].filter(Boolean).length;

            return {
               [KEY_NAME.PERIOD]: _.last(tgShareData)[KEY_NAME.PERIOD],
               [KEY_NAME.SHARE_NAME]: _.last(tgShareData)[KEY_NAME.SHARE_NAME],
               [KEY_NAME.SHARE_CODE]: _.last(tgShareData)[KEY_NAME.SHARE_CODE],
               [KEY_NAME.MV]: _.last(tgShareData)[KEY_NAME.MV],
               [OTHER_KEY_NAME.SCORE]: numOfMatched,
               [OTHER_KEY_NAME.GRAPH]: null,
               [MODELS.VALUE]: isValueModelMatched?"O":"X",
               [MODELS.TURNAROUND]: isTurnAroundModelMatched?"O":"X",
               [MODELS.CPGROWTH]: isCpGrowthModelMatched?"O":"X",
               [MODELS.COLLAPSE]: isCollapseModelMatched?"O":"X",
               [MODELS.BLUECHIP]: isBlueChipModelMatched?"O":"X",
            }
         }));
         
         setDatatable(rawData2TableData(dataTableInput, MODEL_HIT_TABLE_COL));
      }
   }, [isInitDataLoaded])

   return (
      <MDBCard className="mt-3 mb-3">
         <MDBCardBody>
            <MDBCardTitle>
            </MDBCardTitle>
            <MDBCardText>
               {datatable?<MDBDataTableV5 
               responsive 
               striped 
               bordered 
               small 
               hover 
               entriesOptions={[20, 30, 40, 50]} 
               entries={20} 
               pagesAmount={4} 
               data={datatable} 

               />: null}
            </MDBCardText>
         </MDBCardBody>
      </MDBCard>
   )
   };

export default ModelBox;
