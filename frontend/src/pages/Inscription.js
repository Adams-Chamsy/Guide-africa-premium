import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import SEOHead from '../components/SEOHead';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from 'react-i18next';

const Inscription = () => {
  const { t } = useTranslation();
  usePageTitle(t('auth.register'));
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    confirmMotDePasse: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.motDePasse !== form.confirmMotDePasse) {
      setError(t('auth.passwordMismatch'));
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.motDePasse)) {
      setError(t('auth.passwordRequirements'));
      return;
    }

    setLoading(true);
    try {
      await register({
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        motDePasse: form.motDePasse,
      });
      showToast(t('auth.accountCreated'), 'success');
      navigate('/', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || t('auth.registerError');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <SEOHead title={`${t('auth.register')} — Guide Africa Premium`} />
      <div className="auth-container">
        <div className="auth-header">
          <span className="brand-icon">&#9733;</span>
          <h2>{t('auth.register')}</h2>
          <p>{t('auth.joinCommunity')}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prenom">{t('auth.firstName')}</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                placeholder="Votre prénom"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="nom">{t('auth.lastName')}</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                placeholder="Votre nom"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('auth.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="motDePasse">{t('auth.password')}</label>
            <input
              type="password"
              id="motDePasse"
              name="motDePasse"
              value={form.motDePasse}
              onChange={handleChange}
              placeholder="Min. 8 car., 1 majuscule, 1 chiffre"
              required
              minLength={8}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmMotDePasse">{t('auth.confirmPassword')}</label>
            <input
              type="password"
              id="confirmMotDePasse"
              name="confirmMotDePasse"
              value={form.confirmMotDePasse}
              onChange={handleChange}
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>

          {error && <div className="form-error" role="alert">{error}</div>}

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? t('auth.creating') : t('auth.createMyAccount')}
          </button>
        </form>

        <div className="auth-footer">
          <p>{t('auth.hasAccount')} <Link to="/connexion">{t('auth.loginLink')}</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
