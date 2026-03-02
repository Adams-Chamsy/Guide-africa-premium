import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Infinite Scroll wrapper (Item 67)
 * Triggers loadMore when user scrolls near bottom
 */
const InfiniteScroll = ({ children, loadMore, hasMore, loading, threshold = 300 }) => {
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  const handleObserver = useCallback((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && hasMore && !loading) {
      loadMore();
    }
  }, [hasMore, loading, loadMore]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: `${threshold}px`,
    });

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver, threshold]);

  return (
    <div>
      {children}
      <div ref={sentinelRef} style={{ height: 1 }} />
      {loading && (
        <div className="infinite-scroll-loader">
          <div className="infinite-scroll-dots">
            <div className="infinite-scroll-dot" />
            <div className="infinite-scroll-dot" />
            <div className="infinite-scroll-dot" />
          </div>
        </div>
      )}
      {!hasMore && !loading && (
        <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--ivory-subtle)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          — Fin des résultats —
        </div>
      )}
    </div>
  );
};

InfiniteScroll.propTypes = {
  onLoadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  children: PropTypes.node,
  loading: PropTypes.bool,
};

export default InfiniteScroll;
