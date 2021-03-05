import _ from "lodash";
import {KEY_NAME} from '../consts/keyName';

const rawData2SearchData = (rawData) => {

    const result = [];
    for (const d of rawData) {
        if (!(_.find(result, [KEY_NAME.SHARE_CODE, d[KEY_NAME.SHARE_CODE]]))) {
            result.push({
                target: `${d[KEY_NAME.SHARE_CODE]}:${d[KEY_NAME.SHARE_NAME]}`,
                shareCode: d[KEY_NAME.SHARE_CODE]
            });
        }
    }

    return result;
}

export default rawData2SearchData;