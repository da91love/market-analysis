import React, { useState, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import {
    MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter
  } from 'mdbreact';
import ShareDataContext from '../../contexts/ShareDataContext';

const GraphModal = (props) => {
    const {shareCode} = props;
    const {yearData, quarterData} = useContext(ShareDataContext);
    const [modalState, setModalState] = useState(false);
      
    const modalHandler = () => {
        setModalState(!modalState);
    }

   return (
        <IconButton className="p-0" color="default" aria-label="upload picture" component="span">
            <MDBIcon icon="chart-bar" onClick={() => {modalHandler()}}/>
            <MDBModal isOpen={modalState} toggle={modalHandler}>
                <MDBModalHeader toggle={modalHandler}>MDBModal title</MDBModalHeader>
                <MDBModalBody>
                (Rendering graphs)
                </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn color="secondary" onClick={modalHandler}>Close</MDBBtn>
                <MDBBtn color="primary">Save changes</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </IconButton>
   )
};

export default GraphModal;
