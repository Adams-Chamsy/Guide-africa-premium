import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="african-pattern"></div>
      <div className="header-container">
        <Link to="/" className="header-brand">
          <span className="brand-icon" role="img" aria-label="Michelin Guide Africa">&#9733;</span>
          <h1>Michelin Guide Africa</h1>
        </Link>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`header-nav ${menuOpen ? 'nav-open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end onClick={() => setMenuOpen(false)}>
            Accueil
          </NavLink>
          <NavLink to="/restaurants" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            Restaurants
          </NavLink>
          <NavLink to="/hotels" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            H&ocirc;tels
          </NavLink>
          <NavLink to="/destinations" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            Destinations
          </NavLink>
          <NavLink to="/atlas" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            Atlas Culinaire
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
