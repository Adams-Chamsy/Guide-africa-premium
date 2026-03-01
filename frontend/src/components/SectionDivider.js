import React from 'react';

const SectionDivider = ({ variant = 'diamond' }) => {
  const icons = { diamond: '\u25C6', star: '\u2726', line: null };
  const icon = icons[variant];

  return (
    <div className="section-divider ornamental">
      {icon && <span className="divider-icon">{icon}</span>}
    </div>
  );
};

export default SectionDivider;
