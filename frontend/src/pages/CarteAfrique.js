import React, { useState, useEffect } from 'react';
import { restaurantApi, hotelApi } from '../api/apiClient';
import MapView from '../components/MapView';
import Breadcrumbs from '../components/Breadcrumbs';
import { useToast } from '../context/ToastContext';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';

const CarteAfrique = () => {
  usePageTitle('Carte');
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [showRestaurants, setShowRestaurants] = useState(true);
  const [showHotels, setShowHotels] = useState(true);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [restoRes, hotelRes] = await Promise.all([
          restaurantApi.getAll(),
          hotelApi.getAll(),
        ]);
        setRestaurants(restoRes.data.content || restoRes.data || []);
        setHotels(hotelRes.data.content || hotelRes.data || []);
      } catch (err) {
        showToast('Erreur lors du chargement des donn\u00e9es de la carte.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restaurantMarkers = showRestaurants
    ? restaurants
        .filter((r) => r.coordonneesGps && r.coordonneesGps.lat && r.coordonneesGps.lng)
        .map((r) => ({
          lat: r.coordonneesGps.lat,
          lng: r.coordonneesGps.lng,
          name: r.nom,
          type: 'restaurant',
          id: r.id,
          image: r.image,
          note: r.note,
        }))
    : [];

  const hotelMarkers = showHotels
    ? hotels
        .filter((h) => h.coordonneesGps && h.coordonneesGps.lat && h.coordonneesGps.lng)
        .map((h) => ({
          lat: h.coordonneesGps.lat,
          lng: h.coordonneesGps.lng,
          name: h.nom,
          type: 'hotel',
          id: h.id,
          image: h.image,
          note: h.note,
        }))
    : [];

  const allMarkers = [...restaurantMarkers, ...hotelMarkers];

  return (
    <>
      <SEOHead title="Carte" description="Carte interactive des etablissements" />
      <div>
        <Breadcrumbs items={[
          { label: 'Accueil', to: '/' },
          { label: 'Carte' },
        ]} />

        <div className="map-page-header">
          <h2 className="section-title">Carte de l'Afrique</h2>
          <p className="page-subtitle">Explorez nos \u00e9tablissements</p>
        </div>

        <div className="map-filters">
          <label className="map-filter-toggle">
            <input
              type="checkbox"
              checked={showRestaurants}
              onChange={(e) => setShowRestaurants(e.target.checked)}
            />
            Restaurants
          </label>
          <label className="map-filter-toggle">
            <input
              type="checkbox"
              checked={showHotels}
              onChange={(e) => setShowHotels(e.target.checked)}
            />
            H&ocirc;tels
          </label>
        </div>

        <div className="map-stats">
          {restaurantMarkers.length} restaurant{restaurantMarkers.length !== 1 ? 's' : ''},{' '}
          {hotelMarkers.length} h&ocirc;tel{hotelMarkers.length !== 1 ? 's' : ''} affich&eacute;{hotelMarkers.length !== 1 ? 's' : ''}
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <MapView markers={allMarkers} height="600px" />
        )}
      </div>
    </>
  );
};

export default CarteAfrique;
