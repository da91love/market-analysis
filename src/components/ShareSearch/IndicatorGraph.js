import React, {useState, useEffect} from 'react';
import {MDBCard, MDBCardTitle, MDBCardText, MDBIcon, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import {useTranslation} from "react-i18next";

import rawData2GraphData from '../../utils/rawData2GraphData';
import AnalysisGraph from '../Share/AnalysisGraph';
import GraphTypeSelectModal from '../Share/GraphTypeSelectModal';
import {BY_SHARE_DEFAULT_GRAPH_TYPE, BY_SHARE_ALL_GRAPH_TYPE } from '../../consts/graph';
import {PERIOD_UNIT} from '../../consts/common';

const IndicatorGraph = (props) => {
    const {yearSummaryByShare, quarterSummaryByShare} = props;
    const { t } = useTranslation();
    const [selectedGraphType, setSelectedGraphType] = useState(BY_SHARE_DEFAULT_GRAPH_TYPE);
    const [hidden, setHidden] = useState(false);
    const [activeTab, setActiveTab] = useState(PERIOD_UNIT.QUARTER);
    const [graphData, setGraphData] = useState();

    // Get data for graphData
    const createGraphData = (selectedGraphType, yearSummaryByShare, quarterSummaryByShare) => {

        const idcByYear = {};
        const idcByQuarter = {};

        selectedGraphType.forEach((idc, i) => {
            idcByYear[idc] = rawData2GraphData(yearSummaryByShare, idc);
            idcByQuarter[idc] = rawData2GraphData(quarterSummaryByShare, idc);
        })
        
        return({
            [PERIOD_UNIT.YEAR]: idcByYear,
            [PERIOD_UNIT.QUARTER]: idcByQuarter
        })
    };

    const hiddenHandler = () => {
        setHidden(!hidden);
    }

    const tabHandler = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    useEffect(() => {
        setGraphData(createGraphData(selectedGraphType, yearSummaryByShare, quarterSummaryByShare));
    }, [yearSummaryByShare, quarterSummaryByShare, selectedGraphType])

    return (
    <MDBCard className="card-body">
        <MDBCardTitle className="h3">
            <span>{t('shareSearch.label.idcTrendLine')}</span>
            <GraphTypeSelectModal selectedGraphType={selectedGraphType} setSelectedGraphType={setSelectedGraphType} allGraphType={BY_SHARE_ALL_GRAPH_TYPE}/>
            {hidden?<MDBIcon className={"float-right"} onClick={hiddenHandler} icon="angle-down" />:<MDBIcon className={"float-right"} onClick={hiddenHandler} icon="angle-up" />}
        </MDBCardTitle>
        <MDBCardText>
            {graphData && !hidden?
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
                                return <AnalysisGraph graphData={graphData[PERIOD_UNIT.YEAR][v]} id={i}/>
                            })}
                        </div>
                    </MDBTabPane>
                    <MDBTabPane tabId={PERIOD_UNIT.QUARTER} role="tabpanel">
                        <div className="mt-3">
                            {Object.keys(graphData[PERIOD_UNIT.QUARTER]).map((v, i) => {
                                return <AnalysisGraph graphData={graphData[PERIOD_UNIT.QUARTER][v]} id={i}/>
                            })}
                        </div>
                    </MDBTabPane>
                </MDBTabContent>
            </>
            :null}
        </MDBCardText>
    </MDBCard> 
    )
};

export default IndicatorGraph;
