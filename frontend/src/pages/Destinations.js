import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cityApi } from '../api/apiClient';
import Breadcrumbs from '../components/Breadcrumbs';
import BackToTop from '../components/BackToTop';
import { SkeletonGrid } from '../components/Skeleton';
import usePageTitle from '../hooks/usePageTitle';

const Destinations = () => {
  usePageTitle('Destinations');
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cityApi.getAll().then(res => {
      setCities(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Accueil', to: '/' }, { label: 'Destinations' }]} />

      <div className="page-header">
        <div className="page-label">Explorez l'Afrique</div>
        <h2>Destinations</h2>
        <p className="page-subtitle">Les plus belles villes gastronomiques du continent</p>
        <div className="gold-line" style={{ marginTop: 16 }}></div>
      </div>

      {loading ? (
        <SkeletonGrid count={8} />
      ) : (
        <div className="destinations-grid">
          {cities.map(city => (
            <Link to={`/restaurants?villeId=${city.id}`} key={city.id} className="destination-card">
              <div className="destination-image-wrapper">
                <img src={city.image} alt={city.nom} className="destination-image"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400'; }} />
                <div className="destination-overlay">
                  <h3 className="destination-name">{city.nom}</h3>
                  <p className="destination-country">{city.pays}</p>
                  <p className="destination-region">{city.region}</p>
                </div>
              </div>
              <div className="destination-body">
                <p className="destination-desc">{city.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <BackToTop />
    </div>
  );
};

export default Destinations;
