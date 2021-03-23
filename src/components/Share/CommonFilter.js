import React, { useContext } from "react";
import _ from "lodash";
import { MDBInputGroup, MDBInput } from "mdbreact";
import {FILTER_TYPE} from '../../consts/model';
import {MSG} from '../../consts/message';
import {ERROR} from '../../consts/alert';
import AlertContext from "../../contexts/AlertContext";

const CommonFilter = (props) => {
    const {title, mdlFilterStatus, setMdlFilterStatus} = props;
    const {alertState,setAlertState} = useContext(AlertContext);

    const minFilterHandler = (value) => {
        // Validation
        // TODO
        if(_.isNaN(parseInt(value))){
            enqueueSnackbar(MSG.NAN, {variant: ERROR});
        } else {
            setMdlFilterStatus({...mdlFilterStatus, [FILTER_TYPE.PER_MIN]:parseInt(value)})
        }
    }

    const maxFilterHandler = (value) => {
        // Validation
        // TODO
        if(_.isNaN(parseInt(value))){
            enqueueSnackbar(MSG.NAN, {variant: ERROR});
        } else {
            setMdlFilterStatus({...mdlFilterStatus, [FILTER_TYPE.PER_MAX]:parseInt(value)})
        }
    }

    return (
        <div className="mt-3">
            <p className="grey-text text-left">
                {title?title:"PER"}
            </p>
            <MDBInputGroup
                material
                containerClassName="m-2"
                inputs={
                <>
                    <MDBInput noTag className="pr-2" type="text" hint={mdlFilterStatus[FILTER_TYPE.PER_MIN]} onChange={e => minFilterHandler(e.target.value)}/>
                    <MDBInput noTag className="pl-2" type="text" hint={mdlFilterStatus[FILTER_TYPE.PER_MAX]} onChange={e => maxFilterHandler(e.target.value)}/>
                </>
                }
            />
        </div>
    );
};

export default CommonFilter;