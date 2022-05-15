import {KEY_NAME, OTHER_KEY_NAME} from './keyName';

export const MODELS = {
    VALUE: 'value',
    TURNAROUND: 'turnaround',
    CPGROWTH: 'cpgrowth',
    // MRKGROWTH: 'mrkgrowth',
    COLLAPSE: 'collapse',
    BLUECHIP: 'bluechip',
    CAPEXGROWTH: 'capexgrowth',
    ALLSHARES: 'allshares',
}

export const MODEL_NAME = {
    VALUE: 'Value Stock Model',
    TURNAROUND: 'Turnaround Stock Model',
    CPGROWTH: 'CpGrowth Stock Model',
    // MRKGROWTH: 'MrkGrowth Stock Model',
    COLLAPSE: 'Collapse Stock Model',
    BLUECHIP: 'Bluechip Stock Model',
    CAPEXGROWTH: 'Capex Growth Stock Model',
}

/**
 * MARKET데이터는 rawData에서 따로 가공해야 하기 때문에, 키명을 rawData대로 하지 않고 따로 정의함
 * MRKGROWTH모델의 MODEL_TABLE_COL과 GRAPH_ANALYSIS_COL의 keyname은 아래의 keyname에 포함되어야함
 */
export const MKRGROWTH_MODEL_RAWDATA_KEYNAME = [
    KEY_NAME.PERIOD, 
    KEY_NAME.MARKET_NAME,
    KEY_NAME.MARKET_CODE,
    OTHER_KEY_NAME.NUM_OF_CP,
    KEY_NAME.MV, 
    KEY_NAME.SALES, 
    KEY_NAME.OP, 
    KEY_NAME.NP_CTRL,
    KEY_NAME.PSR,
    KEY_NAME.POR,
    KEY_NAME.PER,
    KEY_NAME.PBR,
]

export const VLT_MODELS = {
    PRICE: 'price',
    MLTP: 'multiple',
    PRFM: 'performance',
}