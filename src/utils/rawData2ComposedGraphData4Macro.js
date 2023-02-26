import _ from 'lodash';
import { KEY_NAME, OTHER_KEY_NAME } from '../consts/keyName';
import { isNumber, convertNumAsUnit } from '../utils/numUtil';
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

    const data = Object.keys(tgShareRawData['mrkcap']).map((period, i) => {

        const gdp = convertNumAsUnit(tgShareRawData[OTHER_KEY_NAME.GDP][period], '만');;
        const m2 = convertNumAsUnit(tgShareRawData[OTHER_KEY_NAME.M2][period], '만');;
        const MV = convertNumAsUnit(tgShareRawData['mrkcap'][period]['MKTCAP'], '조');
        const mvPerGdp = isNumber(MV) && isNumber(gdp)? _.round((MV/gdp)*100, 0) : null;
        const mvPerM2 = isNumber(MV) && isNumber(m2)? _.round((MV/m2)*100, 0) : null;

        return {
            name: period,
            [OTHER_KEY_NAME.GDP] : gdp,
            [OTHER_KEY_NAME.M2]: m2,
            [KEY_NAME.MV]: MV,
            [OTHER_KEY_NAME.MV_PER_GDP]: mvPerGdp,
            [OTHER_KEY_NAME.MV_PER_M2]: mvPerM2,
        };
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