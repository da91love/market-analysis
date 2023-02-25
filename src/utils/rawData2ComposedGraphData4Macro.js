import { KEY_NAME, OTHER_KEY_NAME } from '../consts/keyName';
import {convert2YYMM} from '../utils/dateUtil';

const rawData2ComposedGraphData4Macro = (tgShareRawData, idc, graphMetaData) => {

// graphMetaData = [
//     {
//         "graphType": 1,
//         "dataKey": 1,
//     },
//     {
//         "graphType": 1,
//         "dataKey": 1,
//     }
// ]

    const data = Object.keys(tgShareRawData[OTHER_KEY_NAME.GDP]).map((period, i) => {
        return {
            name: period,
            [OTHER_KEY_NAME.GDP] : tgShareRawData[OTHER_KEY_NAME.GDP].period,
            [OTHER_KEY_NAME.M2]: tgShareRawData[OTHER_KEY_NAME.M2].period,
            [KEY_NAME.MV]: tgShareRawData['mrkcap'].period,

        }
    });

    return {
        idc: idc,
        graphType: "composed",
        xAxisKeyName: "name",
        dataKey: [idc],
        data: data
    };
}

export default rawData2ComposedGraphData4Macro;