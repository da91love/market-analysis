import React, { useEffect, useState } from 'react';
import {MDBCard, MDBCardTitle, MDBCardText, MDBIcon} from 'mdbreact';
import FixedSideUnionTable from '../Share/FixedSideUnionTable';
import { SEARCH_TABLE_COL } from '../../consts/tbCol';
import { KEY_NAME } from '../../consts/keyName';
import { BLANK } from '../../consts/common';

const FinancialSummary = (props) => {
    const {periodRawDataByShare} = props;
    const [hidden, setHidden] = useState(false);
    const [dataTableData, setDataTableData] = useState();

    const rawData2FixedTableData = (periodRawData, fixedCol) => {
        const header = periodRawData.map((v, i) => {
          return v[KEY_NAME.PERIOD];
        })

        const records = fixedCol.map((v, i) => {
          const cells = [];
          periodRawData.forEach((b, o) => {
            cells.push({
              value: b[v]?b[v]:BLANK,
              key: i+o,
            })
          })
    
          return ({
            cells: cells
          })
        })
    
        // cells의 가장 첫번째 엘리먼트로 fixedCol의 값 삽입
        fixedCol.forEach((v, i) => {
          (records[i]['cells']).unshift({
            value: v,
            key: 0,
            popOver: {
              popOverHeader: v,
              popOverBody: periodRawData
            }
        })
        })
    
        // FixedCol의 1열 이상일 때, header의 앞에 빈값 삽입
        header.unshift(BLANK);
    
        return ({
          header: header,
          records: records,
        })
    }

    const hiddenHandler = () => {
        setHidden(!hidden);
    }

    useEffect(() => {
        setDataTableData(rawData2FixedTableData(periodRawDataByShare, SEARCH_TABLE_COL));
    }, [periodRawDataByShare])

    return (
        <MDBCard className="card-body">
            <MDBCardTitle className="h3">
                <span className="h3">Financial Summary</span>
                {hidden?<MDBIcon className={"float-right"} onClick={hiddenHandler} icon="angle-down" />:<MDBIcon className={"float-right"} onClick={hiddenHandler} icon="angle-up" />}
            </MDBCardTitle>
            <MDBCardText>
                {dataTableData && !hidden?
                    <FixedSideUnionTable
                        header={dataTableData.header}
                        records={dataTableData.records}
                        labelColumnNum={1}
                        tableId={'financialSummary'}
                    />
                :null}
            </MDBCardText>
        </MDBCard>
    )
};

export default FinancialSummary;
