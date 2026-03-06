import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collectionApi } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Breadcrumbs from '../components/Breadcrumbs';
import { SkeletonGrid } from '../components/Skeleton';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';

const CollectionDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [editNom, setEditNom] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPublique, setEditPublique] = useState(false);

  usePageTitle(collection?.nom || 'Collection');

  useEffect(() => {
    loadCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadCollection = async () => {
    setLoading(true);
    try {
      const response = await collectionApi.getById(id);
      setCollection(response.data);
      setEditNom(response.data.nom);
      setEditDescription(response.data.description || '');
      setEditPublique(response.data.publique);
    } catch (err) {
      setError('Collection introuvable.');
    } finally {
      setLoading(false);
    }
  };

  const isOwner = isAuthenticated && collection && user;

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await collectionApi.update(id, {
        nom: editNom.trim(),
        description: editDescription.trim(),
        publique: editPublique,
      });
      showToast('Collection mise à jour !', 'success');
      setEditing(false);
      loadCollection();
    } catch (err) {
      showToast('Erreur lors de la mise à jour.', 'error');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await collectionApi.removeItem(id, itemId);
      showToast('Élément retiré de la collection.', 'success');
      loadCollection();
    } catch (err) {
      showToast('Erreur lors de la suppression.', 'error');
    }
  };

  if (loading) return <SkeletonGrid count={4} />;
  if (error) return <div className="error-message">{error}</div>;
  if (!collection) return null;

  return (
    <div className="page-container">
      <SEOHead title={`${collection?.nom || 'Collection'} — Guide Africa Premium`} />
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Mes Collections', to: '/mes-collections' },
        { label: collection.nom },
      ]} />

      <div className="page-header">
        {editing ? (
          <form onSubmit={handleUpdate} className="collection-edit-form">
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                value={editNom}
                onChange={(e) => setEditNom(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="form-input"
                rows={3}
              />
            </div>
            <div className="form-group">
              <label className="collection-checkbox-label">
                <input
                  type="checkbox"
                  checked={editPublique}
                  onChange={(e) => setEditPublique(e.target.checked)}
                />
                <span>Collection publique</span>
              </label>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" className="btn btn-primary">Enregistrer</button>
              <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Annuler</button>
            </div>
          </form>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <h2 className="page-title" style={{ marginBottom: 0 }}>{collection.nom}</h2>
              {collection.publique && (
                <span className="collection-badge-public">Public</span>
              )}
            </div>
            {collection.description && (
              <p style={{ color: 'var(--ivory-muted)', marginTop: 8 }}>{collection.description}</p>
            )}
            <p>{collection.items ? collection.items.length : 0} élément{collection.items && collection.items.length > 1 ? 's' : ''}</p>
            {isOwner && (
              <button className="btn btn-secondary" onClick={() => setEditing(true)} style={{ marginTop: 12 }}>
                Modifier la collection
              </button>
            )}
          </>
        )}
      </div>

      {!collection.items || collection.items.length === 0 ? (
        <div className="empty-state">
          <p>Cette collection est vide.</p>
          <p>Ajoutez des restaurants et hôtels depuis leurs pages de détail !</p>
        </div>
      ) : (
        <div className="card-grid">
          {collection.items.map(item => (
            <div key={item.id} className="card favori-card">
              <Link
                to={'/' + (item.type === 'RESTAURANT' ? 'restaurants' : 'hotels') + '/' + item.targetId}
                className="card-link"
              >
                <div className="card-image-container">
                  {item.imageEtablissement && (
                    <img src={item.imageEtablissement} alt={item.nomEtablissement} className="card-image" />
                  )}
                  <span className={'card-type-badge ' + (item.type === 'RESTAURANT' ? 'badge-restaurant' : 'badge-hotel')}>
                    {item.type === 'RESTAURANT' ? 'Restaurant' : 'Hôtel'}
                  </span>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{item.nomEtablissement || 'Chargement...'}</h3>
                  {item.villeEtablissement && (
                    <p className="card-location">{item.villeEtablissement}</p>
                  )}
                  {item.noteEtablissement && (
                    <p className="card-rating">
                      {'★'.repeat(Math.round(item.noteEtablissement))} {item.noteEtablissement}/5
                    </p>
                  )}
                </div>
              </Link>
              {isOwner && (
                <button
                  className="btn-remove-fav"
                  onClick={() => handleRemoveItem(item.id)}
                  title="Retirer de la collection"
                >
                  &#10005;
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionDetail;
