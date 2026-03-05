import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiInstagram, FiTwitter, FiFacebook, FiMail, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-logo">
              <span className="brand-monogram" role="img" aria-hidden="true">GA</span>
              <span className="footer-brand-text">GUIDE AFRICA</span>
            </div>
            <p className="footer-description">{t('footer.description')}</p>
            {/* Social links - TODO: replace with real URLs when available */}
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Instagram" rel="noopener noreferrer" onClick={(e) => e.preventDefault()}>
                <FiInstagram size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Twitter" rel="noopener noreferrer" onClick={(e) => e.preventDefault()}>
                <FiTwitter size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Facebook" rel="noopener noreferrer" onClick={(e) => e.preventDefault()}>
                <FiFacebook size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Email" rel="noopener noreferrer" onClick={(e) => e.preventDefault()}>
                <FiMail size={18} />
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.navigation')}</h4>
            <ul className="footer-links">
              <li><Link to="/restaurants">{t('nav.restaurants')}</Link></li>
              <li><Link to="/hotels">{t('nav.hotels')}</Link></li>
              <li><Link to="/destinations">{t('nav.destinations')}</Link></li>
              <li><Link to="/carte">{t('nav.map')}</Link></li>
              <li><Link to="/classements">{t('nav.rankings')}</Link></li>
              <li><Link to="/activites">{t('nav.activities')}</Link></li>
              <li><Link to="/voitures">{t('nav.carRental')}</Link></li>
            </ul>
          </div>

          {/* Discover column */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.discover')}</h4>
            <ul className="footer-links">
              <li><Link to="/atlas">{t('nav.atlas')}</Link></li>
              <li><Link to="/blog">{t('nav.blog')}</Link></li>
              <li><Link to="/evenements">{t('nav.events')}</Link></li>
              <li><Link to="/comparateur">{t('nav.compare')}</Link></li>
              <li><Link to="/communaute">{t('nav.community')}</Link></li>
            </ul>
          </div>

          {/* Legal column */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.legal')}</h4>
            <ul className="footer-links">
              <li><Link to="/confidentialite">{t('footer.privacy')}</Link></li>
              <li><Link to="/conditions">{t('footer.terms')}</Link></li>
              <li><Link to="/contact">{t('footer.contact')}</Link></li>
            </ul>
            <div className="footer-location">
              <FiMapPin size={14} />
              <span>Afrique</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>&copy; {year} Guide Africa &mdash; {t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
