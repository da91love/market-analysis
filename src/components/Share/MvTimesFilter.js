import React, { useContext } from "react";
import _ from "lodash";
import { useSnackbar } from 'notistack';
import { MDBInputGroup } from "mdbreact";
import {FILTER_TYPE} from '../../consts/model';
import {MSG} from '../../consts/message';
import {ERROR} from '../../consts/alert';

const MvTimesFilter = (props) => {
    const {title, mdlFilterStatus, setMdlFilterStatus} = props;
    const { enqueueSnackbar } = useSnackbar();

    const filterHandler = (value) => {
        // Validation
        // TODO
        if(_.isNaN(parseInt(value))){
            enqueueSnackbar(MSG.NAN, {variant: ERROR});
        } else {
            setMdlFilterStatus({...mdlFilterStatus, [FILTER_TYPE.MV_TIMES]:parseInt(value)})
        }
    }

    return (
        <div className="mt-3">
            <p className="grey-text text-left">
                {title?title:"MV ratio"}
            </p>
            <MDBInputGroup
                onChange={e => filterHandler(e.target.value)}
                material
                hint={mdlFilterStatus[FILTER_TYPE.MV_TIMES]}
                containerClassName="mt-0"
                append="% lower than"
            />
        </div>
    );
};

export default MvTimesFilter;