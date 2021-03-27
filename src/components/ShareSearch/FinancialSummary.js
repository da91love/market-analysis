import React, { useEffect, useState } from 'react';
import {MDBCard, MDBCardTitle, MDBCardText} from 'mdbreact';
import rawData2FixedTableData from '../../utils/rawData2FixedTableData';
import FixedSideTable from '../Share/FixedSideTable';
import { SEARCH_TABLE_COL } from '../../consts/tbCol';

const FinancialSummary = (props) => {
    const {periodRawDataByShare} = props;
    const [dataTableData, setDataTableData] = useState();

    useEffect(() => {
        setDataTableData(rawData2FixedTableData(periodRawDataByShare, SEARCH_TABLE_COL));
    }, [periodRawDataByShare])

    return (
        <MDBCard className="card-body">
            <MDBCardTitle className="h3">Financial Summary</MDBCardTitle>
            <MDBCardText>
                {dataTableData?
                    <FixedSideTable
                        header={dataTableData.header}
                        records={dataTableData.records}
                        fixedNum={1}
                    />
                :null}
            </MDBCardText>
        </MDBCard>
    )
};

export default FinancialSummary;
