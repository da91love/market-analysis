import React, { useState } from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
  MDBFormInline, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,
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
      <MDBNavbar color="white" dark expand="md">
        <MDBNavbarBrand>
          <strong className="black-text">Business Analysis</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="#!" className="black-text">Field List</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!" className="black-text">Growing field</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!" className="black-text">Ranking</MDBNavLink>
            </MDBNavItem>

          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2 black-text">{t('lang')}</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="#!" onClick={() => { changeLang(LANG.EN); }}>EN</MDBDropdownItem>
                  <MDBDropdownItem href="#!" onClick={() => { changeLang(LANG.KO); }}>KO</MDBDropdownItem>
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
