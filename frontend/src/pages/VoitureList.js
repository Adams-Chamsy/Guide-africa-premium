import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiStar, FiFilter, FiPlus, FiSettings, FiDroplet, FiWind } from 'react-icons/fi';
import { voitureApi, cityApi } from '../api/apiClient';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import BackToTop from '../components/BackToTop';
import { SkeletonGrid } from '../components/Skeleton';
import usePageTitle from '../hooks/usePageTitle';
import PropTypes from 'prop-types';

const formatPrix = (prix) => {
  if (!prix) return '';
  return prix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA/jour';
};

const VoitureList = () => {
  usePageTitle('Location de Voitures');
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchMarque, setSearchMarque] = useState('');
  const [filterCategorie, setFilterCategorie] = useState('');
  const [filterVille, setFilterVille] = useState('');
  const [filterTransmission, setFilterTransmission] = useState('');
  const [filterPrixMax, setFilterPrixMax] = useState('');
  const [sortBy, setSortBy] = useState('marque');
  const [direction, setDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    cityApi.getAll().then(res => setCities(res.data)).catch(() => {});
  }, []);

  const fetchVoitures = async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page, size: 9, sortBy, direction };
      if (searchMarque.trim()) params.marque = searchMarque.trim();
      if (filterCategorie) params.categorie = filterCategorie;
      if (filterVille) params.villeId = filterVille;
      if (filterTransmission) params.transmission = filterTransmission;
      if (filterPrixMax) params.prixMax = parseFloat(filterPrixMax);
      const res = await voitureApi.getAll(params);
      if (res.data.content) {
        setVoitures(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
      } else {
        setVoitures(res.data);
        setTotalPages(1);
        setTotalElements(res.data.length);
      }
    } catch (err) {
      setError('Erreur lors du chargement des voitures.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoitures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortBy, direction, filterCategorie, filterVille, filterTransmission, filterPrixMax]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchVoitures();
  };

  const clearFilters = () => {
    setSearchMarque('');
    setFilterCategorie('');
    setFilterVille('');
    setFilterTransmission('');
    setFilterPrixMax('');
    setPage(0);
  };

  return (
    <>
      <SEOHead title="Location de Voitures" description="Louez une voiture de qualit\u00e9 en Afrique avec Guide Africa Premium" />
      <div>
        <Breadcrumbs items={[{ label: 'Accueil', to: '/' }, { label: 'Voitures' }]} />

        <div className="page-header">
          <div className="page-label">Mobilit\u00e9 Premium</div>
          <h2>Location de Voitures</h2>
          <p className="page-subtitle">{totalElements} v\u00e9hicules disponibles</p>
          <div className="gold-line" style={{ marginTop: 16 }}></div>
        </div>

        <div className="section-header" style={{ marginBottom: 0 }}>
          <div></div>
          <Link to="/voitures/proposer" className="btn btn-primary"><FiPlus style={{ marginRight: 6 }} /> Proposer ma voiture</Link>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input type="text" className="search-input" placeholder="Rechercher par marque ou mod\u00e8le..."
            value={searchMarque} onChange={(e) => setSearchMarque(e.target.value)} />
          <select className="search-select" value={filterCategorie} onChange={(e) => { setFilterCategorie(e.target.value); setPage(0); }}>
            <option value="">Toutes les cat\u00e9gories</option>
            <option value="BERLINE">Berline</option>
            <option value="SUV">SUV</option>
            <option value="CITADINE">Citadine</option>
            <option value="MONOSPACE">Monospace</option>
            <option value="LUXE">Luxe</option>
            <option value="PICKUP">Pickup</option>
            <option value="UTILITAIRE">Utilitaire</option>
          </select>
          <select className="search-select" value={filterVille} onChange={(e) => { setFilterVille(e.target.value); setPage(0); }}>
            <option value="">Toutes les villes</option>
            {cities.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
          </select>
          <select className="search-select" value={filterTransmission} onChange={(e) => { setFilterTransmission(e.target.value); setPage(0); }}>
            <option value="">Toutes transmissions</option>
            <option value="MANUELLE">Manuelle</option>
            <option value="AUTOMATIQUE">Automatique</option>
          </select>
          <input type="number" className="search-input" placeholder="Prix max/jour" style={{ maxWidth: 140 }}
            value={filterPrixMax} onChange={(e) => { setFilterPrixMax(e.target.value); setPage(0); }} />
          <button type="submit" className="btn btn-primary btn-sm"><FiSearch style={{ marginRight: 4 }} /> Rechercher</button>
          {(searchMarque || filterCategorie || filterVille || filterTransmission || filterPrixMax) && (
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
            <option value="marque-asc">Marque (A-Z)</option>
            <option value="marque-desc">Marque (Z-A)</option>
            <option value="prixParJour-asc">Prix croissant</option>
            <option value="prixParJour-desc">Prix d\u00e9croissant</option>
            <option value="annee-desc">Plus r\u00e9centes</option>
            <option value="note-desc">Meilleure note</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <SkeletonGrid count={6} />
        ) : voitures.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">&#128663;</div>
            <h3>Aucune voiture trouv\u00e9e</h3>
            <p>Essayez de modifier vos crit\u00e8res de recherche.</p>
          </div>
        ) : (
          <>
            <div className="card-grid">
              {voitures.map((v, index) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link to={`/voitures/${v.id}`} className="card">
                    <div className="card-image-wrapper">
                      <img src={v.imagePrincipale} alt={`${v.marque} ${v.modele}`} className="card-image" loading="lazy"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afe?w=400'; }} />
                      <div className="card-image-overlay"></div>
                      {v.categorie && (
                        <span className="badge" style={{ position: 'absolute', top: 12, left: 12 }}>{v.categorie}</span>
                      )}
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">{v.marque} {v.modele}</h3>
                      <p className="card-subtitle">
                        {v.annee && <span>{v.annee}</span>}
                        {v.ville && <> &mdash; <FiMapPin style={{ verticalAlign: 'middle', marginRight: 2 }} />{v.ville.nom}</>}
                      </p>
                      <div className="badges" style={{ margin: '8px 0', gap: 6, display: 'flex', flexWrap: 'wrap' }}>
                        {v.transmission && <span className="badge badge-amenity"><FiSettings size={12} /> {v.transmission}</span>}
                        {v.climatisation && <span className="badge badge-amenity"><FiWind size={12} /> Clim</span>}
                        {v.gps && <span className="badge badge-amenity"><FiMapPin size={12} /> GPS</span>}
                        {v.bluetooth && <span className="badge badge-amenity">BT</span>}
                      </div>
                      <div className="card-footer">
                        <span className="price">{formatPrix(v.prixParJour)}</span>
                        {v.note && (
                          <span className="review-count">
                            <FiStar style={{ color: 'var(--gold)', verticalAlign: 'middle' }} /> {v.note.toFixed(1)}
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

VoitureList.propTypes = {};

export default VoitureList;
