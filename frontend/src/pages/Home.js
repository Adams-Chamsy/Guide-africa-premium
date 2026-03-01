import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { restaurantApi, hotelApi, cityApi } from '../api/apiClient';
import StarRating from '../components/StarRating';
import FavoriteButton from '../components/FavoriteButton';
import DistinctionBadge from '../components/DistinctionBadge';
import { SkeletonGrid } from '../components/Skeleton';
import BackToTop from '../components/BackToTop';
import usePageTitle from '../hooks/usePageTitle';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FiArrowRight } from 'react-icons/fi';

const Home = () => {
  usePageTitle('Accueil');
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [totalHotels, setTotalHotels] = useState(0);
  const [loading, setLoading] = useState(true);

  const prixLabels = { 1: '€', 2: '€€', 3: '€€€', 4: '€€€€' };
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restoRes, hotelRes, cityRes] = await Promise.all([
          restaurantApi.getAll({ sortBy: 'note', direction: 'desc', size: 3 }),
          hotelApi.getAll({ sortBy: 'note', direction: 'desc', size: 3 }),
          cityApi.getAll(),
        ]);
        const restoData = restoRes.data.content || restoRes.data;
        const hotelData = hotelRes.data.content || hotelRes.data;
        setRestaurants(Array.isArray(restoData) ? restoData.slice(0, 3) : restoData);
        setHotels(Array.isArray(hotelData) ? hotelData.slice(0, 3) : hotelData);
        setTotalRestaurants(restoRes.data.totalElements || restoData.length || 0);
        setTotalHotels(hotelRes.data.totalElements || hotelData.length || 0);
        setCities(cityRes.data.slice(0, 4));
      } catch (err) {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <div className="hero">
          <div className="african-pattern"></div>
          <div className="hero-label">Guide Gastronomique</div>
          <h1>
            Découvrez l'Excellence<br />
            <span className="gold-text">Culinaire Africaine</span>
          </h1>
          <p>
            Une sélection prestigieuse des plus belles tables et des plus beaux
            établissements du continent africain.
          </p>
          <div className="hero-actions">
            <Link to="/restaurants" className="btn btn-primary">
              Explorer les Restaurants <FiArrowRight style={{ marginLeft: 6, verticalAlign: 'middle' }} />
            </Link>
            <Link to="/hotels" className="btn btn-secondary">
              Découvrir les Hôtels <FiArrowRight style={{ marginLeft: 6, verticalAlign: 'middle' }} />
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="section-divider ornamental"><span className="divider-icon">◆</span></div>

      {/* Stats */}
      {!loading && (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div className="home-stats" ref={statsRef}>
            <div className="stat-card">
              <div className="stat-number">
                {statsInView ? <CountUp end={totalRestaurants} duration={2.5} separator=" " /> : 0}
              </div>
              <div className="stat-label">Restaurants</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {statsInView ? <CountUp end={totalHotels} duration={2.5} separator=" " /> : 0}
              </div>
              <div className="stat-label">Hôtels</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {statsInView ? <><CountUp end={cities.length} duration={2.5} separator=" " />+</> : '0+'}
              </div>
              <div className="stat-label">Destinations</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {statsInView ? <CountUp end={54} duration={2.5} separator=" " /> : 0}
              </div>
              <div className="stat-label">Pays Africains</div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="section-divider ornamental"><span className="divider-icon">◆</span></div>

      {/* Featured Restaurants */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <div className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Restaurants en Vedette</h2>
              <div className="section-divider"></div>
            </div>
            <Link to="/restaurants" className="btn btn-outline btn-sm">
              Voir tout <FiArrowRight style={{ marginLeft: 4, verticalAlign: 'middle' }} />
            </Link>
          </div>
          {loading ? (
            <SkeletonGrid count={3} />
          ) : (
            <div className="card-grid">
              {restaurants.map((r) => (
                <Link to={`/restaurants/${r.id}`} key={r.id} className="card">
                  <div className="card-image-wrapper">
                    <img src={r.image} alt={r.nom} className="card-image" loading="lazy"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400'; }} />
                    <div className="card-image-overlay"></div>
                    <FavoriteButton type="restaurants" id={r.id} className="card-favorite" />
                    {r.fourchettePrix && (
                      <span className="card-prix-badge">{prixLabels[r.fourchettePrix]}</span>
                    )}
                    {r.distinctions && r.distinctions.length > 0 && (
                      <div className="card-distinctions">
                        {r.distinctions.slice(0, 1).map((d, i) => (
                          <DistinctionBadge key={i} type={d.type} size="small" />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{r.nom}</h3>
                    <p className="card-subtitle">
                      {r.cuisine}
                      {r.ville && <> &mdash; {r.ville.nom}, {r.ville.pays}</>}
                    </p>
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
      </motion.div>

      <div className="gold-line"></div>

      <div className="section-divider ornamental"><span className="divider-icon">◆</span></div>

      {/* Destinations */}
      {!loading && cities.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Destinations Populaires</h2>
                <div className="section-divider"></div>
              </div>
              <Link to="/destinations" className="btn btn-outline btn-sm">
                Toutes les destinations <FiArrowRight style={{ marginLeft: 4, verticalAlign: 'middle' }} />
              </Link>
            </div>
            <div className="destinations-grid">
              {cities.map(city => (
                <Link to={`/restaurants?villeId=${city.id}`} key={city.id} className="destination-card">
                  <div className="destination-image-wrapper">
                    <img src={city.image} alt={city.nom} className="destination-image" loading="lazy"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400'; }} />
                    <div className="destination-overlay">
                      <h3 className="destination-name">{city.nom}</h3>
                      <p className="destination-country">{city.pays}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="gold-line"></div>

      <div className="section-divider ornamental"><span className="divider-icon">◆</span></div>

      {/* Featured Hotels */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <div className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Hôtels en Vedette</h2>
              <div className="section-divider"></div>
            </div>
            <Link to="/hotels" className="btn btn-outline btn-sm">
              Voir tout <FiArrowRight style={{ marginLeft: 4, verticalAlign: 'middle' }} />
            </Link>
          </div>
          {loading ? (
            <SkeletonGrid count={3} />
          ) : (
            <div className="card-grid">
              {hotels.map((h) => (
                <Link to={`/hotels/${h.id}`} key={h.id} className="card">
                  <div className="card-image-wrapper">
                    <img src={h.image} alt={h.nom} className="card-image" loading="lazy"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'; }} />
                    <div className="card-image-overlay"></div>
                    <FavoriteButton type="hotels" id={h.id} className="card-favorite" />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{h.nom}</h3>
                    <p className="card-subtitle">
                      <span className="hotel-stars">{'★'.repeat(h.etoiles || 0)}</span>
                      {h.ville && <> &mdash; {h.ville.nom}, {h.ville.pays}</>}
                    </p>
                    <p className="card-description">{h.description}</p>
                    <div className="card-footer">
                      <span className="price">{h.prixParNuit}€ / nuit</span>
                      <div className="badges">
                        {h.wifi && <span className="badge badge-amenity">Wi-Fi</span>}
                        {h.piscine && <span className="badge badge-amenity">Piscine</span>}
                        {h.spa && <span className="badge badge-amenity">Spa</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <BackToTop />
    </div>
  );
};

export default Home;
