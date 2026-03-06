import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { userApi, badgeApi } from '../api/apiClient';
import Breadcrumbs from '../components/Breadcrumbs';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import ImageUpload from '../components/ImageUpload';
import { useTranslation } from 'react-i18next';

const MonProfil = () => {
  const { t } = useTranslation();
  usePageTitle(t('profile.title'));
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
      setMessage(t('profile.updateSuccess'));
      showToast(t('profile.updateSuccess'), 'success');
      setEditing(false);
    } catch (err) {
      setMessage(t('profile.updateError'));
      showToast(t('profile.updateError'), 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast(t('profile.passwordMismatch'), 'error');
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(passwordForm.newPassword)) {
      showToast(t('profile.passwordRequirements'), 'error');
      return;
    }
    setChangingPassword(true);
    try {
      await userApi.changePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });
      showToast(t('profile.passwordSuccess'), 'success');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setActiveSection('info');
    } catch (err) {
      showToast(t('profile.passwordError'), 'error');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleAvatarUpload = async (url) => {
    try {
      await userApi.updateProfile({ avatar: url });
      showToast(t('profile.avatarSuccess'), 'success');
    } catch (err) {
      showToast(t('profile.avatarError'), 'error');
    }
  };

  if (!user) return null;

  const memberSince = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const level = stats.visites >= 20 ? t('profile.levels.ambassador') : stats.visites >= 10 ? t('profile.levels.explorer') : stats.visites >= 3 ? t('profile.levels.traveler') : t('profile.levels.discoverer');
  const levelEmoji = stats.visites >= 20 ? '\uD83D\uDC51' : stats.visites >= 10 ? '\uD83C\uDF0D' : stats.visites >= 3 ? '\u2708\uFE0F' : '\uD83C\uDF31';

  return (
    <div className="page-container">
      <SEOHead title="Mon Profil — Guide Africa Premium" />
      <Breadcrumbs items={[
        { label: t('nav.home'), to: '/' },
        { label: t('profile.title') },
      ]} />

      <div className="profile-page">
        {/* Passport-style header */}
        <ScrollReveal>
          <div className="profile-passport card">
            <div className="passport-header">
              <span className="passport-title">&#9733; GUIDE AFRICA PREMIUM</span>
              <span className="passport-subtitle">{t('profile.passportTitle')}</span>
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
                <p className="profile-member">{t('profile.memberSince')} {memberSince}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                  <span className="profile-role-badge">{user.role === 'ADMIN' ? t('profile.administrator') : t('profile.premiumMember')}</span>
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
              <span className="stat-label">{t('profile.stats.favorites')}</span>
            </div>
            <div className="stat-card card">
              <AnimatedCounter end={stats.visites} />
              <span className="stat-label">{t('profile.stats.visits')}</span>
            </div>
            <div className="stat-card card">
              <AnimatedCounter end={stats.reservations} />
              <span className="stat-label">{t('profile.stats.reservations')}</span>
            </div>
            <div className="stat-card card">
              <AnimatedCounter end={stats.collections} />
              <span className="stat-label">{t('profile.stats.collections')}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Badges */}
        {badges.length > 0 && (
          <ScrollReveal delay={0.15}>
            <div className="profile-badges card">
              <h3>{t('profile.myBadges')}</h3>
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
            {t('profile.information')}
          </button>
          <button className={`tab-btn ${activeSection === 'avatar' ? 'active' : ''}`} onClick={() => setActiveSection('avatar')}>
            {t('profile.photo')}
          </button>
          <button className={`tab-btn ${activeSection === 'password' ? 'active' : ''}`} onClick={() => setActiveSection('password')}>
            {t('auth.password')}
          </button>
        </div>

        {activeSection === 'info' && (
          <ScrollReveal delay={0.2}>
            <div className="profile-edit-card card">
              <div className="card-header-row">
                <h3>{t('profile.personalInfo')}</h3>
                {!editing && (
                  <button className="btn btn-outline btn-sm" onClick={() => setEditing(true)}>{t('common.edit')}</button>
                )}
              </div>

              {editing ? (
                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('auth.firstName')}</label>
                      <input type="text" value={form.prenom} onChange={(e) => setForm({...form, prenom: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>{t('auth.lastName')}</label>
                      <input type="text" value={form.nom} onChange={(e) => setForm({...form, nom: e.target.value})} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t('common.phone')}</label>
                    <input type="tel" value={form.telephone} onChange={(e) => setForm({...form, telephone: e.target.value})} placeholder="+33 6 12 34 56 78" />
                  </div>
                  <div className="form-actions">
                    <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                      {saving ? t('common.saving') : t('common.save')}
                    </button>
                    <button className="btn btn-outline" onClick={() => setEditing(false)}>{t('common.cancel')}</button>
                  </div>
                </div>
              ) : (
                <div className="profile-details">
                  <div className="detail-row">
                    <span className="detail-label">{t('auth.firstName')}</span>
                    <span className="detail-value">{user.prenom}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">{t('auth.lastName')}</span>
                    <span className="detail-value">{user.nom}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">{t('common.email')}</span>
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
              <h3>{t('profile.profilePhoto')}</h3>
              <p style={{ color: 'var(--ivory-subtle)', marginBottom: 16 }}>{t('profile.uploadNewPhoto')}</p>
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
              <h3>{t('profile.changeMyPassword')}</h3>
              <div className="profile-form">
                <div className="form-group">
                  <label>{t('auth.currentPassword')}</label>
                  <input
                    type="password"
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>{t('auth.newPassword')}</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    placeholder={t('profile.minChars')}
                  />
                </div>
                <div className="form-group">
                  <label>{t('auth.confirmNewPassword')}</label>
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
                    {changingPassword ? t('profile.modifying') : t('profile.modifyPassword')}
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        <div className="profile-danger card">
          <h3>{t('profile.session')}</h3>
          <p>{t('profile.logoutDescription')}</p>
          <button className="btn btn-danger" onClick={logout}>{t('auth.logout')}</button>
        </div>
      </div>
    </div>
  );
};

export default MonProfil;
