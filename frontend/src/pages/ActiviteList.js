import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiClock, FiStar, FiUsers, FiCompass, FiFilter } from 'react-icons/fi';
import { activiteApi, cityApi } from '../api/apiClient';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import { SkeletonGrid } from '../components/Skeleton';
import StarRating from '../components/StarRating';
import BackToTop from '../components/BackToTop';
import usePageTitle from '../hooks/usePageTitle';
import PropTypes from 'prop-types';

const categorieLabels = {
  SAFARI: 'Safari',
  EXCURSION: 'Excursion',
  CULTURE: 'Culture',
  GASTRONOMIE: 'Gastronomie',
  SPORT: 'Sport',
  AVENTURE: 'Aventure',
  DETENTE: 'Détente',
  ARTISANAT: 'Artisanat',
};

const difficulteColors = {
  FACILE: '#27ae60',
  MOYEN: '#f39c12',
  DIFFICILE: '#e74c3c',
};

const difficulteLabels = {
  FACILE: 'Facile',
  MOYEN: 'Moyen',
  DIFFICILE: 'Difficile',
};

const formatPrix = (prix) => {
  if (prix == null) return '';
  return prix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
};

const ActiviteList = () => {
  usePageTitle('Activités');
  const [activites, setActivites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterCategorie, setFilterCategorie] = useState('');
  const [filterVille, setFilterVille] = useState('');
  const [filterDifficulte, setFilterDifficulte] = useState('');
  const [filterPrixMax, setFilterPrixMax] = useState('');
  const [sortBy, setSortBy] = useState('dateCreation');
  const [direction, setDirection] = useState('desc');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    cityApi.getAll().then(res => setCities(res.data)).catch(() => {});
  }, []);

  const fetchActivites = async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page, size: 9, sortBy, direction };
      if (search.trim()) params.search = search.trim();
      if (filterCategorie) params.categorie = filterCategorie;
      if (filterVille) params.villeId = filterVille;
      if (filterDifficulte) params.difficulte = filterDifficulte;
      if (filterPrixMax) params.prixMax = parseInt(filterPrixMax);
      const res = await activiteApi.getAll(params);
      if (res.data.content) {
        setActivites(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
      } else {
        setActivites(res.data);
        setTotalPages(1);
        setTotalElements(res.data.length);
      }
    } catch (err) {
      setError('Erreur lors du chargement des activit\u00e9s.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortBy, direction, filterCategorie, filterVille, filterDifficulte, filterPrixMax]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchActivites();
  };

  const clearFilters = () => {
    setSearch('');
    setFilterCategorie('');
    setFilterVille('');
    setFilterDifficulte('');
    setFilterPrixMax('');
    setPage(0);
  };

  const hasFilters = search || filterCategorie || filterVille || filterDifficulte || filterPrixMax;

  return (
    <>
      <SEOHead title="Activit\u00e9s" description="D\u00e9couvrez les meilleures activit\u00e9s et exp\u00e9riences en Afrique" />
      <div>
        <Breadcrumbs items={[{ label: 'Accueil', to: '/' }, { label: 'Activit\u00e9s' }]} />

        <div className="page-header">
          <div className="page-label">Exp\u00e9riences Uniques</div>
          <h2>Activit\u00e9s</h2>
          <p className="page-subtitle">{totalElements} activit\u00e9s \u00e0 d\u00e9couvrir</p>
          <div className="gold-line" style={{ marginTop: 16 }}></div>
        </div>

        <div className="section-header" style={{ marginBottom: 0 }}>
          <div></div>
          <Link to="/activites/new" className="btn btn-primary">+ Ajouter</Link>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher une activit\u00e9..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="search-select"
            value={filterCategorie}
            onChange={(e) => { setFilterCategorie(e.target.value); setPage(0); }}
          >
            <option value="">Toutes les cat\u00e9gories</option>
            {Object.entries(categorieLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <select
            className="search-select"
            value={filterVille}
            onChange={(e) => { setFilterVille(e.target.value); setPage(0); }}
          >
            <option value="">Toutes les villes</option>
            {cities.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
          </select>
          <select
            className="search-select"
            value={filterDifficulte}
            onChange={(e) => { setFilterDifficulte(e.target.value); setPage(0); }}
          >
            <option value="">Toutes les difficult\u00e9s</option>
            {Object.entries(difficulteLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <input
            type="number"
            className="search-input"
            placeholder="Prix max (FCFA)"
            value={filterPrixMax}
            onChange={(e) => { setFilterPrixMax(e.target.value); setPage(0); }}
            style={{ maxWidth: 160 }}
            min="0"
          />
          <button type="submit" className="btn btn-primary btn-sm">
            <FiSearch style={{ verticalAlign: -2, marginRight: 4 }} />
            Rechercher
          </button>
          {hasFilters && (
            <button type="button" className="btn btn-outline btn-sm" onClick={clearFilters}>Effacer</button>
          )}
        </form>

        <div className="sort-controls">
          <span className="sort-label"><FiFilter style={{ verticalAlign: -2, marginRight: 4 }} />Trier par :</span>
          <select className="sort-select" value={`${sortBy}-${direction}`} onChange={(e) => {
            const [s, d] = e.target.value.split('-');
            setSortBy(s);
            setDirection(d);
            setPage(0);
          }}>
            <option value="dateCreation-desc">Plus r\u00e9cents</option>
            <option value="dateCreation-asc">Plus anciens</option>
            <option value="note-desc">Meilleure note</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix d\u00e9croissant</option>
            <option value="titre-asc">Nom (A-Z)</option>
            <option value="titre-desc">Nom (Z-A)</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <SkeletonGrid count={9} />
        ) : activites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><FiCompass size={48} /></div>
            <h3>Aucune activit\u00e9 trouv\u00e9e</h3>
            <p>Essayez de modifier vos crit\u00e8res de recherche.</p>
          </div>
        ) : (
          <>
            <div className="card-grid">
              {activites.map((activite, idx) => (
                <motion.div
                  key={activite.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/activites/${activite.id}`} className="card">
                    <div className="card-image-wrapper">
                      <img
                        src={activite.imageCouverture}
                        alt={activite.titre}
                        className="card-image"
                        loading="lazy"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400'; }}
                      />
                      <div className="card-image-overlay"></div>
                      {activite.categorie && (
                        <span className="card-prix-badge" style={{ background: 'var(--gold)' }}>
                          {categorieLabels[activite.categorie] || activite.categorie}
                        </span>
                      )}
                      {activite.difficulte && (
                        <span
                          className="card-prix-badge"
                          style={{
                            background: difficulteColors[activite.difficulte] || '#888',
                            top: 'auto',
                            bottom: 12,
                            right: 12,
                          }}
                        >
                          {difficulteLabels[activite.difficulte] || activite.difficulte}
                        </span>
                      )}
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">{activite.titre}</h3>
                      <p className="card-subtitle">
                        {activite.lieu && (
                          <span><FiMapPin size={13} style={{ verticalAlign: -2, marginRight: 4 }} />{activite.lieu}</span>
                        )}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '8px 0', fontSize: '0.85rem', color: 'var(--ivory-muted)' }}>
                        {activite.duree && (
                          <span><FiClock size={13} style={{ verticalAlign: -2, marginRight: 4 }} />{activite.duree}</span>
                        )}
                        {activite.placesMax && (
                          <span><FiUsers size={13} style={{ verticalAlign: -2, marginRight: 4 }} />{activite.placesMax} places</span>
                        )}
                      </div>
                      <div className="card-footer">
                        <StarRating rating={activite.note || 0} />
                        {activite.prix != null && (
                          <span className="price" style={{ color: 'var(--gold)', fontWeight: 600 }}>
                            {formatPrix(activite.prix)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
        <BackToTop />
      </div>
    </>
  );
};

export default ActiviteList;
