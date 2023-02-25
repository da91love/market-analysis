import React, { useState, useContext, useEffect } from 'react';
import {MDBContainer, MDBCard, MDBCardTitle, MDBCardText, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import _ from "lodash";
import axios from 'axios';
import {useTranslation} from "react-i18next";

import ShareDataContext from "../../contexts/ShareDataContext";
import AnalysisComposedChart from '../Share/AnalysisComposedChart';
import AnalysisLineChart from '../Share/AnalysisLineChart';
import rawData2ComposedGraphData from '../../utils/rawData2ComposedGraphData';
import rawData2ComposedGraphData4Macro from '../../utils/rawData2ComposedGraphData4Macro';

import rawData2GraphData from '../../utils/rawData2GraphData';

import {MARKET_SUMMARY_DEFAULT_GRAPH_TYPE} from '../../consts/graph';
import { KEY_NAME, OTHER_KEY_NAME } from '../../consts/keyName';
import { PERIOD_UNIT } from '../../consts/common';
import { API } from '../../consts/api';

// Temp: import json
const MarketSummary = () => {
    const { t } = useTranslation();
    const {country} = useContext(ShareDataContext);
    const [activeTab, setActiveTab] = useState(PERIOD_UNIT.QUARTER);
    const [graphData, setGraphData] = useState();
    const [selectedGraphType, setSelectedGraphType] = useState(MARKET_SUMMARY_DEFAULT_GRAPH_TYPE);

    const tabHandler = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    const createGraphData = (marketSummaryData) => {
        const idcByYear = {};
        const idcByQuarter = {};

        const {'mrk_smr': marketSummary, 'macro': macroSummary} = marketSummaryData;
        const {'year_result': yearMktSmrData, 'quarter_result': quarterMktSmrData} = marketSummary;


        selectedGraphType.forEach((idc, i) => {
            if ([KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL].includes(idc)) {
                idcByYear[idc] = rawData2ComposedGraphData(yearMktSmrData, idc);
                idcByQuarter[idc] = rawData2ComposedGraphData(quarterMktSmrData, idc);
            } else if ([OTHER_KEY_NAME.MACRO].includes(idc)) {
                idcByYear[idc] = rawData2ComposedGraphData4Macro(macroSummary, idc);
            }else {
                idcByYear[idc] = rawData2GraphData(yearMktSmrData, idc);
                idcByQuarter[idc] = rawData2GraphData(quarterMktSmrData, idc);
            }
        });
        
        return({
            [PERIOD_UNIT.YEAR]: idcByYear,
            [PERIOD_UNIT.QUARTER]: idcByQuarter
        });
    };

    useEffect(() => {
        axios({
            method: API.MARKET_SUMMARY.METHOD,
            url: API.MARKET_SUMMARY.URL,
            data: {
               data: {
                  country: country,
               }
            }
         })
         .then(res => {
            if(res.data.status === "success" ) {
                const tgData = res.data.payload.value;
                const mrkSmrData2GraphData = createGraphData(tgData);

                setGraphData({
                    [PERIOD_UNIT.YEAR]: mrkSmrData2GraphData[PERIOD_UNIT.YEAR],
                    [PERIOD_UNIT.QUARTER]: mrkSmrData2GraphData[PERIOD_UNIT.QUARTER]
                });

            } else {
            // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
            }
         });
    }, []);

    return (
      <MDBContainer className="mt-5 mb-5 pt-5 pb-5">
        <MDBCard className="card-body">
            <MDBCardTitle className="h3">
                <span>{t('shareSearch.label.idcTrendLine')}</span>
                {/* <GraphTypeSelectModal selectedGraphType={selectedGraphType} setSelectedGraphType={setSelectedGraphType} allGraphType={BY_SHARE_ALL_GRAPH_TYPE}/> */}
            </MDBCardTitle>
            <MDBCardText>
                {graphData ?
                <>
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
                    </MDBNav>
                    <MDBTabContent activeItem={activeTab} >
                        <MDBTabPane tabId={PERIOD_UNIT.YEAR} role="tabpanel">
                            <div className="mt-3">
                                {Object.keys(graphData[PERIOD_UNIT.YEAR]).map((v, i) => {
                                    if (graphData[PERIOD_UNIT.YEAR][v].graphType = "composed") {
                                        return <AnalysisComposedChart graphData={graphData[PERIOD_UNIT.YEAR][v]} id={i}/>
                                    } else if (graphData[PERIOD_UNIT.YEAR][v].graphType = "sole") {
                                        return <AnalysisLineChart graphData={graphData[PERIOD_UNIT.YEAR][v]} id={i}/>
                                    }
                                })}
                            </div>
                        </MDBTabPane>
                        <MDBTabPane tabId={PERIOD_UNIT.QUARTER} role="tabpanel">
                            <div className="mt-3">
                                {Object.keys(graphData[PERIOD_UNIT.QUARTER]).map((v, i) => {
                                    if (graphData[PERIOD_UNIT.QUARTER][v].graphType = "composed") {
                                        return <AnalysisComposedChart graphData={graphData[PERIOD_UNIT.QUARTER][v]} id={i}/>
                                    } else if (graphData[PERIOD_UNIT.QUARTER][v].graphType = "sole") {
                                        return <AnalysisLineChart graphData={graphData[PERIOD_UNIT.QUARTER][v]} id={i}/>
                                    }

                                })}
                            </div>
                        </MDBTabPane>
                    </MDBTabContent>
                </>
                :null}
            </MDBCardText>
        </MDBCard> 
      </MDBContainer>
    )
};

export default MarketSummary;
