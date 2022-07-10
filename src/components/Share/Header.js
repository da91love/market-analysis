import React, { useState, useContext, useEffect } from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
  MDBFormInline, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon,
} from 'mdbreact';
import _ from "lodash";
import axios from 'axios';
import { useSnackbar } from 'notistack';

import i18n from '../../i18n';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router'
import ShareDataContext from "../../contexts/ShareDataContext";
import AuthContext from "../../contexts/AuthContext";
import SearchInput from '../Share/SearchInput';
import { SHARE_OR_MARKET, LANG } from '../../consts/common';
import { KEY_NAME, OTHER_KEY_NAME } from '../../consts/keyName';
import { STRG_KEY_NAME } from '../../consts/localStorage';
import { ROUTER_URL } from '../../consts/router';
import { API } from '../../consts/api';
import { MSG } from '../../consts/message';
import { SUCCESS, ERROR } from "../../consts/alert";
import SyncStatus from '../../utils/SyncStatus';

const Header = (props) => {
  const {authId, setAuthId} = useContext(AuthContext);
  const {country} = useContext(ShareDataContext);
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);


  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    if (authId) {
      axios({
        method: API.DELETE_AUTH.METHOD,
        url: API.DELETE_AUTH.URL,
        headers: {
          authId: authId,
        }
      })
      .then(res => {
        if(res.data.status === "success" ) {
          SyncStatus.set({
            storageKey: STRG_KEY_NAME.AUTH_ID,
            statusSetter: setAuthId,
            data: null
          });

          enqueueSnackbar(`${MSG.LOGOUT_SUCCESS}`, {variant: SUCCESS});
        } else {
          // enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
        }
      })  
    } else {

    }
  };

  const changeLang = lang => {
    localStorage.setItem(STRG_KEY_NAME.LANG, lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    //Get data from DB
        axios({
            method: API.GET_SHARE_MARKET_NAME.METHOD,
            url: API.GET_SHARE_MARKET_NAME.URL,
            params: {
              country: country,
            }
        })
        .then(res => {
            if(res.data.status === "success" ) {
                setOptions(res.data.payload.value);
            } else {
                enqueueSnackbar(`${MSG.LOGIN_FAIL}`, {variant: ERROR});
            }
        })  
  }, []);

  return (
    <MDBNavbar color="white" dark expand="md" className="fixed-top pl-5 pr-5 mb-5">
      <MDBNavbarBrand>
        <strong className="black-text h2">{t('common.mainTitle')}</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav center>
          <MDBNavItem>
            <SearchInput options={options}/>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <IconButton className="text-center" color="primary" component="span">
                  <MDBIcon icon="th" />
                </IconButton>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem href={ROUTER_URL.SHARE_SEARCH}>{t('common.header.shareSearch')}</MDBDropdownItem>
                <MDBDropdownItem href={ROUTER_URL.MARKET_SEARCH}>{t('common.header.marketSearch')}</MDBDropdownItem>
                <MDBDropdownItem href={ROUTER_URL.TARGET}>{t('common.header.target')}</MDBDropdownItem>
                <MDBDropdownItem href={ROUTER_URL.MODEL_HIT}>{t('common.header.modelHit')}</MDBDropdownItem>
                <MDBDropdownItem href={ROUTER_URL.ALL_SHARES} >{t('common.header.allShares')}</MDBDropdownItem>
                <MDBDropdownItem href={ROUTER_URL.COMPARE}>{t('common.header.compare')}</MDBDropdownItem>
                <MDBDropdownItem href={ROUTER_URL.MARKET_SUMMARY}>{t('common.header.marketSummary')}</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <IconButton className="text-center" color="primary" component="span">
                  <MDBIcon icon="globe" />
                </IconButton>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem href="#!" onClick={() => { changeLang(LANG.EN) }}>English</MDBDropdownItem>
                <MDBDropdownItem href="#!" onClick={() => { changeLang(LANG.KO) }}>한국어</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <IconButton className="text-center" color="primary" component="span">
                  <MDBIcon icon="user-alt" />
                </IconButton>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem hidden={authId?true:false} href={ROUTER_URL.LOGIN}>{t('common.header.login')}</MDBDropdownItem>
                <MDBDropdownItem hidden={!authId?true:false} onClick={() => { logoutHandler() }}>{t('common.header.logout')}</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default withRouter(Header);