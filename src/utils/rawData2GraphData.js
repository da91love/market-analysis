import { KEY_NAME } from '../consts/keyName';

const rawData2GraphData = (tgShareRawData, indicator) => {

    return {
        name: indicator,
        xAxisKeyName: "name",
        dataKey: [indicator],
        data: tgShareRawData.map((v, i) => {
            return {
                name: v[KEY_NAME.PERIOD],
                [indicator]: v[indicator] 
            }
        })
    };
}

export default rawData2GraphData;