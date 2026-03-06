import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  usePageTitle(t('notFound.title'));
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px', maxWidth: 500, margin: '0 auto' }}>
      <SEOHead title={`${t('notFound.title')} — Guide Africa Premium`} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Animated compass */}
        <div style={{ marginBottom: 32 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ animation: 'spin 8s linear infinite' }}>
            <circle cx="40" cy="40" r="36" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.3" />
            <circle cx="40" cy="40" r="28" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.2" />
            <polygon points="40,12 44,40 40,44 36,40" fill="#C9A84C" opacity="0.8" />
            <polygon points="40,68 36,40 40,36 44,40" fill="#C9A84C" opacity="0.4" />
            <circle cx="40" cy="40" r="3" fill="#C9A84C" />
          </svg>
        </div>
        <span className="luxury-subtitle">{t('notFound.error404')}</span>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--ivory)', margin: '8px 0 16px' }}>
          {t('notFound.title')}
        </h1>
        <p style={{ color: 'var(--ivory-muted)', marginBottom: 32 }}>
          {t('notFound.message')}
        </p>
        <div className="section-divider ornamental" style={{ margin: '32px auto' }}>
          <span className="divider-icon">◆</span>
        </div>
        <p style={{ color: 'var(--ivory-subtle)', fontSize: '0.85rem', marginBottom: 24, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {t('notFound.popularDestinations')}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <Link to="/" className="btn btn-primary" style={{ minWidth: 200 }}>{t('notFound.backHome')}</Link>
          <Link to="/restaurants" className="btn btn-secondary" style={{ minWidth: 200 }}>{t('nav.restaurants')}</Link>
          <Link to="/hotels" className="btn btn-secondary" style={{ minWidth: 200 }}>{t('nav.hotels')}</Link>
          <Link to="/carte" className="btn btn-secondary" style={{ minWidth: 200 }}>{t('nav.map')}</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
