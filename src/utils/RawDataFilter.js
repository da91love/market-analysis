import _ from 'lodash';
import {E_PERIOD_DELIMITER} from '../consts/common';
import {KEY_NAME} from '../consts/keyName';

class RawDataFilter {
    static getRealData(rawData) {
        const realData = _.filter(rawData, v => !v[KEY_NAME.PERIOD].includes(E_PERIOD_DELIMITER));
        return realData;
    }
}

export default RawDataFilter;