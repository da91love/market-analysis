import React, { useState, useContext } from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
  MDBFormInline, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon,
} from 'mdbreact';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router'
import ShareDataContext from "../../contexts/ShareDataContext";
import SearchInput from '../Share/SearchInput';
import { SHARE_OR_MARKET, LANG } from '../../consts/common';
import { KEY_NAME, OTHER_KEY_NAME } from '../../consts/keyName';
import { ROUTER_URL } from '../../consts/router';

const Header = (props) => {
  const {rawDataByShare, rawDataByMrk} = props;
  const {isInitDataLoaded} = useContext(ShareDataContext);
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Ruturn nothing if init data is loaded
  if (!isInitDataLoaded) {
    return null
  }

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const changeLang = lang => {
    i18n.changeLanguage(lang);
  };

  const rawData2ShareSearchData = (rawDataByS) => {
    const result = [];
    for (const shareCode in rawDataByS) {
        const shareName = rawDataByS[shareCode][0][KEY_NAME.SHARE_NAME];
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
        <strong className="black-text h2">{t('mainTitle')}</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav center>
          <MDBNavItem>
            <SearchInput options={options}/>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem active>
            <MDBNavLink to={ROUTER_URL.SHARE_SEARCH} className="black-text h4">{'SEARCH'}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to={ROUTER_URL.TARGET} className="black-text h4">{'TARGET'}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to={ROUTER_URL.MODEL_HIT} className="black-text h4">{'MODELHIT'}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to={ROUTER_URL.ALL_SHARES} className="black-text h4">{'ALLSHARES'}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to={ROUTER_URL.COMPARE} className="black-text h4">{'COMPARE'}</MDBNavLink>
          </MDBNavItem>

          {/* <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-none d-md-inline black-text h2">SERVICE</div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem href={ROUTER_URL.SHARE_SEARCH}>SEARCH</MDBDropdownItem>
                <MDBDropdownItem href={ROUTER_URL.TARGET}>TARGET</MDBDropdownItem>
                <MDBDropdownItem href={ROUTER_URL.MODEL_HIT}>MODELHIT</MDBDropdownItem>
                <MDBDropdownItem href={ROUTER_URL.ALL_SHARES} >ALLSHARES</MDBDropdownItem>
                <MDBDropdownItem href={ROUTER_URL.COMPARE}>COMPARE</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem> */}

          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <span className="mr-2 black-text h4"><MDBIcon icon="language" /></span>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem href="#!" onClick={() => { changeLang(LANG.EN); }}>English</MDBDropdownItem>
                <MDBDropdownItem href="#!" onClick={() => { changeLang(LANG.KO); }}>한국어</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default withRouter(Header);