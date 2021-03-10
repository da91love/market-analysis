import { MODELS } from '../consts/model';
import ShareTargetModelEngine from '../utils/ShareTargetModelEngine';

const getAllMatchedTgByModel = (yearRawDataByShare ,quarterRawDataByShare, quarterRawDataByMrk, filter) => {

    const allMatchedTgByModel = {};

    const valueModelMatchedTg = Object.keys(ShareTargetModelEngine.getValueModel(quarterRawDataByShare, filter));
    const turnAroundModelMatchedTg = Object.keys(ShareTargetModelEngine.getTurnAroundModel(quarterRawDataByShare, filter));
    const cpGrowthModelMatchedTg = Object.keys(ShareTargetModelEngine.getCpGrowthModel(quarterRawDataByShare, filter));
    const mrkgrowthModelMatchedTg = Object.keys(ShareTargetModelEngine.getMrkGrowthModel(quarterRawDataByMrk, filter));
    const collapseModelMatchedTg = Object.keys(ShareTargetModelEngine.getCollapseModel(yearRawDataByShare, filter));
    const blueChipModelMatchedTg = Object.keys(ShareTargetModelEngine.getBluechipModel(quarterRawDataByShare, filter));
    const invGrowthModelMatchedTg = Object.keys(ShareTargetModelEngine.getInvstGrowthModel(quarterRawDataByShare, filter));

    for (const model in MODELS) {
        if (model === MODELS.VALUE) {
            allMatchedTgByModel[model] = valueModelMatchedTg;
        } else if (model == MODELS.TURNAROUND) {
            allMatchedTgByModel[model] = turnAroundModelMatchedTg;
        } else if (model === MODELS.CPGROWTH) {
            allMatchedTgByModel[model] = cpGrowthModelMatchedTg;
        } else if (model === MODELS.MRKGROWTH) {
            allMatchedTgByModel[model] = mrkgrowthModelMatchedTg;
        } else if (model === MODELS.COLLAPSE) {
            allMatchedTgByModel[model] = collapseModelMatchedTg;
        } else if (model === MODELS.BLUECHIP) {
            allMatchedTgByModel[model] = blueChipModelMatchedTg;
        } else if (model === MODELS.INVGROWTH) {
            allMatchedTgByModel[model] = invGrowthModelMatchedTg;
        }
    }

    return allMatchedTgByModel
}

export default getAllMatchedTgByModel;