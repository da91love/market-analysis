import React, {useState, useEffect} from 'react';
import {MDBCard, MDBCardTitle, MDBCardText, MDBIcon} from 'mdbreact';
import {useTranslation} from "react-i18next";

import getAllMatchedTgByModel from '../../utils/getAllMatchedTgByModel';
import FixedSideTable from '../Share/FixedSideTable';
import { FILTER_BY_MDL } from '../../consts/filter';
import { MODELS } from '../../consts/model';
import { BLANK } from '../../consts/common';

const StockPrice = (props) => {
    const {shareCode, marketCode, quarterRawDataByMrk, yearRawDataByShare, quarterRawDataByShare} = props;
    const { t } = useTranslation();
    const [hidden, setHidden] = useState(false);
    const [dataTableData, setDataTableData] = useState();

    useEffect(() => {
        axios({
            method: API.GET_STOCK_PRICE_INFO.METHOD,
            url: API.GET_STOCK_PRICE_INFO.URL,
            params: {
              shareCode: shareCode,
              numOfRows: 1
            }
         })
         .then(res => {
            if(res.data.status === "success" ) {
                const payload = stockPriceInfo.data.payload.value;
                setCrtStockPriceInfo(payload);

            } else {
            // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
            }
         });
    }, []);


    useEffect(() => {
        setDataTableData(createTableData(quarterRawDataByMrk, yearRawDataByShare, quarterRawDataByShare, FILTER_BY_MDL));
    }, [shareCode])

  return (
    <>
        <span className="h1"><b className={`${(crtStockPriceInfo.mt == 2)? 'text-danger':'text-primary'}`}>{`${comma(crtStockPriceInfo.nv)}`}</b></span>
        <span className="h4"><b className={`${(crtStockPriceInfo.mt == 2)? 'text-danger':'text-primary'}`}>{`${(crtStockPriceInfo.mt == 2)? ' (+':' (-'}`}{`${crtStockPriceInfo.cr} %`}</b></span>
        <span className="h4"><b className={`${(crtStockPriceInfo.mt == 2)? 'text-danger':'text-primary'}`}>{`${(crtStockPriceInfo.mt == 2)? ' ▲':' ▼'}`}{`${crtStockPriceInfo.cv} 원)`}</b></span>
    </>
    )
};
StockPrice;
