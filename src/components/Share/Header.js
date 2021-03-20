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
          <MDBNavItem active>
            <MDBNavLink to="#!" className="black-text h4">{t('marketList')}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#!" className="black-text h4">{t('growingMarket')}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#!" className="black-text h4">{t('ranking')}</MDBNavLink>
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