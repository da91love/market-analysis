import React from 'react';
import Paper from '@material-ui/core/Paper';
import {useTranslation} from "react-i18next";

const NoModelSelected = () => {
   const { t } = useTranslation();

   return (
        <div>
            <Paper variant="outlined">
                <p className="text-center m-5">
                    <strong>{t('target.noneSelectedModel')}</strong>
                </p>
            </Paper>
        </div>
   )
   };

export default NoModelSelected;
