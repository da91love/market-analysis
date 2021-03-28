import React, { useState, useContext, useEffect } from 'react';
import {
    MDBCard, MDBCardTitle, MDBCardText, MDBIcon, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink
} from 'mdbreact';
import _, { isEmpty } from "lodash";
import { useSnackbar } from 'notistack';
import FixedSideUnionTable from '../Share/FixedSideUnionTable';
import { KEY_NAME, OTHER_KEY_NAME} from '../../consts/keyName';
import { BLANK, NUM_UNIT } from '../../consts/common';
import { MSG } from '../../consts/message';
import { ERROR } from '../../consts/alert';
import { isNumber } from '../../utils/numUtil';
import comma from '../../utils/convertComma';

// Temp: import json
const Valuation = (props) => {
    const {shareCode, lastQuarterRawData} = props;
    const dpLastQuarterRawData = {...lastQuarterRawData};
    const { enqueueSnackbar } = useSnackbar();
    const [activeTab, setActiveTab] = useState(KEY_NAME.PER);
    const [hidden, setHidden] = useState(true);
    const [dataTableData, setDataTableData] = useState(true);

    const pricePrdctnModelOnClick = (e, tableId, header, records, rowIndex, columnIndex, labelColumnNum) => {
        const editedValue = e.target.innerText;
        const parsedValue = parseFloat(editedValue);
        e.target.innerText = isNumber(parsedValue)?comma(parsedValue):'';

        // Validation
        if (!_.isEmpty(editedValue)) {
            if (isNumber(parsedValue)){
                records[rowIndex][columnIndex].value = parsedValue;
    
                const tgPer = records[0][columnIndex].value;
                const tgShareNum = records[1][columnIndex].value;
                const tgSales = records[2][columnIndex].value;
                const tgNpm = records[3][columnIndex].value;
        
                if (tgPer && tgSales && tgNpm) {
                    const tgNp =  _.round(tgSales*(tgNpm/100), 2);
                    const tgEps = _.round((tgNp*NUM_UNIT.OK)/tgShareNum, 2);
                    const tgPrice = _.round(tgPer*tgEps, 2);
                    const tgMv = _.round((tgPrice*tgShareNum)/NUM_UNIT.OK, 2);                                                                                                                                                                                                                                                                                                                    
            
                    records[4][columnIndex].value = tgNp;
                    records[5][columnIndex].value = tgEps;
                    records[6][columnIndex].value = tgPrice;
                    records[7][columnIndex].value = tgMv;
        
                    setDataTableData({
                        header: header,
                        records: records,
                      });
                } else {
                    setDataTableData({
                        header: header,
                        records: records,
                    });
                }
            } else {
                enqueueSnackbar(MSG.NAN, {variant: ERROR});
            }
        }
    }

    const fixedCol = [KEY_NAME.PER, KEY_NAME.SHARE_NUM, KEY_NAME.SALES, KEY_NAME.NPM, KEY_NAME.NP_CTRL, KEY_NAME.EPS, OTHER_KEY_NAME.PRICE, KEY_NAME.MV];
    const rawData2FixedTableData = (periodRawData, fixedCol) => {
        // Update data on lastQuarterRawData
        periodRawData[KEY_NAME.SALES] = _.round(periodRawData[KEY_NAME.MV]/periodRawData[KEY_NAME.PSR], 2); 
        periodRawData[KEY_NAME.NP_CTRL] = _.round(periodRawData[KEY_NAME.MV]/periodRawData[KEY_NAME.PER], 2); 
        periodRawData[KEY_NAME.NPM] = _.round((periodRawData[KEY_NAME.NP_CTRL]/periodRawData[KEY_NAME.SALES])*100, 2); 
        periodRawData[KEY_NAME.EPS] = _.round((periodRawData[KEY_NAME.NP_CTRL]*NUM_UNIT.OK)/periodRawData[KEY_NAME.SHARE_NUM], 2); 
        periodRawData[OTHER_KEY_NAME.PRICE] = _.round(periodRawData[KEY_NAME.MV]*NUM_UNIT.OK/periodRawData[KEY_NAME.SHARE_NUM], 2);

        const header = ['현재', '시나리오1', '시나리오2', '시나리오3', '시나리오4', '시나리오5',  '시나리오6', '시나리오7', '시나리오8', '시나리오9', '시나리오10',  '시나리오11', '시나리오12', '시나리오13', '시나리오14', '시나리오15'];

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
                    })
                } else {
                    if (colName === KEY_NAME.PER || colName === KEY_NAME.SALES || colName === KEY_NAME.NPM) {
                        cells.push({
                            value: '',
                            key: rowNum+colNum,
                            isEditable: true,
                            onBlur: pricePrdctnModelOnClick,
                        })
                    } else if (colName === KEY_NAME.SHARE_NUM) {
                        cells.push({
                            value: periodRawData[colName],
                            key: rowNum+colNum,
                        })
                    } else {
                        cells.push({
                            value: '',
                            key: rowNum+colNum,
                        })
                    }
                }
            })

            return cells;
        })
    
        // cells의 가장 첫번째 엘리먼트로 fixedCol의 값 삽입
        fixedCol.forEach((v, i) => {
            (records[i]).unshift({
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
        setDataTableData(rawData2FixedTableData(dpLastQuarterRawData, fixedCol));
    }, [shareCode]);

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
                                tableId={shareCode}
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
