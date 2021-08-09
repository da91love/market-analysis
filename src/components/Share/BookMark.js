import React, {useState, useContext} from 'react';
import { MDBIcon, MDBListGroup, MDBListGroupItem, MDBBadge
} from "mdbreact";
import _ from "lodash";
import axios from 'axios';
import {useTranslation} from "react-i18next";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSnackbar } from 'notistack';
import AuthContext from "../../contexts/AuthContext";
import CompareTgContext from '../../contexts/CompareTgContext';
import {KEY_NAME} from "../../consts/keyName";
import {MSG} from "../../consts/message";
import {API} from '../../consts/api';
import {SUCCESS} from "../../consts/alert";
import {ROUTER_URL} from "../../consts/router";

const BookMark = () => {
    const {userId, authId} = useContext(AuthContext);
    const { bookMark, setBookMark } = useContext(CompareTgContext);
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);

    const removeBookMarkBtn = (shareCode) => {
        // Remove target share from bookMark status
        const removedBookmark = [...bookMark]
        _.remove(removedBookmark, v => v[KEY_NAME.SHARE_CODE] == shareCode);
        setBookMark(removedBookmark)

        axios({
            method: API.PUT_BOOKMARK.METHOD,
            url: API.PUT_BOOKMARK.URL,
            data: {
                data: {
                    userId: userId,
                    authId: authId,
                    value: removedBookmark
                }
            }
        })
        .then(res => {
            if(res.data.status === "success" ) {
                enqueueSnackbar(`${MSG.REMOVE_BOOKMARK_TG}`, {variant: SUCCESS});
            } else {
            // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
            }
        })
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
                <span>{t('common.navigator.bookmark')}</span>
                <MDBBadge color="danger" className="ml-2">{bookMark.length}</MDBBadge>
            </Button>

            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">{t('common.navigator.bookmarkList')}</DialogTitle>
                <MDBListGroup>
                {bookMark.length > 0?
                    bookMark.map((v, i) => {
                        return (
                        <MDBListGroupItem>
                            <a className="mr-1" href={`${ROUTER_URL.SHARE_SEARCH}/${v.shareCode}/${v.shareName}`} target="_blank">
                                <span className="h3">{`${v.shareCode}:${v.shareName}`}</span>
                            </a>
                            <MDBIcon className="float-right red-text" onClick={e => {removeBookMarkBtn(v.shareCode)}} icon="times" />
                        </MDBListGroupItem>
                    )})
                    :<MDBListGroupItem>{t('common.navigator.noneSelectedBookmark')}</MDBListGroupItem>}
                </MDBListGroup>
            </Dialog>
        </div>
        );
}

export default BookMark;