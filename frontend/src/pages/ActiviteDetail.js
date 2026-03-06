import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiStar, FiUsers, FiPhone, FiMail, FiGlobe, FiCheck, FiX, FiArrowLeft } from 'react-icons/fi';
import { activiteApi } from '../api/apiClient';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import StarRating from '../components/StarRating';
import LightboxGallery from '../components/LightboxGallery';
import BackToTop from '../components/BackToTop';
import { SkeletonDetail } from '../components/Skeleton';
import usePageTitle from '../hooks/usePageTitle';
import PropTypes from 'prop-types';

const categorieLabels = {
  SAFARI: 'Safari',
  EXCURSION: 'Excursion',
  CULTURE: 'Culture',
  GASTRONOMIE: 'Gastronomie',
  SPORT: 'Sport',
  AVENTURE: 'Aventure',
  DETENTE: 'D\u00e9tente',
  ARTISANAT: 'Artisanat',
};

const difficulteColors = {
  FACILE: '#27ae60',
  MOYEN: '#f39c12',
  DIFFICILE: '#e74c3c',
};

const difficulteLabels = {
  FACILE: 'Facile',
  MOYEN: 'Moyen',
  DIFFICILE: 'Difficile',
};

const formatPrix = (prix) => {
  if (prix == null) return '';
  return prix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
};

const ActiviteDetail = () => {
  const { id } = useParams();
  const [activite, setActivite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  usePageTitle(activite?.titre || 'Activit\u00e9');

  useEffect(() => {
    const fetchActivite = async () => {
      setLoading(true);
      try {
        const res = await activiteApi.getById(id);
        setActivite(res.data);
      } catch (err) {
        setError('Activit\u00e9 introuvable.');
      } finally {
        setLoading(false);
      }
    };
    fetchActivite();
  }, [id]);

  if (loading) return <SkeletonDetail />;
  if (error) return <div className="error-message">{error}</div>;
  if (!activite) return null;

  return (
    <>
      <SEOHead
        title={`${activite.titre} \u2014 Guide Africa`}
        description={activite.description ? activite.description.substring(0, 160) : ''}
      />
      <div className="detail-page">
        <Breadcrumbs items={[
          { label: 'Accueil', to: '/' },
          { label: 'Activit\u00e9s', to: '/activites' },
          { label: activite.titre }
        ]} />

        {/* Hero */}
        {activite.imageCouverture && (
          <motion.div
            className="detail-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={activite.imageCouverture}
              alt={activite.titre}
              className="detail-main-image"
              loading="lazy"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'; }}
            />
            <div className="detail-hero-overlay"></div>
          </motion.div>
        )}

        <motion.div
          className="detail-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="african-pattern"></div>

          {/* Back button */}
          <Link to="/activites" className="btn btn-outline btn-sm" style={{ marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <FiArrowLeft /> Retour aux activit\u00e9s
          </Link>

          {/* Title */}
          <h1 className="detail-title">{activite.titre}</h1>

          {/* Badges and rating */}
          <div className="detail-rating">
            <StarRating rating={activite.note || 0} />
            {activite.categorie && (
              <span className="badge" style={{ background: 'var(--gold)', color: 'var(--dark)' }}>
                {categorieLabels[activite.categorie] || activite.categorie}
              </span>
            )}
            {activite.difficulte && (
              <span
                className="badge"
                style={{
                  background: difficulteColors[activite.difficulte] || '#888',
                  color: '#fff',
                }}
              >
                {difficulteLabels[activite.difficulte] || activite.difficulte}
              </span>
            )}
          </div>

          {/* Key info meta */}
          <div className="detail-meta" style={{ marginTop: 16 }}>
            {activite.lieu && (
              <span className="detail-meta-item">
                <FiMapPin style={{ verticalAlign: -2, marginRight: 6 }} />
                {activite.lieu}
              </span>
            )}
            {activite.duree && (
              <span className="detail-meta-item">
                <FiClock style={{ verticalAlign: -2, marginRight: 6 }} />
                {activite.duree}
              </span>
            )}
            {activite.placesMax && (
              <span className="detail-meta-item">
                <FiUsers style={{ verticalAlign: -2, marginRight: 6 }} />
                {activite.placesMax} places max
              </span>
            )}
            {activite.prix != null && (
              <span className="detail-meta-item" style={{ color: 'var(--gold)', fontWeight: 600 }}>
                {formatPrix(activite.prix)}
              </span>
            )}
          </div>

          {/* Description */}
          {activite.description && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="detail-description" style={{ marginTop: 24 }}>{activite.description}</p>
            </motion.div>
          )}

          {/* Inclus */}
          {activite.inclus && activite.inclus.length > 0 && (
            <motion.div
              style={{ marginTop: 32 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h3 className="subsection-title">Inclus</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {activite.inclus.map((item) => (
                  <li key={`inclus-${item}`} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', color: 'var(--ivory-muted)', fontSize: '0.9rem' }}>
                    <FiCheck style={{ color: '#27ae60', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Non inclus */}
          {activite.nonInclus && activite.nonInclus.length > 0 && (
            <motion.div
              style={{ marginTop: 24 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="subsection-title">Non inclus</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {activite.nonInclus.map((item) => (
                  <li key={`non-inclus-${item}`} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', color: 'var(--ivory-muted)', fontSize: '0.9rem' }}>
                    <FiX style={{ color: '#e74c3c', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Langues disponibles */}
          {activite.languesDisponibles && activite.languesDisponibles.length > 0 && (
            <motion.div
              style={{ marginTop: 24 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <h3 className="subsection-title">Langues disponibles</h3>
              <div className="badges">
                {activite.languesDisponibles.map((langue) => (
                  <span key={langue} className="badge">{langue}</span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Gallery */}
          {activite.galeriePhotos && activite.galeriePhotos.length > 0 && (
            <motion.div
              style={{ marginTop: 32 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="subsection-title">Photos</h3>
              <LightboxGallery images={activite.galeriePhotos} alt={activite.titre} />
            </motion.div>
          )}

          {/* Contact */}
          {(activite.telephone || activite.email || activite.siteWeb) && (
            <motion.div
              style={{ marginTop: 32 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <h3 className="subsection-title">Contact</h3>
              <div className="detail-meta">
                {activite.telephone && (
                  <span className="detail-meta-item">
                    <FiPhone style={{ verticalAlign: -2, marginRight: 6 }} />
                    {activite.telephone}
                  </span>
                )}
                {activite.email && (
                  <span className="detail-meta-item">
                    <FiMail style={{ verticalAlign: -2, marginRight: 6 }} />
                    {activite.email}
                  </span>
                )}
                {activite.siteWeb && (
                  <a
                    href={activite.siteWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-meta-item social-link"
                  >
                    <FiGlobe style={{ verticalAlign: -2, marginRight: 6 }} />
                    Site web
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        <BackToTop />
      </div>
    </>
  );
};

ActiviteDetail.propTypes = {};

export default ActiviteDetail;
