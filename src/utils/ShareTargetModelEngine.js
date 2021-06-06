import _ from "lodash";
import cutPeriodWithCondition from "./cutPeriodWithCondition";
import EconoIndicator from "../utils/EconoIndicator";
import RawDataFilter from "../utils/RawDataFilter";
import { KEY_NAME } from '../consts/keyName';
import { MODELS, MKRGROWTH_MODEL_RAWDATA_KEYNAME } from '../consts/model';
import {FILTER_TYPE} from '../consts/filter';

class ShareTargetModelEngine {

  static getTurnAroundModel(quarterRawDataByShare, filterStatus) {
    const tgShares = [];

    // get filter
    const term = filterStatus[MODELS.TURNAROUND][FILTER_TYPE.TERM];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const rD = RawDataFilter.getRealData(v);
      const period = filterStatus[MODELS.TURNAROUND][FILTER_TYPE.PERIOD] || rD[rD.length-1][KEY_NAME.PERIOD];
      const tgPeriodData = cutPeriodWithCondition(v, period, term);
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
    const perMin = filterStatus[MODELS.VALUE][FILTER_TYPE.PER_MIN];
    const perMax = filterStatus[MODELS.VALUE][FILTER_TYPE.PER_MAX];
    const roeMax = filterStatus[MODELS.VALUE][FILTER_TYPE.ROE_MIN];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const rD = RawDataFilter.getRealData(v);
      // cutPeriodWithCondition function working same as period filter + @
      const period = filterStatus[MODELS.VALUE][FILTER_TYPE.PERIOD] || rD[rD.length-1][KEY_NAME.PERIOD];
      const tgPeriodData = cutPeriodWithCondition(v, period);
      const tgPeriodDataLen = tgPeriodData.length;

      if (tgPeriodDataLen > 0) {
        const lastValue = _.last(tgPeriodData);
        const tgPer = lastValue[KEY_NAME.PER];
        const tgRoe = lastValue[KEY_NAME.ROE];
  
        // 0 < PER < 10 and  ROE > 15
        if (perMin < tgPer && tgPer <= perMax) {
          if (roeMax <= tgRoe) {
            tgShares.push(lastValue);
          }
        }
      }
    });

    return tgShares;
  }

  static getBluechipModel(quarterRawDataByShare, filterStatus) {
    const tgShares = [];

    // Assign default filter value
    const salesMin = filterStatus[MODELS.BLUECHIP][FILTER_TYPE.SALES_MIN];
    const perMin = filterStatus[MODELS.BLUECHIP][FILTER_TYPE.PER_MIN];
    const perMax = filterStatus[MODELS.BLUECHIP][FILTER_TYPE.PER_MAX];
    const roeMax = filterStatus[MODELS.BLUECHIP][FILTER_TYPE.ROE_MIN];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const rD = RawDataFilter.getRealData(v);
      const period = filterStatus[MODELS.BLUECHIP][FILTER_TYPE.PERIOD] || rD[rD.length-1][KEY_NAME.PERIOD];
      const tgPeriodData = cutPeriodWithCondition(v, period);
      const tgPeriodDataLen = tgPeriodData.length;

      if (tgPeriodDataLen > 0) {
        const lastValue = _.last(tgPeriodData);
        const tgSales = lastValue[KEY_NAME.SALES];
        const tgPer = lastValue[KEY_NAME.PER];
        const tgRoe = lastValue[KEY_NAME.ROE];
  
        if(salesMin < tgSales) {
          if (perMin < tgPer && tgPer <= perMax) {
            if (roeMax <= tgRoe) {
              tgShares.push(lastValue);
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
    const mvTimes = filterStatus[MODELS.COLLAPSE][FILTER_TYPE.MV_TIMES];
    const term = filterStatus[MODELS.COLLAPSE][FILTER_TYPE.TERM];

    _.forEach(yearRawDataByShare, (v, k) => {
      const rD = RawDataFilter.getRealData(v);
      const period = filterStatus[MODELS.COLLAPSE][FILTER_TYPE.PERIOD] || rD[rD.length-1][KEY_NAME.PERIOD];
      const tgPeriodData = cutPeriodWithCondition(v, period, term);
      const tgPeriodDataLen = tgPeriodData.length;

      if (tgPeriodDataLen > 0) {
        const lastValue = _.last(tgPeriodData);
        const lastMv = tgPeriodData[0][KEY_NAME.MV];
        const thisMv = lastValue[KEY_NAME.MV];
  
        // if latest marketvalue is smaller than past marketvalue
        if (_.isNumber(lastMv) && _.isNumber(thisMv)) {
          if (EconoIndicator.getGrowthRate(lastMv, thisMv) < mvTimes) {
            tgShares.push(lastValue);
          }
        }
      }
    });

    return tgShares;
  }

  static getMrkGrowthModel(quarterRawDataByMrk, filterStatus) {
    const tgShares = [];

    // Assign default filter value
    const term = filterStatus[MODELS.MRKGROWTH][FILTER_TYPE.TERM];
    const mvTimes = filterStatus[MODELS.MRKGROWTH][FILTER_TYPE.MV_TIMES];

    _.forEach(quarterRawDataByMrk, (v, k) => {
      const rD = RawDataFilter.getRealData(v);
      const period = filterStatus[MODELS.MRKGROWTH][FILTER_TYPE.PERIOD] || rD[rD.length-1][KEY_NAME.PERIOD];
      const tgPeriodData = cutPeriodWithCondition(v, period);
      const tgPeriodDataLen = tgPeriodData.length;

      if (tgPeriodDataLen > 0) {
        const lastValue = _.last(tgPeriodData);
        tgShares.push(lastValue);

        // const lastMv = tgPeriodData[0][KEY_NAME.MV];
        // const thisMv = tgPeriodData[tgPeriodDataLen-1][KEY_NAME.MV];
  
        // // if latest op is bigger than past op more than twice
        // if (_.isNumber(lastMv) && _.isNumber(thisMv)) {
        //   if (EconoIndicator.getGrowthRate(lastMv, thisMv) > mvTimes) {
        //     tgShares.push(tgPeriodData[tgPeriodDataLen-1]);
        //   }
        // }
      }
    });

    return tgShares;
  }

  static getCpGrowthModel(quarterRawDataByShare, filterStatus) {
    const tgShares = [];

    // Assign default filter value
    const term = filterStatus[MODELS.CPGROWTH][FILTER_TYPE.TERM];
    const opTimes = filterStatus[MODELS.CPGROWTH][FILTER_TYPE.OP_TIMES];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const rD = RawDataFilter.getRealData(v);
      const period = filterStatus[MODELS.CPGROWTH][FILTER_TYPE.PERIOD] || rD[rD.length-1][KEY_NAME.PERIOD];
      const tgPeriodData = cutPeriodWithCondition(v, period, term);
      const tgPeriodDataLen = tgPeriodData.length;

      if (tgPeriodDataLen > 0) {
        const lastValue = _.last(tgPeriodData);
        const lastOp = tgPeriodData[0][KEY_NAME.OP];
        const thisOp = lastValue[KEY_NAME.OP];
  
        // if latest op is bigger than past op more than twice
        if (_.isNumber(lastOp) && _.isNumber(thisOp)) {
          if (EconoIndicator.getGrowthRate(lastOp, thisOp) > opTimes) {
            tgShares.push(lastValue);
          }
        }
      }
    });

    return tgShares;
  }

  static getInvstGrowthModel(quarterRawDataByShare, filterStatus) {
    const tgShares = [];

    // Assign default filter value
    const term = filterStatus[MODELS.INVGROWTH][FILTER_TYPE.TERM];
    const iaCfTimes = filterStatus[MODELS.INVGROWTH][FILTER_TYPE.CFI_TIMES];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const rD = RawDataFilter.getRealData(v);
      const period = filterStatus[MODELS.INVGROWTH][FILTER_TYPE.PERIOD] || rD[rD.length-1][KEY_NAME.PERIOD];
      const tgPeriodData = cutPeriodWithCondition(v, period);
      const tgPeriodDataLen = tgPeriodData.length;

      if (tgPeriodDataLen > 0) {
        const lastValue = _.last(tgPeriodData);
        const pastIaCf = tgPeriodData[tgPeriodDataLen-2]?.[KEY_NAME.CFI];
        const latestIaCf = lastValue[KEY_NAME.CFI];
  
        if (_.isNumber(pastIaCf) && _.isNumber(latestIaCf)) {
          // 1. lastestIaCf is smaller than 0
          if (latestIaCf < 0) {
            // 2. growth rate is over 400%(5times)
            if (EconoIndicator.getGrowthRate(-pastIaCf, -latestIaCf) > iaCfTimes) {
              tgShares.push(lastValue);
            }
          }
        }
      }
    });

    return tgShares;
  }
}

export default ShareTargetModelEngine;
