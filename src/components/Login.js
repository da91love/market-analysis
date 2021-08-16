import React, { useContext, useState } from 'react';
import { MDBInput, MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn} from 'mdbreact';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { API } from '../consts/api';
import { STRG_KEY_NAME } from '../consts/localStorage';
import {MSG} from "../consts/message";
import { SUCCESS, ERROR } from "../consts/alert";
import { ROUTER_URL } from '../consts/router';
import SyncStatus from '../utils/SyncStatus';

const Login = () => {
  const { setAuthId } = useContext(AuthContext);
  const history = useHistory();
  const [ tempUserId, setTempUserId ] = useState();
  const [ tempPw, setTempPw ] = useState();
  const { enqueueSnackbar } = useSnackbar()

  const loginBtnHandler = () => {
    axios({
      method: API.GET_AUTH.METHOD,
      url: API.GET_AUTH.URL,
      data: {
        data: {
          userId: tempUserId,
          pw: tempPw
        }
      }
    })
    .then(res => {
      if(res.data.status === "success" ) {
        if(res.data.payload.isIdNPwTrue) {
          // Get authId from API result
          const authId = res.data.payload.authId;

          // 굳이 context에 저장되어 있으므로 localStrage에 저장할 이유가 없지 않나. 보안상도 안좋고
          // -> 새로고침시 필요
          SyncStatus.set({
            storageKey: STRG_KEY_NAME.AUTH_ID,
            statusSetter: setAuthId,
            data: authId
          });
  
          enqueueSnackbar(`${MSG.LOGIN_SUCCESS}`, {variant: SUCCESS});

          // Open search page when login done
          history.push({pathname: ROUTER_URL.SHARE_SEARCH});
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
              <MDBInput label="Material input" onChange={e => setTempUserId(e.target.value)}/>
              <label htmlFor="formGroupExampleInput">Default input</label>
              <MDBInput label="Material input" onChange={e => setTempPw(e.target.value)}/>
              <MDBBtn color="primary" onClick={() => loginBtnHandler()}>Primary</MDBBtn>
            </MDBCardText>
        </MDBCardBody>
    </MDBCard>
  </MDBContainer>
  )
};

export default Login;
