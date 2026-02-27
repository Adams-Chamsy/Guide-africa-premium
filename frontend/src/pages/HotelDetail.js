import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { hotelApi } from '../api/apiClient';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import ConfirmDialog from '../components/ConfirmDialog';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  const fetchHotel = async () => {
    setLoading(true);
    try {
      const res = await hotelApi.getById(id);
      setHotel(res.data);
    } catch (err) {
      setError('H\u00f4tel introuvable.');
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

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!hotel) return null;

  const avgNote = hotel.avisUtilisateurs && hotel.avisUtilisateurs.length > 0
    ? (hotel.avisUtilisateurs.reduce((sum, r) => sum + r.note, 0) / hotel.avisUtilisateurs.length).toFixed(1)
    : null;

  return (
    <div className="detail-page">
      <Link to="/hotels" className="btn btn-back">&larr; Retour aux h&ocirc;tels</Link>

      {hotel.image && (
        <img
          src={hotel.image}
          alt={hotel.nom}
          className="detail-main-image"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'; }}
        />
      )}

      <div className="detail-info">
        <div className="african-pattern"></div>
        <h1 className="detail-title">{hotel.nom}</h1>

        <div className="detail-rating">
          <span className="hotel-stars" style={{ fontSize: '1.3rem' }}>
            {'★'.repeat(hotel.etoiles || 0)}{'☆'.repeat(5 - (hotel.etoiles || 0))}
          </span>
          <span className="price">{hotel.prixParNuit}\u20AC / nuit</span>
          {avgNote && (
            <span className="review-count">
              Note moyenne: {avgNote}/5 ({hotel.avisUtilisateurs.length} avis)
            </span>
          )}
        </div>

        {hotel.categories && hotel.categories.length > 0 && (
          <div className="badges">
            {hotel.categories.map((c) => (
              <span key={c.id} className="badge">{c.nom}</span>
            ))}
          </div>
        )}

        <p className="detail-description">{hotel.description}</p>

        <div className="detail-meta">
          <span className="detail-meta-item">&#128205; {hotel.adresse}</span>
          {hotel.telephone && (
            <span className="detail-meta-item">&#128222; {hotel.telephone}</span>
          )}
          {hotel.email && (
            <span className="detail-meta-item">&#9993; {hotel.email}</span>
          )}
          {hotel.coordonneesGps && (
            <span className="detail-meta-item">
              &#127758; {hotel.coordonneesGps.latitude?.toFixed(4)}, {hotel.coordonneesGps.longitude?.toFixed(4)}
            </span>
          )}
        </div>

        {hotel.galeriePhotos && hotel.galeriePhotos.length > 0 && (
          <div>
            <h3 className="gallery-title">Galerie photos</h3>
            <div className="gallery">
              {hotel.galeriePhotos.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`${hotel.nom} ${idx + 1}`}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="detail-actions">
          <Link to={`/hotels/${id}/edit`} className="btn btn-primary">
            Modifier
          </Link>
          <button className="btn btn-danger" onClick={() => setShowDelete(true)}>
            Supprimer
          </button>
        </div>
      </div>

      <div className="reviews-section">
        <h2 className="section-title">
          Avis ({hotel.avisUtilisateurs ? hotel.avisUtilisateurs.length : 0})
        </h2>
        <div className="section-divider" style={{ marginBottom: 20 }}></div>
        {hotel.avisUtilisateurs && hotel.avisUtilisateurs.length > 0 ? (
          hotel.avisUtilisateurs.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p style={{ color: 'var(--ivory-subtle)', margin: '16px 0' }}>Aucun avis pour le moment.</p>
        )}
        <ReviewForm onSubmit={handleAddReview} />
      </div>

      {showDelete && (
        <ConfirmDialog
          title="Supprimer l'h\u00f4tel"
          message={`\u00CAtes-vous s\u00FBr de vouloir supprimer "${hotel.nom}" ? Cette action est irr\u00E9versible.`}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
};

export default HotelDetail;
