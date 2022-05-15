import {MODELS} from './model';
import {KEY_NAME} from './keyName'

export const FILTER_TYPE = {
    PERIOD: "periodFilter",
    TERM: "termFilter",
    PER_MIN: "perMinFilter",
    PER_MAX: "perMaxFilter",
    SALES_MIN: "salesMinFilter",
    ROE_MIN: "roeMinFilter",
    OP_TIMES: "opTimesFilter",
    CFI_TIMES: "iaCfTimesFilter",
    MV_TIMES: "mvTimesFilter",
    PROFIT_TYPE: "profitTypeFilter"
}

export const FILTER_BY_MDL = {
    [MODELS.VALUE]: {
        [FILTER_TYPE.PERIOD]: null,
        [FILTER_TYPE.PER_MAX]: 12,
        [FILTER_TYPE.PER_MIN]: 0,
        [FILTER_TYPE.ROE_MIN]: 15,
    },
    [MODELS.TURNAROUND]: {
        [FILTER_TYPE.PROFIT_TYPE]: KEY_NAME.OP,
        [FILTER_TYPE.PERIOD]: null,
        [FILTER_TYPE.TERM]: 5,
    },
    [MODELS.CPGROWTH]: {
        [FILTER_TYPE.PERIOD]: null,
        [FILTER_TYPE.PROFIT_TYPE]: KEY_NAME.OP,
        [FILTER_TYPE.TERM]: 5,
        [FILTER_TYPE.OP_TIMES]: 300,
    },
    [MODELS.MRKGROWTH]: {
        [FILTER_TYPE.PERIOD]: null,
        [FILTER_TYPE.MV_TIMES]: 50,
    },
    [MODELS.COLLAPSE]: {
        [FILTER_TYPE.PERIOD]: null,
        [FILTER_TYPE.TERM]: 3,
        [FILTER_TYPE.MV_TIMES]: -50,
    },
    [MODELS.BLUECHIP]: {
        [FILTER_TYPE.PERIOD]: null,
        [FILTER_TYPE.SALES_MIN]: 2500,
        [FILTER_TYPE.PER_MAX]: 12,
        [FILTER_TYPE.PER_MIN]: 0,
        [FILTER_TYPE.ROE_MIN]: 15,
    },
    [MODELS.CAPEXGROWTH]: {
        [FILTER_TYPE.PERIOD]: null,
        [FILTER_TYPE.CFI_TIMES]: 300,
    }
}

export const MARKET_SEARCH_FILTER = {
    [FILTER_TYPE.PERIOD]: null,
} 