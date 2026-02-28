import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { restaurantApi, cityApi } from '../api/apiClient';
import StarRating from '../components/StarRating';
import Pagination from '../components/Pagination';
import Breadcrumbs from '../components/Breadcrumbs';
import FavoriteButton from '../components/FavoriteButton';
import DistinctionBadge from '../components/DistinctionBadge';
import BackToTop from '../components/BackToTop';
import { SkeletonGrid } from '../components/Skeleton';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchNom, setSearchNom] = useState('');
  const [filterCuisine, setFilterCuisine] = useState('');
  const [filterVille, setFilterVille] = useState('');
  const [filterPrix, setFilterPrix] = useState('');
  const [sortBy, setSortBy] = useState('nom');
  const [direction, setDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    cityApi.getAll().then(res => setCities(res.data)).catch(() => {});
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page, size: 9, sortBy, direction };
      if (searchNom.trim()) params.nom = searchNom.trim();
      if (filterCuisine) params.cuisine = filterCuisine;
      if (filterVille) params.villeId = filterVille;
      if (filterPrix) params.fourchettePrix = parseInt(filterPrix);
      const res = await restaurantApi.getAll(params);
      if (res.data.content) {
        setRestaurants(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
      } else {
        setRestaurants(res.data);
        setTotalPages(1);
        setTotalElements(res.data.length);
      }
    } catch (err) {
      setError('Erreur lors du chargement des restaurants.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortBy, direction, filterCuisine, filterVille, filterPrix]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchRestaurants();
  };

  const clearFilters = () => {
    setSearchNom('');
    setFilterCuisine('');
    setFilterVille('');
    setFilterPrix('');
    setPage(0);
  };

  const prixLabels = { 1: '€', 2: '€€', 3: '€€€', 4: '€€€€' };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Accueil', to: '/' }, { label: 'Restaurants' }]} />

      <div className="page-header">
        <div className="page-label">Notre Sélection</div>
        <h2>Restaurants</h2>
        <p className="page-subtitle">{totalElements} établissements à découvrir</p>
        <div className="gold-line" style={{ marginTop: 16 }}></div>
      </div>

      <div className="section-header" style={{ marginBottom: 0 }}>
        <div></div>
        <Link to="/restaurants/new" className="btn btn-primary">+ Ajouter</Link>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input type="text" className="search-input" placeholder="Rechercher par nom..."
          value={searchNom} onChange={(e) => setSearchNom(e.target.value)} />
        <select className="search-select" value={filterCuisine} onChange={(e) => { setFilterCuisine(e.target.value); setPage(0); }}>
          <option value="">Toutes les cuisines</option>
          <option value="Sénégalaise">Sénégalaise</option>
          <option value="Marocaine">Marocaine</option>
          <option value="Ivoirienne">Ivoirienne</option>
          <option value="Afro-fusion">Afro-fusion</option>
          <option value="Éthiopienne">Éthiopienne</option>
          <option value="Nigériane">Nigériane</option>
        </select>
        <select className="search-select" value={filterVille} onChange={(e) => { setFilterVille(e.target.value); setPage(0); }}>
          <option value="">Toutes les villes</option>
          {cities.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
        </select>
        <select className="search-select" value={filterPrix} onChange={(e) => { setFilterPrix(e.target.value); setPage(0); }}>
          <option value="">Tous les prix</option>
          <option value="1">€ - Économique</option>
          <option value="2">€€ - Modéré</option>
          <option value="3">€€€ - Haut de gamme</option>
          <option value="4">€€€€ - Prestige</option>
        </select>
        <button type="submit" className="btn btn-primary btn-sm">Rechercher</button>
        {(searchNom || filterCuisine || filterVille || filterPrix) && (
          <button type="button" className="btn btn-outline btn-sm" onClick={clearFilters}>Effacer</button>
        )}
      </form>

      <div className="sort-controls">
        <span className="sort-label">Trier par :</span>
        <select className="sort-select" value={`${sortBy}-${direction}`} onChange={(e) => {
          const [s, d] = e.target.value.split('-');
          setSortBy(s);
          setDirection(d);
          setPage(0);
        }}>
          <option value="nom-asc">Nom (A-Z)</option>
          <option value="nom-desc">Nom (Z-A)</option>
          <option value="note-desc">Meilleure note</option>
          <option value="fourchettePrix-asc">Prix croissant</option>
          <option value="fourchettePrix-desc">Prix décroissant</option>
          <option value="createdAt-desc">Plus récents</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <SkeletonGrid count={6} />
      ) : restaurants.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">&#127869;</div>
          <h3>Aucun restaurant trouvé</h3>
          <p>Essayez de modifier vos critères de recherche.</p>
        </div>
      ) : (
        <>
          <div className="card-grid">
            {restaurants.map((r) => (
              <Link to={`/restaurants/${r.id}`} key={r.id} className="card">
                <div className="card-image-wrapper">
                  <img src={r.image} alt={r.nom} className="card-image"
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
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
      <BackToTop />
    </div>
  );
};

export default RestaurantList;
