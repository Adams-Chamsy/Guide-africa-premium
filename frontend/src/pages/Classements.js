import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import apiClient from '../api/apiClient';
import Breadcrumbs from '../components/Breadcrumbs';
import usePageTitle from '../hooks/usePageTitle';

const Classements = () => {
  usePageTitle('Classements');
  const [activeTab, setActiveTab] = useState('restaurants');
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const [restoRes, hotelRes] = await Promise.all([
          apiClient.get('/ratings/top/restaurants', { params: { limit: 10 } }),
          apiClient.get('/ratings/top/hotels', { params: { limit: 10 } }),
        ]);
        setRestaurants(restoRes.data || []);
        setHotels(hotelRes.data || []);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchRankings();
  }, []);

  const getMedal = (index) => {
    if (index === 0) return { emoji: '\uD83E\uDD47', className: 'medal-gold' };
    if (index === 1) return { emoji: '\uD83E\uDD48', className: 'medal-silver' };
    if (index === 2) return { emoji: '\uD83E\uDD49', className: 'medal-bronze' };
    return { emoji: `${index + 1}`, className: 'medal-other' };
  };

  const items = activeTab === 'restaurants' ? restaurants : hotels;
  const linkPrefix = activeTab === 'restaurants' ? '/restaurants' : '/hotels';

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="classements-page">
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Classements' },
      ]} />

      <div className="section-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 className="section-title">Classements</h2>
        <p className="section-subtitle">Les meilleures adresses d'Afrique selon nos utilisateurs</p>
      </div>

      <div className="classements-tabs">
        <button
          className={`classements-tab ${activeTab === 'restaurants' ? 'active' : ''}`}
          onClick={() => setActiveTab('restaurants')}
        >
          Restaurants
        </button>
        <button
          className={`classements-tab ${activeTab === 'hotels' ? 'active' : ''}`}
          onClick={() => setActiveTab('hotels')}
        >
          H\u00f4tels
        </button>
      </div>

      {items.length >= 3 && (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div className="podium-container">
            {/* 2nd place */}
            <div className="podium-place second">
              <div className="podium-card">
                <img src={items[1].image || '/placeholder.jpg'} alt={items[1].nom} />
                <h3>{items[1].nom}</h3>
                <div className="podium-score">{items[1].noteMoyenne?.toFixed(1)}</div>
              </div>
              <div className="podium-base">2</div>
            </div>
            {/* 1st place */}
            <div className="podium-place first">
              <div className="podium-card">
                <img src={items[0].image || '/placeholder.jpg'} alt={items[0].nom} />
                <h3>{items[0].nom}</h3>
                <div className="podium-score">{items[0].noteMoyenne?.toFixed(1)}</div>
              </div>
              <div className="podium-base">1</div>
            </div>
            {/* 3rd place */}
            <div className="podium-place third">
              <div className="podium-card">
                <img src={items[2].image || '/placeholder.jpg'} alt={items[2].nom} />
                <h3>{items[2].nom}</h3>
                <div className="podium-score">{items[2].noteMoyenne?.toFixed(1)}</div>
              </div>
              <div className="podium-base">3</div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="ranking-list">
        {items.length === 0 ? (
          <div className="empty-state">
            <p>Aucun classement disponible pour le moment.</p>
          </div>
        ) : (
          items.map((item, index) => {
            const medal = getMedal(index);
            return (
              <Link key={item.id} to={`${linkPrefix}/${item.id}`} className="ranking-card">
                <div className={`ranking-position ${medal.className}`}>
                  <span>{medal.emoji}</span>
                </div>
                <div className="ranking-image">
                  {item.image ? (
                    <img src={item.image} alt={item.nom} />
                  ) : (
                    <div className="ranking-image-placeholder">
                      {activeTab === 'restaurants' ? '\uD83C\uDF7D' : '\uD83C\uDFE8'}
                    </div>
                  )}
                </div>
                <div className="ranking-info">
                  <h3 className="ranking-name">{item.nom}</h3>
                  <div className="ranking-meta">
                    {item.ville && <span>{item.ville}{item.pays ? `, ${item.pays}` : ''}</span>}
                    {activeTab === 'restaurants' && item.cuisine && (
                      <span className="ranking-cuisine">{item.cuisine}</span>
                    )}
                    {activeTab === 'hotels' && item.etoiles && (
                      <span className="ranking-etoiles">{'\u2605'.repeat(item.etoiles)}</span>
                    )}
                  </div>
                </div>
                <div className="ranking-score">
                  <span className="ranking-note">{item.noteMoyenne ? item.noteMoyenne.toFixed(1) : '\u2014'}</span>
                  <div className="ranking-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= Math.round(item.noteMoyenne || 0) ? 'star-filled' : 'star-empty'}>{'\u2605'}</span>
                    ))}
                  </div>
                  <span className="ranking-avis-count">{item.nombreAvis || 0} avis</span>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Classements;
