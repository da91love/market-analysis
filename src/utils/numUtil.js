import _ from "lodash";

export const isNumber = (tgNum) => {
    if (!_.isNaN(tgNum) && _.isNumber(tgNum)) {
        return true;
    } else {
        return false;
    }
}

export const convertNumAsUnit = (num, unit) => {
    try {
        const s = {
            "조": 1000000000000,
            "억": 100000000,
            "천만": 10000000,
            "백만": 1000000
        }

        if (isNumber(num)) {
            return _.round(num / s[unit], 0)
        } else {
            return null
        }
    } catch (e) {
        throw e;
    }
}