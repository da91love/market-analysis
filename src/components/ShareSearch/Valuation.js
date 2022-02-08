import React, { useState, useContext, useEffect } from 'react';
import {
    MDBCard, MDBCardTitle, MDBCardText, MDBIcon, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBBtn
} from 'mdbreact';
import _ from "lodash";
import axios from 'axios';
import { useSnackbar } from 'notistack';
import {useTranslation} from "react-i18next";

import AuthContext from '../../contexts/AuthContext';
import FixedSideUnionTable from '../Share/FixedSideUnionTable';
import vltCalc from '../../utils/vltCalc';
import {isNumber} from '../../utils/numUtil';
import SyncStatus from '../../utils/SyncStatus';
import { KEY_NAME, OTHER_KEY_NAME} from '../../consts/keyName';
import { BLANK, NUM_UNIT } from '../../consts/common';
import { MSG } from '../../consts/message';
import {API} from '../../consts/api';
import { ERROR, SUCCESS } from '../../consts/alert';
import { VLT_TABLE_COL, VLT_TABLE_LABEL} from '../../consts/tbCol';
import { VLT_MODELS } from '../../consts/model';
import { STRG_KEY_NAME } from '../../consts/localStorage';

// Temp: import json
const Valuation = (props) => {
    const {shareCode, lastQuarterRawData} = props;
    const {authId, setAuthId} = useContext(AuthContext);
    const { t, i18n } = useTranslation();
    const crtLang = i18n.language;
    const dpLastQuarterRawData = {...lastQuarterRawData};
    const { enqueueSnackbar } = useSnackbar();
    const [activeTab, setActiveTab] = useState(KEY_NAME.PER);
    const [hidden, setHidden] = useState(true);
    const [savedDataTableDatas, setSavedDataTableDatas] = useState({});
    const [dataTableData, setDataTableData] = useState();

    // PrivateMethod
    const pricePrdctnModelOnBlur = (e, tableId, baseDate, rowIdx, colIdx, labelColumnNum) => {
        const editedValue = e.target.innerText;
        const parsedValue = parseFloat(editedValue);

        if (!_.isEmpty(editedValue)) {
            if (isNumber(parsedValue)){
                const [mltpIdc, vltModel] = tableId.split(':');
                const dpBaseData = {...baseDate}
                const tgData = dpBaseData[mltpIdc][vltModel];
                const {header, records} = tgData;
                const result = {};
                const label = VLT_TABLE_LABEL[mltpIdc][vltModel].label;
                const editable = VLT_TABLE_LABEL[mltpIdc][vltModel].editable;
        
                // 인풋된 값으로 기존의 records를 update
                records[rowIdx][colIdx].value = parsedValue;
        
                // 해당 input을 포함하는 동일 column내의 모든 값을 result에 격납
                records.forEach((row, rIdx) => {
                    row.forEach((col, cIdx) => {
                        if (cIdx === colIdx) {
                            result[label[rIdx]] = col.value;
                        }
                    });
                });
        
                // 모든 editable의 값들이 들어왔는지 확인
                if (editable.length === (editable.filter(v => result[v])).length) {
                    // vltCalc에서 ebitable 값에 대한 계산을 실행
                    const r = vltCalc(result, mltpIdc, vltModel);
                    
                    // update records
                    label.forEach((idc, idx) => {
                        records[idx][colIdx].value = r[idc];
                    });

                    dpBaseData[mltpIdc][vltModel] = {
                        header: header,
                        records: records
                    };
        
                    setDataTableData(dpBaseData);
                } else {
                    dpBaseData[mltpIdc][vltModel] = {
                        header: header,
                        records: records
                    };

                    setDataTableData(dpBaseData);
                }
            } else {
                enqueueSnackbar(MSG.NAN, {variant: ERROR});
            }
        }
    }

    // PrivateMethod
    // rawData는 마지막 분기의 데이터만 포함하고 있고, 마지막 분기의 매출 등은 1분기 만의 매출을 의미하기 때문에
    // PER POR에서 역산하여 최근 4분기의 매출, 영업이익 등을 새롭게 update
    // 역산하여 반올림한 수치를 사용하기 때문에 실제 값과 조금 상이할 수 있음
    const updateRawData = (periodRawData) => {
        // Common
        periodRawData[KEY_NAME.SALES] = _.round(periodRawData[KEY_NAME.MV]/periodRawData[KEY_NAME.PSR], 2); 

        // PER
        periodRawData[KEY_NAME.NP_CTRL] = _.round(periodRawData[KEY_NAME.MV]/periodRawData[KEY_NAME.PER], 2); 
        periodRawData[KEY_NAME.NPM] = _.round((periodRawData[KEY_NAME.NP_CTRL]/periodRawData[KEY_NAME.SALES])*100, 2); 

        // POR
        periodRawData[KEY_NAME.OP] = _.round(periodRawData[KEY_NAME.MV]/periodRawData[KEY_NAME.POR], 2); 
        periodRawData[KEY_NAME.OPM] = _.round((periodRawData[KEY_NAME.OP]/periodRawData[KEY_NAME.SALES])*100, 2); 

        // EV/EBITDA
        periodRawData[KEY_NAME.EBITDA] = _.round(periodRawData[KEY_NAME.EV]/periodRawData[KEY_NAME.EV_EBITDA], 2); 
        periodRawData[KEY_NAME.EPM] = _.round((periodRawData[KEY_NAME.EBITDA]/periodRawData[KEY_NAME.SALES])*100, 2); 
    
        return periodRawData;
    }

    const rawData2FixedTableData = (updatedRawData, savedData) => {
        const byIdc = {};
        for (const mltpIdc in VLT_TABLE_LABEL) {
            const byModel = {};
            for (const vltModel in VLT_TABLE_LABEL[mltpIdc]) {
                const header = [...VLT_TABLE_COL];
                const label = VLT_TABLE_LABEL[mltpIdc][vltModel].label;
                const editable = VLT_TABLE_LABEL[mltpIdc][vltModel].editable;
                const savedRecords = savedData?.[mltpIdc]?.[vltModel].records;

                let records = label.map((rowName, rowNum) => {
                    const cells = [];
                    header.forEach((colName, colNum) => {
                        // header는 20개이지만 savedRecords는 label이 추가되어 21개 이므로, colNum+1을 해줘야 열이 일치함
                        const savedValue = savedRecords?savedRecords[rowNum][colNum+1]?.value:null;

                        if (colNum === 0) {
                            cells.push({
                                value: updatedRawData[rowName],
                            })
                        } else {
                            if (editable.includes(rowName)) {
                                if (rowName === KEY_NAME.SHARE_NUM) {
                                    cells.push({
                                        value: savedValue || updatedRawData[rowName],
                                        isEditable: true,
                                        onBlur: pricePrdctnModelOnBlur,
                                    })
                                } else {
                                    cells.push({
                                        value: savedValue || '',
                                        isEditable: true,
                                        onBlur: pricePrdctnModelOnBlur,
                                    })
                                }
                            } else {
                                cells.push({
                                    value: savedValue || '',
                                })
                            }
                        }
                    })
                    return cells;
                })

                // cells의 가장 첫번째 엘리먼트로 fixedCol의 값 삽입
                label.forEach((v, i) => {
                    (records[i]).unshift({
                        name: t(`common.rawData.${v}`),
                        value: v,
                        key: i,
                    });
                });
            
                // FixedCol의 1열 이상일 때, header의 앞에 빈값 삽입
                header.unshift(BLANK);
            
                byModel[vltModel] = {
                    header: header,
                    records: records,
                }
            }
            byIdc[mltpIdc] = byModel
        }
        return byIdc;
    }

    const hiddenHandler = () => {
        setHidden(!hidden);
    }

    const tabHandler = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    const dataTableDataSaveHandler = () => {
        //Get data from DB
        if (authId) {
            const dpSavedDataTableDatas = {...savedDataTableDatas};
            dpSavedDataTableDatas[shareCode] = dataTableData;

            axios({
                method: API.PUT_VALUATION.METHOD,
                url: API.PUT_VALUATION.URL,
                headers: {
                    authId: authId,
                },
                data: {
                    data: {
                        value: dpSavedDataTableDatas
                    }
                }    
            })
            .then(res => {
                if(res.data.status === "success" ) {
                    enqueueSnackbar(MSG.VLT_SAVE, {variant: SUCCESS});
                } else {
                    // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
                }
            })  
        } else {
            enqueueSnackbar(MSG.NOT_LOGED_IN, {variant: ERROR});
        }
    }

    const dataTableDataRemoveHandler = () => {
        if (authId) {
            const dpSavedDataTableDatas = {...savedDataTableDatas};
            for (const key in dpSavedDataTableDatas) {
                if (key === shareCode) {
                    delete dpSavedDataTableDatas[key];
                    break;
                }
            };

            axios({
                method: API.PUT_VALUATION.METHOD,
                url: API.PUT_VALUATION.URL,
                headers: {
                    authId: authId,
                },
                data: {
                    data: {
                        value: dpSavedDataTableDatas
                    }
                }    
            })
            .then(res => {
                if(res.data.status === "success" ) {
                    setSavedDataTableDatas(dpSavedDataTableDatas);
                    enqueueSnackbar(MSG.VLT_REMOVE, {variant: SUCCESS});
                } else {
                    if (res.data.errorCode === 401 ) {
                        SyncStatus.set({
                            storageKey: STRG_KEY_NAME.AUTH_ID,
                            statusSetter: setAuthId,
                            data: null
                          });
                
                        enqueueSnackbar(`${MSG.AUTH_MISSING}`, {variant: ERROR});
                    }
                    // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
                }
            })  
        } else {
            enqueueSnackbar(MSG.NOT_LOGED_IN, {variant: ERROR});
        }
    }

    useEffect(() => {
        const updRawData = updateRawData(dpLastQuarterRawData);
        const savedData = savedDataTableDatas?.[shareCode];
        const vltDataByShare = rawData2FixedTableData(updRawData, savedData);
        setDataTableData(vltDataByShare);
    }, [shareCode, savedDataTableDatas, lastQuarterRawData, crtLang]);

    useEffect(() => {
        //Get data from DB
        if (authId) {
            axios({
                method: API.GET_VALUATION.METHOD,
                url: API.GET_VALUATION.URL,
                headers: {
                    authId: authId,
                }
            })
            .then(res => {
                if(res.data.status === "success" ) {
                    setSavedDataTableDatas(res.data.payload.value);
                } else {
                    // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
                }
            })  
        } else {
            setSavedDataTableDatas({});
        }
    }, [authId])

    return (
    <MDBCard className="card-body">
        <MDBCardTitle>
            <span className="h3">{t('shareSearch.label.valuation')}</span>
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
                        PSR
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink link to="#" active={activeTab === KEY_NAME.PBR} onClick={() => tabHandler(KEY_NAME.PBR)} role="tab" >
                        PBR
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink link to="#" active={activeTab === KEY_NAME.EV_EBITDA} onClick={() => tabHandler(KEY_NAME.EV_EBITDA)} role="tab" >
                        EV/EBITDA
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBBtn className={"pt-1 pb-1 pr-4 pl-4"} color="secondary" onClick={dataTableDataSaveHandler}>{t('common.button.save')}</MDBBtn>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBBtn className={"pt-1 pb-1 pr-4 pl-4"} color="secondary" onClick={dataTableDataRemoveHandler}>{t('common.button.remove')}</MDBBtn>
                </MDBNavItem>
            </MDBNav>
            <MDBTabContent activeItem={activeTab} >
                <MDBTabPane tabId={KEY_NAME.PER} role="tabpanel">
                    <div className="mt-3">
                        {dataTableData?
                            <div>
                                <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME.PER][VLT_MODELS.PRICE].header}
                                    records={dataTableData[KEY_NAME.PER][VLT_MODELS.PRICE].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME.PER}:${VLT_MODELS.PRICE}`}
                                    baseDate={dataTableData}
                                />
                                <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME.PER][VLT_MODELS.PRFM].header}
                                    records={dataTableData[KEY_NAME.PER][VLT_MODELS.PRFM].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME.PER}:${VLT_MODELS.PRFM}`}
                                    baseDate={dataTableData}
                                />
                                <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME.PER][VLT_MODELS.MLTP].header}
                                    records={dataTableData[KEY_NAME.PER][VLT_MODELS.MLTP].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME.PER}:${VLT_MODELS.MLTP}`}
                                    baseDate={dataTableData}
                                />
                            </div>
                        :null}
                    </div>                     
                </MDBTabPane>
                <MDBTabPane tabId={KEY_NAME.POR} role="tabpanel">
                    <div className="mt-3">
                        {dataTableData?
                            <div>
                                <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME.POR][VLT_MODELS.PRICE].header}
                                    records={dataTableData[KEY_NAME.POR][VLT_MODELS.PRICE].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME.POR}:${VLT_MODELS.PRICE}`}
                                    baseDate={dataTableData}
                                />
                                <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME.POR][VLT_MODELS.PRFM].header}
                                    records={dataTableData[KEY_NAME.POR][VLT_MODELS.PRFM].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME.POR}:${VLT_MODELS.PRFM}`}
                                    baseDate={dataTableData}
                                />
                                <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME.POR][VLT_MODELS.MLTP].header}
                                    records={dataTableData[KEY_NAME.POR][VLT_MODELS.MLTP].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME.POR}:${VLT_MODELS.MLTP}`}
                                    baseDate={dataTableData}
                                />
                            </div>
                        :null}
                    </div>
                </MDBTabPane>
                <MDBTabPane tabId={KEY_NAME.PSR} role="tabpanel">
                    <div className="mt-3">
                        {dataTableData?
                            <div>
                                <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME.PSR][VLT_MODELS.PRICE].header}
                                    records={dataTableData[KEY_NAME.PSR][VLT_MODELS.PRICE].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME.PSR}:${VLT_MODELS.PRICE}`}
                                    baseDate={dataTableData}
                                />
                                <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME.PSR][VLT_MODELS.PRFM].header}
                                    records={dataTableData[KEY_NAME.PSR][VLT_MODELS.PRFM].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME.PSR}:${VLT_MODELS.PRFM}`}
                                    baseDate={dataTableData}
                                />
                                <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME.PSR][VLT_MODELS.MLTP].header}
                                    records={dataTableData[KEY_NAME.PSR][VLT_MODELS.MLTP].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME.PSR}:${VLT_MODELS.MLTP}`}
                                    baseDate={dataTableData}
                                />
                            </div>
                        :null}
                    </div>
                </MDBTabPane>
                <MDBTabPane tabId={KEY_NAME.PBR} role="tabpanel">
                    <div className="mt-3">
                        {dataTableData?
                            <div>
                                <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME.PBR][VLT_MODELS.PRICE].header}
                                    records={dataTableData[KEY_NAME.PBR][VLT_MODELS.PRICE].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME.PBR}:${VLT_MODELS.PRICE}`}
                                    baseDate={dataTableData}
                                />
                                <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME.PBR][VLT_MODELS.PRFM].header}
                                    records={dataTableData[KEY_NAME.PBR][VLT_MODELS.PRFM].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME.PBR}:${VLT_MODELS.PRFM}`}
                                    baseDate={dataTableData}
                                />
                                <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME.PBR][VLT_MODELS.MLTP].header}
                                    records={dataTableData[KEY_NAME.PBR][VLT_MODELS.MLTP].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME.PBR}:${VLT_MODELS.MLTP}`}
                                    baseDate={dataTableData}
                                />
                            </div>
                        :null}
                    </div>
                </MDBTabPane>
                <MDBTabPane tabId={KEY_NAME['EV_EBITDA']} role="tabpanel">
                    <div className="mt-3">
                        {dataTableData?
                            <div>
                                <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME['EV_EBITDA']][VLT_MODELS.PRICE].header}
                                    records={dataTableData[KEY_NAME['EV_EBITDA']][VLT_MODELS.PRICE].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME['EV_EBITDA']}:${VLT_MODELS.PRICE}`}
                                    baseDate={dataTableData}
                                />
                                {/* <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME.PBR][VLT_MODELS.PRFM].header}
                                    records={dataTableData[KEY_NAME.PBR][VLT_MODELS.PRFM].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME.PBR}:${VLT_MODELS.PRFM}`}
                                    baseDate={dataTableData}
                                />
                                <FixedSideUnionTable
                                    header={dataTableData[KEY_NAME.PBR][VLT_MODELS.MLTP].header}
                                    records={dataTableData[KEY_NAME.PBR][VLT_MODELS.MLTP].records}
                                    labelColumnNum={1}
                                    tableId={`${KEY_NAME.PBR}:${VLT_MODELS.MLTP}`}
                                    baseDate={dataTableData}
                                /> */}
                            </div>
                        :null}
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
