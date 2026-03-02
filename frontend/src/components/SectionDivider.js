import React from 'react';
import PropTypes from 'prop-types';

const SectionDivider = ({ variant = 'diamond' }) => {
  const icons = { diamond: '\u25C6', star: '\u2726', line: null };
  const icon = icons[variant];

  return (
    <div className="section-divider ornamental">
      {icon && <span className="divider-icon">{icon}</span>}
    </div>
  );
};

SectionDivider.propTypes = {
  ornamental: PropTypes.bool,
};

export default SectionDivider;
