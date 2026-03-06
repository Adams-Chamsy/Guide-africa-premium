import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import SEOHead from '../components/SEOHead';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from 'react-i18next';

const Connexion = () => {
  const { t } = useTranslation();
  usePageTitle(t('auth.login'));
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  if (isAuthenticated) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, motDePasse);
      showToast(t('auth.loginSuccess'), 'success');
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || t('auth.loginError');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <SEOHead title={`${t('auth.login')} — Guide Africa Premium`} />
      <div className="auth-container">
        <div className="auth-header">
          <span className="brand-icon">&#9733;</span>
          <h2>{t('auth.login')}</h2>
          <p>{t('auth.personalSpace')}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">{t('auth.email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              autoFocus
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('auth.password')}</label>
            <input
              type="password"
              id="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="Votre mot de passe"
              required
              autoComplete="current-password"
            />
            <Link to="/mot-de-passe-oublie" style={{ color: 'var(--gold)', fontSize: '0.85rem', display: 'block', textAlign: 'right', marginTop: 4 }}>{t('auth.forgotPassword')}</Link>
          </div>

          {error && <div className="form-error" role="alert">{error}</div>}

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? t('auth.loggingIn') : t('auth.loginBtn')}
          </button>
        </form>

        <div className="auth-footer">
          <p>{t('auth.noAccount')} <Link to="/inscription">{t('auth.registerLink')}</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
