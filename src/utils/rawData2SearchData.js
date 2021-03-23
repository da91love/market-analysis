import _ from "lodash";
import {KEY_NAME} from '../consts/keyName';

const rawData2SearchData = (rawDataByShare) => {

    const result = [];
    for (const shareCode in rawDataByShare) {
        const shareName = rawDataByShare[shareCode][0][KEY_NAME.SHARE_NAME];
        result.push({
            target: `${shareCode}:${shareName}`,
            [KEY_NAME.SHARE_CODE]: shareCode,
            [KEY_NAME.SHARE_NAME]: shareName
        });
    }

    return result;
}

export default rawData2SearchData;