import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiX, FiMail, FiCheck } from 'react-icons/fi';
import { newsletterApi } from '../api/apiClient';

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const previousFocusRef = useRef(null);
  const emailInputRef = useRef(null);
  const closeBtnRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('guideafrica_newsletter_dismissed');
    const subscribed = localStorage.getItem('guideafrica_newsletter_subscribed');
    if (dismissed || subscribed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  // Save/restore focus and focus email input on open
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      // Small delay to ensure the modal is rendered
      const t = setTimeout(() => {
        if (emailInputRef.current) {
          emailInputRef.current.focus();
        } else if (closeBtnRef.current) {
          closeBtnRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(t);
    } else {
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  // Focus trap and Escape handler
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      handleClose();
      return;
    }
    if (e.key === 'Tab' && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const focusable = Array.from(focusableElements).filter(el => !el.disabled);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    try {
      await newsletterApi.subscribe(email);
      setSubmitted(true);
      localStorage.setItem('guideafrica_newsletter_subscribed', 'true');
    } catch (err) {
      // If already subscribed, treat as success
      setSubmitted(true);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('guideafrica_newsletter_dismissed', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="newsletter-modal-overlay" onClick={handleClose} onKeyDown={handleKeyDown}>
      <div
        className="newsletter-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-title"
        onClick={e => e.stopPropagation()}
      >
        <button ref={closeBtnRef} className="newsletter-close" onClick={handleClose} aria-label="Fermer">
          <FiX size={20} />
        </button>

        {!submitted ? (
          <>
            <div style={{ marginBottom: 8 }}>
              <FiMail size={32} style={{ color: 'var(--gold)' }} aria-hidden="true" />
            </div>
            <h2 id="newsletter-title">Restez inform&eacute;</h2>
            <p>
              Recevez nos meilleures adresses, &eacute;v&eacute;nements exclusifs et articles directement dans votre bo&icirc;te mail.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="newsletter-input-group">
                <label htmlFor="newsletter-email" className="sr-only">Adresse email</label>
                <input
                  id="newsletter-email"
                  ref={emailInputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  aria-label="Adresse email"
                />
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ borderRadius: 50, whiteSpace: 'nowrap' }}>
                  {loading ? '...' : 'S\'inscrire'}
                </button>
              </div>
            </form>
            <p style={{ fontSize: '0.7rem', color: 'var(--ivory-subtle)', marginTop: 12, marginBottom: 0 }}>
              Pas de spam. D&eacute;sinscription en un clic.
            </p>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'rgba(27, 107, 74, 0.2)', border: '2px solid var(--emerald)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto'
              }}>
                <FiCheck size={28} style={{ color: 'var(--emerald-light)' }} />
              </div>
            </div>
            <h2 id="newsletter-title" style={{ color: 'var(--emerald-light)' }}>Merci !</h2>
            <p>Vous recevrez bient&ocirc;t nos meilleures recommandations.</p>
            <button onClick={handleClose} className="btn btn-secondary" style={{ marginTop: 8 }}>
              Continuer l'exploration
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsletterModal;
