import React, { useState, useEffect } from 'react';
import { collectionApi } from '../api/apiClient';
import { useToast } from '../context/ToastContext';
import PropTypes from 'prop-types';

const AddToCollectionModal = ({ show, onClose, type, targetId, targetName }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (show) {
      loadCollections();
    }
  }, [show]);

  const loadCollections = async () => {
    setLoading(true);
    try {
      const response = await collectionApi.getAll();
      const cols = response.data;
      // For each collection, check if item is already in it
      const enriched = cols.map(col => ({
        ...col,
        containsItem: col.items && col.items.some(
          item => item.type === type && item.targetId === targetId
        ),
      }));
      setCollections(enriched);
    } catch (err) {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (collection) => {
    try {
      if (collection.containsItem) {
        // Find the item to remove
        const item = collection.items.find(
          i => i.type === type && i.targetId === targetId
        );
        if (item) {
          await collectionApi.removeItem(collection.id, item.id);
          showToast('Retiré de "' + collection.nom + '"', 'info');
        }
      } else {
        await collectionApi.addItem(collection.id, { type, targetId });
        showToast('Ajouté à "' + collection.nom + '"', 'success');
      }
      loadCollections();
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors de la mise à jour.';
      showToast(message, 'error');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    try {
      await collectionApi.create({ nom: newName.trim(), description: '', publique: false });
      showToast('Collection "' + newName.trim() + '" créée', 'success');
      setNewName('');
      loadCollections();
    } catch (err) {
      showToast('Erreur lors de la création.', 'error');
    } finally {
      setCreating(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Ajouter à une collection">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Ajouter à une collection</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <p className="modal-subtitle">{targetName}</p>

        {loading ? (
          <div className="modal-loading">Chargement...</div>
        ) : (
          <div className="modal-body">
            {collections.length === 0 ? (
              <p className="modal-empty">Aucune collection. Créez-en une ci-dessous.</p>
            ) : (
              <ul className="collection-list">
                {collections.map(col => (
                  <li key={col.id} className="collection-list-item">
                    <label className="collection-checkbox-label">
                      <input
                        type="checkbox"
                        checked={col.containsItem || false}
                        onChange={() => handleToggle(col)}
                      />
                      <span className="collection-list-name">{col.nom}</span>
                      <span className="collection-item-count">
                        {col.items ? col.items.length : 0} élément{col.items && col.items.length > 1 ? 's' : ''}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}

            <form className="collection-create-form" onSubmit={handleCreate}>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Créer nouvelle collection..."
                className="collection-create-input"
              />
              <button type="submit" className="btn btn-primary btn-sm" disabled={creating || !newName.trim()}>
                {creating ? '...' : 'Créer'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

AddToCollectionModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  itemType: PropTypes.string,
  itemId: PropTypes.number,
};

export default AddToCollectionModal;
