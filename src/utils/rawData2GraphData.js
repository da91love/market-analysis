import { KEY_NAME } from '../consts/keyName';

const rawData2GraphData = (tgShareRawData, idc) => {

    return {
        idc: idc,
        xAxisKeyName: "name",
        dataKey: [idc],
        data: tgShareRawData.map((v) => {
            return {
                name: (v[KEY_NAME.PERIOD]).slice(2, (v[KEY_NAME.PERIOD]).length),
                [idc]: v[idc] 
            }
        })
    };
}

export default rawData2GraphData;