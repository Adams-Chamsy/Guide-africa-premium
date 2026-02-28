import React, { useState } from 'react';
import { favoritesApi } from '../api/apiClient';

export default function FavoriteButton({ type, id, className = '' }) {
  const [isFav, setIsFav] = useState(favoritesApi.isFavorite(type, id));

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    favoritesApi.toggle(type, id);
    setIsFav(!isFav);
  };

  return (
    <button
      className={`favorite-btn ${isFav ? 'is-favorite' : ''} ${className}`}
      onClick={toggle}
      aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
}
