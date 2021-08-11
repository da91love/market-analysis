import React, { useState, useContext } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBListGroup, MDBListGroupItem, MDBCollapse, MDBIcon} from 'mdbreact';
import {useTranslation} from "react-i18next";
import axios from 'axios';

import AuthContext from '../../contexts/AuthContext';
import { STRG_KEY_NAME } from "../../consts/localStorage";
import { useSnackbar } from 'notistack';
import SyncStatus from '../../utils/SyncStatus';
import {MSG} from "../../consts/message";
import {API} from '../../consts/api';
import {SUCCESS, ERROR} from "../../consts/alert";

const CompareMrkListModal = (props) => {
    const {compareMrkList, setCompareTg} = props;
    const {authId, userId} = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const [modalState, setModalState] = useState(false);
    const [collapseStatus, setCollapseStatus] = useState({});
    const [applySelectedStatus, setApplySelectedStatus] = useState(null);

    const modalHandler = () => {
        setModalState(!modalState);
    }

    const toggleCollapse = (collapseId) => {
        const prevCollapseStatus = collapseStatus[collapseId];
        setCollapseStatus({...collapseStatus, [collapseId]: !prevCollapseStatus});
    }

    const removeMrkNameHandler = (compareMrkName) => {
        if (authId) {
            const dpCompareMrkList = {...compareMrkList};

            for (const key in dpCompareMrkList) {
                if (key === compareMrkName) {
                    delete dpCompareMrkList[key];
                    break;
                }
            };

            axios({
                method: API.PUT_COMP_TG_GRP.METHOD,
                url: API.PUT_COMP_TG_GRP.URL,
                data: {
                    data: {
                        userId: userId,
                        authId: authId,
                        value: dpCompareMrkList
                    }
                }    
            })
            .then(res => {
                if(res.data.status === "success" ) {
                    enqueueSnackbar(MSG.REMOVE_COMPARE_MRK_LIST, {variant: SUCCESS});
                } else {
                    // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
                }
            })  
        } else {
            enqueueSnackbar(MSG.NOT_LOGED_IN, {variant: ERROR});
        }
    }

    const applySelectedHandler = (compareMrkName) => {
        setApplySelectedStatus(compareMrkName);
    }

    const applyHandler = (compareMrkName) => {
        SyncStatus.set({
            storageKey: STRG_KEY_NAME.COMPARE,
            statusSetter: setCompareTg,
            data: compareMrkList[compareMrkName]
        });        
        setModalState(!modalState);

        enqueueSnackbar(MSG.APPLY_COMPARE_MRK_LIST, {variant: SUCCESS});
    }

    return (
        <>
            <MDBBtn className={"pt-1 pb-1 pr-4 pl-4"} onClick={modalHandler}>{t('common.button.apply')}</MDBBtn>
            <MDBModal isOpen={modalState} toggle={modalHandler} size="lg">
                <MDBModalHeader toggle={modalHandler}>{t('compare.compareTgApply')}</MDBModalHeader>
                <MDBModalBody>
                    <MDBListGroup>
                    {Object.keys(compareMrkList).map((compareMrkName, i) => {
                        return (
                            <>
                                <MDBListGroupItem 
                                    className={applySelectedStatus===compareMrkName?"gray-light":null}
                                    onClick={() => {
                                        toggleCollapse(i);
                                        applySelectedHandler(compareMrkName);
                                     }}>
                                    {compareMrkName}
                                        <MDBIcon className="float-right red-text" onClick={e => {removeMrkNameHandler(compareMrkName)}} icon="times" />
                                </MDBListGroupItem>
                                <MDBCollapse id={i} isOpen={collapseStatus[i]}>
                                    <MDBListGroup>
                                        {compareMrkList[compareMrkName].map((k) => {
                                            return <MDBListGroupItem color='primary-color'>{`${k.shareName}: (${k.shareCode})`}</MDBListGroupItem>
                                        })}
                                    </MDBListGroup>
                                </MDBCollapse>      
                            </>
                        )
                    })}
                    </MDBListGroup>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={()=>{applyHandler(applySelectedStatus)}}>{t('common.button.apply')}</MDBBtn>
                    <MDBBtn color="secondary" >{t('common.button.close')}</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </>
    );

}

export default CompareMrkListModal;