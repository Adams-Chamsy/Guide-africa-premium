import React from 'react';
import PropTypes from 'prop-types';

const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="dialog-overlay" role="alertdialog" aria-labelledby="confirm-title" aria-describedby="confirm-message" onClick={onCancel}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h3 id="confirm-title">{title || 'Confirmer'}</h3>
        <p id="confirm-message">{message || 'Êtes-vous sûr de vouloir effectuer cette action ?'}</p>
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

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmDialog;
