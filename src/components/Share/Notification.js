import React, {useState, useContext} from 'react';
import { MDBIcon, MDBListGroup, MDBListGroupItem,
} from "mdbreact";
import _ from "lodash";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Badge from '@material-ui/core/Badge';
import { useSnackbar } from 'notistack';
import SyncStatus from '../../utils/SyncStatus';
import CompareTgContext from '../../contexts/CompareTgContext';
import {STRG_KEY_NAME} from "../../consts/localStorage";
import {KEY_NAME} from "../../consts/keyName";
import {MSG} from "../../consts/message";
import {SUCCESS} from "../../consts/alert";

const Notification = () => {
  const { setCompareTg } = useContext(CompareTgContext);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const compareTg = JSON.parse(localStorage.getItem(STRG_KEY_NAME.COMPARE)) || [];

  const removeCompareTgBtn = (shareCode) => {
    _.remove(compareTg, v => v[KEY_NAME.SHARE_CODE] == shareCode);
    SyncStatus.set({
      storageKey: STRG_KEY_NAME.COMPARE, 
      statusSetter: setCompareTg, 
      data: compareTg
    });

    enqueueSnackbar(MSG.REMOVE_COMPARE_TG, {variant: SUCCESS});
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Button className="w-100 h-100" variant="outlined" color="primary" onClick={handleClickOpen}>
        Compare Target Shares
      </Button>


      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Compare Target List</DialogTitle>
          <MDBListGroup>
            {compareTg.length > 0?
                compareTg.map((v, i) => {
                  return (
                    <MDBListGroupItem>
                      {`${v.shareCode}:${v.shareName}`}
                      <MDBIcon className="float-right" onClick={e => {removeCompareTgBtn(v.shareCode)}} icon="times" />
                    </MDBListGroupItem>
                )})
              :<MDBListGroupItem>No data selected</MDBListGroupItem>}
          </MDBListGroup>
      </Dialog>
    </div>
    );
}

export default Notification;