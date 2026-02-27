import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { restaurantApi, hotelApi } from '../api/apiClient';
import StarRating from '../components/StarRating';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restoRes, hotelRes] = await Promise.all([
          restaurantApi.getAll(),
          hotelApi.getAll(),
        ]);
        setRestaurants(restoRes.data.slice(0, 3));
        setHotels(hotelRes.data.slice(0, 3));
      } catch (err) {
        console.error('Erreur chargement donn\u00e9es:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="african-pattern"></div>
        <div className="hero-label">Guide Gastronomique</div>
        <h1>
          D&eacute;couvrez l'Excellence<br />
          <span className="gold-text">Culinaire Africaine</span>
        </h1>
        <p>
          Une s&eacute;lection prestigieuse des plus belles tables et des plus beaux
          &eacute;tablissements du continent africain.
        </p>
        <div className="hero-actions">
          <Link to="/restaurants" className="btn btn-primary">
            Explorer les Restaurants
          </Link>
          <Link to="/hotels" className="btn btn-secondary">
            D&eacute;couvrir les H&ocirc;tels
          </Link>
        </div>
      </div>

      {/* Stats */}
      {!loading && (
        <div className="home-stats">
          <div className="stat-card">
            <div className="stat-number">{restaurants.length}+</div>
            <div className="stat-label">Restaurants</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{hotels.length}+</div>
            <div className="stat-label">H&ocirc;tels</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">54</div>
            <div className="stat-label">Pays Africains</div>
          </div>
        </div>
      )}

      {/* Featured Restaurants */}
      <div className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Restaurants en Vedette</h2>
            <div className="section-divider"></div>
          </div>
          <Link to="/restaurants" className="btn btn-outline btn-sm">
            Voir tout
          </Link>
        </div>
        {loading ? (
          <div className="loading-container"><div className="spinner"></div></div>
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

      <div className="gold-line"></div>

      {/* Featured Hotels */}
      <div className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">H&ocirc;tels en Vedette</h2>
            <div className="section-divider"></div>
          </div>
          <Link to="/hotels" className="btn btn-outline btn-sm">
            Voir tout
          </Link>
        </div>
        {loading ? (
          <div className="loading-container"><div className="spinner"></div></div>
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
                    <span className="hotel-stars">{'★'.repeat(h.etoiles || 0)}</span>
                    {' \u2014 '}{h.adresse}
                  </p>
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
    </div>
  );
};

export default Home;
