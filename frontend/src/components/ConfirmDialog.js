import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => {
  const previousFocusRef = useRef(null);
  const cancelBtnRef = useRef(null);
  const confirmBtnRef = useRef(null);

  // Save previous focus and focus the first button on open
  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    if (cancelBtnRef.current) {
      cancelBtnRef.current.focus();
    }
    return () => {
      // Restore focus on close
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, []);

  // Focus trap and Escape handler
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onCancel();
      return;
    }
    if (e.key === 'Tab') {
      const buttons = [cancelBtnRef.current, confirmBtnRef.current].filter(Boolean);
      if (buttons.length < 2) return;
      const firstBtn = buttons[0];
      const lastBtn = buttons[buttons.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstBtn) {
          e.preventDefault();
          lastBtn.focus();
        }
      } else {
        if (document.activeElement === lastBtn) {
          e.preventDefault();
          firstBtn.focus();
        }
      }
    }
  }, [onCancel]);

  return (
    <div
      className="dialog-overlay"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
      onClick={onCancel}
      onKeyDown={handleKeyDown}
    >
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h3 id="confirm-dialog-title">{title || 'Confirmer'}</h3>
        <p id="confirm-dialog-message">{message || 'Etes-vous sur de vouloir effectuer cette action ?'}</p>
        <div className="dialog-actions">
          <button ref={cancelBtnRef} className="btn btn-outline" onClick={onCancel}>
            Annuler
          </button>
          <button ref={confirmBtnRef} className="btn btn-danger" onClick={onConfirm}>
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
