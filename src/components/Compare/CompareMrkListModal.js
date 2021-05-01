import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBListGroup, MDBListGroupItem, MDBCollapse, MDBIcon} from 'mdbreact';
import { STRG_KEY_NAME } from "../../consts/localStorage";
import { useSnackbar } from 'notistack';
import SyncStatus from '../../utils/SyncStatus';
import {MSG} from "../../consts/message";
import {SUCCESS} from "../../consts/alert";

const CompareMrkListModal = (props) => {
    const {compareMrkList, setCompareMrkList} = props;
    const { enqueueSnackbar } = useSnackbar();
    const [modalState, setModalState] = useState(false);
    const [collapseStatus, setCollapseStatus] = useState({});

    const modalHandler = () => {
        setModalState(!modalState);
    }

    const toggleCollapse = (collapseId) => {
        const prevCollapseStatus = collapseStatus[collapseId];
        setCollapseStatus({...collapseStatus, [collapseId]: !prevCollapseStatus});
    }

    const removeMrkNameHandler = (compareMrkName) => {
        const dpCompareMrkList = {...compareMrkList};

        SyncStatus.remove({
            storageKey: STRG_KEY_NAME.COMPARE_MRK_LIST, 
            statusSetter: setCompareMrkList, 
            data: dpCompareMrkList,
            rmFunc: key => {
                if (key == compareMrkName) {
                    delete dpCompareMrkList[key]
                }
            }
        });
      
        enqueueSnackbar(MSG.REMOVE_COMPARE_MRK_LIST, {variant: SUCCESS});
    }

    return (
        <>
            <MDBBtn className={"pt-1 pb-1 pr-4 pl-4"} onClick={modalHandler}>Apply</MDBBtn>
            <MDBModal isOpen={modalState} toggle={modalHandler} size="lg">
                <MDBModalHeader toggle={modalHandler}>MDBModal title</MDBModalHeader>
                <MDBModalBody>
                    <MDBListGroup>
                    {Object.keys(compareMrkList).map((compareMrkName, i) => {
                        return (
                            <>
                                <MDBListGroupItem onClick={() => {toggleCollapse(i)}}>{compareMrkName}
                                    <span className="float-right">
                                        <input className="mr-2" type="checkbox" />
                                        <MDBIcon className="red-text" onClick={e => {removeMrkNameHandler(compareMrkName)}} icon="times" />
                                    </span>
                                </MDBListGroupItem>
                                <MDBCollapse id={i} isOpen={collapseStatus[i]}>
                                    <MDBListGroup>
                                        {compareMrkList[compareMrkName].map((k) => {
                                            return <MDBListGroupItem color='primary-color'>{`${k.shareName}: (${k.shareCode})`}</MDBListGroupItem>
                                        })}
                                    </MDBListGroup>
                                </MDBCollapse>      
                            </>
                        )
                    })}
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