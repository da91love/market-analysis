import React, { useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';

const TargetDataTable = (props) => {
    const {datatable} = props;
  
    return <MDBDataTableV5 hover entriesOptions={[5, 10, 20, 30]} entries={10} pagesAmount={4} data={datatable} />;
   };

export default TargetDataTable;
