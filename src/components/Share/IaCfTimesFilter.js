import React, { useContext } from "react";
import _ from "lodash";
import { useSnackbar } from 'notistack';
import { MDBInputGroup } from "mdbreact";
import {FILTER_TYPE} from '../../consts/filter';
import {MSG} from '../../consts/message';
import {ERROR} from '../../consts/alert';

const IaCfTimesFilter = (props) => {
    const {title, mdlFilterStatus, setMdlFilterStatus} = props;
    const { enqueueSnackbar } = useSnackbar();

    const filterHandler = (value) => {
        // Validation
        // TODO
        if(_.isNaN(parseInt(value))){
            enqueueSnackbar(MSG.NAN, {variant: ERROR});
        } else {
            setMdlFilterStatus({...mdlFilterStatus, [FILTER_TYPE.CFI_TIMES]:parseInt(value)})
        }
    }

    return (
        <div className="mt-3">
            <p className="grey-text text-left">
                {title?title:"Investment CF ratio"}
            </p>
            <MDBInputGroup
                onChange={e => filterHandler(e.target.value)}
                material
                hint={mdlFilterStatus[FILTER_TYPE.CFI_TIMES]}
                containerClassName="mt-0"
                append="% higher than"
            />
        </div>
    );
};

export default IaCfTimesFilter;