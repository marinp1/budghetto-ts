import * as React from 'react';
import glamorous from 'glamorous';
import { Link } from 'react-router-dom';
import paths from '../paths';

const NavbarElement = glamorous.nav({
  background: '#000',
});

const NavbarBrandTitle = glamorous.h6({
  color: '#FFF',
  marginLeft: '10px',
  padding: '0.1rem 0',
  ':hover': {
    color: '#AAA',
  },
  ':active': {
    color: '#333',
  },
})

const NavbarLinkElement = glamorous.a({
  cursor: 'pointer',
  '& a': {
    color: '#FFF',
  },
  ':hover': {
    background: 'transparent !important',
    '& a': {
      color: '#AAA',
    },
  },
  ':active': {
    '& a': {
      color: '#333',
    },
  },
})

const Navbar = () => (
  <NavbarElement className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <NavbarLinkElement className="navbar-item">
        <Link to={paths.home}>
          <div style={{display: 'flex'}}>
            <img src="./logo_round.png"
                alt="Budghetto"
                width="auto" height="100%"/>
            <NavbarBrandTitle>BUDGHETTO</NavbarBrandTitle>
          </div>
        </Link>
      </NavbarLinkElement>
      <button className="button navbar-burger is-black" data-target="navbarContent">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div id="navbarContent" className="navbar-menu">
        <div className="navbar-start">
          <NavbarLinkElement className="navbar-item">
            <Link to={paths.accounts}>Accounts</Link>
          </NavbarLinkElement>
        </div>
      </div>
    </div>
  </NavbarElement>
);

export default Navbar;