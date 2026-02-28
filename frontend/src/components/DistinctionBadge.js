import React from 'react';

const distinctionConfig = {
  TROIS_ETOILES: { label: '3 Etoiles', stars: 3, color: '#C9A84C' },
  DEUX_ETOILES: { label: '2 Etoiles', stars: 2, color: '#C9A84C' },
  UNE_ETOILE: { label: '1 Etoile', stars: 1, color: '#C9A84C' },
  BIB_GOURMAND: { label: 'Bib Gourmand', stars: 0, color: '#C45A3C' },
  ETOILE_VERTE: { label: 'Etoile Verte', stars: 0, color: '#1B6B4A' },
  SELECTIONNE: { label: 'Sélectionné', stars: 0, color: '#8B7355' },
};

export default function DistinctionBadge({ type, size = 'normal' }) {
  const config = distinctionConfig[type] || distinctionConfig.SELECTIONNE;

  return (
    <span className={`distinction-badge distinction-${type.toLowerCase()} size-${size}`} style={{ '--badge-color': config.color }}>
      {config.stars > 0 ? (
        <>
          {Array.from({ length: config.stars }).map((_, i) => (
            <svg key={i} width={size === 'small' ? '12' : '16'} height={size === 'small' ? '12' : '16'} viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          ))}
          <span className="distinction-label">{config.label}</span>
        </>
      ) : (
        <span className="distinction-label">{config.label}</span>
      )}
    </span>
  );
}
