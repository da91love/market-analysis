import React, {useState, useContext} from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon 
} from "mdbreact";
import _ from "lodash";
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
  const compareTg = JSON.parse(localStorage.getItem(STRG_KEY_NAME.COMPARE)) || [];

  const removeCompareTgBtn = (shareCode) => {
    _.remove(compareTg, v => v[KEY_NAME.SHARE_CODE] == shareCode);
    SyncStatus.remove({
      storageKey: STRG_KEY_NAME.COMPARE, 
      statusSetter: setCompareTg, 
      data: compareTg
    });

    enqueueSnackbar(MSG.REMOVE_COMPARE_TG, {variant: SUCCESS});
  }

  return (
    <div className="fixed-bottom mb-4" >
      <MDBDropdown className="float-right" dropup>
        <div className="mr-3">
          <Badge badgeContent={compareTg.length} color="error">
            <MDBDropdownToggle caret color="warning">
              Compare Target Shares
            </MDBDropdownToggle>
          </Badge>
        </div>
        <MDBDropdownMenu basic>
          {compareTg.length > 0?
            compareTg.map((v, i) => {
              return (
                <MDBDropdownItem>
                  {`${v.shareCode}:${v.shareName}`}
                  <MDBIcon className="float-right" onClick={e => {removeCompareTgBtn(v.shareCode)}} icon="times" />
                </MDBDropdownItem>
            )})
          :<MDBDropdownItem>No data selected</MDBDropdownItem>}

        </MDBDropdownMenu>
      </MDBDropdown>
    </div>
    );
}

export default Notification;