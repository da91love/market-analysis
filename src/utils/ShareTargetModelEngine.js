import _ from "lodash";
import getRecentPeriod from "./getRecentPeriod";

class ShareTargetModelEngine {
  constructor(yearData, quarterData) {
    // Instance as Singleton
    if (!ShareTargetModelEngine._instance) {
      ShareTargetModelEngine._instance = this;
    }

    // groupBy
    const yearDataByShareCode = _.groupBy(yearData, v => v.shareCode);
    const quarterDataByShareCode = _.groupBy(quarterData, v => v.shareCode);

    // sortBy
    this.yearDataByShareCode = _.forEach(yearDataByShareCode, (v, k) => {
      yearDataByShareCode[k] = _.sortBy(v, o => o.period);
    });

    this.quarterDataByShareCode = _.forEach(quarterDataByShareCode, (v, k) => {
      quarterDataByShareCode[k] = _.sortBy(v, o => o.period);
    });

    return ShareTargetModelEngine._instance;
  }

  getTurnAroundModel() {
    const tgShares = [];

    _.forEach(this.quarterDataByShareCode, (v, k) => {
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
