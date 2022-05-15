import _ from "lodash";
import { MKRGROWTH_MODEL_RAWDATA_KEYNAME } from '../consts/model';
import { KEY_NAME, OTHER_KEY_NAME } from '../consts/keyName';
import {PERIOD_UNIT} from '../consts/common';

const rawDataByMarket = (unit, periodRawData) => {
    // Get share data from DB(temporary from json)
    let periodDataByMrk = _.groupBy(periodRawData, v => v[KEY_NAME.MARKET_CODE]);

    for (const mrk in periodDataByMrk) {
      const yearDataByMrkNPrd = _.groupBy(periodDataByMrk[mrk], v => v[KEY_NAME.PERIOD]);
      periodDataByMrk[mrk] = yearDataByMrkNPrd;
    }

    let result = {};
    for (const mrk in periodDataByMrk) {
        let rawDataByMrk = [];
        for (const period in periodDataByMrk[mrk]) {
            // 년 합산의 경우: 12월 이외의 데이터는 무시, 분기 합산의 경우: 3,6,9,12월 이외의 데이터는 무시
            // TODO: 깨긋한 로직 없을까
            if ((unit==PERIOD_UNIT.YEAR && ['12'].includes((period.split('/'))[1])) || (unit==PERIOD_UNIT.QUARTER && ['03','06','09','12'].includes((period.split('/'))[1]))) {
                const sumByMrkNPrd = {};
                for (const keyName of MKRGROWTH_MODEL_RAWDATA_KEYNAME) {
                    const datasInPeriod = periodDataByMrk[mrk][period];
                    if (([KEY_NAME.MV, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL]).includes(keyName)) {
                        sumByMrkNPrd[keyName] = _.round(_.sumBy(datasInPeriod, v => v[keyName] || 0), 2);
                    } else if (([KEY_NAME.PSR, KEY_NAME.POR, KEY_NAME.PER, KEY_NAME.PBR]).includes(keyName)) {
                        sumByMrkNPrd[keyName] = _.round((_.sumBy(datasInPeriod, v => v[keyName] || 0))/datasInPeriod.length, 2);
                    } else if (keyName === OTHER_KEY_NAME.NUM_OF_CP) {
                        sumByMrkNPrd[keyName] = datasInPeriod.length;
                    } else {
                        sumByMrkNPrd[keyName] = datasInPeriod[0][keyName];
                    }
                }
                rawDataByMrk.push(sumByMrkNPrd);
            }
        }
        // Sorting by period
        rawDataByMrk = _.sortBy(rawDataByMrk, o => o[KEY_NAME.PERIOD]);
        result[mrk] = rawDataByMrk;
    }

    return result;
}

export default rawDataByMarket;