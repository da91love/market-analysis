import React, { useContext } from "react";
import _ from "lodash";
import { useSnackbar } from 'notistack';
import { MDBInputGroup } from "mdbreact";
import {FILTER_TYPE} from '../../consts/model';
import {MSG} from '../../consts/message';
import {ERROR} from '../../consts/alert';

const RoeFilter = (props) => {
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
        } else if (model === MODELS.CAPEXGROWTH) {
          inputs.push(<PeriodFilter options={uniqQuarterPeriods} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
          inputs.push(<CapexRatioFilter mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
        }
    
        return inputs;
      }
};

export default RoeFilter;