import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userApi } from '../api/apiClient';
import Breadcrumbs from '../components/Breadcrumbs';
import FavoriteButton from '../components/FavoriteButton';
import { SkeletonGrid } from '../components/Skeleton';
import usePageTitle from '../hooks/usePageTitle';

const MesFavoris = () => {
  usePageTitle('Mes Favoris');
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const loadFavoris = async () => {
    setLoading(true);
    try {
      const params = filter !== 'all' ? { type: filter } : {};
      const response = await userApi.getFavorites(params);
      setFavoris(response.data);
    } catch (err) {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavoris();
  }, [filter]);

  const handleRemove = async (favori) => {
    try {
      await userApi.removeFavorite(favori.id);
      setFavoris(favoris.filter(f => f.id !== favori.id));
    } catch (err) {
      // Error handled silently
    }
  };

  const restaurants = favoris.filter(f => f.type === 'RESTAURANT');
  const hotels = favoris.filter(f => f.type === 'HOTEL');

  return (
    <div className="page-container">
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Mes Favoris' },
      ]} />

      <div className="page-header">
        <span className="page-subtitle">Mon espace personnel</span>
        <h2 className="page-title">Mes Favoris</h2>
        <p>{favoris.length} {favoris.length > 1 ? 'établissements' : 'établissement'} sauvegardé{favoris.length > 1 ? 's' : ''}</p>
      </div>

      <div className="filter-bar" style={{ marginBottom: 24 }}>
        <button className={`tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          Tous ({favoris.length})
        </button>
        <button className={`tab-btn ${filter === 'RESTAURANT' ? 'active' : ''}`} onClick={() => setFilter('RESTAURANT')}>
          Restaurants ({restaurants.length})
        </button>
        <button className={`tab-btn ${filter === 'HOTEL' ? 'active' : ''}`} onClick={() => setFilter('HOTEL')}>
          Hôtels ({hotels.length})
        </button>
      </div>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : favoris.length === 0 ? (
        <div className="empty-state">
          <p>Vous n'avez pas encore de favoris.</p>
          <p>Explorez nos <Link to="/restaurants">restaurants</Link> et <Link to="/hotels">hôtels</Link> pour en ajouter !</p>
        </div>
      ) : (
        <div className="card-grid">
          {favoris.map(favori => (
            <div key={favori.id} className="card favori-card">
              <Link to={`/${favori.type === 'RESTAURANT' ? 'restaurants' : 'hotels'}/${favori.targetId}`} className="card-link">
                <div className="card-image-container">
                  {favori.imageEtablissement && (
                    <img src={favori.imageEtablissement} alt={favori.nomEtablissement} className="card-image" />
                  )}
                  <span className={`card-type-badge ${favori.type === 'RESTAURANT' ? 'badge-restaurant' : 'badge-hotel'}`}>
                    {favori.type === 'RESTAURANT' ? 'Restaurant' : 'Hôtel'}
                  </span>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{favori.nomEtablissement || 'Chargement...'}</h3>
                  {favori.villeEtablissement && (
                    <p className="card-location">{favori.villeEtablissement}</p>
                  )}
                  {favori.noteEtablissement && (
                    <p className="card-rating">{'★'.repeat(Math.round(favori.noteEtablissement))} {favori.noteEtablissement}/5</p>
                  )}
                </div>
              </Link>
              <button className="btn-remove-fav" onClick={() => handleRemove(favori)} title="Retirer des favoris">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MesFavoris;
