import React from 'react';
import Paper from '@material-ui/core/Paper';

const NoModelSelected = () => {
   return (
        <div>
            <Paper variant="outlined">
                <p className="text-center m-5">
                    <strong>Please select a model</strong>
                </p>
            </Paper>
        </div>
   )
   };

export default NoModelSelected;
