import React, { useState, useContext, useEffect } from 'react';
import _ from "lodash";

import ShareDataContext from "../../contexts/ShareDataContext";
import FilterModalBtn from '../Share/FilterModalBtn';
import PeriodFilter from '../Share/PeriodFilter';

import { MODELS } from '../../consts/model';
import { KEY_NAME } from '../../consts/keyName';

const FilterWrapper = (props) => {
  const {filterStatus, setFilterStatus} = props;
  const [mdlFilterStatus, setMdlFilterStatus] = useState(filterStatus);
  const {yearRawData, quarterRawData} = useContext(ShareDataContext);

  const saveHandler = () => {
    setFilterStatus({...mdlFilterStatus});
  }

  const getInputsByModel = () => {
    const uniqQuarterPeriods = _.uniq(quarterRawData.map((v,i)=> v[KEY_NAME.PERIOD])).sort().reverse();

    const inputs = [];
    inputs.push(<PeriodFilter options={uniqQuarterPeriods} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);

    return inputs;
  }

  return (
    <FilterModalBtn filterComponent={getInputsByModel()} saveHandler={saveHandler}/>
  )
}

export default FilterWrapper;