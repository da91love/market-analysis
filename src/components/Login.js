import React, { useContext } from 'react';
import { MDBInput, MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn} from 'mdbreact';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios';

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const loginBtnHandler = () => {
    axios.post('http://192.168.8.102:8081/login')
    .then(res => {
        console.log(res);
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
              <MDBInput label="Material input" />
              <label htmlFor="formGroupExampleInput">Default input</label>
              <MDBInput label="Material input" />
              <MDBBtn color="primary" onClick={() => loginBtnHandler()}>Primary</MDBBtn>
            </MDBCardText>
        </MDBCardBody>
    </MDBCard>
  </MDBContainer>
  )
};

export default Login;
