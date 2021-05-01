import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import { STRG_KEY_NAME } from "../../consts/localStorage";
import { useSnackbar } from 'notistack';
import {MSG} from "../../consts/message";
import {SUCCESS} from "../../consts/alert";

const CompareMrkNameModal = (props) => {

    const { enqueueSnackbar } = useSnackbar();
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
        const compareMrkList = JSON.parse(localStorage.getItem(STRG_KEY_NAME.COMPARE_MRK_LIST)) || {};
        const addedCompareMrkList = {...compareMrkList, [compareMrkName]: selectedCompareTg};

        localStorage.setItem(STRG_KEY_NAME.COMPARE_MRK_LIST, JSON.stringify(addedCompareMrkList));
        setModalState(!modalState);

        enqueueSnackbar(`${MSG.SAVE_COMPARE_MRK_LIST}: ${compareMrkName}`, {variant: SUCCESS});
    }

    return (
        <>
            <MDBBtn className={"pt-1 pb-1 pr-4 pl-4"} onClick={modalHandler}>Save</MDBBtn>
            <MDBModal isOpen={modalState} toggle={modalHandler} size="lg">
                <MDBModalHeader toggle={modalHandler}>MDBModal title</MDBModalHeader>
                <MDBModalBody>
                    <MDBInput label="Insert a name" onChange={inputHandler}/>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={saveHandler}>Save</MDBBtn>
                    <MDBBtn color="secondary" onClick={modalHandler}>Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </>
    );

}

export default CompareMrkNameModal;