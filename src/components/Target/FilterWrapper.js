import React, { useState, useContext, useEffect } from 'react';
import _ from "lodash";
import axios from 'axios';
import {useTranslation} from "react-i18next";

import ShareDataContext from "../../contexts/ShareDataContext";
import FilterModalBtn from '../Share/FilterModalBtn';
import PeriodFilter from '../Share/PeriodFilter';
import TermFilter from '../Share/TermFilter';
import ProfitTypeFilter from '../Share/ProfitTypeFilter';
import SalesFilter from '../Share/SalesFilter';
import PerFilter from '../Share/PerFilter';
import RoeFilter from '../Share/RoeFilter';
import OpTimesFilter from '../Share/OpTimesFilter';
import IaCfTimesFilter from '../Share/IaCfTimesFilter';
import MvTimesFilter from '../Share/MvTimesFilter';

import { MODELS } from '../../consts/model';
import { KEY_NAME } from '../../consts/keyName';
import {API} from '../../consts/api';


const FilterWrapper = (props) => {
  const {model, filterStatus, setFilterStatus} = props;
  const {country} = useContext(ShareDataContext);
  const { t } = useTranslation();
  const [mdlFilterStatus, setMdlFilterStatus] = useState(null);
  const [filtersByModel, setFiltersByModel] = useState([]);

  const saveHandler = () => {
    setFilterStatus({...filterStatus, [model]:mdlFilterStatus});
  };

  useEffect(() => {
    if (model!=="default") {
      axios({
        method: API.POST_FINANCIAL_SUMMARY.METHOD,
        url: API.POST_FINANCIAL_SUMMARY.URL,
        data: {
          data: {
            country: country,
            displayCol: [KEY_NAME.PERIOD]
          }
        }
      })
        .then(res => {
            if(res.data.status === "success" ) {
                const {year_result, quarter_result} = res.data.payload.value;
                const yearUniqPeriods = _.uniq(year_result.map(x => x[KEY_NAME.PERIOD])).sort().reverse();
                const quarterUniqPeriods = _.uniq(quarter_result.map(x => x[KEY_NAME.PERIOD])).sort().reverse();

                const tempMdlFilterStatus = filterStatus?.[model];
                setMdlFilterStatus(tempMdlFilterStatus);
                setFiltersByModel(getInputsByModel(yearUniqPeriods, quarterUniqPeriods, tempMdlFilterStatus, setMdlFilterStatus));

            } else {
                // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
            }
        })
    }
}, [model]);

const getInputsByModel = (uniqYearPeriods, uniqQuarterPeriods, filterStatus, setFilterStatus) => {
  const inputs = [];
  if (model === MODELS.VALUE) {
    // TODO : add periodFilter
    inputs.push(<PeriodFilter options={uniqQuarterPeriods} mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
    inputs.push(<PerFilter mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
    inputs.push(<RoeFilter mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
  } else if (model == MODELS.TURNAROUND) {
    inputs.push(<PeriodFilter options={uniqQuarterPeriods} mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
    inputs.push(<ProfitTypeFilter options={[KEY_NAME.OP, KEY_NAME.EBITDA, KEY_NAME.NP_CTRL]} mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
    inputs.push(<TermFilter append={"quarters"} mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
  } else if (model === MODELS.CPGROWTH) {
    inputs.push(<PeriodFilter options={uniqQuarterPeriods} mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
    inputs.push(<TermFilter append={"quarters"} mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
    inputs.push(<OpTimesFilter mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
  } else if (model === MODELS.MRKGROWTH) {
    inputs.push(<PeriodFilter options={uniqYearPeriods} mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
    inputs.push(<MvTimesFilter mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
  } else if (model === MODELS.COLLAPSE) {
    inputs.push(<PeriodFilter options={uniqYearPeriods} mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
    inputs.push(<TermFilter append={"years"} mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
    inputs.push(<MvTimesFilter mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
  } else if (model === MODELS.BLUECHIP) {
    inputs.push(<PeriodFilter options={uniqQuarterPeriods} mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
    inputs.push(<SalesFilter mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
    inputs.push(<PerFilter mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
    inputs.push(<RoeFilter mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
  } else if (model === MODELS.INVGROWTH) {
    inputs.push(<PeriodFilter options={uniqQuarterPeriods} mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
    inputs.push(<IaCfTimesFilter mdlFilterStatus={filterStatus} setMdlFilterStatus={setFilterStatus}/>);
  }

  return inputs;
}

  return (
    <>
        {model!=="default"?
        <FilterModalBtn filterComponent={filtersByModel || null} saveHandler={saveHandler}/>
        :<FilterModalBtn filterComponent={null} />}
    </>
  )
}

export default FilterWrapper;