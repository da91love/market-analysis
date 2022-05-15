import React, { useState, useContext, useEffect } from 'react';
import {useTranslation} from "react-i18next";

import {
  MDBContainer, MDBDataTableV5, MDBCard, MDBCardTitle, MDBCardText, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn 
} from 'mdbreact';
import _ from "lodash";
import axios from 'axios';

import ShareDataContext from "../../contexts/ShareDataContext";
import { PERIOD_UNIT, DEFAULT_SHARE_INFO } from '../../consts/common';
import { KEY_NAME, OTHER_KEY_NAME } from '../../consts/keyName';
import { BY_SHARE_DEFAULT_GRAPH_TYPE, BY_SHARE_ALL_GRAPH_TYPE, MODELS } from '../../consts/model';
import { ALL_SHARE_TABLE_COL, BY_SHARE_ALL_TABLE_COL_TYPE } from '../../consts/tbCol';
import { API } from '../../consts/api';
import { FILTER } from '../../consts/filter';

import GraphModalBtn from '../Share/GraphModalBtn';
import GraphTypeSelectModal from '../Share/GraphTypeSelectModal';

// Temp: import json
const AllShares = () => {
  // const {isInitDataLoaded, yearRawDataByShare, quarterRawDataByShare} = useContext(ShareDataContext);
  // const [yearFilter, setYearFilter] = useState({});
  // const [quarterFilter, setQuarterFilter] = useState({});
  const { t, i18n } = useTranslation();
  const [rawPeriodData, setRawPeriodData] = useState();
  const [tableData, setTableData] = useState();
  const [selectedGraphType, setSelectedGraphType] = useState(ALL_SHARE_TABLE_COL);
  const [activeTab, setActiveTab] = useState(PERIOD_UNIT.QUARTER);
  const {country} = useContext(ShareDataContext);


  const tabHandler = (tab) => {
    if (activeTab !== tab) {
        setActiveTab(tab);
    }
  }

  const rawData2TableData = (tableData, tgColList) => {
    // Create columns
    const columns = tgColList.map((v,i) => {
       return {
          label: t(`common.rawData.${v}`),
          field: v,
       }
    })

    // Create rows
    const rows = []
    for (const data of tableData) {
          const row = {};
          for (const col of tgColList) {
             if (col === OTHER_KEY_NAME.GRAPH) {
                row[col] = <GraphModalBtn
                   tgName={data[KEY_NAME.SHARE_NAME]} 
                   tgCode={data[KEY_NAME.SHARE_CODE]} 
                />
             } else {
                row[col] = data[col];
             }
          }
          rows.push(row);
    }

    return {
          columns: columns,
          rows: rows
    }
 }

   // 아래의 API는 컬럼조정을 위한 useEffect
   // 위의 useEffect에서 컨트롤하지 않는 이유는 API통신을 최대한 자제하기 위함
   useEffect(() => {
     if (tableData) {
      setTableData({
        yearTableData: rawData2TableData(rawPeriodData.yearResult, selectedGraphType),
        quarterTableData: rawData2TableData(rawPeriodData.quarterResult, selectedGraphType),
      });
     };
 }, [selectedGraphType]);

  useEffect(() => {
    axios({
      method: API.POST_MODEL.METHOD,
      url: API.POST_MODEL.URL,
      data: {
         data: {
            model: MODELS.ALLSHARES,
            country: country,
            filter: null,
         }
      }
   })
   .then(res => {
      if(res.data.status === "success" ) {
         const {year_result, quarter_result} = res.data.payload.value;

         setRawPeriodData({
           yearResult: year_result,
           quarterResult: quarter_result
         });

         setTableData({
          yearTableData: rawData2TableData(year_result, selectedGraphType),
          quarterTableData: rawData2TableData(quarter_result, selectedGraphType),
         });
         // Select showing cols

      } else {
      // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
      }
   });
  }, []);

  return (
      <MDBContainer className="mt-5 mb-5 pt-5 pb-5">


        <div className="mt-3">
          <MDBCard className="card-body">
            <MDBCardTitle className="h3">{t('shareSearch.label.financialSummary')}</MDBCardTitle>
            <MDBCardText>
            <div className="mt-3">
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
                <div className="">
                  {tableData? <GraphTypeSelectModal selectedGraphType={selectedGraphType} setSelectedGraphType={setSelectedGraphType} allGraphType={BY_SHARE_ALL_TABLE_COL_TYPE}/>:<></>}
                </div>
              </MDBNav>

              <MDBTabContent activeItem={activeTab} >
                <MDBTabPane tabId={PERIOD_UNIT.YEAR} role="tabpanel">
                  <div className="mt-3">
                    {tableData? <MDBDataTableV5 striped bordered small hover entriesOptions={[10, 20, 30, 50]} entries={30} pagesAmount={4} data={tableData.yearTableData} />:null}
                  </div>   
                </MDBTabPane>
                <MDBTabPane tabId={PERIOD_UNIT.QUARTER} role="tabpanel">
                  <div className="mt-3">
                    {tableData? <MDBDataTableV5 striped bordered small hover entriesOptions={[10, 20, 30, 50]} entries={30} pagesAmount={4} data={tableData.quarterTableData} />:null}
                  </div>
                </MDBTabPane>
              </MDBTabContent>
              </div>
            </MDBCardText>
          </MDBCard>
        </div>
      </MDBContainer>
    )
};

export default AllShares;
