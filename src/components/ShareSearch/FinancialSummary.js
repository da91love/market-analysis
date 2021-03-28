import React, { useEffect, useState } from 'react';
import {MDBCard, MDBCardTitle, MDBCardText, MDBIcon, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import FixedSideUnionTable from '../Share/FixedSideUnionTable';
import { SEARCH_TABLE_COL } from '../../consts/tbCol';
import { KEY_NAME } from '../../consts/keyName';
import { BLANK, PERIOD_UNIT } from '../../consts/common';

const FinancialSummary = (props) => {
    const {yearRawDataByShare, quarterRawDataByShare} = props;
    const [hidden, setHidden] = useState(false);
    const [dataTableData, setDataTableData] = useState();
    const [activeTab, setActiveTab] = useState(PERIOD_UNIT.QUARTER);

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
    
          return cells;
        })
    
        // cells의 가장 첫번째 엘리먼트로 fixedCol의 값 삽입
        fixedCol.forEach((v, i) => {
          (records[i]).unshift({
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

    const tabHandler = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    useEffect(() => {
        setDataTableData({
            [PERIOD_UNIT.YEAR]: rawData2FixedTableData(yearRawDataByShare, SEARCH_TABLE_COL),
            [PERIOD_UNIT.QUARTER]: rawData2FixedTableData(quarterRawDataByShare, SEARCH_TABLE_COL),
        });
    }, [yearRawDataByShare, quarterRawDataByShare])

    return (
        <MDBCard className="card-body">
            <MDBCardTitle className="h3">
                <span className="h3">Financial Summary</span>
                {hidden?<MDBIcon className={"float-right"} onClick={hiddenHandler} icon="angle-down" />:<MDBIcon className={"float-right"} onClick={hiddenHandler} icon="angle-up" />}
            </MDBCardTitle>
            <MDBCardText>
                {dataTableData && !hidden?
                <>
                    <MDBNav className="nav-tabs">
                        <MDBNavItem>
                            <MDBNavLink link to="#" active={activeTab === PERIOD_UNIT.YEAR} onClick={() => tabHandler(PERIOD_UNIT.YEAR)} role="tab" >
                                Yearly
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink link to="#" active={activeTab === PERIOD_UNIT.QUARTER} onClick={() => tabHandler(PERIOD_UNIT.QUARTER)} role="tab" >
                                Quarterly
                            </MDBNavLink>
                        </MDBNavItem>
                    </MDBNav>
                    <MDBTabContent activeItem={activeTab} >
                        <MDBTabPane tabId={PERIOD_UNIT.YEAR} role="tabpanel">
                            <div className="mt-3">
                                <FixedSideUnionTable
                                    header={dataTableData[PERIOD_UNIT.YEAR].header}
                                    records={dataTableData[PERIOD_UNIT.YEAR].records}
                                    labelColumnNum={1}
                                    tableId={'yearFinancialSummary'}
                                />
                            </div>                  
                        </MDBTabPane>
                        <MDBTabPane tabId={PERIOD_UNIT.QUARTER} role="tabpanel">
                            <div className="mt-3">
                                <FixedSideUnionTable
                                    header={dataTableData[PERIOD_UNIT.QUARTER].header}
                                    records={dataTableData[PERIOD_UNIT.QUARTER].records}
                                    labelColumnNum={1}
                                    tableId={'quarterFinancialSummary'}
                                />
                            </div>
                        </MDBTabPane>
                    </MDBTabContent>
                </>
                :null}
            </MDBCardText>
        </MDBCard>
    )
};

export default FinancialSummary;
