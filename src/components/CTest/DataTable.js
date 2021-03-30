import React from "react";

// Temp: import json
const DataTable = (props) => {
  const { header, records } = props;

  return (
    <table>
      <thead>
        <tr>
          {header.map((v, i) => {
            return <th key={i}>{v}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {records.map((row, rowIdx) => {
          return (
            <tr key={rowIdx}>
              {records[rowIdx].map((col, colIdx) => {
                return (
                  <td
                    contentEditable={col.isEditable ? true : false}
                    suppressContentEditableWarning={
                      col.isEditable ? true : false
                    }
                    onBlur={
                      typeof col.onBlur === "function"
                        ? (event) => col.onBlur(event, header, records)
                        : undefined
                    }
                    key={`${rowIdx}:${colIdx}`}
                  >
                    <span>{col.value}</span>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
