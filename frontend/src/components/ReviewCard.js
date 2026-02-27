import React from 'react';
import StarRating from './StarRating';

const ReviewCard = ({ review }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div>
          <span className="review-author">{review.auteur}</span>
          <div style={{ marginTop: 4 }}>
            <StarRating rating={review.note} showValue={false} />
          </div>
        </div>
        <span className="review-date">{formatDate(review.dateCreation)}</span>
      </div>
      {review.commentaire && (
        <p className="review-comment">{review.commentaire}</p>
      )}
    </div>
  );
};

export default ReviewCard;
