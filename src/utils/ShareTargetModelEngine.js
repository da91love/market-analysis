import _ from "lodash";
import getRecentPeriod from "./getRecentPeriod";
import { KEY_NAME } from '../consts/keyName';

class ShareTargetModelEngine {

  static getTurnAroundModel(quarterRawDataByShare) {
    const tgShares = [];

    _.forEach(quarterRawDataByShare, (v, k) => {
      const tgPeriodData = getRecentPeriod(v, 5);

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
      if ((pastMv/5) > latestMv) {
        tgShares.push(v[v.length-1]);
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
      if ((pastOp*2) < latestOp) {
        tgShares.push(v[v.length-1]);
      }
    });

    return tgShares;
  }
}

export default ShareTargetModelEngine;
