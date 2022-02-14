import React, { useState, useContext, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import {
    MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink
  } from 'mdbreact';
import _ from "lodash";
import { useSnackbar } from 'notistack';
import {useTranslation} from "react-i18next";
import axios from 'axios';

import AnalysisGraph from './AnalysisGraph';
import ShareDataContext from "../../contexts/ShareDataContext";
import CompareTgContext from "../../contexts/CompareTgContext";
import GraphTypeSelectModal from './GraphTypeSelectModal';
import rawData2GraphData from '../../utils/rawData2GraphData';
import SyncStatus from '../../utils/SyncStatus';
import { PERIOD_UNIT, EXTERNAL_URL } from "../../consts/common";
import { ROUTER_URL } from "../../consts/router";
import { KEY_NAME } from "../../consts/keyName";
import { STRG_KEY_NAME } from "../../consts/localStorage";
import { SUCCESS, ERROR } from "../../consts/alert";
import { MSG } from "../../consts/message";
import { API } from '../../consts/api';
import { BY_SHARE_DEFAULT_GRAPH_TYPE, BY_MRK_DEFAULT_GRAPH_TYPE, BY_SHARE_ALL_GRAPH_TYPE, BY_MRK_ALL_GRAPH_TYPE } from "../../consts/graph"

const GraphModalBtn = (props) => {
    const {isMarket=false, tgCode, tgName} = props;
    const { t } = useTranslation();
    const {country} = useContext(ShareDataContext);
    const {compareTg, setCompareTg} = useContext(CompareTgContext);
    const {bookMark, setBookMark} = useContext(CompareTgContext); 
    const [modalState, setModalState] = useState(false);
    const [activeTab, setActiveTab] = useState(PERIOD_UNIT.QUARTER);
    const [graphData, setGraphData] = useState(null);
    const [selectedGraphType, setSelectedGraphType] = useState(isMarket?BY_MRK_DEFAULT_GRAPH_TYPE:BY_SHARE_DEFAULT_GRAPH_TYPE)
    const { enqueueSnackbar } = useSnackbar();

    const tabHandler = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    const modalHandler = () => {
        setModalState(!modalState);
    }

    const searchPageMoveHandler = (code, name) => {
        const win = window.open(`${ROUTER_URL.SHARE_SEARCH}/${code}/${name}`, "_blank");
        win.focus();
    }

    const addToCompareListHandler = (code, name) => {
        if (_.find(compareTg, [[KEY_NAME.SHARE_CODE], code])) {
            enqueueSnackbar(
                `${MSG.SHARE_CODE_ALREADY_EXIST}(${code}:${name})`, 
                {variant: ERROR}
            );
        } else {
            SyncStatus.set({
                storageKey: STRG_KEY_NAME.COMPARE,
                statusSetter: setCompareTg,
                data: [...compareTg, {
                  [KEY_NAME.SHARE_CODE]: code,
                  [KEY_NAME.SHARE_NAME]: name
                }]
            });
    
            enqueueSnackbar(
                `${MSG.ADD_COMPARE_TG}(${code}:${name})`, 
                {variant: SUCCESS}
            );
        }
    };

    const addToBookMarkListHandler = (code, name) => {
        if (_.find(bookMark, [[KEY_NAME.SHARE_CODE], code])) {
            enqueueSnackbar(
                `${MSG.SHARE_CODE_ALREADY_EXIST_IN_BM}(${code}:${name})`, 
                {variant: ERROR}
            );
        } else {
          SyncStatus.set({
            storageKey: STRG_KEY_NAME.BOOKMARK,
            statusSetter: setBookMark,
            data: [...bookMark, {
              [KEY_NAME.SHARE_CODE]: code,
              [KEY_NAME.SHARE_NAME]: name
            }]
          });
    
          enqueueSnackbar(
            `${MSG.ADD_BOOKMARK_TG}(${code}:${name})`, 
            {variant: SUCCESS}
          );
        }
      };

    const modalClickHandler = () => {

    }

    useEffect(() => {
        // 첫 렌더링시 불필요하게 api를 run하지 않게 하기 위함
        if (modalState) {
            axios({
                method: API.POST_FINANCIAL_SUMMARY.METHOD,
                url: API.POST_FINANCIAL_SUMMARY.URL,
                data: {
                    data: {
                        country: country,
                        shareCode: tgCode
                    }
                }
            })
            .then(res => {
                if(res.data.status === "success" ) {
                    const {year_result,quarter_result} = res.data.payload.value;
                    
                    const idcByYear = {};
                    const idcByQuarter = {};
        
                    selectedGraphType.forEach((idc, i) => {
                        idcByYear[idc] = rawData2GraphData(year_result, idc);
                        idcByQuarter[idc] = rawData2GraphData(quarter_result, idc);
                    });
                    
                    setGraphData({
                        year: idcByYear,
                        quarter: idcByQuarter
                    });
    
                } else {
                    // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
                }
            });
        }
    }, [modalState, selectedGraphType]);

    return (
        <IconButton className="p-0" color="default" aria-label="upload picture" component="span">
            <MDBIcon icon="chart-bar" onClick={modalHandler}/>
            <MDBModal isOpen={modalState} toggle={modalHandler} size="lg">
                <MDBModalHeader toggle={modalHandler}>
                    <a className="mr-1" href={`${EXTERNAL_URL.NAVER_SHARE_INFO}${tgCode}`} target="_blank">
                        <span className="h3">{`${tgName}:${tgCode}`}</span>
                    </a>
                    <MDBIcon className="mr-1 indigo-text" size="lg" onClick={() => {searchPageMoveHandler(tgCode, tgName)}} icon="external-link-alt" />
                    <MDBIcon className="mr-1 indigo-text" size="lg" onClick={() => {addToCompareListHandler(tgCode, tgName)}}  icon="plus-square" />
                    <MDBIcon className="mr-1 indigo-text" size="lg" onClick={() => {addToBookMarkListHandler(tgCode, tgName)}}  icon="bookmark" />

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
                <MDBBtn color="secondary" onClick={modalHandler}>{t('common.button.close')}</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </IconButton>
   )
};

export default GraphModalBtn;
