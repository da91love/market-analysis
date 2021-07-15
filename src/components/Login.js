import React, { useContext, useState } from 'react';
import { MDBInput, MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn} from 'mdbreact';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { useSnackbar } from 'notistack';
import { API } from '../consts/api';
import { STRG_KEY_NAME } from '../consts/localStorage';
import {MSG} from "../consts/message";
import {SUCCESS, ERROR} from "../consts/alert";
import SyncStatus from '../utils/SyncStatus';

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [ userId, setUserId ] = useState();
  const [ pw, setPw ] = useState();
  const { enqueueSnackbar } = useSnackbar()

  const loginBtnHandler = () => {
    axios({
      method: 'post',
      url: API.CHECK_LOGIN_INFO,
      data: {
        data: {
          userId: userId,
          pw: pw
        }
      }
    })
    .then(res => {
      if(res.data.status === "success" ) {
        if(res.data.payload.isIdNPwTrue) {
          const authId = res.data.payload.authId;
          SyncStatus.set({
            storageKey: STRG_KEY_NAME.AUTH_ID,
            statusSetter: setAuth,
            data: authId
          })
  
          enqueueSnackbar(`${MSG.LOGIN_SUCCESS}`, {variant: SUCCESS});
        } else {
          enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
        }
      } else {
        enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
      }
    })
  }

  return (
    <MDBContainer>
    <MDBCard>
        <MDBCardBody>
            <MDBCardTitle>
            </MDBCardTitle>
            <MDBCardText>
              <label htmlFor="formGroupExampleInput">Default input</label>
              <MDBInput label="Material input" onChange={e => setUserId(e.target.value)}/>
              <label htmlFor="formGroupExampleInput">Default input</label>
              <MDBInput label="Material input" onChange={e => setPw(e.target.value)}/>
              <MDBBtn color="primary" onClick={() => loginBtnHandler()}>Primary</MDBBtn>
            </MDBCardText>
        </MDBCardBody>
    </MDBCard>
  </MDBContainer>
  )
};

export default Login;
