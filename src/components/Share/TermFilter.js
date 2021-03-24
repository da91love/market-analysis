import React, { useContext } from "react";
import _ from "lodash";
import { useSnackbar } from 'notistack';
import { MDBInputGroup } from "mdbreact";
import {FILTER_TYPE} from '../../consts/filter';
import {MSG} from '../../consts/message';
import {ERROR} from '../../consts/alert';

const TermFilter = (props) => {
    const {title, append, mdlFilterStatus, setMdlFilterStatus} = props;
    const { enqueueSnackbar } = useSnackbar();

    const filterHandler = (value) => {
        // Validation
        // TODO
        if(_.isNaN(parseInt(value))){
            enqueueSnackbar(MSG.NAN, {variant: ERROR});
        } else {
            setMdlFilterStatus({...mdlFilterStatus, [FILTER_TYPE.TERM]:parseInt(value)})
        }
    }

    return (
        <div className="mt-3">
            <p className="grey-text text-left">
                {title?title:"Term"}
            </p>
            <MDBInputGroup
                onChange={e => filterHandler(e.target.value)}
                material
                containerClassName="mt-0"
                hint={mdlFilterStatus[FILTER_TYPE.TERM]}
                append={append}
            />
        </div>
    );
};

export default TermFilter;