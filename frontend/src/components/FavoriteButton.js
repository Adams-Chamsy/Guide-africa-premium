import React, { useState, useEffect } from 'react';
import { favoritesApi, userApi } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import PropTypes from 'prop-types';

export default function FavoriteButton({ type, id, className = '' }) {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);

  // Map frontend type to backend enum
  const backendType = type === 'restaurants' ? 'RESTAURANT' : 'HOTEL';

  useEffect(() => {
    if (isAuthenticated) {
      userApi.checkFavorite(backendType, id)
        .then(res => setIsFav(res.data.isFavorite))
        .catch(() => setIsFav(false));
    } else {
      setIsFav(favoritesApi.isFavorite(type, id));
    }
  }, [isAuthenticated, type, backendType, id]);

  const toggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;
    setLoading(true);

    try {
      if (isAuthenticated) {
        if (isFav) {
          await userApi.removeFavoriteByTarget(backendType, id);
          setIsFav(false);
          showToast('Retiré des favoris', 'info');
        } else {
          await userApi.addFavorite({ type: backendType, targetId: id });
          setIsFav(true);
          showToast('Ajouté aux favoris', 'success');
        }
      } else {
        favoritesApi.toggle(type, id);
        if (isFav) {
          showToast('Retiré des favoris', 'info');
        } else {
          showToast('Ajouté aux favoris', 'success');
        }
        setIsFav(!isFav);
      }
    } catch (err) {
      showToast('Erreur lors de la mise à jour', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`favorite-btn ${isFav ? 'is-favorite' : ''} ${className}`}
      onClick={toggle}
      aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      disabled={loading}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
}

FavoriteButton.propTypes = {
  type: PropTypes.string,
  id: PropTypes.number,
  className: PropTypes.string,
};
