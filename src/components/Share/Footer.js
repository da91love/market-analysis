import React from 'react';
import {
  MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon,
} from 'mdbreact';

const FooterPage = () => (
  <MDBFooter color="white" className="font-small pt-4 m-0 pl-5 pr-5">
    <MDBContainer fluid className="text-center text-md-left">
      <MDBRow>
        <MDBCol md="3">
          <p className="black-text p4">Careers</p>
          <ul>
            <li><a href="#" className="black-text h5">Job openings</a></li>
            <li><a href="#" className="black-text h5">Employee success</a></li>
            <li><a href="#" className="black-text h5">Benefits</a></li>
          </ul>
        </MDBCol>
        <MDBCol md="3">
          <p className="black-text p4">Careers</p>
          <ul>
            <li><a href="#" className="black-text h5">Job openings</a></li>
            <li><a href="#" className="black-text h5">Employee success</a></li>
            <li><a href="#" className="black-text h5">Benefits</a></li>
          </ul>
        </MDBCol>
        <MDBCol md="3">
          <p className="black-text p4">Careers</p>
          <ul>
            <li><a href="#" className="black-text h5">Job openings</a></li>
            <li><a href="#" className="black-text h5">Employee success</a></li>
            <li><a href="#" className="black-text h5">Benefits</a></li>
          </ul>
        </MDBCol>
        <MDBCol md="3">
          <div className="col-lg-3 item social">
            <a href="#"><MDBIcon fab icon="facebook" /></a>
            <a href="#"><MDBIcon fab icon="twitter" /></a>
            <a href="#"><MDBIcon fab icon="instagram" /></a>
            <p className="black-text h5">BA © 2020</p>
          </div>
        </MDBCol>

      </MDBRow>
    </MDBContainer>
  </MDBFooter>
);

export default FooterPage;
