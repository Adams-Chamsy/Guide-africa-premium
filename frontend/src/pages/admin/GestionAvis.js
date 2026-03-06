import React, { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../../api/apiClient';
import { useToast } from '../../context/ToastContext';
import Breadcrumbs from '../../components/Breadcrumbs';
import Pagination from '../../components/Pagination';
import { SkeletonDetail } from '../../components/Skeleton';
import usePageTitle from '../../hooks/usePageTitle';
import SEOHead from '../../components/SEOHead';

const GestionAvis = () => {
  usePageTitle('Gestion Avis');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { showToast } = useToast();

  const loadReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminApi.getReviews({ page, size: 20 });
      setReviews(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      showToast('Erreur lors du chargement des avis', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, showToast]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet avis ? Cette action est irréversible.')) {
      return;
    }
    try {
      await adminApi.deleteReview(id);
      showToast('Avis supprimé avec succès', 'success');
      loadReviews();
    } catch (err) {
      showToast('Erreur lors de la suppression de l\'avis', 'error');
    }
  };

  const renderStars = (note) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= note ? 'star-filled' : 'star-empty'}>
          {i <= note ? '\u2605' : '\u2606'}
        </span>
      );
    }
    return <span className="admin-review-stars">{stars}</span>;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="page-container admin-page">
      <SEOHead title="Gestion des Avis — Guide Africa Premium" />
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Administration', to: '/admin' },
        { label: 'Avis' },
      ]} />

      <div className="page-header">
        <span className="page-subtitle">Administration</span>
        <h2 className="page-title">Modération des Avis</h2>
      </div>

      {loading ? (
        <SkeletonDetail />
      ) : reviews.length === 0 ? (
        <div className="empty-state">
          <p>Aucun avis à modérer.</p>
        </div>
      ) : (
        <>
          <div className="admin-reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="admin-review-card">
                <div className="admin-review-header">
                  <div className="admin-review-meta">
                    <span className="admin-review-author">
                      {review.auteurPrenom || 'Anonyme'} {review.auteurNom || ''}
                    </span>
                    {renderStars(review.note)}
                    <span className="admin-review-date">{formatDate(review.dateCreation)}</span>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(review.id)}
                  >
                    Supprimer
                  </button>
                </div>
                {review.titre && (
                  <h4 className="admin-review-title">{review.titre}</h4>
                )}
                <p className="admin-review-comment">
                  {review.commentaire
                    ? review.commentaire.length > 200
                      ? review.commentaire.substring(0, 200) + '...'
                      : review.commentaire
                    : 'Pas de commentaire'}
                </p>
                <div className="admin-review-footer">
                  {review.typeEtablissement && (
                    <span className={`admin-badge ${review.typeEtablissement === 'RESTAURANT' ? 'admin-badge-admin' : 'admin-badge-user'}`}>
                      {review.typeEtablissement === 'RESTAURANT' ? 'Restaurant' : 'Hôtel'}
                    </span>
                  )}
                  {review.nomEtablissement && (
                    <span className="admin-review-establishment">{review.nomEtablissement}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default GestionAvis;
