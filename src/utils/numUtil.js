import _ from "lodash";

export const isNumber = (tgNum) => {
    if (!_.isNaN(tgNum) && _.isNumber(tgNum)) {
        return true;
    } else {
        return false;
    }
}