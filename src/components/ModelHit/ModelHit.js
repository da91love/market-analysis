import React, { useState, useContext, useEffect } from 'react';
import {
  MDBRow, MDBContainer, MDBCol, MDBIcon
} from 'mdbreact';
import ModelBox from './ModelBox';

// Temp: import json
const ModelHit = () => {

  return (
      <MDBContainer className="mt-5 mb-5 pt-5 pb-5">
        <ModelBox/>
      </MDBContainer>
    )
};

export default ModelHit;
