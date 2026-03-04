import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import SEOHead from '../components/SEOHead';
import usePageTitle from '../hooks/usePageTitle';

const Connexion = () => {
  usePageTitle('Connexion');
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
      showToast('Connexion réussie !', 'success');
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || 'Email ou mot de passe incorrect';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <SEOHead title="Connexion — Guide Africa Premium" />
      <div className="auth-container">
        <div className="auth-header">
          <span className="brand-icon">&#9733;</span>
          <h2>Connexion</h2>
          <p>Accédez à votre espace personnel</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Adresse e-mail</label>
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
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="Votre mot de passe"
              required
              autoComplete="current-password"
            />
            <Link to="/mot-de-passe-oublie" style={{ color: 'var(--gold)', fontSize: '0.85rem', display: 'block', textAlign: 'right', marginTop: 4 }}>Mot de passe oublié ?</Link>
          </div>

          {error && <div className="form-error" role="alert">{error}</div>}

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Pas encore de compte ? <Link to="/inscription">Inscrivez-vous</Link></p>
        </div>

        <div className="auth-demo">
          <p>Compte démo :</p>
          <code>aminata@example.com / password123</code>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
