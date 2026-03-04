import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../api/apiClient';
import { useToast } from '../context/ToastContext';
import SEOHead from '../components/SEOHead';

const MotDePasseOublie = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { showToast } = useToast();

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      showToast('Un code a \u00e9t\u00e9 envoy\u00e9 \u00e0 votre adresse email', 'success');
      setStep(2);
    } catch (err) {
      const msg = err.response?.data?.message || "Erreur lors de l'envoi du code";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre');
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword({ token, newPassword });
      setSuccess(true);
      showToast('Mot de passe r\u00e9initialis\u00e9 avec succ\u00e8s !', 'success');
    } catch (err) {
      const msg = err.response?.data?.message || 'Code invalide ou expir\u00e9';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <span className="brand-icon">&#9733;</span>
            <h2>Mot de passe r\u00e9initialis\u00e9</h2>
            <p>Votre mot de passe a \u00e9t\u00e9 modifi\u00e9 avec succ\u00e8s.</p>
          </div>
          <div className="auth-footer">
            <p><Link to="/connexion">Retour \u00e0 la connexion</Link></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <SEOHead title="Mot de passe oublié — Guide Africa Premium" />
      <div className="auth-container">
        <div className="auth-header">
          <span className="brand-icon">&#9733;</span>
          <h2>R\u00e9initialisation du mot de passe</h2>
          <p>
            {step === 1
              ? 'Entrez votre email pour recevoir un code de r\u00e9initialisation'
              : 'Entrez le code re\u00e7u et votre nouveau mot de passe'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendCode} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Adresse e-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                autoComplete="email"
              />
            </div>

            {error && <div className="form-error" role="alert">{error}</div>}

            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? 'Envoi...' : 'Envoyer le code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="auth-form">
            <div className="form-group">
              <label htmlFor="token">Code de r\u00e9initialisation</label>
              <input
                type="text"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="123456"
                required
                autoComplete="one-time-code"
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">Nouveau mot de passe</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 caract\u00e8res"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmez votre mot de passe"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            {error && <div className="form-error" role="alert">{error}</div>}

            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? 'R\u00e9initialisation...' : 'R\u00e9initialiser'}
            </button>
          </form>
        )}

        <div className="auth-footer">
          <p><Link to="/connexion">Retour \u00e0 la connexion</Link></p>
        </div>
      </div>
    </div>
  );
};

export default MotDePasseOublie;
