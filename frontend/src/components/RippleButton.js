import React, { useState, useCallback } from 'react';

const RippleButton = ({ children, onClick, className = '', variant = 'primary', ...props }) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
    if (onClick) onClick(e);
  }, [onClick]);

  return (
    <button className={`ripple-button ripple-${variant} ${className}`} onClick={handleClick} {...props}>
      {children}
      {ripples.map(r => (
        <span key={r.id} className="ripple-effect" style={{ left: r.x, top: r.y }} />
      ))}
    </button>
  );
};

export default RippleButton;
