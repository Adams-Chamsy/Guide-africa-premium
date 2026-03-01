import React, { useState, useEffect } from 'react';
import { FiX, FiMail, FiCheck } from 'react-icons/fi';
import { newsletterApi } from '../api/apiClient';

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('guideafrica_newsletter_dismissed');
    const subscribed = localStorage.getItem('guideafrica_newsletter_subscribed');
    if (dismissed || subscribed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
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
    <div className="newsletter-modal-overlay" onClick={handleClose}>
      <div className="newsletter-modal" onClick={e => e.stopPropagation()}>
        <button className="newsletter-close" onClick={handleClose}>
          <FiX size={20} />
        </button>

        {!submitted ? (
          <>
            <div style={{ marginBottom: 8 }}>
              <FiMail size={32} style={{ color: 'var(--gold)' }} />
            </div>
            <h2>Restez informé</h2>
            <p>
              Recevez nos meilleures adresses, événements exclusifs et articles directement dans votre boîte mail.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="newsletter-input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                />
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ borderRadius: 50, whiteSpace: 'nowrap' }}>
                  {loading ? '...' : 'S\'inscrire'}
                </button>
              </div>
            </form>
            <p style={{ fontSize: '0.7rem', color: 'var(--ivory-subtle)', marginTop: 12, marginBottom: 0 }}>
              Pas de spam. Désinscription en un clic.
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
            <h2 style={{ color: 'var(--emerald-light)' }}>Merci !</h2>
            <p>Vous recevrez bientôt nos meilleures recommandations.</p>
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
