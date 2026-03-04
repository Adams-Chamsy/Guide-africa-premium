import React, { useState } from 'react';
import PropTypes from 'prop-types';

const InteractiveStars = ({ rating = 0, onRate, size = 24, readOnly = false }) => {
  const [hovered, setHovered] = useState(0);
  const displayRating = hovered || rating;

  const handleKeyDown = (star, e) => {
    if (readOnly) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onRate && onRate(star);
    } else if (e.key === 'ArrowRight' && star < 5) {
      e.preventDefault();
      setHovered(star + 1);
    } else if (e.key === 'ArrowLeft' && star > 1) {
      e.preventDefault();
      setHovered(star - 1);
    }
  };

  return (
    <div className="interactive-stars" role="radiogroup" aria-label="Note" onMouseLeave={() => !readOnly && setHovered(0)}>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`interactive-star ${star <= displayRating ? 'filled' : ''} ${readOnly ? 'readonly' : ''}`}
          style={{ fontSize: size, cursor: readOnly ? 'default' : 'pointer' }}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onClick={() => !readOnly && onRate && onRate(star)}
          onKeyDown={(e) => handleKeyDown(star, e)}
          role="radio"
          aria-checked={star <= rating}
          aria-label={`${star} etoile${star > 1 ? 's' : ''}`}
          tabIndex={readOnly ? -1 : 0}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

InteractiveStars.propTypes = {
  rating: PropTypes.number,
  onRate: PropTypes.func,
  size: PropTypes.number,
  readOnly: PropTypes.bool,
};

export default InteractiveStars;
