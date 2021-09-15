import ShareTargetModelEngine from './ShareTargetModelEngine';
import {MODELS} from './../consts/model';
import axios from 'axios';
import { API } from '../consts/api';

const getModelData = (model, country, filter) => {
   let tgData = null;

   axios({
      method: API.POST_MODEL.METHOD,
      url: API.POST_MODEL.URL,
      data: {
         data: {
            model:model,
            country: country,
            filter: filter
         }
      }
   })
   .then(res => {
      if(res.data.status === "success" ) {
         tgData = res.data.payload.value;
      } else {
      // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
      }
   });

     return tgData;
}

export default getModelData;