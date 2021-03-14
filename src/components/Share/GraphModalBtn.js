import React, { useState, useContext, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import {
    MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink
  } from 'mdbreact';
import AnalysisGraph from './AnalysisGraph';
import GraphTypeSelectModal from './GraphTypeSelectModal';
import rawData2GraphData from '../../utils/rawData2GraphData';
import { PERIOD_UNIT, EXTERNAL_URL } from "../../consts/common";
import { KEY_NAME } from "../../consts/keyName";
import { BY_SHARE_DEFAULT_GRAPH_TYPE, BY_MRK_DEFAULT_GRAPH_TYPE, BY_SHARE_ALL_GRAPH_TYPE, BY_MRK_ALL_GRAPH_TYPE } from "../../consts/model"
import { useHistory } from 'react-router-dom';

const GraphModalBtn = (props) => {
    const {isMarket=false, tgCode, tgName, yearRawDataPerUnit, quarterRawDataPerUnit} = props;
    const [modalState, setModalState] = useState(false);
    const [activeTab, setActiveTab] = useState(PERIOD_UNIT.YEAR);
    const [graphData, setGraphData] = useState(null);
    const [selectedGraphType, setSelectedGraphType] = useState(isMarket?BY_MRK_DEFAULT_GRAPH_TYPE:BY_SHARE_DEFAULT_GRAPH_TYPE)
    const url = isMarket?EXTERNAL_URL.NAVER_MRK_INFO:EXTERNAL_URL.NAVER_SHARE_INFO;
    const history = useHistory();
    
    const tabHandler = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    const modalHandler = () => {
        if (!graphData && !modalState) {

            const idcByYear = {};
            const idcByQuarter = {};

            selectedGraphType.forEach((v, i) => {
                idcByYear[v] = rawData2GraphData(yearRawDataPerUnit, v);
                idcByQuarter[v] = rawData2GraphData(quarterRawDataPerUnit, v);
            })
            
            setGraphData({
                year: idcByYear,
                quarter: idcByQuarter
            })
        }

        setModalState(!modalState);
    }

    const searchPageMoveHandler = (shareCode, shareName) => {
        history.push({
            pathname: '/contents/search',
            state: {
                [KEY_NAME.SHARE_CODE]: shareCode,
                [KEY_NAME.SHARE_NAME]: shareName,
            },
        })
    }

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
