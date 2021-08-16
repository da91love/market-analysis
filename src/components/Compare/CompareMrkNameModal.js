import React, { useState, useContext } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import {useTranslation} from "react-i18next";
import axios from 'axios';

import AuthContext from '../../contexts/AuthContext';
import { STRG_KEY_NAME } from "../../consts/localStorage";
import { useSnackbar } from 'notistack';
import {MSG} from "../../consts/message";
import {API} from '../../consts/api';
import {SUCCESS, ERROR} from "../../consts/alert";

const CompareMrkNameModal = (props) => {
    const {compareMrkList} = props;
    const {authId} = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation();
    const [modalState, setModalState] = useState(false);
    const [compareMrkName, setCompareMrkName] = useState();
    const selectedCompareTg = JSON.parse(localStorage.getItem(STRG_KEY_NAME.COMPARE)) || []; 

    const modalHandler = () => {
        setModalState(!modalState);
    }

    const saveHandler = () => {
        if (authId) {
            const addedCompareMrkList = {...compareMrkList, [compareMrkName]: selectedCompareTg};

            axios({
                method: API.PUT_COMP_TG_GRP.METHOD,
                url: API.PUT_COMP_TG_GRP.URL,
                headers: {
                    authId: authId,
                },
                data: {
                    data: {
                        value: addedCompareMrkList
                    }
                }    
            })
            .then(res => {
                if(res.data.status === "success" ) {
                    setModalState(!modalState);
                    enqueueSnackbar(`${MSG.SAVE_COMPARE_MRK_LIST}: ${compareMrkName}`, {variant: SUCCESS});
                } else {
                    // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
                }
            })  
        } else {
            enqueueSnackbar(MSG.NOT_LOGED_IN, {variant: ERROR});
        }
    }

    return (
        <>
            <MDBBtn className={"pt-1 pb-1 pr-4 pl-4"} onClick={modalHandler}>{t('common.button.save')}</MDBBtn>
            <MDBModal isOpen={modalState} toggle={modalHandler} size="lg">
                <MDBModalHeader toggle={modalHandler}>{t('compare.compareTgSave')}</MDBModalHeader>
                <MDBModalBody>
                    <MDBInput label={t('compare.insertCompareTgGroup')} onChange={e => setCompareMrkName(e.target.value)}/>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={saveHandler}>{t('common.button.save')}</MDBBtn>
                    <MDBBtn color="secondary" onClick={modalHandler}>{t('common.button.close')}</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </>
    );

}

export default CompareMrkNameModal;