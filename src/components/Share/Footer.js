import React from 'react';
import {
  MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon,
} from 'mdbreact';

const FooterPage = () => (
  <MDBFooter color="white" className="fixed-bottom font-small mt-5 pt-1">
    <MDBContainer fluid className="text-center text-md-left">
      <MDBRow className="white pl-5 pr-5">
        <MDBCol md="3">
          <h4 className="title">Links</h4>
          <ul>
            <li className="list-unstyled">
              <a href="#!"><h5>Link 1</h5></a>
            </li>
            <li className="list-unstyled">
              <a href="#!"><h5>Link 2</h5></a>
            </li>
            <li className="list-unstyled">
              <a href="#!"><h5>Link 3</h5></a>
            </li>
            <li className="list-unstyled">
              <a href="#!"><h5>Link 4</h5></a>
            </li>
          </ul>
        </MDBCol>
        <MDBCol md="3">
          <h4 className="title">Links</h4>
          <ul>
            <li className="list-unstyled">
              <a href="#!"><h5>Link 1</h5></a>
            </li>
            <li className="list-unstyled">
              <a href="#!"><h5>Link 2</h5></a>
            </li>
            <li className="list-unstyled">
              <a href="#!"><h5>Link 3</h5></a>

            </li>
            <li className="list-unstyled">
              <a href="#!"><h5>Link 4</h5></a>

            </li>
          </ul>
        </MDBCol>
        <MDBCol md="3">
          <h4 className="title">Links</h4>
          <ul>
            <li className="list-unstyled">
              <a href="#!"><h5>Link 1</h5></a>
            </li>
            <li className="list-unstyled">
              <a href="#!"><h5>Link 2</h5></a>
            </li>
            <li className="list-unstyled">
              <a href="#!"><h5>Link 3</h5></a>

            </li>
            <li className="list-unstyled">
              <a href="#!"><h5>Link 4</h5></a>

            </li>
          </ul>
        </MDBCol>
        <MDBCol md="3">
          <h4 className="title">Links</h4>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </MDBFooter>
);

export default FooterPage;
