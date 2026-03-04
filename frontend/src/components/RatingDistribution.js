import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import PropTypes from 'prop-types';

const RatingDistribution = ({ type, id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistribution = async () => {
      try {
        const res = await apiClient.get(`/ratings/distribution/${type}/${id}`);
        setData(res.data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchDistribution();
  }, [type, id]);

  if (loading) return <div className="rating-dist-loading">Chargement...</div>;
  if (!data) return null;

  const { noteMoyenne, nombreAvis, distribution } = data;
  const total = nombreAvis || 0;

  return (
    <div className="rating-distribution">
      <div className="rating-dist-summary">
        <div className="rating-dist-average">
          <span className="rating-dist-number">{noteMoyenne ? noteMoyenne.toFixed(1) : '\u2014'}</span>
          <div className="rating-dist-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={star <= Math.round(noteMoyenne || 0) ? 'star-filled' : 'star-empty'}>
                \u2605
              </span>
            ))}
          </div>
          <span className="rating-dist-count">{total} avis</span>
        </div>
      </div>

      <div className="rating-dist-bars">
        {distribution && Object.entries(distribution).map(([star, count]) => {
          const percent = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={star} className="rating-dist-row">
              <span className="rating-dist-label">{star} \u2605</span>
              <div className="rating-dist-bar">
                <div className="rating-dist-fill" style={{ width: `${percent}%` }}></div>
              </div>
              <span className="rating-dist-percent">{percent}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

RatingDistribution.propTypes = {
  distribution: PropTypes.object,
  totalReviews: PropTypes.number,
};

export default RatingDistribution;
