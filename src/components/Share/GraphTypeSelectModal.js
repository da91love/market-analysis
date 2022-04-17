import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBTable, MDBTableBody } from 'mdbreact';
import {useTranslation} from "react-i18next";

const GraphTypeSelectModal = (props) => {
    const {selectedGraphType, setSelectedGraphType, allGraphType} = props;
    const { t } = useTranslation();
    const [modalState, setModalState] = useState(false);
    const [selectedRadioStatus, setSelectedRadioStatus] = useState();
    const [radioTable, setRadioTable] = useState();


    const modalHandler = () => {
        setModalState(!modalState);
    }

    const radioHandler = (tgIdc) => {
        setSelectedRadioStatus({...selectedRadioStatus, [tgIdc]:!selectedRadioStatus[tgIdc]});
    }

    const unselectAllHandler = () => {
        const dpSelectedRadioStatus = {...selectedRadioStatus};
        for (const key in dpSelectedRadioStatus) {
            dpSelectedRadioStatus[key] = false;
        }

        setSelectedRadioStatus(dpSelectedRadioStatus);
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
                    <label>{t(`common.rawData.${v}`)}</label>
                </td>
            );

            if ((i+1)%4 === 0 || i === Object.keys(radioStatus).length-1) {
                trs.push(<tr>{tds}</tr>);
                tds = [];
            }
        });

        return <MDBTable><MDBTableBody>{trs}</MDBTableBody></MDBTable>
    }

    useEffect(() => {
        const initSelectedRadioStatus = {};
        allGraphType.forEach((v, i) => {
            initSelectedRadioStatus[v] = selectedGraphType.includes(v)?true:false;
        });

        setSelectedRadioStatus(initSelectedRadioStatus);
        setRadioTable(getRadioTable(initSelectedRadioStatus));
    } , [selectedGraphType])

    return (
        <>
            <MDBBtn className={"pt-1 pb-1 pr-4 pl-4"} onClick={modalHandler}>{t('common.button.selectIdc')}</MDBBtn>
            <MDBModal isOpen={modalState} toggle={modalHandler} size="lg">
                <MDBModalHeader toggle={modalHandler}>{t('common.button.selectIdc')}</MDBModalHeader>
                <MDBModalBody>
                    {radioTable? radioTable: null}
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={unselectAllHandler}>{t('common.button.cancelAll')}</MDBBtn>
                    <MDBBtn color="secondary" onClick={modalHandler}>{t('common.button.close')}</MDBBtn>
                    <MDBBtn color="primary" onClick={radioSaveHandler}>{t('common.button.save')}</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </>
    );

}

export default GraphTypeSelectModal;