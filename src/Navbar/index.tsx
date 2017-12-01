import * as React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item">
        <Link to='/'>
          <img src="./logo_modern.png"
              alt="Budghetto"
              width="34" height="34"/>
        </Link>
      </a>
      <button className="button navbar-burger" data-target="navbarContent">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div id="navbarContent" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">
            <Link to='/summary'>Summary</Link>
          </a>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;