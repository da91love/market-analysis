import React, { useEffect, useState } from 'react';
import {MDBCard, MDBCardTitle, MDBCardText, MDBIcon, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import {useTranslation} from "react-i18next";

import FixedSideUnionTable from '../Share/FixedSideUnionTable';
import { FINANCIAL_STATUS_TABLE_COL } from '../../consts/tbCol';
import { KEY_NAME } from '../../consts/keyName';
import { BLANK, PERIOD_UNIT, F_STATUS_TYPE } from '../../consts/common';
import { F_STATUS_DATA_FMT } from '../../consts/format';

const FinancialStatus = (props) => {
    const {financialStatusByShare} = props;
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
        const dcFStatusDataFmt = {...F_STATUS_DATA_FMT};
        for (const status in dcFStatusDataFmt) {
            for (const period in dcFStatusDataFmt[status]) {
                dcFStatusDataFmt.status.period = rawData2FixedTableData(financialStatusByShare.status.period, FINANCIAL_STATUS_TABLE_COL.status)
            }
        }

        setDataTableData(dcFStatusDataFmt);
    }, [financialStatusByShare, crtLang])

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
                    {
                        Object.keys(F_STATUS_DATA_FMT).map((s, i) => {
                            Object.keys(F_STATUS_DATA_FMT.s).map((p, j) => {
                                return (
                                    <MDBNavItem>
                                        <MDBNavLink link to="#" active={activeTab === `${F_STATUS_DATA_FMT.s}:${F_STATUS_DATA_FMT.s.p}`} onClick={() => tabHandler(`${F_STATUS_DATA_FMT.s}:${F_STATUS_DATA_FMT.s.p}`)} role="tab" >
                                            {t('common.tab.yearly')}
                                        </MDBNavLink>
                                    </MDBNavItem>
                                )
                            })
                        })
                    }
                    </MDBNav>
                    {/* <MDBNav className="nav-tabs">
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
                    </MDBNav> */}
                    <MDBTabContent activeItem={activeTab} >
                        {
                            Object.keys(F_STATUS_DATA_FMT).map((s, i) => {
                                Object.keys(F_STATUS_DATA_FMT.s).map((p, j) => {
                                    return (
                                        <MDBTabPane tabId={`${F_STATUS_DATA_FMT.s}:${F_STATUS_DATA_FMT.s.p}`} role="tabpanel">
                                            <div className="mt-3">
                                                <FixedSideUnionTable
                                                    header={dataTableData[s][p].header}
                                                    records={dataTableData[s][p].records}
                                                    labelColumnNum={1}
                                                    tableId={`${F_STATUS_DATA_FMT.s}:${F_STATUS_DATA_FMT.s.p}`}
                                                />
                                            </div>                  
                                        </MDBTabPane>
                                    )
                                })
                            })
                        }

                    </MDBTabContent>
                </>
                :null}
            </MDBCardText>
        </MDBCard>
    )
};

export default FinancialStatus;
