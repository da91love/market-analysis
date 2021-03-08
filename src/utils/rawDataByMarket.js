import _ from "lodash";
import { MKRGROWTH_MODEL_RAWDATA_KEYNAME } from '../consts/model';
import { KEY_NAME, OTHER_KEY_NAME } from '../consts/keyName';

const rawDataByMarket = (periodRawData) => {
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
            const sumByMrkNPrd = {};  
            for (const keyName of MKRGROWTH_MODEL_RAWDATA_KEYNAME) {
                const datasInPeriod = periodDataByMrk[mrk][period];
                if (([KEY_NAME.MV, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL]).includes(keyName)) {
                    for (const i of datasInPeriod) {
                        if (!_.isNumber(i[KEY_NAME.SALES])) {
                            console.log('hahaha')
                        }
                    }
                    sumByMrkNPrd[keyName] = _.round(_.sumBy(datasInPeriod, v => v[keyName]), 2);
                } else if (([KEY_NAME.PSR, KEY_NAME.POR, KEY_NAME.PER, KEY_NAME.PCR, KEY_NAME.PBR]).includes(keyName)) {
                    sumByMrkNPrd[keyName] = _.round((_.sumBy(datasInPeriod, v => v[keyName]))/datasInPeriod.length, 2);
                } else if (keyName === OTHER_KEY_NAME.NUM_OF_CP) {
                    sumByMrkNPrd[keyName] = datasInPeriod.length;
                } else {
                    sumByMrkNPrd[keyName] = datasInPeriod[0][keyName];
                }
            }
            rawDataByMrk.push(sumByMrkNPrd);
        }
        // Sorting by period
        rawDataByMrk = _.sortBy(rawDataByMrk, o => o[KEY_NAME.PERIOD]);
        result[mrk] = rawDataByMrk;
    }

    return result;
}

export default rawDataByMarket;