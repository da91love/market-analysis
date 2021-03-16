import {KEY_NAME} from '../consts/keyName';

/**
 * 이 함수 문제 많음
 * 오로지 search 안에서만 사용할 수 있는 함수로 범용성은 없음
 * 
 * @param {*} periodRawData 
 * @param {*} fixedCol 
 * return [
 *  cells: [
 *    {value: "", key: "", onClick: ""},
 *    {value: "", key: "", onClick: ""},
 *    {value: "", key: "", onClick: ""},
 *  ],
 *  cells: [
 *    {value: "", key: "", onClick: ""},
 *    {value: "", key: "", onClick: ""},
 *    {value: "", key: "", onClick: ""},
 *  ]
 * ]
 */
const rawData2FixedTableData = (periodRawData, fixedCol) => {
    const header = periodRawData.map((v, i) => {
      return v[KEY_NAME.PERIOD];
    })

    // FixedCol이 별도로 정의되지 않았을 때
    if (!fixedCol){
      fixedCol = header;
    }

    const records = fixedCol.map((v, i) => {
      const cells = [];
      periodRawData.forEach((b, o) => {
        cells.push({
          value: b[v],
          key: i+o,
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