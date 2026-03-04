import React from 'react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';

const Contact = () => (
  <div className="page-container">
    <SEOHead title="Nous contacter — Guide Africa Premium" />
    <Breadcrumbs items={[{ label: 'Accueil', to: '/' }, { label: 'Contact' }]} />
    <div className="page-header">
      <h1 className="page-title">Nous Contacter</h1>
      <div className="gold-line" />
    </div>
    <div className="content-section" style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
      <p style={{ color: 'var(--ivory-muted)', lineHeight: 1.8 }}>
        Cette page est en cours de rédaction. Revenez bientôt pour découvrir comment nous contacter.
      </p>
    </div>
  </div>
);
export default Contact;
