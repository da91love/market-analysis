import _ from "lodash";
import getRecentPeriodData from "./getRecentPeriodData";
import EconoIndicator from "../utils/EconoIndicator";
import { KEY_NAME } from '../consts/keyName';
import { MODELS } from '../consts/model';

class ShareTargetModelEngine {

  /* 기준기간, 몇분기연속, 
  (required)지난 4분기 이상 영업이익 (-)
  (required)이번분기 영업이익 흑자전환
  (optional)영업이익 상승률의 지속적 +
  */
  static getTurnAroundModel(quarterRawDataByShare, filterStatus) {
    const tgShares = [];
    const modelFilter = filterStatus?.[MODELS.TURNAROUND];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const tgPeriodData = getRecentPeriodData(v, 5);

      // This period should be (+)
      if (tgPeriodData[tgPeriodData.length - 1][KEY_NAME.OP] > 0) {
        // Past consecutive 4periods should be (-)
        if (_.every(tgPeriodData.slice(0, tgPeriodData.length - 1), o => o[KEY_NAME.OP] < 0)) {
          tgShares.push(tgPeriodData[tgPeriodData.length - 1]);
        }
      }
    });

    return tgShares;
  }

  static getValueModel(quarterRawDataByShare) {
    const tgShares = [];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const tgPer = v[v.length-1][KEY_NAME.PER];
      const tgRoe = v[v.length-1][KEY_NAME.ROE];

      // 0 < PER < 10 and  ROE > 15
      if (0 < tgPer && tgPer < 10 && tgRoe >= 15) {
        tgShares.push(v[v.length-1]);
      }
    });

    return tgShares;
  }

  static getBluechipModel(quarterRawDataByShare) {
    const tgShares = [];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const tgPer = v[v.length-1][KEY_NAME.PER];
      const tgRoe = v[v.length-1][KEY_NAME.ROE];
      const tgSales = v[v.length-1][KEY_NAME.SALES];

      // 0 < PER < 10 and  ROE > 15 and Sales > 2500
      if (0 < tgPer && tgPer < 10 && tgRoe >= 15 && tgSales > 2500) {
        tgShares.push(v[v.length-1]);
      }
    });

    return tgShares;
  }

  static getCollapseModel(yearRawDataByShare) {
    const tgShares = [];

    _.forEach(yearRawDataByShare, (v, k) => {
      const pastMv = v[0][KEY_NAME.MV];
      const latestMv = v[v.length-1][KEY_NAME.MV];

      // if latest marketvalue is smaller than past marketvalue
      if (_.isNumber(pastMv) && _.isNumber(latestMv)) {
        if ((pastMv/5) > latestMv) {
          tgShares.push(v[v.length-1]);
        }
      }
    });

    return tgShares;
  }

  static getCpGrowthModel(quarterRawDataByShare) {
    const tgShares = [];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const pastOp = v[0][KEY_NAME.OP];
      const latestOp = v[v.length-1][KEY_NAME.OP];

      // if latest op is bigger than past op more than twice
      if (_.isNumber(pastOp) && _.isNumber(latestOp)) {
        if ((pastOp*2) < latestOp) {
          tgShares.push(v[v.length-1]);
        }
      }
    });

    return tgShares;
  }

  static getInvstGrowthModel(quarterRawDataByShare) {
    const tgShares = [];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const pastIaCf = v[v.length-2]?.[KEY_NAME.IA_CF];
      const latestIaCf = v[v.length-1][KEY_NAME.IA_CF];

      if (_.isNumber(pastIaCf) && _.isNumber(latestIaCf)) {
        // 1. lastestIaCf is smaller than 0
        if (latestIaCf < 0) {
          // 2. growth rate is over 400%(5times)
          if (EconoIndicator.getGrowthRate(-pastIaCf, -latestIaCf) > 400) {
            tgShares.push(v[v.length-1]);
          }
        }
      }
    });

    return tgShares;




    
  }
}

export default ShareTargetModelEngine;
