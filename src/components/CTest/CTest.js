import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";

// Temp: import json
const CTest = () => {
  const [dataTableData, setDataTableData] = useState();

  const onBlurHandler = (e, header, records) => {
    const value = e.target.innerText;
    console.log(`onBlured!!:${value}`);

    records[0][0].value = value;

    setDataTableData({
      header: header,
      records: records
    });
  };

  useEffect(() => {
    const header = ["col1", "col2", "col3"];
    // 1행 1열에 대해서만 isEditable
    const records = [
      [
        { value: 1, onBlur: onBlurHandler, isEditable: true },
        { value: 2 },
        { value: 3 }
      ],
      [{ value: 4 }, { value: 5 }, { value: 6 }],
      [{ value: 7 }, { value: 8 }, { value: 9 }]
    ];

    setDataTableData({
      header: header,
      records: records
    });
  }, []);

  return (
    <div style={{marginTop: "400px"}}>
      {dataTableData ? (
        <DataTable
          header={dataTableData.header}
          records={dataTableData.records}
        />
      ) : null}
    </div>
  );
};

export default CTest;
