import React from 'react';
import GraphModalBtn from './GraphModalBtn';
import { KEY_NAME } from "../../consts/keyName";

const RawData2TableData = (rawData, tgColList, hyperlink=false, graph=false) => {
    const testHandler = () => {
        console.log("really?")
    }

    const columns = tgColList.map((v,i) => {
        return {
            label: v,
            field: v,
        }
    })

    const rows = []
    for (const data of rawData) {
        const row = {};

        for (const col of tgColList) {
            if (col === KEY_NAME.SHARE_NAME) {
                row[col] = <a href={`https://finance.naver.com/item/main.nhn?code=${data[KEY_NAME.SHARE_CODE]}`} target="_blank">{data[col]}</a>
            } else if (col === "graph") {
                row[col] = <GraphModalBtn shareCode={data[KEY_NAME.SHARE_CODE]}/>
            } else {
                row[col] = data[col];
            }
        }

        // clickEvent could be inserted in MDB dataTable
        // row['clickEvent'] = testHandler;

        rows.push(row);
    }

    return {
        columns: columns,
        rows: rows
    }
}

export default RawData2TableData;