import React, { useState, useContext, useEffect } from 'react';
import {
    MDBCard, MDBCardBody, MDBCardText, MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink
} from 'mdbreact';
import _ from "lodash";

import CompareTgContext from "../../contexts/CompareTgContext";
import ShareDataContext from "../../contexts/ShareDataContext";
import CompareMrkListModal from "./CompareMrkListModal";
import CompareMrkNameModal from "./CompareMrkNameModal";
import AnalysisGraph from "../Share/AnalysisGraph";
import {KEY_NAME} from "../../consts/keyName";
import {COMPARE_GRAPH_TYPE} from "../../consts/graph";
import {PERIOD_UNIT, AVG} from "../../consts/common";
import { STRG_KEY_NAME } from "../../consts/localStorage";

// Temp: import json
const Compare = () => {
    const { compareTg, setCompareTg } = useContext(CompareTgContext);
    const [activeTab, setActiveTab] = useState(PERIOD_UNIT.QUARTER);
    const [graphData, setGraphData] = useState();
    const {isInitDataLoaded, yearRawDataByShare, quarterRawDataByShare} = useContext(ShareDataContext);
    const [compareMrkList, setCompareMrkList] = useState(JSON.parse(localStorage.getItem(STRG_KEY_NAME.COMPARE_MRK_LIST)) || {});
    const crtSelectedCompareTg = JSON.parse(localStorage.getItem(STRG_KEY_NAME.COMPARE)) || []; 

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
            d[AVG] = (_.find(tgRawDataBySum, [[KEY_NAME.PERIOD], period]))[idc];
            tgRawDataByPeriod[period].forEach((rawData,i) => {
                d[rawData[KEY_NAME.SHARE_NAME]] = rawData[idc];
            });

            return d;
        })

        return {
            name: idc,
            xAxisKeyName: "name",
            dataKey: [AVG].concat(tgList.map((tg, i) => {
                return tg[KEY_NAME.SHARE_NAME];
            })),
            data: data
        };
    }

    useEffect(() => {
        if (isInitDataLoaded) {
            const gData = function() {
                const idcByYear = {};
                const idcByQuarter = {};
        
                COMPARE_GRAPH_TYPE.forEach((idc, i) => {
                    idcByYear[idc] = rawData2GraphData(crtSelectedCompareTg, yearRawDataByShare, idc);
                    idcByQuarter[idc] = rawData2GraphData(crtSelectedCompareTg, quarterRawDataByShare, idc);
                })
                
                return({
                    year: idcByYear,
                    quarter: idcByQuarter
                })
            }();
    
            setGraphData(gData);
        }
    }, [isInitDataLoaded, compareTg]);

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
                        <MDBNavItem>
                            <CompareMrkNameModal compareMrkList={compareMrkList} setCompareMrkList={setCompareMrkList}/>
                        </MDBNavItem>
                        <MDBNavItem>
                            <CompareMrkListModal compareMrkList={compareMrkList} setCompareMrkList={setCompareMrkList}/>
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
