import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <div className="african-pattern"></div>
      <div className="header-container">
        <Link to="/" className="header-brand">
          <span className="brand-icon" role="img" aria-label="Michelin Guide Africa">&#9733;</span>
          <h1>Michelin Guide Africa</h1>
        </Link>
        <nav className="header-nav">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            Accueil
          </NavLink>
          <NavLink
            to="/restaurants"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Restaurants
          </NavLink>
          <NavLink
            to="/hotels"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            H&ocirc;tels
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
