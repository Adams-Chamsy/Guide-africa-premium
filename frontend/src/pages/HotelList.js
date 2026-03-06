import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hotelApi, cityApi } from '../api/apiClient';
import Pagination from '../components/Pagination';
import Breadcrumbs from '../components/Breadcrumbs';
import FavoriteButton from '../components/FavoriteButton';
import BackToTop from '../components/BackToTop';
import { SkeletonGrid } from '../components/Skeleton';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';
import { useTranslation } from 'react-i18next';

const HotelList = () => {
  const { t } = useTranslation();
  usePageTitle(t('hotel.title'));
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchNom, setSearchNom] = useState('');
  const [filterEtoiles, setFilterEtoiles] = useState('');
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

  const fetchHotels = async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page, size: 9, sortBy, direction };
      if (searchNom.trim()) params.nom = searchNom.trim();
      if (filterEtoiles) params.etoilesMin = parseInt(filterEtoiles);
      if (filterVille) params.villeId = filterVille;
      if (filterPrix) params.prixMax = parseFloat(filterPrix);
      const res = await hotelApi.getAll(params);
      if (res.data.content) {
        setHotels(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
      } else {
        setHotels(res.data);
        setTotalPages(1);
        setTotalElements(res.data.length);
      }
    } catch (err) {
      setError(t('hotel.loadError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortBy, direction, filterEtoiles, filterVille, filterPrix]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchHotels();
  };

  const clearFilters = () => {
    setSearchNom('');
    setFilterEtoiles('');
    setFilterVille('');
    setFilterPrix('');
    setPage(0);
  };

  return (
    <>
      <SEOHead title={t('hotel.title')} description={t('home.subtitle')} />
      <div>
        <Breadcrumbs items={[{ label: t('nav.home'), to: '/' }, { label: t('hotel.title') }]} />

        <div className="page-header">
          <div className="page-label">{t('hotel.pageLabel')}</div>
          <h2>{t('hotel.title')}</h2>
          <p className="page-subtitle">{totalElements} {t('common.establishments')} {t('common.toDiscover')}</p>
          <div className="gold-line" style={{ marginTop: 16 }}></div>
        </div>

        <div className="section-header" style={{ marginBottom: 0 }}>
          <div></div>
          <Link to="/hotels/new" className="btn btn-primary">+ {t('common.add')}</Link>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input type="text" className="search-input" placeholder={t('common.searchByName')}
            value={searchNom} onChange={(e) => setSearchNom(e.target.value)} />
          <select className="search-select" value={filterEtoiles} onChange={(e) => { setFilterEtoiles(e.target.value); setPage(0); }}>
            <option value="">{t('hotel.allStars')}</option>
            <option value="5">5 {t('hotel.stars')}</option>
            <option value="4">4+ {t('hotel.stars')}</option>
            <option value="3">3+ {t('hotel.stars')}</option>
          </select>
          <select className="search-select" value={filterVille} onChange={(e) => { setFilterVille(e.target.value); setPage(0); }}>
            <option value="">{t('common.allCities')}</option>
            {cities.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
          </select>
          <select className="search-select" value={filterPrix} onChange={(e) => { setFilterPrix(e.target.value); setPage(0); }}>
            <option value="">{t('common.allPrices')}</option>
            <option value="150">{t('hotel.lessThan')} 150{'\u20ac'}/{t('hotel.perNight').trim()}</option>
            <option value="300">{t('hotel.lessThan')} 300{'\u20ac'}/{t('hotel.perNight').trim()}</option>
            <option value="500">{t('hotel.lessThan')} 500{'\u20ac'}/{t('hotel.perNight').trim()}</option>
          </select>
          <button type="submit" className="btn btn-primary btn-sm">{t('common.search')}</button>
          {(searchNom || filterEtoiles || filterVille || filterPrix) && (
            <button type="button" className="btn btn-outline btn-sm" onClick={clearFilters}>{t('common.clear')}</button>
          )}
        </form>

        <div className="sort-controls">
          <span className="sort-label">{t('common.sortBy')}</span>
          <select className="sort-select" value={`${sortBy}-${direction}`} onChange={(e) => {
            const [s, d] = e.target.value.split('-');
            setSortBy(s);
            setDirection(d);
            setPage(0);
          }}>
            <option value="nom-asc">{t('common.nameAZ')}</option>
            <option value="nom-desc">{t('common.nameZA')}</option>
            <option value="etoiles-desc">{t('hotel.moreStars')}</option>
            <option value="prixParNuit-asc">{t('common.priceAsc')}</option>
            <option value="prixParNuit-desc">{t('common.priceDesc')}</option>
            <option value="note-desc">{t('common.bestRating')}</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <SkeletonGrid count={6} />
        ) : hotels.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">&#127976;</div>
            <h3>{t('hotel.noHotels')}</h3>
            <p>{t('common.tryModifySearch')}</p>
          </div>
        ) : (
          <>
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
                      <span className="hotel-stars">{'\u2605'.repeat(h.etoiles || 0)}{'\u2606'.repeat(5 - (h.etoiles || 0))}</span>
                      {h.ville && <> &mdash; {h.ville.nom}, {h.ville.pays}</>}
                    </p>
                    <p className="card-description">{h.description}</p>
                    <div className="card-footer">
                      <span className="price">{h.prixParNuit}\u20ac {t('hotel.perNight')}</span>
                      <div className="badges">
                        {h.wifi && <span className="badge badge-amenity">Wi-Fi</span>}
                        {h.piscine && <span className="badge badge-amenity">{t('hotel.pool')}</span>}
                        {h.spa && <span className="badge badge-amenity">{t('hotel.spa')}</span>}
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
    </>
  );
};

export default HotelList;
