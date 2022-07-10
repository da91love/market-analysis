import _ from "lodash";

/**
 * convert2YYMM: 이 함수는 임시적임. 제대로 하려면 년과 월을 분리해서 int로 만든 후 작업해야함
 * @param {*} period 
 * @returns 
 */
export const convert2YYMM = (period) => {
    return period.slice(2, (period).length)
}