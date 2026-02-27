import React from 'react';

const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h3>{title || 'Confirmer'}</h3>
        <p>{message || 'Êtes-vous sûr de vouloir effectuer cette action ?'}</p>
        <div className="dialog-actions">
          <button className="btn btn-outline" onClick={onCancel}>
            Annuler
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
