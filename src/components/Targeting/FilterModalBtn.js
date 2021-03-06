import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { MDBContainer, MDBBtn, MDBModal, MDBIcon, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import PeriodFilter from '../Share/PeriodFilter';
import PerFilter from '../Share/PerFilter';
import { MODELS } from '../../consts/model';

const FilterModalBtn = (props) => {
  const {model, filterStatus, setFilterStatus} = props;
  const [mdlFilterStatus, setMdlFilterStatus] = useState(null);
  const [modalState, setModalState] = useState(false);

  const modalHandler = () => {
    setModalState(!modalState);
  }

  const saveHandler = () => {
    setModalState(!modalState);
    setFilterStatus({...filterStatus, [model]:mdlFilterStatus});
  }

  const getInputsByModel = () => {
    const inputs = [];

    if (model === MODELS.VALUE) {
    } else if (model == MODELS.TURNAROUND) {
      inputs.push(<PeriodFilter options={['2021/03', '2021/06', '2021/09']} mdlFilterStatus={mdlFilterStatus} setMdlFilterStatus={setMdlFilterStatus}/>);
      inputs.push(<PerFilter />);
    } else if (model === MODELS.CPGROWTH) {
    } else if (model === MODELS.MRKGROWTH) {
    } else if (model === MODELS.COLLAPSE) {
    } else if (model === MODELS.BLUECHIP) {
    } else if (model === MODELS.INVGROWTH) {
    }

    return inputs;
  }

  return (
  <IconButton color="default" aria-label="upload picture" component="span">
    <MDBIcon icon="filter" onClick={() => {modalHandler()}}/>
    <MDBModal isOpen={modalState} toggle={modalHandler}>
      <MDBModalHeader toggle={modalHandler}>MDBModal title</MDBModalHeader>
      <MDBModalBody>
        {getInputsByModel()}
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