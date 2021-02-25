import React, { useState } from 'react';
import {
  MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBCardTitle, MDBCardText, MDBDataTable
} from 'mdbreact';
import IconButton from '@material-ui/core/IconButton';

import TargetDataTable from './TargetDataTable';
import NoModelSelected from './NoModelSelected';

const ModelBox = () => {
   const [isModelSelected, setIsModelSelected] = useState(false)
   
   const applyModelBtn = (value) => {
      setIsModelSelected(true);
   }

   return (
      <MDBCard>
         <MDBCardBody>
            <MDBCardTitle>
               <div className="float-left w-25">
                  <select className="browser-default custom-select" onChange={(e) => {applyModelBtn(e.target.value)}}>
                     <option>Choose your model</option>
                     <option value="value">Value Stock Model</option>
                     <option value="growth">Growth Stock Model</option>
                     <option value="turnover">Turnover Stock Model</option>
                     <option value="bluechip">BlueChip Stock Model</option>
                  </select>
               </div>
               <div className="">
                  <IconButton color="default" aria-label="upload picture" component="span">
                     <MDBIcon icon="filter" />
                  </IconButton>
                  <IconButton color="primary" aria-label="upload picture" component="span">
                     <MDBIcon icon="plus-square" />
                  </IconButton>
                  <IconButton color="secondary" aria-label="upload picture" component="span">
                     <MDBIcon icon="minus-square" />
                  </IconButton>
               </div>
            </MDBCardTitle>
            <MDBCardText>
               {isModelSelected? <TargetDataTable/>:<NoModelSelected/>}
            </MDBCardText>
         </MDBCardBody>
      </MDBCard>
   )
   };

export default ModelBox;
