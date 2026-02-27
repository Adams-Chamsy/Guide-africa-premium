import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hotelApi } from '../api/apiClient';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchNom, setSearchNom] = useState('');
  const [filterEtoiles, setFilterEtoiles] = useState('');

  const fetchHotels = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (searchNom.trim()) params.nom = searchNom.trim();
      else if (filterEtoiles) params.etoilesMin = parseInt(filterEtoiles);
      const res = await hotelApi.getAll(params);
      setHotels(res.data);
    } catch (err) {
      setError('Erreur lors du chargement des h\u00f4tels.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterEtoiles]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHotels();
  };

  const clearFilters = () => {
    setSearchNom('');
    setFilterEtoiles('');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-label">S&eacute;jours d'Exception</div>
        <h2>H&ocirc;tels</h2>
        <div className="gold-line" style={{ marginTop: 16 }}></div>
      </div>

      <div className="section-header" style={{ marginBottom: 0 }}>
        <div></div>
        <Link to="/hotels/new" className="btn btn-primary">
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
          value={filterEtoiles}
          onChange={(e) => {
            setSearchNom('');
            setFilterEtoiles(e.target.value);
          }}
        >
          <option value="">Toutes les &eacute;toiles</option>
          <option value="5">5 &eacute;toiles</option>
          <option value="4">4+ &eacute;toiles</option>
          <option value="3">3+ &eacute;toiles</option>
        </select>
        <button type="submit" className="btn btn-primary btn-sm">Rechercher</button>
        {(searchNom || filterEtoiles) && (
          <button type="button" className="btn btn-outline btn-sm" onClick={clearFilters}>
            Effacer
          </button>
        )}
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-container"><div className="spinner"></div></div>
      ) : hotels.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">&#127976;</div>
          <h3>Aucun h&ocirc;tel trouv&eacute;</h3>
          <p>Essayez de modifier vos crit&egrave;res de recherche.</p>
        </div>
      ) : (
        <div className="card-grid">
          {hotels.map((h) => (
            <Link to={`/hotels/${h.id}`} key={h.id} className="card">
              <div className="card-image-wrapper">
                <img
                  src={h.image}
                  alt={h.nom}
                  className="card-image"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'; }}
                />
                <div className="card-image-overlay"></div>
              </div>
              <div className="card-body">
                <h3 className="card-title">{h.nom}</h3>
                <p className="card-subtitle">
                  <span className="hotel-stars">{'★'.repeat(h.etoiles || 0)}{'☆'.repeat(5 - (h.etoiles || 0))}</span>
                  {' \u2014 '}{h.adresse}
                </p>
                <p className="card-description">{h.description}</p>
                <div className="card-footer">
                  <span className="price">{h.prixParNuit}\u20AC / nuit</span>
                  <div className="badges">
                    {h.categories && h.categories.slice(0, 2).map((c) => (
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

export default HotelList;
