import _ from "lodash";
import getRecentPeriodData from "./getRecentPeriodData";
import EconoIndicator from "../utils/EconoIndicator";
import { KEY_NAME } from '../consts/keyName';
import { MODELS, FILTER_TYPE } from '../consts/model';

class ShareTargetModelEngine {

  static getTurnAroundModel(quarterRawDataByShare, filterStatus) {
    const tgShares = [];
    const modelFilter = filterStatus?.[MODELS.TURNAROUND];

    // Assign default filter value
    // periodFilter의 default(각 종목의 최신 period값)값은 종목마다 다르므로, getRecentPeriodData에서 설정
    const termFilter = modelFilter?.[FILTER_TYPE.TERM] || 5;

    _.forEach(quarterRawDataByShare, (v, k) => {
      const tgPeriodData = getRecentPeriodData(v, modelFilter?.[FILTER_TYPE.PERIOD], termFilter);
      const tgPeriodDataLen = tgPeriodData.length;

      // tgPeriodData should not be null: 원바이오젠과 같이 2019년 데이터까지 밖에 없는 지정 기간이 존재하지 않으므로 걸러냄
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
    const modelFilter = filterStatus?.[MODELS.VALUE];

    // Assign default filter value
    const perFilterMin = modelFilter?.[FILTER_TYPE.PER_MIN] || 0;
    const perFilterMax = modelFilter?.[FILTER_TYPE.PER_MAX] || 12;
    const roeFilterMin = modelFilter?.[FILTER_TYPE.ROE_MIN] || 15;

    _.forEach(quarterRawDataByShare, (v, k) => {
      const tgPer = v[v.length-1][KEY_NAME.PER];
      const tgRoe = v[v.length-1][KEY_NAME.ROE];

      // 0 < PER < 10 and  ROE > 15
      if (perFilterMin < tgPer && tgPer <= perFilterMax) {
        if (tgRoe >= roeFilterMin) {
          tgShares.push(v[v.length-1]);
        }
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
