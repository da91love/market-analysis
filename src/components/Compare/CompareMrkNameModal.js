import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import {useTranslation} from "react-i18next";

import { STRG_KEY_NAME } from "../../consts/localStorage";
import { useSnackbar } from 'notistack';
import SyncStatus from '../../utils/SyncStatus';
import {MSG} from "../../consts/message";
import {SUCCESS} from "../../consts/alert";

const CompareMrkNameModal = (props) => {
    const {compareMrkList, setCompareMrkList} = props;
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation();
    const [modalState, setModalState] = useState(false);
    const [compareMrkName, setCompareMrkName] = useState();
    const selectedCompareTg = JSON.parse(localStorage.getItem(STRG_KEY_NAME.COMPARE)) || []; 

    const modalHandler = () => {
        setModalState(!modalState);
    }

    const inputHandler = (e) => {
        setCompareMrkName(e.target.value);
    }

    const saveHandler = () => {
        const addedCompareMrkList = {...compareMrkList, [compareMrkName]: selectedCompareTg};

        localStorage.setItem(STRG_KEY_NAME.COMPARE_MRK_LIST, JSON.stringify(addedCompareMrkList));
        SyncStatus.set({
            storageKey: STRG_KEY_NAME.COMPARE_MRK_LIST, 
            statusSetter: setCompareMrkList, 
            data: addedCompareMrkList
        });

        setModalState(!modalState);

        enqueueSnackbar(`${MSG.SAVE_COMPARE_MRK_LIST}: ${compareMrkName}`, {variant: SUCCESS});
    }

    return (
        <>
            <MDBBtn className={"pt-1 pb-1 pr-4 pl-4"} onClick={modalHandler}>{t('common.button.save')}</MDBBtn>
            <MDBModal isOpen={modalState} toggle={modalHandler} size="lg">
                <MDBModalHeader toggle={modalHandler}>{t('compare.compareTgSave')}</MDBModalHeader>
                <MDBModalBody>
                    <MDBInput label={t('compare.insertCompareTgGroup')} onChange={inputHandler}/>
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