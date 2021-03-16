import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import {getColor} from "../../utils/colorUtil";
import {colorPalette} from "../../consts/color";
import {getLaterDate} from "../../utils/dtUtil";
import {rgbaToRgb} from "../../utils/colorUtil";


const FixedSideUnionTable = (props) => {
  const { header, records, tableId, labelColumnNum, baseDate } = props;

  if (records.length === 0) return <></>;

  const labelSize = new Array(records[0].cells.length).fill(10);
  const rightPadding = 2;
  for (let j=0; j<labelColumnNum; j++) {
    labelSize[j] = (header[j].length)+rightPadding;
    for (let i=0; i<records.length; i++) {
      if(labelSize[j] < records[i].cells[j].value.length+rightPadding)
        labelSize[j] = records[i].cells[j].value.length+rightPadding;
    }
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  return (
    <div style={{ "padding-left": labelSize.slice(0,labelColumnNum).reduce(reducer) + "rem", position:'relative' }}> 
      <MDBTable bordered small responsive scrollx autoWidth>
        <MDBTableHead>
          <tr>
            {header.map((columnValue, columnIndex) => {
              if (columnIndex < labelColumnNum) {
                return (
                  <th
                    key={columnIndex}
                    className="text-white border th-sm gray-dark pt-1 pb-1"
                    nowrap="true"
                    style={{
                      position: "absolute",
                      width: labelSize[columnIndex] + "rem",
                      left: (0<columnIndex ? labelSize.slice(0,columnIndex).reduce(reducer) : 0 ) + "rem",
                      top: "auto",
                    }}
                  >
                    <p><strong>{columnValue}</strong></p>
                  </th>
                );
              } else {
                return (
                  <th key={columnIndex} className={(columnValue < getLaterDate(columnValue, baseDate)) ? "text-center gray text-white border th-sm pt-1 pb-1": "text-center base-color text-white border th-sm pt-1 pb-1"} nowrap="true">
                    <p>{columnValue}</p>
                  </th>
                );
              }
            })}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {records.map((rowData, rowIndex, records) => {
            return (
              <tr key={rowIndex}>
                {rowData.cells.map((cell, columnIndex) => {
                  if (columnIndex < labelColumnNum) {
                    const label = rowData.cells[columnIndex].value;
                    const isSameCategoryName = records[rowIndex - 1]?.cells[columnIndex].value === label;
                    const left = columnIndex<=0 ? 0 : labelSize.slice(0,columnIndex).reduce(reducer)

                    return <LabelCell isSameCategoryName={isSameCategoryName} key={`${rowIndex}:${columnIndex}`} value={label} rowIndex={rowIndex} columnIndex={columnIndex} labelSize={labelSize[columnIndex]} left={left}/>;
                  } else {
                    return (
                      <td
                        className="td-sm text-right pt-1 pb-1 num-custom-font"
                        contentEditable={cell.isEditable ? true : false}
                        suppressContentEditableWarning={cell.isEditable ? true : false}
                        onBlur={typeof cell.onBlur === "function" ? (event) => cell.onBlur(event, tableId, rowIndex, columnIndex, labelColumnNum) : undefined}
                        onKeyUp={typeof cell.onKeyUp === "function" ? (event) => cell.onKeyUp(event, tableId, rowIndex, columnIndex, labelColumnNum) : undefined}
                        style={{
                          backgroundColor: cell.isEditable ? "" : "rgba(0,0,0,.03)",
                        }}
                        key={`${rowIndex}:${columnIndex}`}
                        name={cell.key}
                      >
                        <p>{typeof cell.value === "number" ? cell.value.toLocaleString() : cell.value}</p>
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

const LabelCell = (props) => {
  return (
    <td
      className="text-left text-white pt-1 pb-1"
      style={{
        position: "absolute",
        width: props.labelSize + "rem",
        left: props.left + "rem",
        top: "auto",
        backgroundColor: rgbaToRgb(getColor(colorPalette.greenBlueLight4, 1-0.2*props.columnIndex)),
        borderTopColor: props.isSameCategoryName ? rgbaToRgb(getColor(colorPalette.greenBlueLight4, 1-0.2*props.columnIndex)): "",
      }}
    >
      <p className={'pl-1'}>{props.isSameCategoryName ? "　" : props.value}</p>
    </td>
  );
  return <></>;
};

export default FixedSideUnionTable;