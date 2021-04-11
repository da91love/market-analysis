import React, {useState, useContext} from 'react';
import { MDBIcon, MDBListGroup, MDBListGroupItem, MDBBadge
} from "mdbreact";
import _ from "lodash";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSnackbar } from 'notistack';
import SyncStatus from '../../utils/SyncStatus';
import CompareTgContext from '../../contexts/CompareTgContext';
import {STRG_KEY_NAME} from "../../consts/localStorage";
import {KEY_NAME} from "../../consts/keyName";
import {MSG} from "../../consts/message";
import {SUCCESS} from "../../consts/alert";
import {ROUTER_URL} from "../../consts/router";

const BookMark = () => {
  const { setBookMark } = useContext(CompareTgContext);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const bookMark = SyncStatus.get({storageKey: STRG_KEY_NAME.BOOKMARK}) || [];

  const removeBookMarkBtn = (shareCode) => {
    SyncStatus.remove({
      storageKey: STRG_KEY_NAME.BOOKMARK, 
      statusSetter: setBookMark, 
      data: bookMark,
      rmFunc: v => v[KEY_NAME.SHARE_CODE] == shareCode,
    });

    enqueueSnackbar(MSG.REMOVE_BOOKMARK_TG, {variant: SUCCESS});
  }

    const searchPageMoveHandler = (shareCode, shareName) => {
        const win = window.open(`${ROUTER_URL.SHARE_SEARCH}/${shareCode}/${shareName}`, "_blank");
        win.focus();
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
            <span>BookMark</span>
            <MDBBadge color="danger" className="ml-2">{bookMark.length}</MDBBadge>
        </Button>

        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Bookmark List</DialogTitle>
            <MDBListGroup>
            {bookMark.length > 0?
                bookMark.map((v, i) => {
                    return (
                    <MDBListGroupItem>
                        <a className="mr-1" href={`${ROUTER_URL.SHARE_SEARCH}/${v.shareCode}/${v.shareName}`} target="_blank">
                            <span className="h3">{`${v.shareCode}:${v.shareName}`}</span>
                        </a>
                        <MDBIcon className="float-right" onClick={e => {removeBookMarkBtn(v.shareCode)}} icon="times" />
                    </MDBListGroupItem>
                )})
                :<MDBListGroupItem>No data selected</MDBListGroupItem>}
            </MDBListGroup>
        </Dialog>
    </div>
    );
}

export default BookMark;