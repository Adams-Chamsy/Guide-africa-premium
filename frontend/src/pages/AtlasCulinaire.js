import React, { useState, useEffect } from 'react';
import { cuisineApi } from '../api/apiClient';
import Breadcrumbs from '../components/Breadcrumbs';
import BackToTop from '../components/BackToTop';
import { SkeletonGrid } from '../components/Skeleton';

const AtlasCulinaire = () => {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  useEffect(() => {
    cuisineApi.getAll().then(res => {
      setCuisines(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Accueil', to: '/' }, { label: 'Atlas Culinaire' }]} />

      <div className="page-header">
        <div className="page-label">Saveurs du Continent</div>
        <h2>Atlas Culinaire</h2>
        <p className="page-subtitle">Découvrez les traditions gastronomiques de chaque région d'Afrique</p>
        <div className="gold-line" style={{ marginTop: 16 }}></div>
      </div>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : (
        <div className="atlas-grid">
          {cuisines.map(cuisine => (
            <div key={cuisine.id}
              className={`atlas-card ${selectedCuisine === cuisine.id ? 'expanded' : ''}`}
              onClick={() => setSelectedCuisine(selectedCuisine === cuisine.id ? null : cuisine.id)}>
              <div className="atlas-image-wrapper">
                <img src={cuisine.image} alt={cuisine.nom} className="atlas-image"
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
                <p className="atlas-desc">{cuisine.description}</p>
                {selectedCuisine === cuisine.id && (
                  <div className="atlas-details">
                    <h4 className="atlas-ingredients-title">Ingrédients clés</h4>
                    <div className="atlas-ingredients">
                      {cuisine.ingredients && cuisine.ingredients.map((ing, i) => (
                        <span key={i} className="atlas-ingredient">{ing}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <BackToTop />
    </div>
  );
};

export default AtlasCulinaire;
