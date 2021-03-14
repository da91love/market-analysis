import React, { useState } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';

const GraphTypeSelectModal = (props) => {
    const {selectedGraphType, setSelectedGraphType, allGraphType} = props;
    const [modalState, setModalState] = useState(false);
    const [selectedRadioStatus, setSelectedRadioStatus] = useState(function(){
        const initSelectedRadioStatus = {};
        allGraphType.forEach((v, i) => {
            initSelectedRadioStatus[v] = selectedGraphType.includes(v)?true:false;
        });

        return initSelectedRadioStatus;
    }());

    const modalHandler = () => {
        setModalState(!modalState);
    }

    const radioHandler = (tgIdc) => {
        setSelectedRadioStatus({...selectedRadioStatus, [tgIdc]:true});
    }

    const radioSaveHandler = () => {
        const temp = [];
        Object.keys(selectedRadioStatus).forEach((v, i) => {
            if (selectedRadioStatus[v]) {
                temp.push(v);
            }
        })

        setSelectedGraphType(temp);
    }

    return (
        <MDBContainer>
            <MDBBtn onClick={modalHandler}>Modal</MDBBtn>
            <MDBModal isOpen={modalState} toggle={modalHandler} size="lg">
            <MDBModalHeader toggle={modalHandler}>MDBModal title</MDBModalHeader>
            <MDBModalBody>
                {Object.keys(selectedRadioStatus).map((v, i) => {
                    return <MDBInput onChange={radioHandler(v)} checked={selectedRadioStatus[v]} label={v} type="radio" id={i} />
                })}
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" onClick={modalHandler}>Close</MDBBtn>
                <MDBBtn color="primary" onClick={radioSaveHandler}>Save changes</MDBBtn>
            </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );

}

export default GraphTypeSelectModal;