import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { hotelApi } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import ConfirmDialog from '../components/ConfirmDialog';
import Breadcrumbs from '../components/Breadcrumbs';
import FavoriteButton from '../components/FavoriteButton';
import ShareButtons from '../components/ShareButtons';
import BackToTop from '../components/BackToTop';
import MapView from '../components/MapView';
import ReservationForm from '../components/ReservationForm';
import AddToCollectionModal from '../components/AddToCollectionModal';
import RatingDistribution from '../components/RatingDistribution';
import { SkeletonDetail } from '../components/Skeleton';
import usePageTitle from '../hooks/usePageTitle';
import LightboxGallery from '../components/LightboxGallery';
import SEOHead from '../components/SEOHead';
import AmenityIcon from '../components/AmenityIcon';
import { hotelJsonLd } from '../components/SEOHead';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  usePageTitle(hotel?.nom || 'Hôtel');

  const fetchHotel = async () => {
    setLoading(true);
    try {
      const res = await hotelApi.getById(id);
      setHotel(res.data);
    } catch (err) {
      setError('Hôtel introuvable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    try {
      await hotelApi.delete(id);
      navigate('/hotels');
    } catch (err) {
      setError('Erreur lors de la suppression.');
    }
    setShowDelete(false);
  };

  const handleAddReview = async (reviewData) => {
    await hotelApi.addReview(id, reviewData);
    fetchHotel();
  };

  if (loading) return <SkeletonDetail />;
  if (error) return <div className="error-message">{error}</div>;
  if (!hotel) return null;

  const avgNote = hotel.note || (hotel.avisUtilisateurs && hotel.avisUtilisateurs.length > 0
    ? (hotel.avisUtilisateurs.reduce((sum, r) => sum + r.note, 0) / hotel.avisUtilisateurs.length).toFixed(1)
    : null);

  const facilites = [];
  if (hotel.wifi) facilites.push('Wi-Fi gratuit');
  if (hotel.parking) facilites.push('Parking');
  if (hotel.piscine) facilites.push('Piscine');
  if (hotel.spa) facilites.push('Spa & Bien-être');
  if (hotel.restaurantSurPlace) facilites.push('Restaurant');
  if (hotel.salleSport) facilites.push('Salle de sport');
  if (hotel.navette) facilites.push('Navette aéroport');
  if (hotel.petitDejeunerInclus) facilites.push('Petit-déjeuner inclus');
  if (hotel.climatisation) facilites.push('Climatisation');
  if (hotel.roomService) facilites.push('Room service');
  if (hotel.conciergerie) facilites.push('Conciergerie');
  if (hotel.animauxAcceptes) facilites.push('Animaux acceptés');

  return (
    <>
      <SEOHead
        title={`${hotel.nom} — Guide Africa`}
        description={hotel.description ? hotel.description.substring(0, 160) : ''}
        jsonLd={hotelJsonLd(hotel)}
      />
    <div className="detail-page">
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Hôtels', to: '/hotels' },
        { label: hotel.nom }
      ]} />

      {hotel.image && (
        <div className="detail-hero">
          <img src={hotel.image} alt={hotel.nom} className="detail-main-image" loading="lazy"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'; }} />
          <div className="detail-hero-overlay">
            <div className="detail-hero-actions">
              <FavoriteButton type="hotels" id={parseInt(id)} />
              <ShareButtons title={hotel.nom} url={window.location.href} />
              <button className="btn-collection" onClick={() => setShowCollectionModal(true)} title="Ajouter à une collection">
                &#128194;
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="detail-info">
        <div className="african-pattern"></div>
        <h1 className="detail-title">{hotel.nom}</h1>

        <div className="detail-rating">
          <span className="hotel-stars" style={{ fontSize: '1.3rem' }}>
            {'★'.repeat(hotel.etoiles || 0)}{'☆'.repeat(5 - (hotel.etoiles || 0))}
          </span>
          <span className="price">{hotel.prixParNuit}€ / nuit</span>
          {avgNote && (
            <span className="review-count">
              Note: {avgNote}/5 ({hotel.avisUtilisateurs ? hotel.avisUtilisateurs.length : 0} avis)
            </span>
          )}
          {hotel.ville && (
            <span className="detail-ville">{hotel.ville.nom}, {hotel.ville.pays}</span>
          )}
        </div>

        <div className="badges" style={{ marginBottom: 16 }}>
          {hotel.categories && hotel.categories.map((c) => (
            <span key={c.id} className="badge">{c.nom}</span>
          ))}
        </div>

        {/* Tabs */}
        <div className="detail-tabs">
          <button className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>Infos</button>
          <button className={`tab-btn ${activeTab === 'equipements' ? 'active' : ''}`} onClick={() => setActiveTab('equipements')}>
            Équipements ({facilites.length})
          </button>
          <button className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => setActiveTab('photos')}>Photos</button>
          <button className={`tab-btn ${activeTab === 'avis' ? 'active' : ''}`} onClick={() => setActiveTab('avis')}>
            Avis ({hotel.avisUtilisateurs ? hotel.avisUtilisateurs.length : 0})
          </button>
          <button className={`tab-btn ${activeTab === 'reserver' ? 'active' : ''}`} onClick={() => setActiveTab('reserver')}>Réserver</button>
        </div>

        {activeTab === 'info' && (
          <div className="tab-content">
            <p className="detail-description">{hotel.description}</p>
            <div className="detail-meta">
              <span className="detail-meta-item">&#128205; {hotel.adresse}</span>
              {hotel.telephone && <span className="detail-meta-item">&#128222; {hotel.telephone}</span>}
              {hotel.email && <span className="detail-meta-item">&#9993; {hotel.email}</span>}
              {hotel.checkIn && <span className="detail-meta-item">&#128336; Check-in: {hotel.checkIn}</span>}
              {hotel.checkOut && <span className="detail-meta-item">&#128336; Check-out: {hotel.checkOut}</span>}
              {hotel.nombreChambres && <span className="detail-meta-item">&#128719; {hotel.nombreChambres} chambres</span>}
            </div>

            {(hotel.siteWeb || hotel.instagram || hotel.facebook) && (
              <div className="detail-social">
                {hotel.siteWeb && <a href={hotel.siteWeb} target="_blank" rel="noopener noreferrer" className="social-link">Site web</a>}
                {hotel.instagram && <span className="social-link">{hotel.instagram}</span>}
                {hotel.facebook && <span className="social-link">Facebook</span>}
              </div>
            )}

            {hotel.modesPayement && hotel.modesPayement.length > 0 && (
              <div className="detail-info-row"><strong>Paiement :</strong> {hotel.modesPayement.join(', ')}</div>
            )}
            {hotel.languesParlees && hotel.languesParlees.length > 0 && (
              <div className="detail-info-row"><strong>Langues :</strong> {hotel.languesParlees.join(', ')}</div>
            )}

            {hotel.coordonneesGps && hotel.coordonneesGps.lat && hotel.coordonneesGps.lng && (
              <div className="mini-map">
                <div className="mini-map-label">Localisation</div>
                <MapView
                  markers={[{
                    lat: hotel.coordonneesGps.lat,
                    lng: hotel.coordonneesGps.lng,
                    name: hotel.nom,
                    type: 'hotel',
                    id: hotel.id,
                    note: hotel.note,
                  }]}
                  center={[hotel.coordonneesGps.lat, hotel.coordonneesGps.lng]}
                  zoom={13}
                  height="300px"
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'equipements' && (
          <div className="tab-content">
            <div className="amenity-grid">
              {facilites.map((f) => (
                <span key={f} className="amenity-item">&#10003; {f}</span>
              ))}
            </div>
            {hotel.amenities && hotel.amenities.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <h3 className="subsection-title">Services additionnels</h3>
                <div className="amenity-grid">
                  {hotel.amenities.map(a => (
                    <AmenityIcon key={a.id} name={a.nom} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="tab-content">
            {hotel.galeriePhotos && hotel.galeriePhotos.length > 0 ? (
              <LightboxGallery images={hotel.galeriePhotos} alt={hotel.nom} />
            ) : (
              <p style={{ color: 'var(--ivory-subtle)' }}>Aucune photo disponible.</p>
            )}
          </div>
        )}

        {activeTab === 'avis' && (
          <div className="tab-content">
            <RatingDistribution type="hotel" id={id} />
            {hotel.avisUtilisateurs && hotel.avisUtilisateurs.length > 0 ? (
              hotel.avisUtilisateurs.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <p style={{ color: 'var(--ivory-subtle)', margin: '16px 0' }}>Aucun avis pour le moment.</p>
            )}
            <ReviewForm onSubmit={handleAddReview} />
          </div>
        )}

        {activeTab === 'reserver' && (
          <div className="tab-content">
            <ReservationForm type="HOTEL" establishmentId={parseInt(id)} establishmentName={hotel.nom} />
          </div>
        )}

        {user?.role === 'ADMIN' && (
          <div className="detail-actions">
            <Link to={`/hotels/${id}/edit`} className="btn btn-primary">Modifier</Link>
            <button className="btn btn-danger" onClick={() => setShowDelete(true)}>Supprimer</button>
          </div>
        )}
      </div>

      {showDelete && (
        <ConfirmDialog
          title="Supprimer l'hôtel"
          message={`Êtes-vous sûr de vouloir supprimer "${hotel.nom}" ? Cette action est irréversible.`}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
      <BackToTop />
      <AddToCollectionModal
        show={showCollectionModal}
        onClose={() => setShowCollectionModal(false)}
        type="HOTEL"
        targetId={parseInt(id)}
        targetName={hotel.nom}
      />
    </div>
    </>
  );
};

export default HotelDetail;
