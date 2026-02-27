import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="african-pattern"></div>
      <div className="footer-content">
        <div className="footer-brand">Michelin Guide Africa</div>
        <div className="footer-tagline">
          L'excellence gastronomique du continent africain
        </div>
        <div className="gold-line" style={{ marginBottom: 16 }}></div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Michelin Guide Africa &mdash; Tous droits r&eacute;serv&eacute;s
        </div>
      </div>
    </footer>
  );
};

export default Footer;
