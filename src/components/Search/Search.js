import React, { useState, useContext, useEffect } from 'react';
import {
  MDBRow, MDBContainer, MDBCol, MDBIcon
} from 'mdbreact';
import { useLocation } from 'react-router-dom';
import ModelBox from '../ModelHit/ModelBox';

// Temp: import json
const Search = () => {

  const location = useLocation();
  const shareCode = location.state;

  return (
      <MDBContainer>
        {"################################################"}
      </MDBContainer>
    )
};

export default Search;
