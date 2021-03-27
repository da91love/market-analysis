import React, { useState, useContext, useEffect } from 'react';
import {
    MDBCard, MDBCardTitle, MDBCardText, MDBIcon, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink
} from 'mdbreact';
import _ from "lodash";
import FixedSideUnionTable from '../Share/FixedSideUnionTable';
import { KEY_NAME, OTHER_KEY_NAME} from '../../consts/keyName';
import { BLANK } from '../../consts/common';

// Temp: import json
const Valuation = (props) => {
    const {lastQuarterRawData} = props;
    const [activeTab, setActiveTab] = useState(KEY_NAME.PER);
    const [hidden, setHidden] = useState(true);
    const [dataTableData, setDataTableData] = useState(true);

    const fixedCol = [KEY_NAME.PER, OTHER_KEY_NAME.PRICE, KEY_NAME.EPS, KEY_NAME.SHARE_NUM, KEY_NAME.MV, KEY_NAME.NP_CTRL, KEY_NAME.NPM, KEY_NAME.SALES];

    const rawData2FixedTableData = (periodRawData, fixedCol) => {
        // Add share price to lastQuarterRawData
        lastQuarterRawData[OTHER_KEY_NAME.PRICE] = _.round(lastQuarterRawData[KEY_NAME.MV]*100000000/lastQuarterRawData[KEY_NAME.SHARE_NUM], 2);

        const header = ['현재', '시나리오1', '시나리오2', '시나리오3', '시나리오4', '시나리오5',  '시나리오1', '시나리오2', '시나리오3', '시나리오4', '시나리오5',  '시나리오1', '시나리오2', '시나리오3', '시나리오4', '시나리오5'];
        // const header = headerList.map((v, i) => {
        //     return {
        //         value: v,
        //         key: i+1
        //     }
        // })
    
        // FixedCol이 별도로 정의되지 않았을 때
        if (!fixedCol){
          fixedCol = header;
        }
    
        const records = fixedCol.map((colName, rowNum) => {
            const cells = [];
            header.forEach((h, colNum) => {
                if (colNum === 0) {
                    cells.push({
                        value: periodRawData[colName],
                        key: rowNum+colNum,
                        backgroundColor: "#cccccc"
                    })
                } else {
                    if (colName === KEY_NAME.PER || colName === KEY_NAME.MV || colName === KEY_NAME.NPM) {
                        cells.push({
                            value: '',
                            key: rowNum+colNum,
                            isEditable: true
                        })
                    } else if (colName === KEY_NAME.SHARE_NUM) {
                        cells.push({
                            value: periodRawData[colName],
                            key: rowNum+colNum,
                        })
                    } else if (colName === KEY_NAME.NP_CTRL || colName === KEY_NAME.SALES) {
                        cells.push({
                            value: '',
                            key: rowNum+colNum,
                            backgroundColor: "#fad161"
                        })
                    } else {
                        cells.push({
                            value: '',
                            key: rowNum+colNum,
                        })
                    }
                }
            })

            return ({
                cells: cells
            })
        })
    
        // cells의 가장 첫번째 엘리먼트로 fixedCol의 값 삽입
        fixedCol.forEach((v, i) => {
            (records[i]['cells']).unshift({
                value: v,
                key: i,
            });
        });
    
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
        setDataTableData(rawData2FixedTableData(lastQuarterRawData, fixedCol));
    }, [lastQuarterRawData]);

    return (
    <MDBCard className="card-body">
        <MDBCardTitle>
            <span className="h3">Valuation</span>
            {hidden?<MDBIcon className={"float-right"} onClick={hiddenHandler} icon="angle-down" />:<MDBIcon className={"float-right"} onClick={hiddenHandler} icon="angle-up" />}
        </MDBCardTitle>
        <MDBCardText>
            {dataTableData && !hidden?
            <>
            <MDBNav className="nav-tabs">
                <MDBNavItem>
                    <MDBNavLink link to="#" active={activeTab === KEY_NAME.PER} onClick={() => tabHandler(KEY_NAME.PER)} role="tab" >
                        PER
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink link to="#" active={activeTab === KEY_NAME.POR} onClick={() => tabHandler(KEY_NAME.POR)} role="tab" >
                        POR
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink link to="#" active={activeTab === KEY_NAME.PSR} onClick={() => tabHandler(KEY_NAME.PSR)} role="tab" >
                        PCR
                    </MDBNavLink>
                </MDBNavItem>
            </MDBNav>
            <MDBTabContent activeItem={activeTab} >
                <MDBTabPane tabId={KEY_NAME.PER} role="tabpanel">
                    <div className="mt-3">
                        {dataTableData?
                            <FixedSideUnionTable
                                header={dataTableData.header}
                                records={dataTableData.records}
                                labelColumnNum={1}
                                tableId={'test'}
                            />
                        :null}
                    </div>                     
                </MDBTabPane>
                <MDBTabPane tabId={KEY_NAME.POR} role="tabpanel">
                    <div className="mt-3">
                        POR
                    </div>
                </MDBTabPane>
                <MDBTabPane tabId={KEY_NAME.PSR} role="tabpanel">
                    <div className="mt-3">
                        PSR
                    </div>
                </MDBTabPane>
            </MDBTabContent>
            </>
            :null}
        </MDBCardText>
    </MDBCard>
    )
};

export default Valuation;
