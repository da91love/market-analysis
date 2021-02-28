import _ from "lodash";

function getRecentPeriod(tgList, tgPeriod) {
  try {
    const sliced = tgList.slice(tgList.length - tgPeriod, tgList.length);
    return sliced;
  } catch (error) {
    throw error;
  }
}

export default getRecentPeriod;
