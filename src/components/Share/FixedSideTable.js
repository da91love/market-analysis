import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import GraphPopOver from '../Share/GraphPopOver';

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
                  {c.popOver && j < fixedNum ? <GraphPopOver value={c.value} popOverHeader={c.popOver.popOverHeader} popOverBody={c.popOver.popOverBody}/>:c.value}                
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
