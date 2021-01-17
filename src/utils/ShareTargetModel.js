const _ = require('lodash');
const getRecentPeriod = require('./getRecentPeriod');

class ShareTargetModel {
  constructor(yearData, quarterData) {
    this.yearDataByShareCode = _.groupBy(yearData, (v) => v.shareCode);
    this.quarterDataByShareCode = _.groupBy(quarterData, (v) => v.shareCode);
  }

  getTurnAroundModel() {

    const tgShares = [];
    _.forEach(this.quarterDataByShareCode, (v, k) => {
      const tgPeriodData = getRecentPeriod(v, 4);
      if (tgPeriodData[0]) {
        tgShares.push(k);
      }
    });
  }
}

module.exports = ShareTargetModel;
