import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import GraphPopOver from '../Share/GraphPopOver';
import {getColor} from "../../utils/colorUtil";
import {colorPalette} from "../../consts/color";
import {BLANK} from "../../consts/common";
import {rgbaToRgb} from "../../utils/colorUtil";

const FixedSideUnionTable = (props) => {
  const { header, records, tableId, labelColumnNum, baseDate } = props;

  if (records.length === 0) return <></>;

  const labelSize = new Array(records[0].length).fill(10);
  const rightPadding = 2;
  for (let j=0; j<labelColumnNum; j++) {
    labelSize[j] = (header[j].length)+rightPadding;
    for (let i=0; i<records.length; i++) {
      if(labelSize[j] < records[i][j].value.length+rightPadding)
        labelSize[j] = records[i][j].value.length+rightPadding;
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
                    className="text-white border th-sm bg-info pt-1 pb-1"
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
                  <th key={columnIndex} className={"text-center gray text-white border th-sm pt-1 pb-1"} nowrap="true">
                    <p>{columnValue}</p>
                  </th>
                );
              }
            })}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {records.map((rowData, rowIndex, record) => {
            return (
              <tr key={rowIndex}>
                {rowData.map((cell, columnIndex) => {
                  if (columnIndex < labelColumnNum) {
                    const label = rowData[columnIndex].value;
                    const popOver = rowData[columnIndex]?.popOver;
                    const isSameCategoryName = record[rowIndex - 1]?.[columnIndex].value === label;
                    const left = columnIndex<=0 ? 0 : labelSize.slice(0,columnIndex).reduce(reducer)

                    return <LabelCell 
                      isSameCategoryName={isSameCategoryName} 
                      key={`${rowIndex}:${columnIndex}`} 
                      value={label}
                      popOver={popOver}
                      rowIndex={rowIndex} 
                      columnIndex={columnIndex} 
                      labelSize={labelSize[columnIndex]} 
                      left={left}
                    />;
                  } else {
                    return (
                      <td
                        className="td-sm text-right pt-1 pb-1 num-custom-font"
                        contentEditable={cell.isEditable ? true : false}
                        suppressContentEditableWarning={cell.isEditable ? true : false}
                        onBlur={typeof cell.onBlur === "function" ? (event) => cell.onBlur(event, tableId, header, records, rowIndex, columnIndex, labelColumnNum) : undefined}
                        onKeyUp={typeof cell.onKeyUp === "function" ? (event) => cell.onKeyUp(event, tableId, rowIndex, columnIndex, labelColumnNum) : undefined}
                        style={{backgroundColor: cell.isEditable ? "" : "rgba(0,0,0,.03)"}}
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
  const {isSameCategoryName, value, popOver, columnIndex, labelSize, left} = props;

  return (
    <td
      className="text-left pt-1 pb-1"
      style={{
        position: "absolute",
        width: labelSize + "rem",
        left: left + "rem",
        top: "auto",
        backgroundColor: rgbaToRgb(getColor(colorPalette.blueLight1, 1-0.2*columnIndex)),
        borderTopColor: isSameCategoryName ? rgbaToRgb(getColor(colorPalette.blueLight1, 1-0.2*columnIndex)): "",
      }}
    >
      {popOver ? 
        <GraphPopOver value={value} popOverHeader={popOver.popOverHeader} popOverBody={popOver.popOverBody}/>
        :<p className={'text-white pl-1'}>{isSameCategoryName ? BLANK : value}</p>
      }                
    </td>
  );
};

export default FixedSideUnionTable;
