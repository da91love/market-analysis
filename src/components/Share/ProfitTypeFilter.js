import React from "react";
import {FILTER_TYPE} from '../../consts/filter';
import {useTranslation} from "react-i18next";

const ProfitTypeFilter = (props) => {
    const {title, options, mdlFilterStatus, setMdlFilterStatus} = props;
    const { t } = useTranslation();

    const filterHandler = (value) => {
        setMdlFilterStatus({...mdlFilterStatus, [FILTER_TYPE.PROFIT_TYPE]:value})
    }

    return (
        <div className="mt-3">
            <p className="grey-text text-left">
                {title?title:"Profit Type"}
            </p>
            <select className="browser-default custom-select" onChange={(e) => {filterHandler(e.target.value)}}>
                <option value="default">Choose profit type</option>
                {options.map((v, i) => {
                        return <option value={v} selected={v===mdlFilterStatus?.[FILTER_TYPE.PROFIT_TYPE]}>{t(`common.rawData.${v}`)}</option>
                })}
            </select>
            <br />
        </div>
    );
};

export default ProfitTypeFilter;