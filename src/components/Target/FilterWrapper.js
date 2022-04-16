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
  const [yearUniqPeriods, setYearUniqPeriods] = useState([]);
  const [quarterUniqPeriods, setQuarterUniqPeriods] = useState([]);

  const saveHandler = () => {
    setFilterStatus({...filterStatus, [model]:mdlFilterStatus});
  };

  useEffect(() => {
    if (model!=="default") {
      // mdlFilterStatus 변수를 둔 이유는 mdlFilterStatus가 없다면 filter modal에서 값이 바뀔 때마다, filterStatus가 있는
      // modalbox전체가 re-routing 되는 비효율을 야기하기 때문에 이를 방지하기 위함임
      const tempMdlFilterStatus = filterStatus?.[model];
      setMdlFilterStatus(tempMdlFilterStatus);
      setFiltersByModel(getInputsByModel(yearUniqPeriods, quarterUniqPeriods, tempMdlFilterStatus, setMdlFilterStatus));
    }
}, [model, filterStatus]);

useEffect(() => {
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
            setYearUniqPeriods(_.uniq(year_result.map(x => x[KEY_NAME.PERIOD])).sort().reverse());
            setQuarterUniqPeriods(_.uniq(quarter_result.map(x => x[KEY_NAME.PERIOD])).sort().reverse());
        } else {
            // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
        }
    })
}, []);

const getInputsByModel = (uniqYearPeriods, uniqQuarterPeriods, mdlFilterStatus, setMdlFilterStatus) => {
  const inputs = [];
  if (model === MODELS.VALUE) {
    // TODO : add periodFilter
    inputs.push(<PeriodFilter options={uniqQuarterPeriods} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
    inputs.push(<PerFilter mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
    inputs.push(<RoeFilter mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
  } else if (model == MODELS.TURNAROUND) {
    inputs.push(<PeriodFilter options={uniqQuarterPeriods} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
    inputs.push(<ProfitTypeFilter options={[KEY_NAME.OP, KEY_NAME.EBITDA, KEY_NAME.NP_CTRL]} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
    inputs.push(<TermFilter append={"quarters"} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
  } else if (model === MODELS.CPGROWTH) {
    inputs.push(<PeriodFilter options={uniqQuarterPeriods} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
    inputs.push(<TermFilter append={"quarters"} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
    inputs.push(<OpTimesFilter mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
  } else if (model === MODELS.MRKGROWTH) {
    inputs.push(<PeriodFilter options={uniqYearPeriods} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
    inputs.push(<MvTimesFilter mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
  } else if (model === MODELS.COLLAPSE) {
    inputs.push(<PeriodFilter options={uniqYearPeriods} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
    inputs.push(<TermFilter append={"years"} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
    inputs.push(<MvTimesFilter mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
  } else if (model === MODELS.BLUECHIP) {
    inputs.push(<PeriodFilter options={uniqQuarterPeriods} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
    inputs.push(<SalesFilter mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
    inputs.push(<PerFilter mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
    inputs.push(<RoeFilter mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
  } else if (model === MODELS.INVGROWTH) {
    inputs.push(<PeriodFilter options={uniqQuarterPeriods} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
    inputs.push(<IaCfTimesFilter mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
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