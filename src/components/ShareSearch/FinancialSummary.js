import React from 'react';
import {MDBCard, MDBCardTitle, MDBCardText} from 'mdbreact';
import rawData2FixedTableData from '../../utils/rawData2FixedTableData';
import FixedSideTable from '../Share/FixedSideTable';
import { SEARCH_TABLE_COL } from '../../consts/tbCol';

const FinancialSummary = (props) => {
    const {periodRawDataByShare} = props;

    const periodFixedTableData = rawData2FixedTableData(periodRawDataByShare, SEARCH_TABLE_COL);

    return (
        <MDBCard className="card-body">
            <MDBCardTitle className="h3">Financial Summary</MDBCardTitle>
            <MDBCardText>
                <FixedSideTable
                header={periodFixedTableData.header}
                records={periodFixedTableData.records}
                fixedNum={1}
                />
            </MDBCardText>
        </MDBCard>
    )
};

export default FinancialSummary;
