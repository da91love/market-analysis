import React, { useState, useContext, useEffect } from 'react';
import {
    MDBCard, MDBCardBody, MDBCardText, MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink
} from 'mdbreact';
import _ from "lodash";
import axios from 'axios';
import {useTranslation} from "react-i18next";

import CompareTgContext from "../../contexts/CompareTgContext";
import ShareDataContext from "../../contexts/ShareDataContext";
import AuthContext from '../../contexts/AuthContext';

import CompareMrkListModal from "./CompareMrkListModal";
import CompareMrkNameModal from "./CompareMrkNameModal";
import GraphTypeSelectModal from '../Share/GraphTypeSelectModal';
import {convert2YYMM} from '../../utils/dateUtil';

import AnalysisGraph from "../Share/AnalysisGraph";
import {KEY_NAME} from "../../consts/keyName";
import {API} from '../../consts/api';
import {COMPARE_GRAPH_TYPE, BY_SHARE_ALL_GRAPH_TYPE} from "../../consts/graph";
import {PERIOD_UNIT, AVG} from "../../consts/common";

// Temp: import json
const Compare = () => {
    const { compareTg, setCompareTg } = useContext(CompareTgContext);
    const {authId} = useContext(AuthContext);
    const {country} = useContext(ShareDataContext);
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(PERIOD_UNIT.QUARTER);
    const [compareMrkList, setCompareMrkList] = useState({});
    const [graphData, setGraphData] = useState();
    const [selectedGraphType, setSelectedGraphType] = useState(COMPARE_GRAPH_TYPE);

    const tabHandler = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    const rawData2GraphData = (tgList, periodRawDataByShares, idc) => {
        const tgRawDataByPeriod = _.groupBy(periodRawDataByShares, v => v[KEY_NAME.PERIOD]);

        // AVG데이터를 취득하기 위한 각 종목 데이터 sum
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
                d.name = convert2YYMM(period);
                d[AVG] = (_.find(tgRawDataBySum, [[KEY_NAME.PERIOD], period]))[idc];
                tgRawDataByPeriod[period].forEach((rawData,i) => {
                    d[rawData[KEY_NAME.SHARE_NAME]] = rawData[idc];
            });

            return d;
        })

        return {
            idc: idc,
            xAxisKeyName: "name",
            dataKey: [AVG].concat(tgList.map((tg, i) => {
                return tg[KEY_NAME.SHARE_NAME];
            })),
            data: _.orderBy(data, ['name'], ['asc'])
        };
    }

    useEffect(() => {
        const shareCode = compareTg.map(x => x[KEY_NAME.SHARE_CODE]);

        // shareCode가 None일시 financial_summary api에서 모든 종목을 리턴하므로 조건을 걸어둠
        if (shareCode.length > 0) {
            axios({
                method: API.POST_FINANCIAL_SUMMARY.METHOD,
                url: API.POST_FINANCIAL_SUMMARY.URL,
                data: {
                  data: {
                    country: country,
                    shareCode: shareCode
                  }
                }
              })
                .then(res => {
                    if(res.data.status === "success" ) {
                        const {year_result, quarter_result} = res.data.payload.value;
    
                        const gData = function() {
                            const idcByYear = {};
                            const idcByQuarter = {};
                    
                            selectedGraphType.forEach((idc, i) => {
                                idcByYear[idc] = rawData2GraphData(compareTg, year_result, idc);
                                idcByQuarter[idc] = rawData2GraphData(compareTg, quarter_result, idc);
                            })
                            
                            return({
                                year: idcByYear,
                                quarter: idcByQuarter
                            })
                        }();
                
                        setGraphData(gData);
                    } else {
                        // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
                    }
                })
        }
 
    }, [compareTg, selectedGraphType]);

    useEffect(() => {
        //Get data from DB
        if (authId) {
            axios({
                method: API.GET_COMP_TG_GRP.METHOD,
                url: API.GET_COMP_TG_GRP.URL,
                headers: {
                    authId: authId,
                }
            })
            .then(res => {
                if(res.data.status === "success" ) {
                    setCompareMrkList(res.data.payload.value);
                } else {
                    // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
                }
            })  
        } else {
            setCompareMrkList({});
        }
    }, [authId]);

    return (
        <MDBContainer className="mt-5 mb-5 pt-5 pb-5">
            <MDBCard className="mb-4">
                <MDBCardBody>
                <MDBCardText>
                <MDBNav className="nav-tabs">
                        <MDBNavItem>
                            <MDBNavLink link to="#" active={activeTab === PERIOD_UNIT.YEAR} onClick={() => tabHandler(PERIOD_UNIT.YEAR)} role="tab" >
                                {t('common.tab.yearly')}
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink link to="#" active={activeTab === PERIOD_UNIT.QUARTER} onClick={() => tabHandler(PERIOD_UNIT.QUARTER)} role="tab" >
                            {t('common.tab.quarterly')}
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <CompareMrkNameModal compareMrkList={compareMrkList} setCompareTg={setCompareTg}/>
                        </MDBNavItem>
                        <MDBNavItem>
                            <CompareMrkListModal compareMrkList={compareMrkList} setCompareTg={setCompareTg}/>
                        </MDBNavItem>
                        <MDBNavItem>
                            <GraphTypeSelectModal selectedGraphType={selectedGraphType} setSelectedGraphType={setSelectedGraphType} allGraphType={BY_SHARE_ALL_GRAPH_TYPE}/>
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
