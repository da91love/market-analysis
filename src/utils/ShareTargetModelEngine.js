import _, { last } from "lodash";
import cutPeriodWithCondition from "./cutPeriodWithCondition";
import EconoIndicator from "../utils/EconoIndicator";
import { KEY_NAME } from '../consts/keyName';
import { MODELS, FILTER_TYPE } from '../consts/model';

class ShareTargetModelEngine {

  static getTurnAroundModel(quarterRawDataByShare, filterStatus) {
    const tgShares = [];

    // get filter
    const termFilter = filterStatus[MODELS.TURNAROUND][FILTER_TYPE.TERM];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const periodFilter = filterStatus[MODELS.TURNAROUND][FILTER_TYPE.PERIOD] || v[v.length-1][KEY_NAME.PERIOD];
      const tgPeriodData = cutPeriodWithCondition(v, periodFilter, termFilter);
      const tgPeriodDataLen = tgPeriodData.length;

      // tgPeriodData should not be null: 원바이오젠과 같이 2019년 데이터까지 밖에 없는 지정 기간 내의 데이터가 존재하지 않으므로 걸러냄
      if (tgPeriodDataLen > 0) {
        // Latest period should be (+)
        if (tgPeriodData[tgPeriodDataLen - 1][KEY_NAME.OP] > 0) {
          // Past consecutive periods should be (-)
          if (_.every(tgPeriodData.slice(0, tgPeriodDataLen - 1), o => o[KEY_NAME.OP] < 0)) {
            tgShares.push(tgPeriodData[tgPeriodDataLen - 1]);
          }
        }
      }
    });

    return tgShares;
  }

  static getValueModel(quarterRawDataByShare, filterStatus) {
    const tgShares = [];

    // get filter
    const perMinFilter = filterStatus[MODELS.VALUE][FILTER_TYPE.PER_MIN];
    const perMaxFilter = filterStatus[MODELS.VALUE][FILTER_TYPE.PER_MAX];
    const roeMaxFilter = filterStatus[MODELS.VALUE][FILTER_TYPE.ROE_MIN];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const periodFilter = filterStatus[MODELS.VALUE][FILTER_TYPE.PERIOD] || v[v.length-1][KEY_NAME.PERIOD];
      const tgPeriodData = cutPeriodWithCondition(v, periodFilter);
      const tgPeriodDataLen = tgPeriodData.length;

      if (tgPeriodDataLen > 0) {
        const tgPer = tgPeriodData[tgPeriodDataLen-1][KEY_NAME.PER];
        const tgRoe = tgPeriodData[tgPeriodDataLen-1][KEY_NAME.ROE];
  
        // 0 < PER < 10 and  ROE > 15
        if (perMinFilter < tgPer && tgPer <= perMaxFilter) {
          if (roeMaxFilter <= tgRoe) {
            tgShares.push(tgPeriodData[tgPeriodDataLen-1]);
          }
        }
      }
    });

    return tgShares;
  }

  static getBluechipModel(quarterRawDataByShare, filterStatus) {
    const tgShares = [];

    // Assign default filter value
    const salesMinFilter = filterStatus[MODELS.BLUECHIP][FILTER_TYPE.SALES_MIN];
    const perMinFilter = filterStatus[MODELS.BLUECHIP][FILTER_TYPE.PER_MIN];
    const perMaxFilter = filterStatus[MODELS.BLUECHIP][FILTER_TYPE.PER_MAX];
    const roeMaxFilter = filterStatus[MODELS.BLUECHIP][FILTER_TYPE.ROE_MIN];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const periodFilter = filterStatus[MODELS.BLUECHIP][FILTER_TYPE.PERIOD] || v[v.length-1][KEY_NAME.PERIOD];
      const tgPeriodData = cutPeriodWithCondition(v, periodFilter);
      const tgPeriodDataLen = tgPeriodData.length;

      if (tgPeriodDataLen > 0) {
        const tgSales = tgPeriodData[tgPeriodDataLen-1][KEY_NAME.SALES];
        const tgPer = tgPeriodData[tgPeriodDataLen-1][KEY_NAME.PER];
        const tgRoe = tgPeriodData[tgPeriodDataLen-1][KEY_NAME.ROE];
  
        if(salesMinFilter < tgSales) {
          if (perMinFilter < tgPer && tgPer <= perMaxFilter) {
            if (roeMaxFilter <= tgRoe) {
              tgShares.push(tgPeriodData[tgPeriodDataLen-1]);
            }
          }
        }
      }
    });

    return tgShares;
  }

  static getCollapseModel(yearRawDataByShare, filterStatus) {
    const tgShares = [];

    // Assign default filter value
    const mvTimesFilter = filterStatus[MODELS.COLLAPSE][FILTER_TYPE.MV_TIMES];
    const termFilter = filterStatus[MODELS.COLLAPSE][FILTER_TYPE.TERM];

    _.forEach(yearRawDataByShare, (v, k) => {
      const periodFilter = filterStatus[MODELS.COLLAPSE][FILTER_TYPE.PERIOD] || v[v.length-1][KEY_NAME.PERIOD];
      const tgPeriodData = cutPeriodWithCondition(v, periodFilter, termFilter);
      const tgPeriodDataLen = tgPeriodData.length;

      if (tgPeriodDataLen > 0) {
        const lastMv = tgPeriodData[0][KEY_NAME.MV];
        const thisMv = tgPeriodData[tgPeriodDataLen-1][KEY_NAME.MV];
  
        // if latest marketvalue is smaller than past marketvalue
        if (_.isNumber(lastMv) && _.isNumber(thisMv)) {
          if (EconoIndicator.getGrowthRate(lastMv, thisMv) < mvTimesFilter) {
            tgShares.push(tgPeriodData[tgPeriodDataLen-1]);
          }
        }
      }
    });

    return tgShares;
  }

  static getMrkGrowthModel(yearRawData, quarterRawData, filterStatus) {
    const tgShares = [];

    // Get share data from DB(temporary from json)
    let yearDataByMrk = _.groupBy(yearRawData, v => v[KEY_NAME.MARKET_CODE]);
    let quarterDataByMrk = _.groupBy(quarterRawData, v => v[KEY_NAME.MARKET_CODE]);

    for (const mrk in yearDataByMrk) {
      const yearDataByMrkNPrd = _.groupBy(yearDataByMrk[mrk], v => v[KEY_NAME.PERIOD]);
      yearDataByMrk[mrk] = yearDataByMrkNPrd;
    }

    for (const mrk in quarterDataByMrk) {
      const yearDataByMrkNPrd = _.groupBy(quarterDataByMrk[mrk], v => v[KEY_NAME.PERIOD]);
      quarterDataByMrk[mrk] = yearDataByMrkNPrd;
    }

    for (const mrk in yearDataByMrk) {
      const sumByMrkNPrd = {};
      for (const period in yearDataByMrk[mrk]) {
        for (const key in KEY_NAME) {
          sumByMrkNPrd[KEY_NAME[key]] = _.sumBy(yearDataByMrk[mrk][period], v => v[KEY_NAME[key]]);
        }
        mrk[period] = sumByMrkNPrd;
      }
    }

    return tgShares;
  }

  static getCpGrowthModel(quarterRawDataByShare, filterStatus) {
    const tgShares = [];

    // Assign default filter value
    const termFilter = filterStatus[MODELS.CPGROWTH][FILTER_TYPE.TERM];
    const opTimesFilter = filterStatus[MODELS.CPGROWTH][FILTER_TYPE.OP_TIMES];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const periodFilter = filterStatus[MODELS.CPGROWTH][FILTER_TYPE.PERIOD] || v[v.length-1][KEY_NAME.PERIOD];
      const tgPeriodData = cutPeriodWithCondition(v, periodFilter, termFilter);
      const tgPeriodDataLen = tgPeriodData.length;

      if (tgPeriodDataLen > 0) {
        const lastOp = tgPeriodData[0][KEY_NAME.OP];
        const thisOp = tgPeriodData[tgPeriodDataLen-1][KEY_NAME.OP];
  
        // if latest op is bigger than past op more than twice
        if (_.isNumber(lastOp) && _.isNumber(thisOp)) {
          if (EconoIndicator.getGrowthRate(lastOp, thisOp) > opTimesFilter) {
            tgShares.push(tgPeriodData[tgPeriodDataLen-1]);
          }
        }
      }
    });

    return tgShares;
  }

  static getInvstGrowthModel(quarterRawDataByShare, filterStatus) {
    const tgShares = [];

    // Assign default filter value
    const termFilter = filterStatus[MODELS.INVGROWTH][FILTER_TYPE.TERM];
    const iaCfTimesFilter = filterStatus[MODELS.INVGROWTH][FILTER_TYPE.IA_CF_TIMES];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const periodFilter = filterStatus[MODELS.INVGROWTH][FILTER_TYPE.PERIOD] || v[v.length-1][KEY_NAME.PERIOD];
      const tgPeriodData = cutPeriodWithCondition(v, periodFilter);
      const tgPeriodDataLen = tgPeriodData.length;

      if (tgPeriodDataLen > 0) {
        const pastIaCf = tgPeriodData[tgPeriodDataLen-2]?.[KEY_NAME.IA_CF];
        const latestIaCf = tgPeriodData[tgPeriodDataLen-1][KEY_NAME.IA_CF];
  
        if (_.isNumber(pastIaCf) && _.isNumber(latestIaCf)) {
          // 1. lastestIaCf is smaller than 0
          if (latestIaCf < 0) {
            // 2. growth rate is over 400%(5times)
            if (EconoIndicator.getGrowthRate(-pastIaCf, -latestIaCf) > iaCfTimesFilter) {
              tgShares.push(tgPeriodData[tgPeriodDataLen-1]);
            }
          }
        }
      }
    });

    return tgShares;
  }
}

export default ShareTargetModelEngine;
