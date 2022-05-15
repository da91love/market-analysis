import React, {useState, useEffect} from 'react';
import {MDBCard, MDBCardTitle, MDBCardText, MDBIcon} from 'mdbreact';
import {useTranslation} from "react-i18next";

import getAllMatchedTgByModel from '../../utils/getAllMatchedTgByModel';
import FixedSideTable from '../Share/FixedSideTable';
import { FILTER_BY_MDL } from '../../consts/filter';
import { MODELS } from '../../consts/model';
import { BLANK } from '../../consts/common';

const ModelHitTable = (props) => {
    const {shareCode, marketCode, quarterRawDataByMrk, yearRawDataByShare, quarterRawDataByShare} = props;
    const { t } = useTranslation();
    const [hidden, setHidden] = useState(false);
    const [dataTableData, setDataTableData] = useState();

    const createTableData = (yearRawDataByShare, quarterRawDataByShare, FILTER_BY_MDL) => {
        const allMatchedTgByModel = getAllMatchedTgByModel(yearRawDataByShare, quarterRawDataByShare, FILTER_BY_MDL);

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
            value: BLANK,
            key: v,
            backgroundColor: allMatchedResultByModel[v]?"#00C851":"#ff4444"
          })
        })
        records.push({cells: cells});
    
        return ({
          header: header,
          records: records
        })
    };

    const hiddenHandler = () => {
        setHidden(!hidden);
    }

    useEffect(() => {
        setDataTableData(createTableData(quarterRawDataByMrk, yearRawDataByShare, quarterRawDataByShare, FILTER_BY_MDL));
    }, [shareCode])

  return (
    <MDBCard className="card-body">
        <MDBCardTitle>
            <span className="h3">{t('shareSearch.label.modelHitSummary')}</span>
            {hidden?<MDBIcon className={"float-right"} onClick={hiddenHandler} icon="angle-down" />:<MDBIcon className={"float-right"} onClick={hiddenHandler} icon="angle-up" />}
        </MDBCardTitle>
        <MDBCardText>
            {dataTableData && !hidden?
                <FixedSideTable
                    header={dataTableData.header}
                    records={dataTableData.records}
                />
            :null}
        </MDBCardText>
    </MDBCard>
    )
};

export default ModelHitTable;
