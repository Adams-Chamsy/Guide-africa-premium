import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { hotelApi } from '../api/apiClient';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import ConfirmDialog from '../components/ConfirmDialog';
import Breadcrumbs from '../components/Breadcrumbs';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import BackToTop from '../components/BackToTop';
import { SkeletonDetail } from '../components/Skeleton';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

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
    <div className="detail-page">
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Hôtels', to: '/hotels' },
        { label: hotel.nom }
      ]} />

      {hotel.image && (
        <div className="detail-hero">
          <img src={hotel.image} alt={hotel.nom} className="detail-main-image"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'; }} />
          <div className="detail-hero-overlay">
            <div className="detail-hero-actions">
              <FavoriteButton type="hotels" id={parseInt(id)} />
              <ShareButton title={hotel.nom} text={`Découvrez ${hotel.nom} sur Guide Africa`} />
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
          </div>
        )}

        {activeTab === 'equipements' && (
          <div className="tab-content">
            <div className="amenity-grid">
              {facilites.map((f, i) => (
                <span key={i} className="amenity-item">&#10003; {f}</span>
              ))}
            </div>
            {hotel.amenities && hotel.amenities.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <h3 className="subsection-title">Services additionnels</h3>
                <div className="amenity-grid">
                  {hotel.amenities.map(a => (
                    <span key={a.id} className="amenity-item">{a.nom}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="tab-content">
            {hotel.galeriePhotos && hotel.galeriePhotos.length > 0 ? (
              <div className="gallery">
                {hotel.galeriePhotos.map((url, idx) => (
                  <img key={idx} src={url} alt={`${hotel.nom} ${idx + 1}`}
                    onError={(e) => { e.target.style.display = 'none'; }} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--ivory-subtle)' }}>Aucune photo disponible.</p>
            )}
          </div>
        )}

        {activeTab === 'avis' && (
          <div className="tab-content">
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

        <div className="detail-actions">
          <Link to={`/hotels/${id}/edit`} className="btn btn-primary">Modifier</Link>
          <button className="btn btn-danger" onClick={() => setShowDelete(true)}>Supprimer</button>
        </div>
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
    </div>
  );
};

export default HotelDetail;
