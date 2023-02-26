import { KEY_NAME } from '../consts/keyName';
import {convert2YYMM} from '../utils/dateUtil';
import { convertNumAsUnit } from '../utils/numUtil';


const rawData2ComposedGraphData = (tgShareRawData, idc, graphMetaData) => {

    return {
        idc: idc,
        graphType: "composed",
        xAxisKeyName: "name",
        dataKey: [idc],
        data: tgShareRawData.map((v) => {
            return {
                name: (convert2YYMM(v[KEY_NAME.PERIOD])),
                [idc]: convertNumAsUnit(v[idc], '만'),
                "noc": v["tg_cmp_nb"]
            }
        })
    };
}

export default rawData2ComposedGraphData;