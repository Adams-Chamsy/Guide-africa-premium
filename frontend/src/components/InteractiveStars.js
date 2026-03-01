import React, { useState } from 'react';

const InteractiveStars = ({ rating = 0, onRate, size = 24, readOnly = false }) => {
  const [hovered, setHovered] = useState(0);
  const displayRating = hovered || rating;

  return (
    <div className="interactive-stars" onMouseLeave={() => !readOnly && setHovered(0)}>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`interactive-star ${star <= displayRating ? 'filled' : ''} ${readOnly ? 'readonly' : ''}`}
          style={{ fontSize: size, cursor: readOnly ? 'default' : 'pointer' }}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onClick={() => !readOnly && onRate && onRate(star)}
          role={readOnly ? 'img' : 'button'}
          aria-label={`${star} etoile${star > 1 ? 's' : ''}`}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default InteractiveStars;
