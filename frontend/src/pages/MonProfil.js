import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { userApi, badgeApi } from '../api/apiClient';
import Breadcrumbs from '../components/Breadcrumbs';
import usePageTitle from '../hooks/usePageTitle';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import ImageUpload from '../components/ImageUpload';

const MonProfil = () => {
  usePageTitle('Mon Profil');
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ nom: '', prenom: '', telephone: '' });
  const [stats, setStats] = useState({ favoris: 0, visites: 0, reservations: 0, collections: 0 });
  const [badges, setBadges] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('info');
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ nom: user.nom, prenom: user.prenom, telephone: '' });
      Promise.all([
        userApi.getFavorites().catch(() => ({ data: [] })),
        userApi.getVisits().catch(() => ({ data: [] })),
        userApi.getReservations().catch(() => ({ data: [] })),
        userApi.getCollections().catch(() => ({ data: [] })),
        badgeApi.getMyBadges().catch(() => ({ data: [] })),
      ]).then(([favRes, visRes, resRes, colRes, badgeRes]) => {
        setStats({
          favoris: favRes.data.length,
          visites: visRes.data.length,
          reservations: resRes.data.length || 0,
          collections: colRes.data.length || 0,
        });
        setBadges(badgeRes.data || []);
      });
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await userApi.updateProfile({
        nom: form.nom,
        prenom: form.prenom,
        telephone: form.telephone,
      });
      setMessage('Profil mis à jour avec succès !');
      showToast('Profil mis à jour avec succès !', 'success');
      setEditing(false);
    } catch (err) {
      setMessage('Erreur lors de la mise à jour.');
      showToast('Erreur lors de la mise à jour', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('Les mots de passe ne correspondent pas', 'error');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      showToast('Le mot de passe doit contenir au moins 8 caractères', 'error');
      return;
    }
    setChangingPassword(true);
    try {
      await userApi.changePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });
      showToast('Mot de passe modifié avec succès', 'success');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setActiveSection('info');
    } catch (err) {
      showToast('Erreur: vérifiez votre ancien mot de passe', 'error');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleAvatarUpload = async (url) => {
    try {
      await userApi.updateProfile({ avatar: url });
      showToast('Photo de profil mise à jour', 'success');
    } catch (err) {
      showToast('Erreur lors de la mise à jour de l\'avatar', 'error');
    }
  };

  if (!user) return null;

  const memberSince = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const level = stats.visites >= 20 ? 'Ambassadeur' : stats.visites >= 10 ? 'Explorateur' : stats.visites >= 3 ? 'Voyageur' : 'Découvreur';
  const levelEmoji = stats.visites >= 20 ? '\uD83D\uDC51' : stats.visites >= 10 ? '\uD83C\uDF0D' : stats.visites >= 3 ? '\u2708\uFE0F' : '\uD83C\uDF31';

  return (
    <div className="page-container">
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Mon Profil' },
      ]} />

      <div className="profile-page">
        {/* Passport-style header */}
        <ScrollReveal>
          <div className="profile-passport card">
            <div className="passport-header">
              <span className="passport-title">&#9733; GUIDE AFRICA PREMIUM</span>
              <span className="passport-subtitle">Passeport Gastronomique</span>
            </div>
            <div className="profile-avatar-section">
              <div className="passport-avatar-wrapper">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.prenom}+${user.nom}&background=1B6B4A&color=F5F0E8&size=128`}
                  alt={user.prenom}
                  className="profile-avatar"
                />
                <span className="passport-level-badge">{levelEmoji} {level}</span>
              </div>
              <div className="profile-info">
                <h2 className="passport-name">{user.prenom} {user.nom}</h2>
                <p className="profile-email">{user.email}</p>
                <p className="profile-member">Membre depuis {memberSince}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                  <span className="profile-role-badge">{user.role === 'ADMIN' ? 'Administrateur' : 'Membre Premium'}</span>
                  {user.pointsFidelite > 0 && (
                    <span className="profile-role-badge" style={{ background: 'var(--gold)', color: 'var(--bg-dark)' }}>
                      {user.pointsFidelite} pts
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={0.1}>
          <div className="profile-stats">
            <div className="stat-card card">
              <AnimatedCounter end={stats.favoris} />
              <span className="stat-label">Favoris</span>
            </div>
            <div className="stat-card card">
              <AnimatedCounter end={stats.visites} />
              <span className="stat-label">Visites</span>
            </div>
            <div className="stat-card card">
              <AnimatedCounter end={stats.reservations} />
              <span className="stat-label">Reservations</span>
            </div>
            <div className="stat-card card">
              <AnimatedCounter end={stats.collections} />
              <span className="stat-label">Collections</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Badges */}
        {badges.length > 0 && (
          <ScrollReveal delay={0.15}>
            <div className="profile-badges card">
              <h3>Mes Badges</h3>
              <div className="badge-grid">
                {badges.map(badge => (
                  <div key={badge.id} className="user-badge">
                    <span className="badge-icon">{badge.badgeIcone || '\uD83C\uDFC6'}</span>
                    <span className="badge-name">{badge.badgeNom}</span>
                    <span className="badge-desc">{badge.badgeDescription}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Section tabs */}
        <div className="detail-tabs" style={{ marginTop: 24 }}>
          <button className={`tab-btn ${activeSection === 'info' ? 'active' : ''}`} onClick={() => setActiveSection('info')}>
            Informations
          </button>
          <button className={`tab-btn ${activeSection === 'avatar' ? 'active' : ''}`} onClick={() => setActiveSection('avatar')}>
            Photo
          </button>
          <button className={`tab-btn ${activeSection === 'password' ? 'active' : ''}`} onClick={() => setActiveSection('password')}>
            Mot de passe
          </button>
        </div>

        {activeSection === 'info' && (
          <ScrollReveal delay={0.2}>
            <div className="profile-edit-card card">
              <div className="card-header-row">
                <h3>Informations personnelles</h3>
                {!editing && (
                  <button className="btn btn-outline btn-sm" onClick={() => setEditing(true)}>Modifier</button>
                )}
              </div>

              {editing ? (
                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Prenom</label>
                      <input type="text" value={form.prenom} onChange={(e) => setForm({...form, prenom: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Nom</label>
                      <input type="text" value={form.nom} onChange={(e) => setForm({...form, nom: e.target.value})} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Telephone</label>
                    <input type="tel" value={form.telephone} onChange={(e) => setForm({...form, telephone: e.target.value})} placeholder="+33 6 12 34 56 78" />
                  </div>
                  <div className="form-actions">
                    <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                      {saving ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                    <button className="btn btn-outline" onClick={() => setEditing(false)}>Annuler</button>
                  </div>
                </div>
              ) : (
                <div className="profile-details">
                  <div className="detail-row">
                    <span className="detail-label">Prenom</span>
                    <span className="detail-value">{user.prenom}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Nom</span>
                    <span className="detail-value">{user.nom}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{user.email}</span>
                  </div>
                </div>
              )}

              {message && <p className={message.includes('Erreur') ? 'form-error' : 'form-success'}>{message}</p>}
            </div>
          </ScrollReveal>
        )}

        {activeSection === 'avatar' && (
          <ScrollReveal delay={0.2}>
            <div className="profile-edit-card card">
              <h3>Photo de profil</h3>
              <p style={{ color: 'var(--ivory-subtle)', marginBottom: 16 }}>Telechargez une nouvelle photo de profil</p>
              <ImageUpload
                value={user.avatar}
                onChange={handleAvatarUpload}
              />
            </div>
          </ScrollReveal>
        )}

        {activeSection === 'password' && (
          <ScrollReveal delay={0.2}>
            <div className="profile-edit-card card">
              <h3>Changer mon mot de passe</h3>
              <div className="profile-form">
                <div className="form-group">
                  <label>Mot de passe actuel</label>
                  <input
                    type="password"
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Nouveau mot de passe</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    placeholder="Minimum 8 caracteres"
                  />
                </div>
                <div className="form-group">
                  <label>Confirmer le nouveau mot de passe</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  />
                </div>
                <div className="form-actions">
                  <button
                    className="btn btn-primary"
                    onClick={handleChangePassword}
                    disabled={changingPassword || !passwordForm.oldPassword || !passwordForm.newPassword}
                  >
                    {changingPassword ? 'Modification...' : 'Modifier le mot de passe'}
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        <div className="profile-danger card">
          <h3>Session</h3>
          <p>Se deconnecter de votre compte Guide Africa.</p>
          <button className="btn btn-danger" onClick={logout}>Deconnexion</button>
        </div>
      </div>
    </div>
  );
};

export default MonProfil;
