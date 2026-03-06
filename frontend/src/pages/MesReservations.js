import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reservationApi } from '../api/apiClient';
import { useToast } from '../context/ToastContext';
import Breadcrumbs from '../components/Breadcrumbs';
import { SkeletonGrid } from '../components/Skeleton';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';

const MesReservations = () => {
  usePageTitle('Mes Réservations');
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    setLoading(true);
    try {
      const response = await reservationApi.getAll();
      setReservations(response.data);
    } catch (err) {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      return;
    }
    try {
      await reservationApi.cancel(id);
      showToast('Réservation annulée avec succès.', 'success');
      loadReservations();
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors de l\'annulation.';
      showToast(message, 'error');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  const statusLabels = {
    EN_ATTENTE: 'En attente',
    CONFIRMEE: 'Confirmée',
    ANNULEE: 'Annulée',
    TERMINEE: 'Terminée',
  };

  return (
    <div className="page-container">
      <SEOHead title="Mes Réservations — Guide Africa Premium" />
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Mes Réservations' },
      ]} />

      <div className="page-header">
        <span className="page-subtitle">Mon espace personnel</span>
        <h2 className="page-title">Mes Réservations</h2>
        <p>{reservations.length} {reservations.length > 1 ? 'réservations' : 'réservation'}</p>
      </div>

      {loading ? (
        <SkeletonGrid count={4} />
      ) : reservations.length === 0 ? (
        <div className="empty-state">
          <p>Vous n'avez pas encore de réservations.</p>
          <p>Parcourez nos restaurants et hôtels pour effectuer une réservation !</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
            <Link to="/restaurants" className="btn btn-primary">Restaurants</Link>
            <Link to="/hotels" className="btn btn-primary">Hôtels</Link>
          </div>
        </div>
      ) : (
        <div className="reservations-list">
          {reservations.map(reservation => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-image">
                {reservation.imageEtablissement ? (
                  <img
                    src={reservation.imageEtablissement}
                    alt={reservation.nomEtablissement}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="reservation-image-placeholder">
                    {reservation.type === 'RESTAURANT' ? '🍽' : '🏨'}
                  </div>
                )}
              </div>
              <div className="reservation-info">
                <div className="reservation-info-header">
                  <span className={`card-type-badge ${reservation.type === 'RESTAURANT' ? 'badge-restaurant' : 'badge-hotel'}`}>
                    {reservation.type === 'RESTAURANT' ? 'Restaurant' : 'Hôtel'}
                  </span>
                  <span className={`status-badge status-${reservation.statut ? reservation.statut.toLowerCase() : 'en_attente'}`}>
                    {statusLabels[reservation.statut] || reservation.statut}
                  </span>
                </div>
                <h3>
                  <Link to={`/${reservation.type === 'RESTAURANT' ? 'restaurants' : 'hotels'}/${reservation.etablissementId}`}>
                    {reservation.nomEtablissement || `${reservation.type === 'RESTAURANT' ? 'Restaurant' : 'Hôtel'} #${reservation.etablissementId}`}
                  </Link>
                </h3>
                <div className="reservation-details">
                  {reservation.type === 'RESTAURANT' ? (
                    <>
                      <span>&#128197; {formatDate(reservation.dateReservation)}</span>
                      {reservation.heureReservation && <span>&#128336; {reservation.heureReservation}</span>}
                    </>
                  ) : (
                    <>
                      <span>&#128197; {formatDate(reservation.dateCheckIn)} &rarr; {formatDate(reservation.dateCheckOut)}</span>
                      {reservation.nombreChambres && <span>&#128719; {reservation.nombreChambres} chambre{reservation.nombreChambres > 1 ? 's' : ''}</span>}
                    </>
                  )}
                  <span>&#128101; {reservation.nombrePersonnes} personne{reservation.nombrePersonnes > 1 ? 's' : ''}</span>
                </div>
                {reservation.notesSpeciales && (
                  <p className="reservation-notes">{reservation.notesSpeciales}</p>
                )}
                {reservation.statut === 'EN_ATTENTE' && (
                  <button
                    className="btn-cancel-reservation"
                    onClick={() => handleCancel(reservation.id)}
                  >
                    Annuler la réservation
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MesReservations;
