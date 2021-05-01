import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBListGroup, MDBListGroupItem, MDBCollapse} from 'mdbreact';
import { STRG_KEY_NAME } from "../../consts/localStorage";
import { useSnackbar } from 'notistack';
import {MSG} from "../../consts/message";
import {SUCCESS} from "../../consts/alert";

const CompareMrkListModal = (props) => {
    const [modalState, setModalState] = useState(false);
    const [collapseStatus, setCollapseStatus] = useState({});

      

    const compareMrkList = JSON.parse(localStorage.getItem(STRG_KEY_NAME.COMPARE_MRK_LIST)) || {};

    const modalHandler = () => {
        setModalState(!modalState);
    }

    const toggleCollapse = (collapseId) => {
        const prevCollapseStatus = collapseStatus[collapseId];
        setCollapseStatus({...collapseStatus, [collapseId]: !prevCollapseStatus});
      }

    return (
        <>
            <MDBBtn className={"pt-1 pb-1 pr-4 pl-4"} onClick={modalHandler}>Apply</MDBBtn>
            <MDBModal isOpen={modalState} toggle={modalHandler} size="lg">
                <MDBModalHeader toggle={modalHandler}>MDBModal title</MDBModalHeader>
                <MDBModalBody>
                    <MDBListGroup>
                        <MDBListGroupItem onClick={toggleCollapse("basicCollapse")}>Cras justo odio</MDBListGroupItem>
                        <MDBCollapse id="basicCollapse" isOpen={collapseStatus['basicCollapse']}>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum
                            </p>
                        </MDBCollapse>

                        <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                        <MDBListGroupItem>Morbi leo risus</MDBListGroupItem>
                        <MDBListGroupItem>Porta ac consectetur ac</MDBListGroupItem>
                        <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
                    </MDBListGroup>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" >Apply</MDBBtn>
                    <MDBBtn color="secondary" >Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </>
    );

}

export default CompareMrkListModal;