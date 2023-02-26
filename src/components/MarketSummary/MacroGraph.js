import React, { useState, useContext, useEffect } from 'react';
import { MDBContainer, MDBBtnGroup, MDBBtn } from 'mdbreact';

import AnalysisComposedChart4Macro from '../Share/AnalysisComposedChart4Macro';


const MacroGraph = (props) => {
    const {graphData} = props;
    // const [xxx, setxxx] = useState();

    // useEffect(() => {

    // }, []);

    return (
    <>
        <MDBBtnGroup shadow='0' aria-label='Basic example'>
            <MDBBtn color='secondary' outline>
                Left
            </MDBBtn>
            <MDBBtn color='secondary' outline>
                Middle
            </MDBBtn>
            <MDBBtn color='secondary' outline>
                Right
            </MDBBtn>
        </MDBBtnGroup>
        <AnalysisComposedChart4Macro graphData={graphData} legend={true}/>
    </>
    );
};

export default MacroGraph;
