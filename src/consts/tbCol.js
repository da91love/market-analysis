import {KEY_NAME, OTHER_KEY_NAME} from './keyName';
import {MODELS, VLT_MODELS} from './model';
import {F_STATUS_TYPE} from './common';

export const BY_SHARE_ALL_TABLE_COL_TYPE = [
    KEY_NAME.PERIOD,
    KEY_NAME.SHARE_NAME,
    KEY_NAME.SHARE_CODE,
    KEY_NAME.MARKET_NAME,
    KEY_NAME.MARKET_CODE,
    KEY_NAME.EV,
    KEY_NAME.MV,
    KEY_NAME.SALES,
    KEY_NAME.OP,
    KEY_NAME.OP_PUB,
    KEY_NAME.DPRCT,
    KEY_NAME.EBITDA,
    KEY_NAME.OP_CNTN,
    KEY_NAME.NP,
    KEY_NAME.NP_CTRL,
    KEY_NAME.NP_NCTRL,
    KEY_NAME.ASST,
    KEY_NAME.LBLT,
    KEY_NAME.EQT,
    KEY_NAME.EQT_CTRL,
    KEY_NAME.EQT_NCTRL,
    KEY_NAME.CMM_STC,
    KEY_NAME.CFO,
    KEY_NAME.CFI,
    KEY_NAME.CFF,
    KEY_NAME.CAPEX,
    KEY_NAME.FCF,
    KEY_NAME.I_B_LBLT,
    KEY_NAME.OPM,
    KEY_NAME.NPM,
    KEY_NAME.ROE,
    KEY_NAME.ROA,
    KEY_NAME.LBLT_RATIO,
    KEY_NAME.EQT_RATIO,
    KEY_NAME.PSR,
    KEY_NAME.POR,
    KEY_NAME.EPS,
    KEY_NAME.PER,
    KEY_NAME.BPS,
    KEY_NAME.PBR,
    KEY_NAME.EV_EBITDA,
    KEY_NAME.CASH_DPS,
    KEY_NAME.DVD_YIELD,
    KEY_NAME.DVD_POT_RATIO,
    KEY_NAME.SHARE_NUM,
    OTHER_KEY_NAME.GRAPH,
]

export const ALL_SHARE_TABLE_COL = [
    KEY_NAME.PERIOD, 
    KEY_NAME.SHARE_NAME, 
    KEY_NAME.MARKET_NAME, 
    KEY_NAME.MV, 
    KEY_NAME.SALES, 
    KEY_NAME.OP, 
    KEY_NAME.NP_CTRL, 
    KEY_NAME.PER, 
    KEY_NAME.ROE, 
    OTHER_KEY_NAME.GRAPH
]

export const SEARCH_TABLE_COL = [
    KEY_NAME.EV,
    KEY_NAME.MV,
    KEY_NAME.SALES,
    KEY_NAME.OP,
    KEY_NAME.OP_PUB,
    KEY_NAME.DPRCT,
    KEY_NAME.AMRTZ,
    KEY_NAME.EBITDA,
    KEY_NAME.OP_CNTN,
    KEY_NAME.NP,
    KEY_NAME.NP_CTRL,
    KEY_NAME.NP_NCTRL,
    KEY_NAME.ASST,
    KEY_NAME.LBLT,
    KEY_NAME.EQT,
    KEY_NAME.EQT_CTRL,
    KEY_NAME.EQT_NCTRL,
    KEY_NAME.CMM_STC,
    KEY_NAME.CFO,
    KEY_NAME.CFI,
    KEY_NAME.CFF,
    KEY_NAME.CAPEX,
    KEY_NAME.FCF,
    KEY_NAME.I_B_LBLT,
    KEY_NAME.OPM,
    KEY_NAME.NPM,
    KEY_NAME.EPM,
    KEY_NAME.ROE,
    KEY_NAME.ROA,
    KEY_NAME.LBLT_RATIO,
    KEY_NAME.EQT_RATIO,
    KEY_NAME.PSR,
    KEY_NAME.POR,
    KEY_NAME.EPS,
    KEY_NAME.PER,
    KEY_NAME.BPS,
    KEY_NAME.PBR,
    KEY_NAME.EV_EBITDA,
    KEY_NAME.CASH_DPS,
    KEY_NAME.DVD_YIELD,
    KEY_NAME.DVD_POT_RATIO,
    KEY_NAME.SHARE_NUM
]

export const FINANCIAL_STATUS_TABLE_COL = {
    [F_STATUS_TYPE.PL]: [
        KEY_NAME.SALES,
        KEY_NAME.COST_OF_SALES,
        KEY_NAME.GROSS_PRFT,
        KEY_NAME.OP_EXP,
        KEY_NAME.OP,
        KEY_NAME.INT_INC,
        KEY_NAME.INT_EXP,
        KEY_NAME.N_OP_INC_EXP,
        KEY_NAME.MNR_INT_EARN,
        KEY_NAME.EARN_BF_TAX,
        KEY_NAME.INC_TAX_EXP,
        KEY_NAME.NP,
    ],
    [F_STATUS_TYPE.BS]: [
        KEY_NAME.ASST,
        KEY_NAME.CRT_ASST,
        KEY_NAME.INV,
        KEY_NAME.S_TERM_FIN_ASST,
        KEY_NAME.ACCNT_RCVB,
        KEY_NAME.CTRT_ASST,
        KEY_NAME.OTH_CRT_ASST,
        KEY_NAME.CASH_N_EQVLT,
        KEY_NAME.NCRT_ASST_H_F_S_DSPS_ASST,
        KEY_NAME.NCRT_ASST,
        KEY_NAME.TGB_ASST,
        KEY_NAME.INTGB_ASST,
        KEY_NAME.INV_PRPT,
        KEY_NAME.INVS,
        KEY_NAME.L_TERM_ACCNT_RCVB,
        KEY_NAME.D_INC_TAX_ASST,
        KEY_NAME.OTH_NCRT_ASST,
        KEY_NAME.LBLT,
        KEY_NAME.CRT_LBLT,
        KEY_NAME.S_TERM_BND,
        KEY_NAME.S_TERM_BRW,
        KEY_NAME.L_TERM_CRT_LBLT,
        KEY_NAME.CRT_FIN_LBLT,
        KEY_NAME.ACCNT_PABL,
        KEY_NAME.CRT_PRT_OF_PRV,
        KEY_NAME.CRT_DF_INC_TAX_LBLT,
        KEY_NAME.CTRT_LBLT,
        KEY_NAME.RTN_LBLT,
        KEY_NAME.OTH_CRT_LBLT,
        KEY_NAME.NCRT_LBLT,
        KEY_NAME.BND,
        KEY_NAME.L_TERM_BRW,
        KEY_NAME.NCRT_FIN_LBLT,
        KEY_NAME.L_TERM_ACCNT_PABL,
        KEY_NAME.NCRT_PRT_OF_PRV,
        KEY_NAME.D_INC_TAX_LBLT,
        KEY_NAME.OTH_NCRT_LBLT,
        KEY_NAME.EQT,
        KEY_NAME.CTRL_INT,
        KEY_NAME.CMM_STOCK,
        KEY_NAME.HBRD_SCRT,
        KEY_NAME.CPT_SPLS,
        KEY_NAME.CPT_ADJ,
        KEY_NAME.RTND_EARN,
        KEY_NAME.I_B_LBLT,
        KEY_NAME.NET_DEBT,
        KEY_NAME.CAPEX
    ],
    [F_STATUS_TYPE.CF]: [
        KEY_NAME.CFO,
        KEY_NAME.DPRCT,
        KEY_NAME.AMRTZ,
        KEY_NAME.CFI,
        KEY_NAME.CFI_IN,
        KEY_NAME.CFI_OUT,
        KEY_NAME.CFF,
        KEY_NAME.CFF_IN,
        KEY_NAME.CFF_OUT,
    ],
}

export const MODEL_TABLE_COL = {
    [MODELS.VALUE]: [KEY_NAME.PERIOD, KEY_NAME.SHARE_NAME, KEY_NAME.MARKET_NAME, KEY_NAME.MV, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL, KEY_NAME.PER, KEY_NAME.ROE, OTHER_KEY_NAME.GRAPH],
    [MODELS.TURNAROUND]: [KEY_NAME.PERIOD, KEY_NAME.SHARE_NAME, KEY_NAME.MARKET_NAME, KEY_NAME.MV, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.EBITDA, KEY_NAME.NP_CTRL, OTHER_KEY_NAME.GRAPH],
    [MODELS.CPGROWTH]: [KEY_NAME.PERIOD, KEY_NAME.SHARE_NAME, KEY_NAME.MARKET_NAME, KEY_NAME.MV, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL, OTHER_KEY_NAME.GRAPH],
    [MODELS.MRKGROWTH]: [KEY_NAME.PERIOD, KEY_NAME.MARKET_NAME, OTHER_KEY_NAME.NUM_OF_CP, KEY_NAME.MV, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL, OTHER_KEY_NAME.GRAPH],
    [MODELS.COLLAPSE]: [KEY_NAME.PERIOD, KEY_NAME.SHARE_NAME, KEY_NAME.MARKET_NAME, KEY_NAME.MV, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL, OTHER_KEY_NAME.GRAPH],
    [MODELS.BLUECHIP]: [KEY_NAME.PERIOD, KEY_NAME.SHARE_NAME, KEY_NAME.MARKET_NAME, KEY_NAME.MV, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL, KEY_NAME.PER, KEY_NAME.ROE, OTHER_KEY_NAME.GRAPH],
    [MODELS.INVGROWTH]: [KEY_NAME.PERIOD, KEY_NAME.SHARE_NAME, KEY_NAME.MARKET_NAME, KEY_NAME.MV, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL, OTHER_KEY_NAME.GRAPH],
}

export const MODEL_HIT_TABLE_COL = [KEY_NAME.PERIOD, KEY_NAME.SHARE_NAME, OTHER_KEY_NAME.SCORE, KEY_NAME.MV, MODELS.VALUE, MODELS.TURNAROUND, MODELS.CPGROWTH, MODELS.COLLAPSE, MODELS.BLUECHIP, OTHER_KEY_NAME.GRAPH]

export const MODEL_SEARCH_TABLE_COL = [
    KEY_NAME.PERIOD, KEY_NAME.SHARE_NAME, KEY_NAME.MARKET_NAME, KEY_NAME.MV, KEY_NAME.SALES, KEY_NAME.OP, KEY_NAME.NP_CTRL, OTHER_KEY_NAME.GRAPH
]

export const VLT_TABLE_COL =  ['현재', '시나리오1', '시나리오2', '시나리오3', '시나리오4', '시나리오5',  '시나리오6', '시나리오7', '시나리오8', '시나리오9', '시나리오10', '시나리오11', '시나리오12', '시나리오13', '시나리오14', '시나리오15', '시나리오16',  '시나리오17', '시나리오18', '시나리오19', '시나리오20'];

export const VLT_TABLE_LABEL = {
    [KEY_NAME.PER]: {
        [VLT_MODELS.PRICE]: {
            label: [KEY_NAME.PER, KEY_NAME.SHARE_NUM, KEY_NAME.SALES, KEY_NAME.NPM, KEY_NAME.NP_CTRL, KEY_NAME.EPS, OTHER_KEY_NAME.PRICE, KEY_NAME.MV],
            editable: [KEY_NAME.PER, KEY_NAME.SHARE_NUM, KEY_NAME.SALES, KEY_NAME.NPM]
        },
        [VLT_MODELS.PRFM]: {
            label: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, OTHER_KEY_NAME.PRICE, KEY_NAME.PER, KEY_NAME.EPS, KEY_NAME.NP_CTRL, KEY_NAME.NPM, KEY_NAME.SALES],
            editable: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, KEY_NAME.PER, KEY_NAME.NPM]
        },
        [VLT_MODELS.MLTP]: {
            label: [OTHER_KEY_NAME.PRICE, KEY_NAME.SALES, KEY_NAME.NPM, KEY_NAME.NP_CTRL, KEY_NAME.SHARE_NUM, KEY_NAME.MV, KEY_NAME.EPS, KEY_NAME.PER],
            editable: [OTHER_KEY_NAME.PRICE, KEY_NAME.SHARE_NUM, KEY_NAME.SALES, KEY_NAME.NPM]
        },
        [VLT_MODELS.MLTP]: {
            label: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, OTHER_KEY_NAME.PRICE, KEY_NAME.SALES, KEY_NAME.NPM, KEY_NAME.NP_CTRL, KEY_NAME.EPS, KEY_NAME.PER],
            editable: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, KEY_NAME.SALES, KEY_NAME.NPM]
        }
    },
    [KEY_NAME.POR]: {
        [VLT_MODELS.PRICE]: {
            label: [KEY_NAME.POR, KEY_NAME.SHARE_NUM, KEY_NAME.SALES, KEY_NAME.OPM, KEY_NAME.OP, KEY_NAME.OPS, OTHER_KEY_NAME.PRICE, KEY_NAME.MV],
            editable: [KEY_NAME.POR, KEY_NAME.SHARE_NUM, KEY_NAME.SALES, KEY_NAME.OPM]
        },
        [VLT_MODELS.PRFM]: {
            label: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, OTHER_KEY_NAME.PRICE, KEY_NAME.POR, KEY_NAME.OPS, KEY_NAME.OP, KEY_NAME.OPM, KEY_NAME.SALES],
            editable: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, KEY_NAME.POR, KEY_NAME.OPM]
        },
        [VLT_MODELS.MLTP]: {
            label: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, OTHER_KEY_NAME.PRICE, KEY_NAME.SALES, KEY_NAME.OPM, KEY_NAME.OP, KEY_NAME.OPS, KEY_NAME.POR],
            editable: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, KEY_NAME.SALES, KEY_NAME.OPM]
        },
    },
    [KEY_NAME.PSR]: {
        [VLT_MODELS.PRICE]: {
            label: [KEY_NAME.PSR, KEY_NAME.SHARE_NUM, KEY_NAME.SALES, KEY_NAME.SPS, OTHER_KEY_NAME.PRICE, KEY_NAME.MV],
            editable: [KEY_NAME.PSR, KEY_NAME.SHARE_NUM, KEY_NAME.SALES]
        },
        [VLT_MODELS.PRFM]: {
            label: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, OTHER_KEY_NAME.PRICE, KEY_NAME.PSR, KEY_NAME.SPS, KEY_NAME.SALES],
            editable: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, KEY_NAME.PSR]
        },
        [VLT_MODELS.MLTP]: {
            label: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, OTHER_KEY_NAME.PRICE, KEY_NAME.SALES, KEY_NAME.SPS, KEY_NAME.PSR],
            editable: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, KEY_NAME.SALES]
        },
    },
    [KEY_NAME.PBR]: {
        [VLT_MODELS.PRICE]: {
            label: [KEY_NAME.PBR, KEY_NAME.SHARE_NUM, KEY_NAME.EQT_CTRL, KEY_NAME.BPS, OTHER_KEY_NAME.PRICE, KEY_NAME.MV],
            editable: [KEY_NAME.PBR, KEY_NAME.SHARE_NUM, KEY_NAME.EQT_CTRL]
        },
        [VLT_MODELS.PRFM]: {
            label: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, OTHER_KEY_NAME.PRICE, KEY_NAME.PBR, KEY_NAME.BPS, KEY_NAME.EQT_CTRL],
            editable: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, KEY_NAME.PBR]
        },
        [VLT_MODELS.MLTP]: {
            label: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, OTHER_KEY_NAME.PRICE, KEY_NAME.EQT_CTRL, KEY_NAME.BPS, KEY_NAME.PBR],
            editable: [KEY_NAME.MV, KEY_NAME.SHARE_NUM, KEY_NAME.EQT_CTRL]
        },
    },
    [KEY_NAME.EV_EBITDA]: {
        [VLT_MODELS.PRICE]: {
            label: [KEY_NAME.EV_EBITDA, KEY_NAME.SALES, KEY_NAME.EPM, KEY_NAME.EBITDA, KEY_NAME.EV, KEY_NAME.I_B_LBLT, KEY_NAME.MV, KEY_NAME.SHARE_NUM, OTHER_KEY_NAME.PRICE],
            editable: [KEY_NAME.EV_EBITDA, KEY_NAME.SALES, KEY_NAME.EPM, KEY_NAME.I_B_LBLT, KEY_NAME.SHARE_NUM]
        }
    },
}