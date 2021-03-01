import {KEY_NAME} from './keyName';

export const MODELS = {
    VALUE: 'value',
    TURNAROUND: 'turnaround',
    GROWTH: 'growth',
    COLLAPSE: 'collapse',
    BLUECHIP: 'bluechip'
}

export const MODEL_NAME = {
    VALUE: 'Value Stock Model',
    TURNAROUND: 'Turnaround Stock Model',
    GROWTH: 'Growth Stock Model',
    COLLAPSE: 'Collapse Stock Model',
    BLUECHIP: 'Bluechip Stock Model'
}

export const MODEL_TABLE_COL = {
    VALUE: [KEY_NAME.PERIOD, KEY_NAME.SHARE_NAME, KEY_NAME.MARKET_NAME, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL, 'graph'],
    TURNAROUND: [KEY_NAME.PERIOD, KEY_NAME.SHARE_NAME, KEY_NAME.MARKET_NAME, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL, 'graph'],
    GROWTH: [KEY_NAME.PERIOD, KEY_NAME.SHARE_NAME, KEY_NAME.MARKET_NAME, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL, 'graph'],
    COLLAPSE: [KEY_NAME.PERIOD, KEY_NAME.SHARE_NAME, KEY_NAME.MARKET_NAME, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL, 'graph'],
    BLUECHIP: [KEY_NAME.PERIOD, KEY_NAME.SHARE_NAME, KEY_NAME.MARKET_NAME, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL, 'graph']
}

export const GRAPH_ANALYSIS_COL = [
    "시가총액",
    "매출액",
    "영업이익",
    "당기순이익(지배)",
    "PSR(배)",
    "POR(배)",
    "PER(배)",
    "PCR(배)",
    "PBR(배)",
]