import React, { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../../api/apiClient';
import { useToast } from '../../context/ToastContext';
import Breadcrumbs from '../../components/Breadcrumbs';
import Pagination from '../../components/Pagination';
import { SkeletonDetail } from '../../components/Skeleton';
import usePageTitle from '../../hooks/usePageTitle';
import SEOHead from '../../components/SEOHead';

const statusLabels = {
  EN_ATTENTE: 'En attente',
  CONFIRMEE: 'Confirmée',
  ANNULEE: 'Annulée',
  TERMINEE: 'Terminée',
};

const statusOptions = ['EN_ATTENTE', 'CONFIRMEE', 'ANNULEE', 'TERMINEE'];

const GestionReservations = () => {
  usePageTitle('Gestion Réservations');
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const { showToast } = useToast();

  const loadReservations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminApi.getReservations({ page, size: 20 });
      setReservations(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      showToast('Erreur lors du chargement des réservations', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, showToast]);

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  const handleStatusUpdate = async (id, newStatut) => {
    try {
      await adminApi.updateReservationStatut(id, newStatut);
      showToast('Statut de la réservation mis à jour', 'success');
      loadReservations();
    } catch (err) {
      showToast('Erreur lors de la mise à jour du statut', 'error');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  const filteredReservations = filterStatus === 'ALL'
    ? reservations
    : reservations.filter(r => r.statut === filterStatus);

  return (
    <div className="page-container admin-page">
      <SEOHead title="Gestion des Réservations — Guide Africa Premium" />
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Administration', to: '/admin' },
        { label: 'Réservations' },
      ]} />

      <div className="page-header">
        <span className="page-subtitle">Administration</span>
        <h2 className="page-title">Gestion des Réservations</h2>
      </div>

      <div className="admin-filter-tabs">
        <button
          className={`admin-filter-tab ${filterStatus === 'ALL' ? 'active' : ''}`}
          onClick={() => setFilterStatus('ALL')}
        >
          Toutes
        </button>
        {statusOptions.map(status => (
          <button
            key={status}
            className={`admin-filter-tab ${filterStatus === status ? 'active' : ''}`}
            onClick={() => setFilterStatus(status)}
          >
            {statusLabels[status]}
          </button>
        ))}
      </div>

      {loading ? (
        <SkeletonDetail />
      ) : filteredReservations.length === 0 ? (
        <div className="empty-state">
          <p>Aucune réservation trouvée.</p>
        </div>
      ) : (
        <>
          <div className="admin-reservations-list">
            {filteredReservations.map(reservation => (
              <div key={reservation.id} className="admin-reservation-card">
                <div className="admin-reservation-header">
                  <div className="admin-reservation-info">
                    <h4>
                      {reservation.nomEtablissement || `Réservation #${reservation.id}`}
                    </h4>
                    <span className={`admin-badge ${reservation.type === 'RESTAURANT' ? 'admin-badge-admin' : 'admin-badge-user'}`}>
                      {reservation.type === 'RESTAURANT' ? 'Restaurant' : 'Hôtel'}
                    </span>
                  </div>
                  <span className={`status-badge status-${reservation.statut ? reservation.statut.toLowerCase() : 'en_attente'}`}>
                    {statusLabels[reservation.statut] || reservation.statut}
                  </span>
                </div>

                <div className="admin-reservation-details">
                  {reservation.type === 'RESTAURANT' ? (
                    <>
                      <span>Date : {formatDate(reservation.dateReservation)}</span>
                      {reservation.heureReservation && <span>Heure : {reservation.heureReservation}</span>}
                    </>
                  ) : (
                    <>
                      <span>Check-in : {formatDate(reservation.dateCheckIn)}</span>
                      <span>Check-out : {formatDate(reservation.dateCheckOut)}</span>
                      {reservation.nombreChambres && <span>Chambres : {reservation.nombreChambres}</span>}
                    </>
                  )}
                  <span>Personnes : {reservation.nombrePersonnes}</span>
                  {reservation.nomClient && <span>Client : {reservation.nomClient}</span>}
                </div>

                {reservation.notesSpeciales && (
                  <p className="admin-reservation-notes">{reservation.notesSpeciales}</p>
                )}

                <div className="admin-reservation-actions">
                  <label className="admin-select-label">Modifier le statut :</label>
                  <select
                    className="admin-select"
                    value={reservation.statut || 'EN_ATTENTE'}
                    onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                  </select>
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

export default GestionReservations;
