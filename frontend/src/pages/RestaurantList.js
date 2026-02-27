import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { restaurantApi } from '../api/apiClient';
import StarRating from '../components/StarRating';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchNom, setSearchNom] = useState('');
  const [filterCuisine, setFilterCuisine] = useState('');

  const fetchRestaurants = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (searchNom.trim()) params.nom = searchNom.trim();
      else if (filterCuisine) params.cuisine = filterCuisine;
      const res = await restaurantApi.getAll(params);
      setRestaurants(res.data);
    } catch (err) {
      setError('Erreur lors du chargement des restaurants.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCuisine]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRestaurants();
  };

  const clearFilters = () => {
    setSearchNom('');
    setFilterCuisine('');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-label">Notre S&eacute;lection</div>
        <h2>Restaurants</h2>
        <div className="gold-line" style={{ marginTop: 16 }}></div>
      </div>

      <div className="section-header" style={{ marginBottom: 0 }}>
        <div></div>
        <Link to="/restaurants/new" className="btn btn-primary">
          + Ajouter
        </Link>
      </div>

      {/* Search & Filters */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher par nom..."
          value={searchNom}
          onChange={(e) => setSearchNom(e.target.value)}
        />
        <select
          className="search-select"
          value={filterCuisine}
          onChange={(e) => {
            setSearchNom('');
            setFilterCuisine(e.target.value);
          }}
        >
          <option value="">Toutes les cuisines</option>
          <option value="S&eacute;n&eacute;galaise">S&eacute;n&eacute;galaise</option>
          <option value="Marocaine">Marocaine</option>
          <option value="Ivoirienne">Ivoirienne</option>
          <option value="Pan-africaine">Pan-africaine</option>
        </select>
        <button type="submit" className="btn btn-primary btn-sm">Rechercher</button>
        {(searchNom || filterCuisine) && (
          <button type="button" className="btn btn-outline btn-sm" onClick={clearFilters}>
            Effacer
          </button>
        )}
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-container"><div className="spinner"></div></div>
      ) : restaurants.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">&#127869;</div>
          <h3>Aucun restaurant trouv&eacute;</h3>
          <p>Essayez de modifier vos crit&egrave;res de recherche.</p>
        </div>
      ) : (
        <div className="card-grid">
          {restaurants.map((r) => (
            <Link to={`/restaurants/${r.id}`} key={r.id} className="card">
              <div className="card-image-wrapper">
                <img
                  src={r.image}
                  alt={r.nom}
                  className="card-image"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400'; }}
                />
                <div className="card-image-overlay"></div>
              </div>
              <div className="card-body">
                <h3 className="card-title">{r.nom}</h3>
                <p className="card-subtitle">{r.cuisine} &mdash; {r.adresse}</p>
                <p className="card-description">{r.description}</p>
                <div className="card-footer">
                  <StarRating rating={r.note || 0} />
                  <div className="badges">
                    {r.categories && r.categories.slice(0, 2).map((c) => (
                      <span key={c.id} className="badge">{c.nom}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
