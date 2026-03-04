import React from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ rating, maxStars = 5, showValue = true }) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<span key={i} className="star filled">&#9733;</span>);
    } else if (i - 0.5 <= rating) {
      stars.push(<span key={i} className="star half">&#9733;</span>);
    } else {
      stars.push(<span key={i} className="star">&#9733;</span>);
    }
  }

  return (
    <span className="stars">
      {stars}
      {showValue && rating != null && (
        <span className="rating-value">{rating.toFixed(1)}</span>
      )}
    </span>
  );
};

export const StarInput = ({ value, onChange }) => {
  return (
    <div className="star-input">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= value ? 'filled' : ''}`}
          onClick={() => onChange(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number,
  maxStars: PropTypes.number,
  showValue: PropTypes.bool,
};

export default React.memo(StarRating);
