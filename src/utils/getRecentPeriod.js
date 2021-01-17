const _ = require('lodash');

function getRecentPeriod(tgList, tgPeriod) {
  try {
    const sorted = _.sortBy(tgList, 'period').slice(tgList.length - tgPeriod, tgList.length);
    return sorted;
  } catch (error) {
    throw error;
  }
}

module.exports = getRecentPeriod;
