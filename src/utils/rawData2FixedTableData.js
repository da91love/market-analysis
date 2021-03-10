import {KEY_NAME} from '../consts/keyName';

const rawData2FixedTableData = (fixedCol, periodRawData) => {
    const header = periodRawData.map((v, i) => {
      return v[KEY_NAME.PERIOD];
    })

    const records = fixedCol.map((v, i) => {
      const cells = [];
      periodRawData.forEach((b, o) => {
        cells.push({
          value: b[v],
          key: i+o
        })
      })

      return ({
        cells: cells
      })
    })

    // cells의 가장 첫번째 엘리먼트로 fixedCol의 값 삽입
    fixedCol.forEach((v, i) => {
      (records[i]['cells']).unshift({
        value: v,
        key: 0
      })
    })

    // FixedCol의 1열 이상일 때, header의 앞에 빈값 삽입
    header.unshift("");

    return ({
      header: header,
      records: records
    })
  }

  export default rawData2FixedTableData;