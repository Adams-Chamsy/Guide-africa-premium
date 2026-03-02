import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Fil d'Ariane">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="breadcrumb-separator">/</span>}
          {item.to ? (
            <Link to={item.to} className="breadcrumb-link">{item.label}</Link>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

Breadcrumbs.propTypes = {
  items: PropTypes.array,
};
