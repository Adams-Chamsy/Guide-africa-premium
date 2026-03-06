import React from 'react';
import PropTypes from 'prop-types';

const srOnlyStyle = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  border: 0,
};

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
    <div className="card-grid" role="status" aria-busy="true">
      <span style={srOnlyStyle}>Chargement en cours...</span>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={`skeleton-${i}`} />
      ))}
    </div>
  );
}

SkeletonGrid.propTypes = {
  count: PropTypes.number,
};

export function SkeletonDetail() {
  return (
    <div className="skeleton-detail" role="status" aria-busy="true">
      <span style={srOnlyStyle}>Chargement en cours...</span>
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
