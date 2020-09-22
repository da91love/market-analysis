import React from 'react';
import {
  MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBCardTitle, MDBCardText, MDBListGroup, MDBListGroupItem,
} from 'mdbreact';

const FieldCard = props => {
  const { title } = props;

  return (
    <MDBCard className="mt-3 mb-3">
      <MDBCardBody className="text-center">
        <MDBCardTitle>
          <MDBIcon className="light-blue-text fa-3x" icon="ambulance" />
        </MDBCardTitle>
        <MDBCardText className="pt-3 pb-3">
          <h2><strong>{title}</strong></h2>
        </MDBCardText>
        <MDBListGroup>
          <MDBListGroupItem>전산업</MDBListGroupItem>
          <MDBListGroupItem>부동산업</MDBListGroupItem>
          <MDBListGroupItem>항공업</MDBListGroupItem>
          <MDBListGroupItem>운항업</MDBListGroupItem>
        </MDBListGroup>
      </MDBCardBody>
    </MDBCard>
  );
};

export default FieldCard;
