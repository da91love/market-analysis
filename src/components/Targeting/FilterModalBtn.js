import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { MDBContainer, MDBBtn, MDBModal, MDBIcon, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

const FilterModalBtn = (props) => {
  const {model} = props;
  const [modalState, setModalState] = useState(false);

  const modalHandler = () => {
    setModalState(!modalState);
  }

  return (
  <IconButton color="default" aria-label="upload picture" component="span">
    <MDBIcon icon="filter" onClick={() => {modalHandler()}}/>
    <MDBModal isOpen={modalState} toggle={modalHandler}>
      <MDBModalHeader toggle={modalHandler}>MDBModal title</MDBModalHeader>
      <MDBModalBody>
        (...)
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={modalHandler}>Close</MDBBtn>
        <MDBBtn color="primary">Save changes</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  </IconButton>
  )
}

export default FilterModalBtn;