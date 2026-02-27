import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { restaurantApi } from '../api/apiClient';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import ConfirmDialog from '../components/ConfirmDialog';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  const fetchRestaurant = async () => {
    setLoading(true);
    try {
      const res = await restaurantApi.getById(id);
      setRestaurant(res.data);
    } catch (err) {
      setError('Restaurant introuvable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    try {
      await restaurantApi.delete(id);
      navigate('/restaurants');
    } catch (err) {
      setError('Erreur lors de la suppression.');
    }
    setShowDelete(false);
  };

  const handleAddReview = async (reviewData) => {
    await restaurantApi.addReview(id, reviewData);
    fetchRestaurant();
  };

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!restaurant) return null;

  return (
    <div className="detail-page">
      <Link to="/restaurants" className="btn btn-back">&larr; Retour aux restaurants</Link>

      {/* Main Image */}
      {restaurant.image && (
        <img
          src={restaurant.image}
          alt={restaurant.nom}
          className="detail-main-image"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'; }}
        />
      )}

      {/* Info */}
      <div className="detail-info">
        <div className="african-pattern"></div>
        <h1 className="detail-title">{restaurant.nom}</h1>

        <div className="detail-rating">
          <StarRating rating={restaurant.note || 0} />
          {restaurant.avisUtilisateurs && (
            <span className="review-count">
              ({restaurant.avisUtilisateurs.length} avis)
            </span>
          )}
        </div>

        {/* Categories */}
        {restaurant.categories && restaurant.categories.length > 0 && (
          <div className="badges">
            {restaurant.categories.map((c) => (
              <span key={c.id} className="badge">{c.nom}</span>
            ))}
          </div>
        )}

        <p className="detail-description">{restaurant.description}</p>

        <div className="detail-meta">
          {restaurant.cuisine && (
            <span className="detail-meta-item">&#127869; {restaurant.cuisine}</span>
          )}
          <span className="detail-meta-item">&#128205; {restaurant.adresse}</span>
          {restaurant.telephone && (
            <span className="detail-meta-item">&#128222; {restaurant.telephone}</span>
          )}
          {restaurant.email && (
            <span className="detail-meta-item">&#9993; {restaurant.email}</span>
          )}
          {restaurant.horaires && (
            <span className="detail-meta-item">&#128336; {restaurant.horaires}</span>
          )}
          {restaurant.coordonneesGps && (
            <span className="detail-meta-item">
              &#127758; {restaurant.coordonneesGps.latitude?.toFixed(4)}, {restaurant.coordonneesGps.longitude?.toFixed(4)}
            </span>
          )}
        </div>

        {/* Photo Gallery */}
        {restaurant.galeriePhotos && restaurant.galeriePhotos.length > 0 && (
          <div>
            <h3 className="gallery-title">Galerie photos</h3>
            <div className="gallery">
              {restaurant.galeriePhotos.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`${restaurant.nom} ${idx + 1}`}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="detail-actions">
          <Link to={`/restaurants/${id}/edit`} className="btn btn-primary">
            Modifier
          </Link>
          <button className="btn btn-danger" onClick={() => setShowDelete(true)}>
            Supprimer
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="reviews-section">
        <h2 className="section-title">
          Avis ({restaurant.avisUtilisateurs ? restaurant.avisUtilisateurs.length : 0})
        </h2>
        <div className="section-divider" style={{ marginBottom: 20 }}></div>
        {restaurant.avisUtilisateurs && restaurant.avisUtilisateurs.length > 0 ? (
          restaurant.avisUtilisateurs.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p style={{ color: 'var(--ivory-subtle)', margin: '16px 0' }}>Aucun avis pour le moment.</p>
        )}
        <ReviewForm onSubmit={handleAddReview} />
      </div>

      {/* Delete Confirmation */}
      {showDelete && (
        <ConfirmDialog
          title="Supprimer le restaurant"
          message={`\u00CAtes-vous s\u00FBr de vouloir supprimer "${restaurant.nom}" ? Cette action est irr\u00E9versible.`}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
};

export default RestaurantDetail;
