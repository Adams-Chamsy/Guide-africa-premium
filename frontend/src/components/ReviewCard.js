import React, { useState } from 'react';
import StarRating from './StarRating';
import { reviewApi } from '../api/apiClient';
import PropTypes from 'prop-types';

const ReviewCard = ({ review, onUpdate }) => {
  const [voted, setVoted] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const typeVoyageurLabels = {
    COUPLE: 'Couple',
    FAMILLE: 'Famille',
    AFFAIRES: 'Voyage d\'affaires',
    SOLO: 'Solo',
    AMIS: 'Entre amis'
  };

  const handleVote = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (voted) return;
    try {
      await reviewApi.vote(review.id);
      setVoted(true);
      if (onUpdate) onUpdate();
    } catch (err) {
      // silently fail
    }
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-author-info">
          <div className="review-author-row">
            <span className="review-author">{review.auteur}</span>
            {review.typeVoyageur && (
              <span className="review-type-badge">{typeVoyageurLabels[review.typeVoyageur] || review.typeVoyageur}</span>
            )}
          </div>
          <div className="review-rating-row">
            <StarRating rating={review.note} showValue={false} />
            <span className="review-note-value">{review.note}/5</span>
          </div>
        </div>
        <span className="review-date">{formatDate(review.dateCreation)}</span>
      </div>

      {review.titre && <h4 className="review-title">{review.titre}</h4>}

      {(review.noteCuisine || review.noteService || review.noteAmbiance || review.noteRapportQualitePrix) && (
        <div className="review-sub-ratings">
          {review.noteCuisine && (
            <div className="sub-rating">
              <span className="sub-rating-label">Cuisine</span>
              <div className="sub-rating-bar">
                <div className="sub-rating-fill" style={{ width: `${(review.noteCuisine / 5) * 100}%` }}></div>
              </div>
              <span className="sub-rating-value">{review.noteCuisine}</span>
            </div>
          )}
          {review.noteService && (
            <div className="sub-rating">
              <span className="sub-rating-label">Service</span>
              <div className="sub-rating-bar">
                <div className="sub-rating-fill" style={{ width: `${(review.noteService / 5) * 100}%` }}></div>
              </div>
              <span className="sub-rating-value">{review.noteService}</span>
            </div>
          )}
          {review.noteAmbiance && (
            <div className="sub-rating">
              <span className="sub-rating-label">Ambiance</span>
              <div className="sub-rating-bar">
                <div className="sub-rating-fill" style={{ width: `${(review.noteAmbiance / 5) * 100}%` }}></div>
              </div>
              <span className="sub-rating-value">{review.noteAmbiance}</span>
            </div>
          )}
          {review.noteRapportQualitePrix && (
            <div className="sub-rating">
              <span className="sub-rating-label">Rapport Q/P</span>
              <div className="sub-rating-bar">
                <div className="sub-rating-fill" style={{ width: `${(review.noteRapportQualitePrix / 5) * 100}%` }}></div>
              </div>
              <span className="sub-rating-value">{review.noteRapportQualitePrix}</span>
            </div>
          )}
        </div>
      )}

      {review.commentaire && (
        <p className="review-comment">{review.commentaire}</p>
      )}

      {review.photos && review.photos.length > 0 && (
        <div className="review-photos">
          {review.photos.map((url, i) => (
            <img key={i} src={url} alt={`Photo avis ${i + 1}`} className="review-photo"
              onError={(e) => { e.target.style.display = 'none'; }} />
          ))}
        </div>
      )}

      <div className="review-footer">
        <button className={`review-vote-btn ${voted ? 'voted' : ''}`} onClick={handleVote}>
          &#128077; Utile {review.votesUtiles > 0 && `(${review.votesUtiles})`}
        </button>
      </div>

      {review.reponseProprietaire && (
        <div className="review-response">
          <div className="review-response-header">
            <span className="review-response-label">R\u00e9ponse de l'\u00e9tablissement</span>
            {review.dateReponse && <span className="review-date">{formatDate(review.dateReponse)}</span>}
          </div>
          <p className="review-response-text">{review.reponseProprietaire}</p>
        </div>
      )}
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object,
  onUpdate: PropTypes.func,
};

export default React.memo(ReviewCard);
