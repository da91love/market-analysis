import React, { useState, useContext } from 'react';
import {
    MDBCard, MDBCardBody, MDBCardText, MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink
} from 'mdbreact';
import _, { isNumber } from "lodash";

import CompareTgContext from "../../contexts/CompareTgContext";
import ShareDataContext from "../../contexts/ShareDataContext";
import AnalysisGraph from "../Share/AnalysisGraph";
import {KEY_NAME} from "../../consts/keyName";
import {COMPARE_GRAPH_TYPE} from "../../consts/graph";
import {PERIOD_UNIT} from "../../consts/common";
import { STRG_KEY_NAME } from "../../consts/localStorage";

// Temp: import json
const Compare = () => {
    const { setCompareTg } = useContext(CompareTgContext);
    const [activeTab, setActiveTab] = useState(PERIOD_UNIT.YEAR);
    const {yearRawDataByShare, quarterRawDataByShare} = useContext(ShareDataContext);
    const compareTg = JSON.parse(localStorage.getItem(STRG_KEY_NAME.COMPARE)) || []; 

    const tabHandler = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    const rawData2GraphData = (tgList, periodRawDataByShare, idc) => {
        const flatRawData= _.flatMap(tgList, (tg) => {
            return periodRawDataByShare[tg[KEY_NAME.SHARE_CODE]];
        });
        const tgRawDataByPeriod = _.groupBy(flatRawData, v => v[KEY_NAME.PERIOD]);

        const tgRawDataBySum = Object.values(tgRawDataByPeriod).map((periodRawData) => {
            return periodRawData.reduce((acc, info, i) => {
                const dcAcc = {...acc};
                Object.keys(dcAcc).forEach((keyName) => {
                    if (_.isNumber(dcAcc[keyName]) && _.isNumber(info[keyName])) {
                        dcAcc[keyName] = (dcAcc[keyName] + info[keyName]);

                        if (periodRawData.length === i+1) {
                            dcAcc[keyName] = _.round(dcAcc[keyName] / (i+1), 2);
                        }
                    };
                });
                return dcAcc;
            });
        })

        const data = Object.keys(tgRawDataByPeriod).map((period,i) => {
            const d = {}
            d.name = period;
            d.sum = (_.find(tgRawDataBySum, [[KEY_NAME.PERIOD], period]))[idc];
            tgRawDataByPeriod[period].forEach((rawData,i) => {
                d[rawData[KEY_NAME.SHARE_NAME]] = rawData[idc];
            });

            return d;
        })

        return {
            name: idc,
            xAxisKeyName: "name",
            dataKey: ['sum'].concat(tgList.map((tg, i) => {
                return tg[KEY_NAME.SHARE_NAME];
            })),
            data: data
        };
    }

    const graphData = function() {
        const idcByYear = {};
        const idcByQuarter = {};

        COMPARE_GRAPH_TYPE.forEach((idc, i) => {
            idcByYear[idc] = rawData2GraphData(compareTg, yearRawDataByShare, idc);
            idcByQuarter[idc] = rawData2GraphData(compareTg, quarterRawDataByShare, idc);
        })
        
        return({
            year: idcByYear,
            quarter: idcByQuarter
        })
    }();

    return (
        <MDBContainer className="mt-5 mb-5 pt-5 pb-5">
            <MDBCard className="mb-4">
                <MDBCardBody>
                <MDBCardText>
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
                            {graphData? Object.keys(graphData[PERIOD_UNIT.YEAR]).map((v, i) => {
                                return <AnalysisGraph legend={true} graphData={graphData[PERIOD_UNIT.YEAR][v]} id={i}/>})
                                : null}                        
                        </MDBTabPane>
                        <MDBTabPane tabId={PERIOD_UNIT.QUARTER} role="tabpanel">
                            {graphData? Object.keys(graphData[PERIOD_UNIT.QUARTER]).map((v, i) => {
                                return <AnalysisGraph legend={true} graphData={graphData[PERIOD_UNIT.QUARTER][v]} id={i}/>})
                                : null}         
                        </MDBTabPane>
                    </MDBTabContent> 
                </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    )
};

export default Compare;
