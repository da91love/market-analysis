import React, { useState, useEffect } from 'react';
import _ from "lodash";
import axios from 'axios';
import {useTranslation} from "react-i18next";

import comma from '../../utils/convertComma';
import { API } from '../../consts/api';

const StockPrice = (props) => {
    const {shareCode} = props;
    const { t } = useTranslation();
    const [crtStockPriceInfo, setCrtStockPriceInfo] = useState(null);

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
                const payload = res.data.payload.value;
                setCrtStockPriceInfo(payload);

            } else {
            // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
            }
         });
    }, []);

  return (
    <>
    {!crtStockPriceInfo? null
    : <p>
        <span className="h1"><b className={`${(crtStockPriceInfo.mt == 2)? 'text-danger':'text-primary'}`}>{`${comma(crtStockPriceInfo.nv)}`}</b></span>
        <span className="h4"><b className={`${(crtStockPriceInfo.mt == 2)? 'text-danger':'text-primary'}`}>{`${(crtStockPriceInfo.mt == 2)? ' (+':' (-'}`}{`${crtStockPriceInfo.cr} %`}</b></span>
        <span className="h4"><b className={`${(crtStockPriceInfo.mt == 2)? 'text-danger':'text-primary'}`}>{`${(crtStockPriceInfo.mt == 2)? ' ▲':' ▼'}`}{`${crtStockPriceInfo.cv} 원)`}</b></span>
    </p>
    }

    </>
    )
};

export default StockPrice;
