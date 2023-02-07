import { KEY_NAME } from '../consts/keyName';
import {convert2YYMM} from '../utils/dateUtil';

const rawData2GraphData = (tgShareRawData, idc) => {

    return {
        idc: idc,
        graphType: "sole",
        xAxisKeyName: "name",
        dataKey: [idc],
        data: tgShareRawData.map((v) => {
            return {
                name: (convert2YYMM(v[KEY_NAME.PERIOD])),
                [idc]: v[idc] 
            }
        })
    };
}

export default rawData2GraphData;