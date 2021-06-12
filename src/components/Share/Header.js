import React, { useState, useContext } from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
  MDBFormInline, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon,
} from 'mdbreact';
import _ from "lodash";
import i18n from '../../i18n';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router'
import ShareDataContext from "../../contexts/ShareDataContext";
import SearchInput from '../Share/SearchInput';
import { SHARE_OR_MARKET, LANG } from '../../consts/common';
import { KEY_NAME, OTHER_KEY_NAME } from '../../consts/keyName';
import { STRG_KEY_NAME } from '../../consts/localStorage';
import { ROUTER_URL } from '../../consts/router';

const Header = (props) => {
  const {rawDataByShare, rawDataByMrk} = props;
  const {isInitDataLoaded} = useContext(ShareDataContext);
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Ruturn nothing if init data is loaded
  if (!isInitDataLoaded) {
    return null
  }

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const changeLang = lang => {
    localStorage.setItem(STRG_KEY_NAME.LANG, lang);
    i18n.changeLanguage(lang);
  };

  const rawData2ShareSearchData = (rawDataByS) => {
    const result = [];
    for (const shareCode in rawDataByS) {
        const shareName = _.last(rawDataByS[shareCode])[KEY_NAME.SHARE_NAME];
        result.push({
            [OTHER_KEY_NAME.TYPE]: SHARE_OR_MARKET.SHARE,
            [OTHER_KEY_NAME.TARGET]: `${shareCode}:${shareName}`,
            [KEY_NAME.SHARE_CODE]: shareCode,
            [KEY_NAME.SHARE_NAME]: shareName
        });
    }

    return result;
  }

  const rawData2MrkSearchData = (rawDataByM) => {
    const result = [];
    for (const marketCode in rawDataByM) {
        const marketName = rawDataByM[marketCode][0][KEY_NAME.MARKET_NAME];
        result.push({
            [OTHER_KEY_NAME.TYPE]: SHARE_OR_MARKET.MARKET,
            [OTHER_KEY_NAME.TARGET]: `${marketCode}:${marketName}`,
            [KEY_NAME.MARKET_CODE]: marketCode,
            [KEY_NAME.MARKET_NAME]: marketName
        });
    }

    return result;
  }

  const options = rawData2ShareSearchData(rawDataByShare).concat(rawData2MrkSearchData(rawDataByMrk));

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
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default withRouter(Header);