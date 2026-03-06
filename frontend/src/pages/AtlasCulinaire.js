import React, { useState, useEffect } from 'react';
import { cuisineApi } from '../api/apiClient';
import Breadcrumbs from '../components/Breadcrumbs';
import BackToTop from '../components/BackToTop';
import { SkeletonGrid } from '../components/Skeleton';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';
import ScrollReveal from '../components/ScrollReveal';
import SectionDivider from '../components/SectionDivider';

const AtlasCulinaire = () => {
  usePageTitle('Atlas Culinaire');
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    cuisineApi.getAll().then(res => {
      setCuisines(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const regions = [...new Set(cuisines.map(c => c.region).filter(Boolean))];
  const filteredCuisines = filter
    ? cuisines.filter(c => c.region === filter)
    : cuisines;

  return (
    <div className="page-container">
      <SEOHead title="Atlas Culinaire — Guide Africa Premium" />
      <Breadcrumbs items={[{ label: 'Accueil', to: '/' }, { label: 'Atlas Culinaire' }]} />

      <ScrollReveal>
        <div className="page-header">
          <div className="page-label">Saveurs du Continent</div>
          <h2 className="luxury-title">Atlas Culinaire</h2>
          <p className="luxury-subtitle">Découvrez les traditions gastronomiques de chaque région d'Afrique</p>
          <SectionDivider variant="diamond" />
        </div>
      </ScrollReveal>

      {regions.length > 0 && (
        <div className="filter-bar" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          <button
            className={`filter-btn ${!filter ? 'active' : ''}`}
            onClick={() => setFilter('')}
          >
            Toutes les régions
          </button>
          {regions.map(r => (
            <button
              key={r}
              className={`filter-btn ${filter === r ? 'active' : ''}`}
              onClick={() => setFilter(r)}
            >
              {r}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <SkeletonGrid count={6} />
      ) : (
        <div className="atlas-grid">
          {filteredCuisines.map((cuisine, index) => (
            <ScrollReveal key={cuisine.id} delay={index * 0.08}>
              <div
                className={`atlas-card ${selectedCuisine === cuisine.id ? 'expanded' : ''}`}
                onClick={() => setSelectedCuisine(selectedCuisine === cuisine.id ? null : cuisine.id)}>
                <div className="atlas-image-wrapper">
                  <img src={cuisine.image} alt={cuisine.nom} className="atlas-image" loading="lazy"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400'; }} />
                  <div className="atlas-image-overlay">
                    <h3 className="atlas-name">{cuisine.nom}</h3>
                    <p className="atlas-region">{cuisine.region} &mdash; {cuisine.pays}</p>
                  </div>
                </div>
                <div className="atlas-body">
                  <div className="atlas-signature">
                    <span className="atlas-signature-label">Plat signature</span>
                    <span className="atlas-signature-name">{cuisine.platSignature}</span>
                  </div>
                  <p className="atlas-desc drop-cap">{cuisine.description}</p>
                  {selectedCuisine === cuisine.id && (
                    <div className="atlas-details">
                      <h4 className="atlas-ingredients-title">Ingrédients clés</h4>
                      <div className="atlas-ingredients">
                        {cuisine.ingredients && cuisine.ingredients.map((ing) => (
                          <span key={ing} className="atlas-ingredient">{ing}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}

      {filteredCuisines.length === 0 && !loading && (
        <div className="empty-state" style={{ textAlign: 'center', padding: '48px 0' }}>
          <p style={{ color: 'var(--ivory-subtle)' }}>Aucune cuisine trouvée pour cette région.</p>
        </div>
      )}

      <BackToTop />
    </div>
  );
};

export default AtlasCulinaire;
