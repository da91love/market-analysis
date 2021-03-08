import {MODELS, FILTER_TYPE} from './model'

export const FILTER = {
    [MODELS.VALUE]: {
        [FILTER_TYPE.PERIOD]:null,
        [FILTER_TYPE.PER_MAX]: 12,
        [FILTER_TYPE.PER_MIN]: 0,
        [FILTER_TYPE.ROE_MIN]: 15,
    },
    [MODELS.TURNAROUND]: {
        [FILTER_TYPE.PERIOD]:null,
        [FILTER_TYPE.TERM]: 5,
    },
    [MODELS.CPGROWTH]: {
        [FILTER_TYPE.PERIOD]:null,
        [FILTER_TYPE.TERM]: 5,
        [FILTER_TYPE.OP_TIMES]: 300,
    },
    [MODELS.MRKGROWTH]: {
        [FILTER_TYPE.PERIOD]:null,
        [FILTER_TYPE.MV_TIMES]: 50,
    },
    [MODELS.COLLAPSE]: {
        [FILTER_TYPE.PERIOD]:null,
        [FILTER_TYPE.TERM]: 3,
        [FILTER_TYPE.MV_TIMES]: -50,
    },
    [MODELS.BLUECHIP]: {
        [FILTER_TYPE.PERIOD]:null,
        [FILTER_TYPE.SALES_MIN]: 2500,
        [FILTER_TYPE.PER_MAX]: 12,
        [FILTER_TYPE.PER_MIN]: 0,
        [FILTER_TYPE.ROE_MIN]: 15,
    },
    [MODELS.INVGROWTH]: {
        [FILTER_TYPE.PERIOD]:null,
        [FILTER_TYPE.IA_CF_TIMES]: 300,
    }
} 