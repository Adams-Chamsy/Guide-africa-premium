import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collectionApi } from '../api/apiClient';
import { useToast } from '../context/ToastContext';
import Breadcrumbs from '../components/Breadcrumbs';
import { SkeletonGrid } from '../components/Skeleton';
import usePageTitle from '../hooks/usePageTitle';

const MesCollections = () => {
  usePageTitle('Mes Collections');
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newNom, setNewNom] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPublique, setNewPublique] = useState(false);
  const [creating, setCreating] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    setLoading(true);
    try {
      const response = await collectionApi.getAll();
      setCollections(response.data);
    } catch (err) {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newNom.trim()) return;
    setCreating(true);
    try {
      await collectionApi.create({
        nom: newNom.trim(),
        description: newDescription.trim(),
        publique: newPublique,
      });
      showToast('Collection créée avec succès !', 'success');
      setNewNom('');
      setNewDescription('');
      setNewPublique(false);
      setShowForm(false);
      loadCollections();
    } catch (err) {
      showToast('Erreur lors de la création.', 'error');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette collection ?')) return;
    try {
      await collectionApi.delete(id);
      showToast('Collection supprimée.', 'success');
      setCollections(collections.filter(c => c.id !== id));
    } catch (err) {
      showToast('Erreur lors de la suppression.', 'error');
    }
  };

  return (
    <div className="page-container">
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Mes Collections' },
      ]} />

      <div className="page-header">
        <span className="page-subtitle">Mon espace personnel</span>
        <h2 className="page-title">Mes Collections</h2>
        <p>{collections.length} collection{collections.length > 1 ? 's' : ''}</p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Annuler' : '+ Créer une collection'}
        </button>
      </div>

      {showForm && (
        <form className="collection-create-form-page" onSubmit={handleCreate}>
          <div className="form-group">
            <label>Nom de la collection</label>
            <input
              type="text"
              value={newNom}
              onChange={(e) => setNewNom(e.target.value)}
              placeholder="Ex: Mes restaurants préférés à Dakar"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Description (optionnelle)</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Décrivez votre collection..."
              className="form-input"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label className="collection-checkbox-label">
              <input
                type="checkbox"
                checked={newPublique}
                onChange={(e) => setNewPublique(e.target.checked)}
              />
              <span>Rendre cette collection publique</span>
            </label>
          </div>
          <button type="submit" className="btn btn-primary" disabled={creating || !newNom.trim()}>
            {creating ? 'Création...' : 'Créer la collection'}
          </button>
        </form>
      )}

      {loading ? (
        <SkeletonGrid count={6} />
      ) : collections.length === 0 ? (
        <div className="empty-state">
          <p>Vous n'avez pas encore de collections.</p>
          <p>Créez votre première collection pour organiser vos restaurants et hôtels favoris !</p>
        </div>
      ) : (
        <div className="collection-grid">
          {collections.map(collection => (
            <div key={collection.id} className="collection-card">
              <Link to={'/collections/' + collection.id} className="collection-card-link">
                <div className="collection-card-header">
                  <h3 className="collection-card-title">{collection.nom}</h3>
                  {collection.publique && (
                    <span className="collection-badge-public">Public</span>
                  )}
                </div>
                {collection.description && (
                  <p className="collection-card-desc">
                    {collection.description.length > 100
                      ? collection.description.substring(0, 100) + '...'
                      : collection.description}
                  </p>
                )}
                <div className="collection-card-footer">
                  <span className="collection-item-count">
                    {collection.items ? collection.items.length : 0} élément{collection.items && collection.items.length > 1 ? 's' : ''}
                  </span>
                </div>
              </Link>
              <button
                className="btn-remove-fav"
                onClick={() => handleDelete(collection.id)}
                title="Supprimer la collection"
              >
                &#10005;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MesCollections;
