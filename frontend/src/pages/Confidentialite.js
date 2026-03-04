import React from 'react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';

const Confidentialite = () => (
  <div className="page-container">
    <SEOHead title="Politique de confidentialité — Guide Africa Premium" />
    <Breadcrumbs items={[{ label: 'Accueil', to: '/' }, { label: 'Confidentialité' }]} />
    <div className="page-header">
      <h1 className="page-title">Politique de Confidentialité</h1>
      <div className="gold-line" />
    </div>
    <div className="content-section" style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
      <p style={{ color: 'var(--ivory-muted)', lineHeight: 1.8 }}>
        Cette page est en cours de rédaction. Revenez bientôt pour consulter notre politique de confidentialité complète.
      </p>
    </div>
  </div>
);
export default Confidentialite;
