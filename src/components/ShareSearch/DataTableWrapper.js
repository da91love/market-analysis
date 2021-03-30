import React, { useState, useContext, useEffect } from 'react';
import {
  MDBRow, MDBContainer, MDBCol, MDBIcon
} from 'mdbreact';
import FixedSideTableTest from '../Share/FixedSideTableTest';

// Temp: import json
const DataTableWrapper = (props) => {
  const {dataTableData, indicator, vltModel} = props;
  const [dataByTable, setDataByTable] = useState(dataTableData[indicator][vlrModel]);

  return (
    <FixedSideUnionTable
        header={dataTableData[KEY_NAME.PER][VLT_MODELS.PRICE].header}
        records={dataTableData[KEY_NAME.PER][VLT_MODELS.PRICE].records}
        labelColumnNum={1}
        tableId={`${shareCode}:${KEY_NAME.PER}:${VLT_MODELS.PRICE}`}
    />
    )
};

export default DataTableWrapper;
