import React, { useState } from "react";

import {
  MDBTable, MDBTableHead, MDBTableBody, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn, 
} from "mdbreact";
import Button from '@material-ui/core/Button';
import AnalysisGraph from '../Share/AnalysisGraph';
import rawData2GraphData from '../../utils/rawData2GraphData';

/** 
  * records = [
  *  {
  *   cells: [
  *     {value: "", key: "", onClick: ""},
  *     {value: "", key: "", onClick: ""},
  *     {value: "", key: "", onClick: ""},
  *   ]
  *  },
  *  {
  *   cells: [
  *     {value: "", key: "", onClick: ""},
  *     {value: "", key: "", onClick: ""},
  *     {value: "", key: "", onClick: ""},
  *   ]
  *  }
  * ]
*/
const FixedSideTable = props => {
  const { header, records, fixedNum, onChange } = props;

  if (records.length === 0) {
    return <></>;
  }

  return (
    <MDBTable bordered small responsive scrollx="true">
      <MDBTableHead>
        <tr>
          {header.map((col, i) => {
            return (
              <th
                key={i}
                className="text-center bg-info text-white border"
                nowrap="true"
              >
                {col.value}
              </th>
            );
          })}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {records.map((r, i) => {
          return (
            <tr key={i}>
              {r.cells.map((c, j) => {
                return (
                  <td
                    key={String(i) + String(j)}
                    className={j < fixedNum ? "bg-info text-center text-white" : "text-right"}
                    contenteditable={
                      fixedNum <= j && c.isEditable ? "true" : "false"
                    }
                    onBlur={onChange}
                    style={{
                      width: 'auto',
                      backgroundColor: !c.isEditable && c.backgroundColor? c.backgroundColor : (c.isEditable? "rgba(0,0,0,.03)": "")
                    }}
                    name={c.key}
                  > 
                  {c.popOver && j < fixedNum ? 
                      <MDBPopover
                        placement="left"
                        popover
                        clickable
                        id="popper1"
                      >
                      <Button className="text-white">{c.value}</Button>
                      <div>
                        <MDBPopoverHeader>{c.popOver.popOverHeader}</MDBPopoverHeader>
                        <MDBPopoverBody>
                          <AnalysisGraph graphData={rawData2GraphData(c.popOver.popOverBody, c.value)}/>
                        </MDBPopoverBody>
                      </div>
                    </MDBPopover>
                  :c.value}                
                  </td>
                );
              })}
            </tr>
          );
        })}
      </MDBTableBody>
    </MDBTable>
  );
};

export default FixedSideTable;
