import React, { useState } from "react";
import {
  MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn, 
} from "mdbreact";
import Button from '@material-ui/core/Button';
import AnalysisLineChart from './AnalysisLineChart';
import rawData2GraphData from '../../utils/rawData2GraphData';

const GraphPopOver = (props) => {
    const {name, value, popOverHeader, popOverBody} = props;

    return (
        <MDBPopover
          placement="right"
          popover
          clickable
          id="popper1"
          >
          <Button className="p-0"><p className="text-white pl-1">{name}</p></Button>
          <div>
            <MDBPopoverHeader>{popOverHeader}</MDBPopoverHeader>
            <MDBPopoverBody>
              <AnalysisLineChart label={false} graphData={rawData2GraphData(popOverBody, value)}/>
            </MDBPopoverBody>
          </div>
        </MDBPopover>
    )
}

export default GraphPopOver;