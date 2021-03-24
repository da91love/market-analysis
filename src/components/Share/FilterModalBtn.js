import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { MDBBtn, MDBModal, MDBIcon, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import _ from "lodash";

const FilterModalBtn = (props) => {
  const {filterComponent, saveHandler} = props;
  const [modalState, setModalState] = useState(false);

  const modalHandler = () => {
    setModalState(!modalState);
  }

  const modalSaveHandler = () => {
    setModalState(!modalState);
    saveHandler();
  }

  return (
  <IconButton color="default" aria-label="upload picture" component="span">
    <MDBIcon icon="filter" onClick={() => {modalHandler()}}/>
    <MDBModal isOpen={modalState} toggle={modalHandler}>
      <MDBModalHeader toggle={modalHandler}>MDBModal title</MDBModalHeader>
      <MDBModalBody>
        {filterComponent}
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={modalHandler}>Close</MDBBtn>
        <MDBBtn color="primary" onClick={saveHandler}>Save changes</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  </IconButton>
  )
}

export default FilterModalBtn;