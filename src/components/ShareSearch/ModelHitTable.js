import React from 'react';
import {MDBCard, MDBCardTitle, MDBCardText} from 'mdbreact';
import getAllMatchedTgByModel from '../../utils/getAllMatchedTgByModel';
import FixedSideTable from '../Share/FixedSideTable';
import { FILTER_BY_MDL } from '../../consts/filter';
import { MODELS } from '../../consts/model';

const ModelHitTable = (props) => {
    const {shareCode, marketCode, quarterRawDataByMrk, yearRawDataByShare, quarterRawDataByShare} = props;

    const allMatchedTgByModel = getAllMatchedTgByModel(quarterRawDataByMrk, yearRawDataByShare, quarterRawDataByShare, FILTER_BY_MDL);
    const modelCompareTableData = function() {
        const header = Object.values(MODELS).map((model, i) => {
          return {
            value: model
          }
        });
    
        const allMatchedResultByModel = {};
        for (const model in allMatchedTgByModel) {
          if (model === MODELS.MRKGROWTH) {
            allMatchedResultByModel[model] = allMatchedTgByModel[model].includes(marketCode);
          } else {
            allMatchedResultByModel[model] = allMatchedTgByModel[model].includes(shareCode);
          }
        }
    
        const records = [];
        const cells = Object.keys(allMatchedResultByModel).map((v, i) => {
          // TODO
          return ({
            value: "　",
            key: v,
            backgroundColor: allMatchedResultByModel[v]?"#00C851":"#ff4444"
          })
        })
        records.push({cells: cells});
    
        return ({
          header: header,
          records: records
        })
    }();

  return (
    <MDBCard className="card-body">
        <MDBCardTitle className="h3">Model Hit Summary</MDBCardTitle>
        <MDBCardText>
            <FixedSideTable
                header={modelCompareTableData.header}
                records={modelCompareTableData.records}
            />
        </MDBCardText>
    </MDBCard>
    )
};

export default ModelHitTable;
