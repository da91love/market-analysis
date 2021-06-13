import _ from "lodash";
import {KEY_NAME, OTHER_KEY_NAME} from '../consts/keyName';
import {VLT_MODELS} from '../consts/model';
import {NUM_UNIT} from '../consts/common';

const vltCalc = (result, mltpIdc, vltModel) => {
    if (mltpIdc===KEY_NAME.PER) {
        if (vltModel===VLT_MODELS.PRICE) {
            result[KEY_NAME.NP_CTRL] = _.round(result[KEY_NAME.SALES]*(result[KEY_NAME.NPM]/100), 2);
            result[KEY_NAME.EPS] = _.round((result[KEY_NAME.NP_CTRL]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[OTHER_KEY_NAME.PRICE] = _.round(result[KEY_NAME.PER]*result[KEY_NAME.EPS], 2);
            result[KEY_NAME.MV] = _.round((result[OTHER_KEY_NAME.PRICE]*result[KEY_NAME.SHARE_NUM])/NUM_UNIT.OK, 2);
        } else if (vltModel===VLT_MODELS.PRFM) {
            result[OTHER_KEY_NAME.PRICE] = _.round((result[KEY_NAME.MV]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[KEY_NAME.EPS] =_.round(result[OTHER_KEY_NAME.PRICE]/result[KEY_NAME.PER], 2);
            result[KEY_NAME.NP_CTRL] = _.round(result[KEY_NAME.MV]/result[KEY_NAME.PER], 2);
            result[KEY_NAME.SALES] = _.round(result[KEY_NAME.NP_CTRL]/(result[KEY_NAME.NPM]/100), 2);
        } else if (vltModel===VLT_MODELS.MLTP) {
            result[OTHER_KEY_NAME.PRICE] = _.round((result[KEY_NAME.MV]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[KEY_NAME.NP_CTRL] = _.round(result[KEY_NAME.SALES]*(result[KEY_NAME.NPM]/100), 2);
            result[KEY_NAME.EPS] = _.round((result[KEY_NAME.NP_CTRL]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[KEY_NAME.PER] = _.round(result[KEY_NAME.MV]/result[KEY_NAME.NP_CTRL], 2);
        }
    } else if (mltpIdc===KEY_NAME.POR) {
        if (vltModel===VLT_MODELS.PRICE) {
            result[KEY_NAME.OP] = _.round(result[KEY_NAME.SALES]*(result[KEY_NAME.OPM]/100), 2);
            result[OTHER_KEY_NAME.OPS] = _.round((result[KEY_NAME.OP]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[OTHER_KEY_NAME.PRICE] = _.round(result[KEY_NAME.POR]*result[OTHER_KEY_NAME.OPS], 2);
            result[KEY_NAME.MV] = _.round((result[OTHER_KEY_NAME.PRICE]*result[KEY_NAME.SHARE_NUM])/NUM_UNIT.OK, 2);
        } else if (vltModel===VLT_MODELS.PRFM) {
            result[OTHER_KEY_NAME.PRICE] = _.round((result[KEY_NAME.MV]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[OTHER_KEY_NAME.OPS] =_.round(result[OTHER_KEY_NAME.PRICE]/result[KEY_NAME.POR], 2);
            result[KEY_NAME.OP] = _.round(result[KEY_NAME.MV]/result[KEY_NAME.POR], 2);
            result[KEY_NAME.SALES] = _.round(result[KEY_NAME.OP]/(result[KEY_NAME.OPM]/100), 2);
        } else if (vltModel===VLT_MODELS.MLTP) {
            result[OTHER_KEY_NAME.PRICE] = _.round((result[KEY_NAME.MV]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[KEY_NAME.OP] = _.round(result[KEY_NAME.SALES]*(result[KEY_NAME.OPM]/100), 2);
            result[OTHER_KEY_NAME.OPS] = _.round((result[KEY_NAME.OP]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[KEY_NAME.POR] = _.round(result[KEY_NAME.MV]/result[KEY_NAME.OP], 2);
        }
    } else if (mltpIdc===KEY_NAME.PSR) {
        if (vltModel===VLT_MODELS.PRICE) {
            result[OTHER_KEY_NAME.SPS] = _.round((result[KEY_NAME.SALES]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[OTHER_KEY_NAME.PRICE] = _.round(result[KEY_NAME.PSR]*result[OTHER_KEY_NAME.SPS], 2);
            result[KEY_NAME.MV] = _.round((result[OTHER_KEY_NAME.PRICE]*result[KEY_NAME.SHARE_NUM])/NUM_UNIT.OK, 2);
        } else if (vltModel===VLT_MODELS.PRFM) {
            result[OTHER_KEY_NAME.PRICE] = _.round((result[KEY_NAME.MV]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[OTHER_KEY_NAME.SPS] =_.round(result[OTHER_KEY_NAME.PRICE]/result[KEY_NAME.PSR], 2);
            result[KEY_NAME.SALES] = _.round(result[KEY_NAME.MV]/(result[KEY_NAME.PSR]/100), 2);
        } else if (vltModel===VLT_MODELS.MLTP) {
            result[OTHER_KEY_NAME.PRICE] = _.round((result[KEY_NAME.MV]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[OTHER_KEY_NAME.SPS] = _.round((result[KEY_NAME.SALES]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[KEY_NAME.PSR] = _.round(result[KEY_NAME.MV]/result[KEY_NAME.SALES], 2);
        }
    } else if (mltpIdc===KEY_NAME.PBR) {
        if (vltModel===VLT_MODELS.PRICE) {
            result[KEY_NAME.BPS] = _.round((result[KEY_NAME.EQT_CTRL]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[OTHER_KEY_NAME.PRICE] = _.round(result[KEY_NAME.PBR]*result[KEY_NAME.BPS], 2);
            result[KEY_NAME.MV] = _.round((result[OTHER_KEY_NAME.PRICE]*result[KEY_NAME.SHARE_NUM])/NUM_UNIT.OK, 2);
        } else if (vltModel===VLT_MODELS.PRFM) {
            result[OTHER_KEY_NAME.PRICE] = _.round((result[KEY_NAME.MV]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[KEY_NAME.BPS] =_.round(result[OTHER_KEY_NAME.PRICE]/result[KEY_NAME.PBR], 2);
            result[KEY_NAME.EQT_CTRL] = _.round(result[KEY_NAME.MV]/(result[KEY_NAME.PBR]/100), 2);
        } else if (vltModel===VLT_MODELS.MLTP) {
            result[OTHER_KEY_NAME.PRICE] = _.round((result[KEY_NAME.MV]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[KEY_NAME.BPS] = _.round((result[KEY_NAME.EQT_CTRL]*NUM_UNIT.OK)/result[KEY_NAME.SHARE_NUM], 2);
            result[KEY_NAME.PBR] = _.round(result[KEY_NAME.MV]/result[KEY_NAME.EQT_CTRL], 2);
        }     
    }

    return result;
}

export default vltCalc;