import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import SearchAutocomplete from './SearchAutocomplete';
import NotificationBell from './NotificationBell';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import {
  FiHome, FiSearch, FiUser, FiLogIn, FiChevronDown,
  FiHeart, FiEye, FiCalendar, FiFolder, FiShield, FiLogOut,
  FiMap, FiStar, FiBookOpen, FiGrid, FiUsers, FiLayers,
  FiCompass, FiTruck
} from 'react-icons/fi';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const dropdownRef = useRef(null);
  const moreRef = useRef(null);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setMoreOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hide header on scroll down, show on scroll up
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate('/');
  };

  // Primary nav links (always visible on desktop)
  const primaryLinks = [
    { to: '/', label: t('nav.home'), icon: FiHome, end: true },
    { to: '/restaurants', label: t('nav.restaurants') },
    { to: '/hotels', label: t('nav.hotels') },
    { to: '/destinations', label: t('nav.destinations') },
    { to: '/carte', label: t('nav.map'), icon: FiMap },
  ];

  // Secondary nav links (in "More" dropdown on desktop, visible in mobile menu)
  const secondaryLinks = [
    { to: '/atlas', label: t('nav.atlas'), icon: FiBookOpen },
    { to: '/classements', label: t('nav.rankings'), icon: FiStar },
    { to: '/blog', label: t('nav.blog'), icon: FiGrid },
    { to: '/evenements', label: t('nav.events'), icon: FiCalendar },
    { to: '/comparateur', label: t('nav.compare'), icon: FiLayers },
    { to: '/communaute', label: t('nav.community'), icon: FiUsers },
    { to: '/activites', label: t('nav.activities'), icon: FiCompass },
    { to: '/voitures', label: t('nav.carRental'), icon: FiTruck },
  ];

  return (
    <header className={`app-header ${hidden ? 'header-hidden' : ''}`}>
      <a href="#main-content" className="skip-to-content">
        Aller au contenu principal
      </a>
      <div className="header-container">
        {/* Brand */}
        <Link to="/" className="header-brand">
          <span className="brand-icon" role="img" aria-label="Guide Africa">&#9733;</span>
          <h1>Guide Africa</h1>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Navigation */}
        <nav className={`header-nav ${menuOpen ? 'nav-open' : ''}`} role="navigation" aria-label="Navigation principale">
          {/* Primary links */}
          <div className="nav-primary">
            {primaryLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={link.end}
              >
                {link.label}
              </NavLink>
            ))}

            {/* More dropdown (desktop) */}
            <div className="nav-more-wrapper" ref={moreRef}>
              <button
                className={`nav-link nav-more-btn ${secondaryLinks.some(l => location.pathname.startsWith(l.to)) ? 'active' : ''}`}
                onClick={() => setMoreOpen(!moreOpen)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                Plus <FiChevronDown size={14} className={`more-chevron ${moreOpen ? 'rotated' : ''}`} />
              </button>
              {moreOpen && (
                <div className="nav-more-dropdown">
                  {secondaryLinks.map(link => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) => `nav-more-item ${isActive ? 'active' : ''}`}
                      onClick={() => setMoreOpen(false)}
                    >
                      {link.icon && <link.icon size={16} />}
                      <span>{link.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile: show ALL links in flat list */}
          <div className="nav-mobile-all">
            {primaryLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-mobile-link ${isActive ? 'active' : ''}`}
                end={link.end}
              >
                {link.icon && <link.icon size={18} />}
                <span>{link.label}</span>
              </NavLink>
            ))}
            <div className="nav-mobile-divider"></div>
            {secondaryLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-mobile-link ${isActive ? 'active' : ''}`}
              >
                {link.icon && <link.icon size={18} />}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Actions group */}
          <div className="header-actions">
            <button
              className="header-action-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label={t('nav.search')}
              title={t('nav.search')}
            >
              <FiSearch size={18} />
            </button>
            {searchOpen && (
              <div className="header-search-dropdown">
                <SearchAutocomplete onClose={() => setSearchOpen(false)} />
              </div>
            )}

            <ThemeToggle />
            <LanguageSwitcher />

            {isAuthenticated && <NotificationBell />}

            {isAuthenticated ? (
              <div className="user-menu" ref={dropdownRef}>
                <button
                  className="user-menu-trigger"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-label="Menu utilisateur"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.prenom}&background=1B6B4A&color=F5F0E8`}
                    alt=""
                    className="user-avatar"
                  />
                  <span className="user-name">{user.prenom}</span>
                  <FiChevronDown size={14} className={`user-chevron ${dropdownOpen ? 'rotated' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="user-dropdown" role="menu">
                    <Link to="/profil" role="menuitem">
                      <FiUser size={16} /> {t('user.profile')}
                    </Link>
                    <Link to="/mes-favoris" role="menuitem">
                      <FiHeart size={16} /> {t('user.favorites')}
                    </Link>
                    <Link to="/mes-visites" role="menuitem">
                      <FiEye size={16} /> {t('user.visits')}
                    </Link>
                    <Link to="/mes-reservations" role="menuitem">
                      <FiCalendar size={16} /> {t('user.reservations')}
                    </Link>
                    <Link to="/mes-collections" role="menuitem">
                      <FiFolder size={16} /> {t('user.collections')}
                    </Link>
                    <div className="dropdown-divider"></div>
                    {user.role === 'ADMIN' && (
                      <>
                        <Link to="/admin" role="menuitem">
                          <FiShield size={16} /> {t('user.admin')}
                        </Link>
                        <div className="dropdown-divider"></div>
                      </>
                    )}
                    <button onClick={handleLogout} role="menuitem">
                      <FiLogOut size={16} /> {t('auth.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/connexion" className="btn-connexion">
                <FiLogIn size={16} />
                <span>{t('nav.login')}</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
