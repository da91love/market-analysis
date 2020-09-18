import React, { useState } from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
  MDBFormInline, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon,
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LANG } from '../../consts/common';

const Header = props => {
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState({
    isOpen: false,
  });

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const changeLang = lang => {
    i18n.changeLanguage(lang);
  };

  return (
    <Router>
      <MDBNavbar color="white" dark expand="md" className="pl-5 pr-5">
        <MDBNavbarBrand>
          <strong className="black-text h2">{t('mainTitle')}</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
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
    </Router>
  );
};

export default Header;
