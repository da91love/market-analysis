import React, { useState, useContext, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import {
    MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink
  } from 'mdbreact';
import AnalysisGraph from './AnalysisGraph';
import ShareDataContext from '../../contexts/ShareDataContext';
import rawData2GraphData from '../../utils/rawData2GraphData';
import { GRAPH_ANALYSIS_COL } from "../../consts/model";
import { KEY_NAME } from "../../consts/keyName";

const GraphModalBtn = (props) => {
    const {shareCode} = props;
    const {yearDataByShareCode, quarterDataByShareCode} = useContext(ShareDataContext);
    const [modalState, setModalState] = useState(false);
    const [activeTab, setActiveTab] = useState("1");
    const [graphData, setGraphData] = useState(null);

    const shareName = quarterDataByShareCode[shareCode][0][KEY_NAME.SHARE_NAME];
    
    const tabHandler = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    const modalHandler = () => {
        if (!graphData && !modalState) {

            const idcByYear = {};
            const idcByQuarter = {};

            GRAPH_ANALYSIS_COL.forEach((v, i) => {
                idcByYear[v] = rawData2GraphData(yearDataByShareCode[shareCode], v);
                idcByQuarter[v] = rawData2GraphData(quarterDataByShareCode[shareCode], v);
            })
            
            setGraphData({
                year: idcByYear,
                quarter: idcByQuarter
            })
        }

        setModalState(!modalState);
    }

   return (
        <IconButton className="p-0" color="default" aria-label="upload picture" component="span">
            <MDBIcon icon="chart-bar" onClick={() => {modalHandler()}}/>
            <MDBModal isOpen={modalState} toggle={modalHandler} size="lg">
                <MDBModalHeader toggle={modalHandler}>{`${shareName}: ${shareCode}`}</MDBModalHeader>
                <MDBModalBody>
                    <MDBNav className="nav-tabs">
                        <MDBNavItem>
                            <MDBNavLink link to="#" active={activeTab === "1"} onClick={() => tabHandler("1")} role="tab" >
                                Yearly
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink link to="#" active={activeTab === "2"} onClick={() => tabHandler("2")} role="tab" >
                                Quarterly
                            </MDBNavLink>
                        </MDBNavItem>
                    </MDBNav>
                    <MDBTabContent activeItem={activeTab} >
                        <MDBTabPane tabId="1" role="tabpanel">
                            {graphData? Object.keys(graphData['year']).map((v, i) => {
                                return <AnalysisGraph graphData={graphData['year'][v]} id={i}/>})
                                : null}                        
                        </MDBTabPane>
                        <MDBTabPane tabId="2" role="tabpanel">
                            {graphData? Object.keys(graphData['quarter']).map((v, i) => {
                                return <AnalysisGraph graphData={graphData['quarter'][v]} id={i}/>})
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
