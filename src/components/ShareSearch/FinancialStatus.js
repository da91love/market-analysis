import React, { useEffect, useState } from 'react';
import {MDBCard, MDBCardTitle, MDBCardText, MDBIcon, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import {useTranslation} from "react-i18next";

import FixedSideUnionTable from '../Share/FixedSideUnionTable';
import { SEARCH_TABLE_COL } from '../../consts/tbCol';
import { KEY_NAME } from '../../consts/keyName';
import { BLANK, PERIOD_UNIT } from '../../consts/common';

const FinancialStatus = (props) => {
    const {yearSummaryByShare, quarterSummaryByShare} = props;
    const { t, i18n } = useTranslation();
    const crtLang = i18n.language;
    const [hidden, setHidden] = useState(false);
    const [dataTableData, setDataTableData] = useState();
    const [activeTab, setActiveTab] = useState(PERIOD_UNIT.QUARTER);

    const rawData2FixedTableData = (periodRawData, fixedCol) => {
        const header = periodRawData.map((v, i) => {
          return v[KEY_NAME.PERIOD];
        });

        const records = fixedCol.map((v, i) => {
          const cells = [];
          periodRawData.forEach((b, o) => {
            cells.push({
              value: b[v]?b[v]:BLANK,
              key: i+o,
            })
          });
    
          return cells;
        });
    
        // cells의 가장 첫번째 엘리먼트로 fixedCol의 값 삽입
        fixedCol.forEach((v, i) => {
          (records[i]).unshift({
            name: t(`common.rawData.${v}`),
            value: v,
            key: 0,
            popOver: {
              popOverHeader: t(`common.rawData.${v}`),
              popOverBody: periodRawData
            }
        })
        })
    
        // FixedCol의 1열 이상일 때, header의 앞에 빈값 삽입
        header.unshift(BLANK);
    
        return ({
          header: header,
          records: records,
        })
    }

    const hiddenHandler = () => {
        setHidden(!hidden);
    }

    const tabHandler = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    useEffect(() => {
        setDataTableData({
            [PERIOD_UNIT.YEAR]: rawData2FixedTableData(yearSummaryByShare, SEARCH_TABLE_COL),
            [PERIOD_UNIT.QUARTER]: rawData2FixedTableData(quarterSummaryByShare, SEARCH_TABLE_COL),
        });
    }, [yearSummaryByShare, quarterSummaryByShare, crtLang])

    return (
        <MDBCard className="card-body">
            <MDBCardTitle className="h3">
                <span className="h3">{t('shareSearch.label.FinancialStatus')}</span>
                {hidden?<MDBIcon className={"float-right"} onClick={hiddenHandler} icon="angle-down" />:<MDBIcon className={"float-right"} onClick={hiddenHandler} icon="angle-up" />}
            </MDBCardTitle>
            <MDBCardText>
                {dataTableData && !hidden?
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
                                <FixedSideUnionTable
                                    header={dataTableData[PERIOD_UNIT.YEAR].header}
                                    records={dataTableData[PERIOD_UNIT.YEAR].records}
                                    labelColumnNum={1}
                                    tableId={'yearFinancialStatus'}
                                />
                            </div>                  
                        </MDBTabPane>
                        <MDBTabPane tabId={PERIOD_UNIT.QUARTER} role="tabpanel">
                            <div className="mt-3">
                                <FixedSideUnionTable
                                    header={dataTableData[PERIOD_UNIT.QUARTER].header}
                                    records={dataTableData[PERIOD_UNIT.QUARTER].records}
                                    labelColumnNum={1}
                                    tableId={'quarterFinancialStatus'}
                                />
                            </div>
                        </MDBTabPane>
                    </MDBTabContent>
                </>
                :null}
            </MDBCardText>
        </MDBCard>
    )
};

export default FinancialStatus;
