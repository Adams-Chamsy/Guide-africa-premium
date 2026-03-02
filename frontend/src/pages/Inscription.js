import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import usePageTitle from '../hooks/usePageTitle';

const Inscription = () => {
  usePageTitle('Inscription');
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
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.motDePasse)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre');
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
      showToast('Compte créé avec succès !', 'success');
      navigate('/', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || 'Erreur lors de l\'inscription';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <span className="brand-icon">&#9733;</span>
          <h2>Inscription</h2>
          <p>Rejoignez la communauté Guide Africa</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                placeholder="Votre prénom"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
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
            <label htmlFor="email">Adresse e-mail</label>
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
            <label htmlFor="motDePasse">Mot de passe</label>
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
            <label htmlFor="confirmMotDePasse">Confirmer le mot de passe</label>
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

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? 'Création...' : 'Créer mon compte'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Déjà un compte ? <Link to="/connexion">Connectez-vous</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
