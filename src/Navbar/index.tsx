import * as React from 'react';
import glamorous from 'glamorous';
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
  color: '#FFF',
  ':hover': {
    background: 'transparent !important',
    color: '#AAA !important',
  },
  ':active': {
    color: '#333 !important',
  },
})

const Navbar = () => (
  <NavbarElement className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <NavbarLinkElement className="navbar-item" href={paths.home}>
        <div style={{display: 'flex'}}>
          <img src="./logo_round.png"
              alt="Budghetto"
              width="auto" height="100%"/>
          <NavbarBrandTitle>BUDGHETTO</NavbarBrandTitle>
        </div>
      </NavbarLinkElement>
      <button className="button navbar-burger is-black" data-target="navbarContent">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div id="navbarContent" className="navbar-menu">
        <div className="navbar-start">
          <NavbarLinkElement className="navbar-item" href={paths.accounts}>
            Accounts
          </NavbarLinkElement>
        </div>
      </div>
    </div>
  </NavbarElement>
);

export default Navbar;