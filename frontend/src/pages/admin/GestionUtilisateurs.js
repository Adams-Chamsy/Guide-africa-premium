import React, { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../../api/apiClient';
import { useToast } from '../../context/ToastContext';
import Breadcrumbs from '../../components/Breadcrumbs';
import Pagination from '../../components/Pagination';
import { SkeletonDetail } from '../../components/Skeleton';
import usePageTitle from '../../hooks/usePageTitle';

const GestionUtilisateurs = () => {
  usePageTitle('Gestion Utilisateurs');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { showToast } = useToast();

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminApi.getUsers({ page, size: 20 });
      setUsers(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      showToast('Erreur lors du chargement des utilisateurs', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, showToast]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleToggleActive = async (userId) => {
    try {
      await adminApi.toggleUserActive(userId);
      showToast('Statut utilisateur mis à jour', 'success');
      loadUsers();
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

  return (
    <div className="page-container admin-page">
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Administration', to: '/admin' },
        { label: 'Utilisateurs' },
      ]} />

      <div className="page-header">
        <span className="page-subtitle">Administration</span>
        <h2 className="page-title">Gestion des Utilisateurs</h2>
      </div>

      {loading ? (
        <SkeletonDetail />
      ) : (
        <>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Statut</th>
                  <th>Date inscription</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>
                      <img
                        src={u.avatar || `https://ui-avatars.com/api/?name=${u.prenom}+${u.nom}&background=1B6B4A&color=F5F0E8&size=40`}
                        alt={u.prenom}
                        className="admin-user-avatar"
                      />
                    </td>
                    <td>{u.prenom} {u.nom}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`admin-badge ${u.role === 'ADMIN' ? 'admin-badge-admin' : 'admin-badge-user'}`}>
                        {u.role === 'ADMIN' ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${u.actif ? 'admin-badge-admin' : 'admin-badge-user'}`}>
                        {u.actif ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td>{formatDate(u.dateInscription)}</td>
                    <td>
                      <button
                        className="admin-btn-toggle"
                        onClick={() => handleToggleActive(u.id)}
                      >
                        {u.actif ? 'Désactiver' : 'Activer'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default GestionUtilisateurs;
