import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const PullToRefresh = ({ children, onRefresh }) => {
  const [pulling, setPulling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const containerRef = useRef(null);
  const threshold = 80;

  const handleTouchStart = useCallback((e) => {
    if (containerRef.current && containerRef.current.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      setPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!pulling) return;
    const diff = e.touches[0].clientY - startY.current;
    if (diff > 0) {
      setPullDistance(Math.min(diff * 0.5, 120));
    }
  }, [pulling]);

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance >= threshold && onRefresh) {
      setRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
      }
    }
    setPulling(false);
    setPullDistance(0);
  }, [pullDistance, onRefresh]);

  return (
    <div
      ref={containerRef}
      className="pull-to-refresh"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`pull-indicator ${refreshing ? 'refreshing' : ''}`}
        style={{ height: pullDistance, opacity: pullDistance / threshold }}
      >
        <div className={`pull-spinner ${refreshing ? 'spinning' : ''}`}>
          {refreshing ? '⟳' : '↓'}
        </div>
      </div>
      {children}
    </div>
  );
};

PullToRefresh.propTypes = {
  onRefresh: PropTypes.func,
  children: PropTypes.node,
};

export default PullToRefresh;
