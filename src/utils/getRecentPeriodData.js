import _ from "lodash";
import { KEY_NAME } from '../consts/keyName';

/**
 * 
 * @param {*} tgList 
 * @param {*} tgPeriod: 지정될 시 지정된 기간으로 필터링하고, 지정되지 않을 시 tgList의 가장 마지막 기간을 기준으로함
 * @param {*} tgTerm 
 */
function getRecentPeriodData(tgList, tgPeriod=tgList[tgList.length-1][KEY_NAME.PERIOD], tgTerm) {
  try {
    const tgPeriodIdx = _.findIndex(tgList, [KEY_NAME.PERIOD, tgPeriod]);
    const tgListToTgIdx = _.slice(tgList, 0, tgPeriodIdx+1);

    const result = [];
    for (let i=0;i<tgTerm;i++) {
      const len = tgListToTgIdx.length -1;
      if (len - i >= 0) {
        result.unshift(tgListToTgIdx[len - i]);
      } else {
        break;
      }
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export default getRecentPeriodData;
