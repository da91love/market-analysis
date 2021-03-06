import ShareTargetModelEngine from './ShareTargetModelEngine';
import {MODELS} from './../consts/model';

const getModelData = (model, yearRawDataByShare, quarterRawDataByShare, filterStatus) => {
    let tgData = null;

    if (model === MODELS.VALUE) {
        tgData = ShareTargetModelEngine.getValueModel(quarterRawDataByShare, filterStatus);
     } else if (model == MODELS.TURNAROUND) {
        tgData = ShareTargetModelEngine.getTurnAroundModel(quarterRawDataByShare, filterStatus);
     } else if (model === MODELS.CPGROWTH) {
        tgData = ShareTargetModelEngine.getCpGrowthModel(quarterRawDataByShare, filterStatus);
     } else if (model === MODELS.MRKGROWTH) {
        tgData = ShareTargetModelEngine.getCpGrowthModel(quarterRawDataByShare, filterStatus);
     } else if (model === MODELS.COLLAPSE) {
        tgData = ShareTargetModelEngine.getCollapseModel(yearRawDataByShare, filterStatus);
     } else if (model === MODELS.BLUECHIP) {
        tgData = ShareTargetModelEngine.getBluechipModel(quarterRawDataByShare, filterStatus);
     } else if (model === MODELS.INVGROWTH) {
        tgData = ShareTargetModelEngine.getInvstGrowthModel(quarterRawDataByShare, filterStatus);
     }

     return tgData;
}

export default getModelData;