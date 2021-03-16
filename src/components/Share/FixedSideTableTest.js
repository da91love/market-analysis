import React, { useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody
} from "mdbreact";
import _ from "lodash";

/** [
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
  const { header, records, fixedNum } = props;
  const [sortStatus, setSortStatus] = useState(null);

  if (records.length === 0) {
    return <></>;
  }

  const sortByCol = (tgRecords, tgSort) => {
    if (tgSort) {
      const sortColIdx = header.indexOf(tgSort);
      const sortingTgList = tgRecords.map((v, i) => {
        return {
          value: v.cells[sortColIdx].value,
          originRowIdx: i
        }
      });
  
      const sortedTgList = _.sortBy(sortingTgList, [o => o.value]);
  
      const sorted = [];
      sortedTgList.forEach((v, i) => {
        sorted.push(tgRecords[v.originRowIdx])
      });

      return sorted;
    } else {
      return tgRecords;
    }
  }

  const columnFilterHandler = () => {
    setSortStatus('시가총액');
  }

  return (
    <MDBTable bordered small responsive scrollx="true">
      <MDBTableHead>
        <tr>
          {header.map((value, i) => {
            return (
              <th
                key={i}
                className="text-center bg-info text-white border"
                nowrap="true"
                onClick={columnFilterHandler}
              >
                {value}
              </th>
            );
          })}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {sortByCol(records, sortStatus).map((r, i) => {
          return (
            <tr key={i}>
              {r.cells.map((c, j) => {
                return (
                  <td
                    key={String(i) + String(j)}
                    className={j < fixedNum ? "bg-info text-center text-white" : "text-right"}
                    contenteditable={fixedNum <= j && c.isEditable ? "true" : "false"}
                    onClick={typeof c.onClick === "function" ? (e) => c.onClick() : undefined}
                    name={c.key}
                    style={{
                      backgroundColor: !c.isEditable && c.backgroundColor? c.backgroundColor : (c.isEditable? "rgba(0,0,0,.03)": "")
                    }}
                  > 
                    {c.value}                   
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
