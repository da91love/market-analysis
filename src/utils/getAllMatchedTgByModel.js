import { MODELS } from '../consts/model';
import { KEY_NAME } from '../consts/keyName';
import ShareTargetModelEngine from '../utils/ShareTargetModelEngine';

const getAllMatchedTgByModel = (yearRawDataByShare ,quarterRawDataByShare, filter) => {

    const allMatchedTgByModel = {};

    const valueModelMatchedTg = ShareTargetModelEngine.getValueModel(quarterRawDataByShare, filter).map(v => v[KEY_NAME.SHARE_CODE]);
    const turnAroundModelMatchedTg = ShareTargetModelEngine.getTurnAroundModel(quarterRawDataByShare, filter).map(v => v[KEY_NAME.SHARE_CODE]);
    const cpGrowthModelMatchedTg = ShareTargetModelEngine.getCpGrowthModel(quarterRawDataByShare, filter).map(v => v[KEY_NAME.SHARE_CODE]);
    // const mrkgrowthModelMatchedTg = ShareTargetModelEngine.getMrkGrowthModel(quarterRawDataByMrk, filter).map(v => v[KEY_NAME.MARKET_CODE]);
    const collapseModelMatchedTg = ShareTargetModelEngine.getCollapseModel(yearRawDataByShare, filter).map(v => v[KEY_NAME.SHARE_CODE]);
    const blueChipModelMatchedTg = ShareTargetModelEngine.getBluechipModel(quarterRawDataByShare, filter).map(v => v[KEY_NAME.SHARE_CODE]);
    const capexGrowthModelMatchedTg = ShareTargetModelEngine.getInvstGrowthModel(quarterRawDataByShare, filter).map(v => v[KEY_NAME.SHARE_CODE]);

    for (const model of Object.values(MODELS)) {
        if (model === MODELS.VALUE) {
            allMatchedTgByModel[model] = valueModelMatchedTg;
        } else if (model == MODELS.TURNAROUND) {
            allMatchedTgByModel[model] = turnAroundModelMatchedTg;
        } else if (model === MODELS.CPGROWTH) {
            allMatchedTgByModel[model] = cpGrowthModelMatchedTg;
        } else if (model === MODELS.MRKGROWTH) {
            // allMatchedTgByModel[model] = mrkgrowthModelMatchedTg;
        } else if (model === MODELS.COLLAPSE) {
            allMatchedTgByModel[model] = collapseModelMatchedTg;
        } else if (model === MODELS.BLUECHIP) {
            allMatchedTgByModel[model] = blueChipModelMatchedTg;
        } else if (model === MODELS.CAPEXGROWTH) {
            allMatchedTgByModel[model] = capexGrowthModelMatchedTg;
        }
    }

    return allMatchedTgByModel
}

export default getAllMatchedTgByModel;