import React, { useState, useContext, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { MDBContainer, MDBBtn, MDBModal, MDBIcon, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import _ from "lodash";

import ShareDataContext from "../../contexts/ShareDataContext";
import FilterModalBtn from '../Share/FilterModalBtn';
import PeriodFilter from '../Share/PeriodFilter';
import TermFilter from '../Share/TermFilter';
import SalesFilter from '../Share/SalesFilter';
import PerFilter from '../Share/PerFilter';
import RoeFilter from '../Share/RoeFilter';
import OpTimesFilter from '../Share/OpTimesFilter';
import IaCfTimesFilter from '../Share/IaCfTimesFilter';
import MvTimesFilter from '../Share/MvTimesFilter';

import { MODELS } from '../../consts/model';
import { KEY_NAME } from '../../consts/keyName';

const FilterWrapper = (props) => {
  const {model, filterStatus, setFilterStatus} = props;
  const [mdlFilterStatus, setMdlFilterStatus] = useState(null);
  const {yearRawData, quarterRawData} = useContext(ShareDataContext);

  useEffect(() => {
    setMdlFilterStatus(filterStatus?.[model])
  },[model])

  const saveHandler = () => {
    setFilterStatus({...filterStatus, [model]:mdlFilterStatus});
  }

  const getInputsByModel = () => {
    const uniqYearPeriods = _.uniq(yearRawData.map((v,i)=> v[KEY_NAME.PERIOD])).sort().reverse();
    const uniqQuarterPeriods = _.uniq(quarterRawData.map((v,i)=> v[KEY_NAME.PERIOD])).sort().reverse();

    const inputs = [];
    if (model === MODELS.VALUE) {
      // TODO : add periodFilter
      inputs.push(<PeriodFilter options={uniqQuarterPeriods} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
      inputs.push(<PerFilter mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
      inputs.push(<RoeFilter mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
    } else if (model == MODELS.TURNAROUND) {
      inputs.push(<PeriodFilter options={uniqQuarterPeriods} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
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
        {model?<FilterModalBtn filterComponent={getInputsByModel()} saveHandler={saveHandler}/>:null}
    </>
  )
}

export default FilterWrapper;