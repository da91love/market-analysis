import React, { useEffect, useState } from 'react';
import {MDBCard, MDBCardTitle, MDBCardText, MDBIcon} from 'mdbreact';
import rawData2FixedTableData from '../../utils/rawData2FixedTableData';
import FixedSideTable from '../Share/FixedSideTable';
import { SEARCH_TABLE_COL } from '../../consts/tbCol';

const FinancialSummary = (props) => {
    const {periodRawDataByShare} = props;
    const [hidden, setHidden] = useState(false);
    const [dataTableData, setDataTableData] = useState();

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
