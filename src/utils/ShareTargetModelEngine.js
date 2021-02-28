import _ from "lodash";
import getRecentPeriod from "./getRecentPeriod";

class ShareTargetModelEngine {

  static getTurnAroundModel(quarterDataByShareCode) {
    const tgShares = [];

    _.forEach(quarterDataByShareCode, (v, k) => {
      const tgPeriodData = getRecentPeriod(v, 5);

      // This period should be (+)
      if (tgPeriodData[tgPeriodData.length - 1]['영업이익'] > 0) {
        // Past consecutive 4periods should be (-)
        if (_.every(tgPeriodData.slice(0, tgPeriodData.length - 1), o => o['영업이익'] < 0)) {
          tgShares.push(tgPeriodData[tgPeriodData.length - 1]);
        }
      }
    });

    return tgShares;
  }
}

export default ShareTargetModelEngine;
