import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiStar, FiPhone, FiArrowLeft, FiCalendar, FiSettings, FiDroplet, FiUsers, FiCheck, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { voitureApi } from '../api/apiClient';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import StarRating from '../components/StarRating';
import LightboxGallery from '../components/LightboxGallery';
import BackToTop from '../components/BackToTop';
import ConfirmDialog from '../components/ConfirmDialog';
import { SkeletonDetail } from '../components/Skeleton';
import usePageTitle from '../hooks/usePageTitle';
import PropTypes from 'prop-types';

const formatPrix = (prix) => {
  if (!prix) return '';
  return prix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
};

const VoitureDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [voiture, setVoiture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  usePageTitle(voiture ? `${voiture.marque} ${voiture.modele}` : 'Voiture');

  const fetchVoiture = async () => {
    setLoading(true);
    try {
      const res = await voitureApi.getById(id);
      setVoiture(res.data);
    } catch (err) {
      setError('Voiture introuvable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoiture();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    try {
      await voitureApi.delete(id);
      navigate('/voitures');
    } catch (err) {
      setError('Erreur lors de la suppression.');
    }
    setShowDelete(false);
  };

  if (loading) return <SkeletonDetail />;
  if (error) return <div className="error-message">{error}</div>;
  if (!voiture) return null;

  const whatsappUrl = voiture.whatsapp
    ? `https://wa.me/${voiture.whatsapp.replace(/[^0-9]/g, '')}`
    : null;

  const telUrl = voiture.telephone
    ? `tel:${voiture.telephone}`
    : null;

  return (
    <>
      <SEOHead
        title={`${voiture.marque} ${voiture.modele} ${voiture.annee || ''} \u2014 Location`}
        description={voiture.description ? voiture.description.substring(0, 160) : `Louez ${voiture.marque} ${voiture.modele} en Afrique`}
      />
      <div className="detail-page">
        <Breadcrumbs items={[
          { label: 'Accueil', to: '/' },
          { label: 'Voitures', to: '/voitures' },
          { label: `${voiture.marque} ${voiture.modele}` }
        ]} />

        {voiture.imagePrincipale && (
          <motion.div
            className="detail-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={voiture.imagePrincipale} alt={`${voiture.marque} ${voiture.modele}`} className="detail-main-image" loading="lazy"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afe?w=800'; }} />
            <div className="detail-hero-overlay"></div>
          </motion.div>
        )}

        <div className="detail-info">
          <div className="african-pattern"></div>
          <motion.h1
            className="detail-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {voiture.marque} {voiture.modele} {voiture.annee && <span style={{ color: 'var(--ivory-subtle)' }}>({voiture.annee})</span>}
          </motion.h1>

          <div className="detail-rating">
            <span className="price" style={{ fontSize: '1.4rem' }}>{formatPrix(voiture.prixParJour)} / jour</span>
            {voiture.note && (
              <span className="review-count">
                <StarRating rating={voiture.note} showValue={true} />
              </span>
            )}
            {voiture.ville && (
              <span className="detail-ville"><FiMapPin /> {voiture.ville.nom}{voiture.ville.pays && `, ${voiture.ville.pays}`}</span>
            )}
          </div>

          <div className="badges" style={{ marginBottom: 16 }}>
            {voiture.categorie && <span className="badge">{voiture.categorie}</span>}
            {voiture.transmission && <span className="badge badge-amenity"><FiSettings size={12} /> {voiture.transmission}</span>}
            {!voiture.disponible && <span className="badge" style={{ background: '#c0392b' }}>Indisponible</span>}
          </div>

          {/* Caract\u00e9ristiques */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="subsection-title">Caract\u00e9ristiques</h3>
            <div className="amenity-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {voiture.carburant && (
                <span className="amenity-item"><FiDroplet style={{ marginRight: 6 }} /> Carburant : {voiture.carburant}</span>
              )}
              {voiture.transmission && (
                <span className="amenity-item"><FiSettings style={{ marginRight: 6 }} /> Transmission : {voiture.transmission}</span>
              )}
              {voiture.nombrePlaces && (
                <span className="amenity-item"><FiUsers style={{ marginRight: 6 }} /> {voiture.nombrePlaces} places</span>
              )}
              {voiture.nombrePortes && (
                <span className="amenity-item">&#128682; {voiture.nombrePortes} portes</span>
              )}
              <span className="amenity-item">
                {voiture.climatisation ? <FiCheck style={{ color: 'var(--gold)', marginRight: 6 }} /> : <FiX style={{ color: '#c0392b', marginRight: 6 }} />}
                Climatisation
              </span>
              <span className="amenity-item">
                {voiture.gps ? <FiCheck style={{ color: 'var(--gold)', marginRight: 6 }} /> : <FiX style={{ color: '#c0392b', marginRight: 6 }} />}
                GPS
              </span>
              <span className="amenity-item">
                {voiture.bluetooth ? <FiCheck style={{ color: 'var(--gold)', marginRight: 6 }} /> : <FiX style={{ color: '#c0392b', marginRight: 6 }} />}
                Bluetooth
              </span>
              <span className="amenity-item">
                {voiture.siegesBebe ? <FiCheck style={{ color: 'var(--gold)', marginRight: 6 }} /> : <FiX style={{ color: '#c0392b', marginRight: 6 }} />}
                Si\u00e8ges b\u00e9b\u00e9
              </span>
            </div>
          </motion.div>

          {voiture.kilometrageInclus && (
            <div className="detail-info-row">
              <strong>Kilom\u00e9trage inclus :</strong> {voiture.kilometrageInclus}
            </div>
          )}

          {voiture.description && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="subsection-title">Description</h3>
              <p className="detail-description">{voiture.description}</p>
            </motion.div>
          )}

          {voiture.conditions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <h3 className="subsection-title">Conditions de location</h3>
              <p className="detail-description" style={{ whiteSpace: 'pre-line' }}>{voiture.conditions}</p>
            </motion.div>
          )}

          {/* Propri\u00e9taire & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 20, marginTop: 24, border: '1px solid rgba(212,175,55,0.15)' }}
          >
            <h3 className="subsection-title">Propri\u00e9taire</h3>
            {voiture.proprietaireNom && (
              <p style={{ fontSize: '1.1rem', marginBottom: 8 }}>{voiture.proprietaireNom}</p>
            )}
            {voiture.ville && (
              <p style={{ color: 'var(--ivory-subtle)', marginBottom: 16 }}>
                <FiMapPin style={{ verticalAlign: 'middle', marginRight: 4 }} />
                {voiture.ville.nom}{voiture.ville.pays && `, ${voiture.ville.pays}`}
              </p>
            )}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {telUrl && (
                <a href={telUrl} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <FiPhone /> Appeler
                </a>
              )}
              {whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366' }}>
                  <FaWhatsapp /> WhatsApp
                </a>
              )}
            </div>
          </motion.div>

          {/* Galerie */}
          {voiture.galeriePhotos && voiture.galeriePhotos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              style={{ marginTop: 24 }}
            >
              <h3 className="subsection-title">Galerie photos</h3>
              <LightboxGallery images={voiture.galeriePhotos} alt={`${voiture.marque} ${voiture.modele}`} />
            </motion.div>
          )}

          <div className="detail-actions" style={{ marginTop: 32 }}>
            <Link to="/voitures" className="btn btn-outline"><FiArrowLeft style={{ marginRight: 6 }} /> Retour</Link>
            <Link to={`/voitures/${id}/edit`} className="btn btn-primary">Modifier</Link>
            <button className="btn btn-danger" onClick={() => setShowDelete(true)}>Supprimer</button>
          </div>
        </div>

        {showDelete && (
          <ConfirmDialog
            title="Supprimer la voiture"
            message={`\u00cates-vous s\u00fbr de vouloir supprimer "${voiture.marque} ${voiture.modele}" ? Cette action est irr\u00e9versible.`}
            onConfirm={handleDelete}
            onCancel={() => setShowDelete(false)}
          />
        )}
        <BackToTop />
      </div>
    </>
  );
};

VoitureDetail.propTypes = {};

export default VoitureDetail;
