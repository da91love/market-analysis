import React, { useState, useContext, useEffect } from 'react';
import {
    MDBCard, MDBCardTitle, MDBCardText, MDBIcon, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBBtn
} from 'mdbreact';
import _ from "lodash";
import { useSnackbar } from 'notistack';
import FixedSideUnionTable from '../Share/FixedSideUnionTable';
import vltCalc from '../../utils/vltCalc';
import {isNumber} from '../../utils/numUtil';
import SyncStatus from '../../utils/SyncStatus';
import { KEY_NAME, OTHER_KEY_NAME} from '../../consts/keyName';
import { BLANK, NUM_UNIT } from '../../consts/common';
import { MSG } from '../../consts/message';
import { ERROR, SUCCESS } from '../../consts/alert';
import { VLT_TABLE_COL, VLT_TABLE_LABEL} from '../../consts/tbCol';
import { VLT_MODELS } from '../../consts/model';
import { STRG_KEY_NAME } from '../../consts/localStorage';

// Temp: import json
const Valuation = (props) => {
    const {shareCode, lastQuarterRawData} = props;
    const dpLastQuarterRawData = {...lastQuarterRawData};
    const { enqueueSnackbar } = useSnackbar();
    const [activeTab, setActiveTab] = useState(KEY_NAME.PER);
    const [hidden, setHidden] = useState(true);
    const [dataTableData, setDataTableData] = useState();

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

    const updateRawData = (periodRawData) => {
        // Common
        periodRawData[KEY_NAME.SALES] = _.round(periodRawData[KEY_NAME.MV]/periodRawData[KEY_NAME.PSR], 2); 
        periodRawData[OTHER_KEY_NAME.PRICE] = _.round(periodRawData[KEY_NAME.MV]*NUM_UNIT.OK/periodRawData[KEY_NAME.SHARE_NUM], 2);

        // PER
        periodRawData[KEY_NAME.NP_CTRL] = _.round(periodRawData[KEY_NAME.MV]/periodRawData[KEY_NAME.PER], 2); 
        periodRawData[KEY_NAME.NPM] = _.round((periodRawData[KEY_NAME.NP_CTRL]/periodRawData[KEY_NAME.SALES])*100, 2); 
        periodRawData[KEY_NAME.EPS] = _.round((periodRawData[KEY_NAME.NP_CTRL]*NUM_UNIT.OK)/periodRawData[KEY_NAME.SHARE_NUM], 2);

        // POR
        periodRawData[KEY_NAME.OP] = _.round(periodRawData[KEY_NAME.MV]/periodRawData[KEY_NAME.POR], 2); 
        periodRawData[KEY_NAME.OPM] = _.round((periodRawData[KEY_NAME.OP]/periodRawData[KEY_NAME.SALES])*100, 2); 
        periodRawData[OTHER_KEY_NAME.OPS] = _.round((periodRawData[KEY_NAME.OP]*NUM_UNIT.OK)/periodRawData[KEY_NAME.SHARE_NUM], 2);

        // PSR
        periodRawData[OTHER_KEY_NAME.SPS] = _.round((periodRawData[KEY_NAME.SALES]*NUM_UNIT.OK)/periodRawData[KEY_NAME.SHARE_NUM], 2);
    
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
                const savedRecords = savedData?.[mltpIdc][vltModel].records;

                let records = label.map((rowName, rowNum) => {
                    const cells = [];
                    header.forEach((colName, colNum) => {
                        // header는 16개이지만 savedRecords는 label이 추가되어 17개 이므로, colNum+1을 해줘야 열이 일치함
                        const savedValue = savedRecords?savedRecords[rowNum][colNum+1].value:null;

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
        const localStrgData = SyncStatus.get({storageKey: STRG_KEY_NAME.SAVE_VLT}) || {};
        localStrgData[shareCode] = dataTableData;

        SyncStatus.set({
            storageKey: STRG_KEY_NAME.SAVE_VLT,
            data: localStrgData
        });

        enqueueSnackbar(MSG.VLT_SAVE, {variant: SUCCESS});
    }

    const dataTableDataRemoveHandler = () => {
        const localStrgData = SyncStatus.get({storageKey: STRG_KEY_NAME.SAVE_VLT});

        if (!_.isEmpty(localStrgData)) {
            delete localStrgData[shareCode];

            SyncStatus.remove({storageKey: STRG_KEY_NAME.SAVE_VLT});
            SyncStatus.set({
                storageKey: STRG_KEY_NAME.SAVE_VLT,
                data: localStrgData
            });
        }

        enqueueSnackbar(MSG.VLT_REMOVE, {variant: SUCCESS});

        const updRawData = updateRawData(dpLastQuarterRawData);
        const vltDataByShare = rawData2FixedTableData(updRawData);
        setDataTableData(vltDataByShare);
    }

    useEffect(() => {
        const updRawData = updateRawData(dpLastQuarterRawData);
        const savedData = SyncStatus.get({storageKey: STRG_KEY_NAME.SAVE_VLT})?.[shareCode];
        const vltDataByShare = rawData2FixedTableData(updRawData, savedData);
        setDataTableData(vltDataByShare);
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
                        PSR
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink link to="#" active={activeTab === KEY_NAME.PBR} onClick={() => tabHandler(KEY_NAME.PBR)} role="tab" >
                        PBR
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBBtn className={"pt-1 pb-1 pr-4 pl-4"} color="secondary" onClick={dataTableDataSaveHandler}>Save</MDBBtn>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBBtn className={"pt-1 pb-1 pr-4 pl-4"} color="secondary" onClick={dataTableDataRemoveHandler}>Remove</MDBBtn>
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
            </MDBTabContent>
            </>
            :null}
        </MDBCardText>
    </MDBCard>
    )
};

export default Valuation;
