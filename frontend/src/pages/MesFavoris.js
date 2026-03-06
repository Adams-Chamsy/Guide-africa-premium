import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userApi } from '../api/apiClient';
import Breadcrumbs from '../components/Breadcrumbs';
import FavoriteButton from '../components/FavoriteButton';
import { SkeletonGrid } from '../components/Skeleton';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';
import { useTranslation } from 'react-i18next';

const MesFavoris = () => {
  const { t } = useTranslation();
  usePageTitle(t('favorites.title'));
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
      <SEOHead title={`${t('favorites.title')} — Guide Africa Premium`} />
      <Breadcrumbs items={[
        { label: t('nav.home'), to: '/' },
        { label: t('favorites.title') },
      ]} />

      <div className="page-header">
        <span className="page-subtitle">{t('common.myPersonalSpace')}</span>
        <h2 className="page-title">{t('favorites.title')}</h2>
        <p>{favoris.length} {favoris.length > 1 ? t('common.establishments') : t('common.establishmentSingular')} {favoris.length > 1 ? t('common.savedPlural') : t('common.saved')}</p>
      </div>

      <div className="filter-bar" style={{ marginBottom: 24 }}>
        <button className={`tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          {t('favorites.all')} ({favoris.length})
        </button>
        <button className={`tab-btn ${filter === 'RESTAURANT' ? 'active' : ''}`} onClick={() => setFilter('RESTAURANT')}>
          {t('favorites.restaurants')} ({restaurants.length})
        </button>
        <button className={`tab-btn ${filter === 'HOTEL' ? 'active' : ''}`} onClick={() => setFilter('HOTEL')}>
          {t('favorites.hotels')} ({hotels.length})
        </button>
      </div>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : favoris.length === 0 ? (
        <div className="empty-state">
          <p>{t('favorites.empty')}</p>
          <p>{t('favorites.emptyExplore')} <Link to="/restaurants">{t('favorites.restaurants').toLowerCase()}</Link> {t('favorites.emptyAnd')} <Link to="/hotels">{t('favorites.hotels').toLowerCase()}</Link> {t('favorites.emptyToAdd')}</p>
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
                    {favori.type === 'RESTAURANT' ? 'Restaurant' : t('hotel.title')}
                  </span>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{favori.nomEtablissement || t('common.loading')}</h3>
                  {favori.villeEtablissement && (
                    <p className="card-location">{favori.villeEtablissement}</p>
                  )}
                  {favori.noteEtablissement && (
                    <p className="card-rating">{'★'.repeat(Math.round(favori.noteEtablissement))} {favori.noteEtablissement}/5</p>
                  )}
                </div>
              </Link>
              <button className="btn-remove-fav" onClick={() => handleRemove(favori)} title={t('favorites.remove')}>
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
