import React from 'react';
import PropTypes from 'prop-types';

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text short"></div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="card-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

SkeletonGrid.propTypes = {
  count: PropTypes.number,
};

export function SkeletonDetail() {
  return (
    <div className="skeleton-detail">
      <div className="skeleton skeleton-hero"></div>
      <div className="skeleton-detail-content">
        <div className="skeleton skeleton-title large"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text short"></div>
      </div>
    </div>
  );
}
