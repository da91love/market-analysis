import React, { useState } from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
  MDBFormInline, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon,
} from 'mdbreact';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router'
import SearchInput from '../Share/SearchInput';
import rawData2SearchData from '../../utils/rawData2SearchData';
import { LANG } from '../../consts/common';
import { ROUTER_URL } from '../../consts/rounter';

const Header = (props) => {
  const {quarterRawData} = props;
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const changeLang = lang => {
    i18n.changeLanguage(lang);
  };

  return (
    <MDBNavbar color="white" dark expand="md" className="fixed-top pl-5 pr-5 mb-5">
      <MDBNavbarBrand>
        <strong className="black-text h2">{t('mainTitle')}</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav center>
          <MDBNavItem>
            {quarterRawData?<SearchInput options={rawData2SearchData(quarterRawData)}/>:null}
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          {/* <MDBNavItem active>
            <MDBNavLink to={ROUTER_URL.SEARCH} className="black-text h4">{'SEARCH'}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to={ROUTER_URL.TARGETING} className="black-text h4">{'TARGET'}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to={ROUTER_URL.MODEL_HIT} className="black-text h4">{'MODELHIT'}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to={ROUTER_URL.ALL_SHARES} className="black-text h4">{'ALLSHARES'}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to={ROUTER_URL.COMPARE} className="black-text h4">{'COMPARE'}</MDBNavLink>
          </MDBNavItem> */}

          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-none d-md-inline black-text h2">SERVICE</div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem href={ROUTER_URL.SEARCH}>SEARCH</MDBDropdownItem>
                <MDBDropdownItem href={ROUTER_URL.TARGETING}>TARGET</MDBDropdownItem>
                <MDBDropdownItem href={ROUTER_URL.MODEL_HIT}>MODELHIT</MDBDropdownItem>
                <MDBDropdownItem href={ROUTER_URL.ALL_SHARES} >ALLSHARES</MDBDropdownItem>
                <MDBDropdownItem href={ROUTER_URL.COMPARE}>COMPARE</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

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