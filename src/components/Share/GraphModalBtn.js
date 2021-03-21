import React, { useState, useContext, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import {
    MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink
  } from 'mdbreact';
import AnalysisGraph from './AnalysisGraph';
import CompareTgContext from "../../contexts/CompareTgContext";
import AlertContext from "../../contexts/AlertContext";
import GraphTypeSelectModal from './GraphTypeSelectModal';
import rawData2GraphData from '../../utils/rawData2GraphData';
import { PERIOD_UNIT, EXTERNAL_URL } from "../../consts/common";
import { ROUTER_URL } from "../../consts/rounter";
import { KEY_NAME } from "../../consts/keyName";
import { SUCCESS } from "../../consts/alert";
import { MSG } from "../../consts/message";
import { BY_SHARE_DEFAULT_GRAPH_TYPE, BY_MRK_DEFAULT_GRAPH_TYPE, BY_SHARE_ALL_GRAPH_TYPE, BY_MRK_ALL_GRAPH_TYPE } from "../../consts/graph"

const GraphModalBtn = (props) => {
    const {isMarket=false, tgCode, tgName, yearRawDataPerUnit, quarterRawDataPerUnit} = props;
    const {compareTg, setCompareTg} = useContext(CompareTgContext);
    const {alertState,setAlertState} = useContext(AlertContext);
    const [modalState, setModalState] = useState(false);
    const [activeTab, setActiveTab] = useState(PERIOD_UNIT.YEAR);
    const [graphData, setGraphData] = useState(null);
    const [selectedGraphType, setSelectedGraphType] = useState(isMarket?BY_MRK_DEFAULT_GRAPH_TYPE:BY_SHARE_DEFAULT_GRAPH_TYPE)
    const url = isMarket?EXTERNAL_URL.NAVER_MRK_INFO:EXTERNAL_URL.NAVER_SHARE_INFO;

    const tabHandler = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    const modalHandler = () => {
        setModalState(!modalState);
    }

    const searchPageMoveHandler = (shareCode, shareName) => {
        const win = window.open(`${ROUTER_URL.SEARCH}/${shareCode}/${shareName}`, "_blank");
        win.focus();
    }

    const addToCompareList = (shareCode, shareName) => {
        setCompareTg([...compareTg, {
            [KEY_NAME.SHARE_CODE]: shareCode,
            [KEY_NAME.SHARE_NAME]: shareName
        }]);

        setAlertState({
            eventType: SUCCESS, //ここでSUCCESS,WARNING,DANGERを選択
            eventMessage: `${MSG.ADD_COMPARE_TG}(${shareCode}:${shareName})`,
            eventCount: alertState.eventCount + 1,
        });
    };

    useEffect(() => {
            const idcByYear = {};
            const idcByQuarter = {};

            selectedGraphType.forEach((idc, i) => {
                idcByYear[idc] = rawData2GraphData(yearRawDataPerUnit, idc);
                idcByQuarter[idc] = rawData2GraphData(quarterRawDataPerUnit, idc);
            })
            
            setGraphData({
                year: idcByYear,
                quarter: idcByQuarter
            })
    }, [modalState, selectedGraphType])

    return (
        <IconButton className="p-0" color="default" aria-label="upload picture" component="span">
            <MDBIcon icon="chart-bar" onClick={modalHandler}/>
            <MDBModal isOpen={modalState} toggle={modalHandler} size="lg">
                <MDBModalHeader toggle={modalHandler}>
                    {`${tgName}:${tgCode}`}
                    <a href={`${url}${tgCode}`} target="_blank">
                        <MDBIcon icon="external-link-alt" />
                    </a>
                    <MDBIcon onClick={() => {searchPageMoveHandler(tgCode, tgName)}} icon="external-link-alt" />
                    <MDBIcon onClick={() => {addToCompareList(tgCode, tgName)}}  icon="list-alt" />
                </MDBModalHeader>
                <MDBModalBody>
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
                            <GraphTypeSelectModal selectedGraphType={selectedGraphType} setSelectedGraphType={setSelectedGraphType} allGraphType={isMarket?BY_MRK_ALL_GRAPH_TYPE:BY_SHARE_ALL_GRAPH_TYPE}/>
                        </MDBNavItem>
                    </MDBNav>
                    <MDBTabContent activeItem={activeTab} >
                        <MDBTabPane tabId={PERIOD_UNIT.YEAR} role="tabpanel">
                            {graphData? Object.keys(graphData[PERIOD_UNIT.YEAR]).map((v, i) => {
                                return <AnalysisGraph graphData={graphData[PERIOD_UNIT.YEAR][v]} id={i}/>})
                                : null}                        
                        </MDBTabPane>
                        <MDBTabPane tabId={PERIOD_UNIT.QUARTER} role="tabpanel">
                            {graphData? Object.keys(graphData[PERIOD_UNIT.QUARTER]).map((v, i) => {
                                return <AnalysisGraph graphData={graphData[PERIOD_UNIT.QUARTER][v]} id={i}/>})
                                : null}         
                        </MDBTabPane>
                    </MDBTabContent>
                </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn color="secondary" onClick={modalHandler}>Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </IconButton>
   )
};

export default GraphModalBtn;
