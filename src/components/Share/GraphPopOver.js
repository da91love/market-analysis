import React, { useState } from "react";
import {
  MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn, 
} from "mdbreact";
import Button from '@material-ui/core/Button';
import AnalysisGraph from './AnalysisGraph';
import rawData2GraphData from '../../utils/rawData2GraphData';

const GraphPopOver = (props) => {
    const {value, popOverHeader, popOverBody} = props;

    return (
        <MDBPopover
          placement="left"
          popover
          clickable
          id="popper1"
          >
          <Button className="p-0"><p className="text-white pl-1">{value}</p></Button>
          <div>
          <MDBPopoverHeader>{popOverHeader}</MDBPopoverHeader>
          <MDBPopoverBody>
            <AnalysisGraph label={false} graphData={rawData2GraphData(popOverBody, value)}/>
          </MDBPopoverBody>
          </div>
        </MDBPopover>
    )
}

export default GraphPopOver;