import React, { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';
import PropTypes from 'prop-types';

const TiltCard = ({ children, className = '', maxTilt = 8, glare = true, glareMaxOpacity = 0.15 }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    const node = tiltRef.current;
    if (!node || window.innerWidth < 768) return;

    VanillaTilt.init(node, {
      max: maxTilt,
      speed: 400,
      glare: glare,
      'max-glare': glareMaxOpacity,
      'glare-prerender': false,
    });

    return () => {
      if (node && node.vanillaTilt) node.vanillaTilt.destroy();
    };
  }, [maxTilt, glare, glareMaxOpacity]);

  return (
    <div ref={tiltRef} className={`tilt-card ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
};

TiltCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default TiltCard;
