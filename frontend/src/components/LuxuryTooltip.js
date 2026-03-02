import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const LuxuryTooltip = ({ children, text, position = 'top' }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (visible && triggerRef.current && tooltipRef.current) {
      const tRect = triggerRef.current.getBoundingClientRect();
      const ttRect = tooltipRef.current.getBoundingClientRect();
      let top = 0, left = 0;
      switch (position) {
        case 'bottom':
          top = tRect.height + 8;
          left = (tRect.width - ttRect.width) / 2;
          break;
        case 'left':
          top = (tRect.height - ttRect.height) / 2;
          left = -ttRect.width - 8;
          break;
        case 'right':
          top = (tRect.height - ttRect.height) / 2;
          left = tRect.width + 8;
          break;
        default:
          top = -ttRect.height - 8;
          left = (tRect.width - ttRect.width) / 2;
      }
      setCoords({ top, left });
    }
  }, [visible, position]);

  return (
    <div
      className="luxury-tooltip-wrapper"
      ref={triggerRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          className={`luxury-tooltip luxury-tooltip-${position}`}
          style={{ top: coords.top, left: coords.left }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

LuxuryTooltip.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};

export default LuxuryTooltip;
