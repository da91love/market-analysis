import { KEY_NAME } from '../consts/keyName';
import {convert2YYMM} from '../utils/dateUtil';

const rawData2ComposedGraphData = (tgShareRawData, idc) => {

    return {
        idc: idc,
        xAxisKeyName: "name",
        dataKey: [idc],
        data: tgShareRawData.map((v) => {
            return {
                name: (convert2YYMM(v[KEY_NAME.PERIOD])),
                [idc]: v[idc],
                "noc": v["tg_cmp_nb"]
            }
        })
    };
}

export default rawData2ComposedGraphData;