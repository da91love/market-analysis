import React from "react";
import {FILTER_TYPE} from '../../consts/model';

const PeriodFilter = (props) => {
    const {title, options, model, mdlFilterStatus, setMdlFilterStatus} = props;

    const filterHandler = (value) => {
        setMdlFilterStatus({...mdlFilterStatus, [FILTER_TYPE.PERIOD]:value})
    }

    return (
        <div className="mt-3">
            <p className="grey-text text-left">
                {title?title:"Period"}
            </p>
            <select className="browser-default custom-select" onChange={(e) => {filterHandler(e.target.value)}}>
                <option value="default">Choose your option</option>
                {options.map((v, i) => {
                        return <option value={v}>{v}</option>
                })}
            </select>
            <br />
        </div>
    );
};

export default PeriodFilter;