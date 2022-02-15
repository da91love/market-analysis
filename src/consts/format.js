import { PERIOD_UNIT, F_STATUS_TYPE } from './common';

export const F_STATUS_DATA_FMT = {
    [F_STATUS_TYPE.PL]: {
        [PERIOD_UNIT.YEAR]: [],
        [PERIOD_UNIT.QUARTER]: [],
    },
    [F_STATUS_TYPE.BS]: {
        [PERIOD_UNIT.YEAR]: [],
        [PERIOD_UNIT.QUARTER]: [],
    },
    [F_STATUS_TYPE.CF]: {
        [PERIOD_UNIT.YEAR]: [],
        [PERIOD_UNIT.QUARTER]: [],
    }
}