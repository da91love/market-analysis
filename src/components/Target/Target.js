import React, { useState } from 'react';
import {MDBContainer, MDBIcon} from 'mdbreact';
import { useSnackbar } from 'notistack';
import {useTranslation} from "react-i18next";

import IconButton from '@material-ui/core/IconButton';
import ModelBox from './ModelBox'
import { ERROR } from "../../consts/alert";
import { MSG } from "../../consts/message";
import { MODELS } from "../../consts/model";


const Targeting = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [modelBoxStatus, setModelBoxStatus] = useState([{
    id: 0,
    model: "default",
    tableData: null,
  }]);

  const appendModelBtn = (id) => {
    if (modelBoxStatus.length === Object.keys(MODELS).length) {
      enqueueSnackbar(MSG.BOX_OVER_MODEL, {variant: ERROR});

    } else {
      setModelBoxStatus([...modelBoxStatus, {
        id: id,
        model: "default",
        rawData: null
      }]);  
    }
 }  

  return (
    <MDBContainer className="mt-5 mb-5 pt-5 pb-5">
      <div>
        <span>{t('target.addModel')}</span>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <MDBIcon onClick={() => appendModelBtn(modelBoxStatus[modelBoxStatus.length - 1].id+1)} icon="plus-square" />
        </IconButton>
      </div>
      <div>
        {modelBoxStatus.map((v, i) => {
          return <ModelBox className="w-75" id={v.id} model={v.model} rawData={v.rawData} modelBoxStatus={modelBoxStatus} setModelBoxStatus={setModelBoxStatus}/>
        })}
      </div>
    </MDBContainer>
  )
};

export default Targeting;
