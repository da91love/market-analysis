import React, { useState } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBTable, MDBTableBody } from 'mdbreact';

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
        setSelectedRadioStatus({...selectedRadioStatus, [tgIdc]:!selectedRadioStatus[tgIdc]});
    }

    const radioSaveHandler = () => {
        const temp = [];
        Object.keys(selectedRadioStatus).forEach((v, i) => {
            if (selectedRadioStatus[v]) {
                temp.push(v);
            }
        })

        setSelectedGraphType(temp);
        setModalState(!modalState);
    }

    const getRadioTable = (radioStatus) => {
        let trs = [];
        let tds = [];
        Object.keys(radioStatus).forEach((v, i) => {
            tds.push(
                <td>
                    <input onClick={e=>{radioHandler(e.target.value)}} checked={radioStatus[v]} type="radio" value={v} name={v} id={i}/>
                    <label>{v}</label>
                </td>
            );

            if ((i+1)%4 === 0 || i === Object.keys(radioStatus).length-1) {
                trs.push(<tr>{tds}</tr>);
                tds = [];
            }
        });

        return <MDBTable><MDBTableBody>{trs}</MDBTableBody></MDBTable>
    }

    return (
        <MDBContainer>
            <MDBBtn onClick={modalHandler}>Modal</MDBBtn>
            <MDBModal isOpen={modalState} toggle={modalHandler} size="lg">
            <MDBModalHeader toggle={modalHandler}>MDBModal title</MDBModalHeader>
            <MDBModalBody>
                {getRadioTable(selectedRadioStatus)}
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