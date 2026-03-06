import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userApi } from '../api/apiClient';
import Breadcrumbs from '../components/Breadcrumbs';
import { SkeletonGrid } from '../components/Skeleton';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';

const MesVisites = () => {
  usePageTitle('Mes Visites');
  const [visites, setVisites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    type: 'RESTAURANT',
    targetId: '',
    dateVisite: new Date().toISOString().split('T')[0],
    note: '',
    commentaire: '',
  });

  useEffect(() => {
    loadVisites();
  }, []);

  const loadVisites = async () => {
    setLoading(true);
    try {
      const response = await userApi.getVisits();
      setVisites(response.data);
    } catch (err) {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userApi.addVisit({
        ...form,
        targetId: parseInt(form.targetId),
        note: form.note ? parseInt(form.note) : null,
      });
      setShowForm(false);
      setForm({ type: 'RESTAURANT', targetId: '', dateVisite: new Date().toISOString().split('T')[0], note: '', commentaire: '' });
      loadVisites();
    } catch (err) {
      // Error handled silently
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <div className="page-container">
      <SEOHead title="Mes Visites — Guide Africa Premium" />
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Mes Visites' },
      ]} />

      <div className="page-header">
        <span className="page-subtitle">Mon espace personnel</span>
        <h2 className="page-title">Mes Visites</h2>
        <p>{visites.length} {visites.length > 1 ? 'visites enregistrées' : 'visite enregistrée'}</p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Annuler' : '+ Ajouter une visite'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ padding: 24, marginBottom: 24 }}>
          <h3>Nouvelle visite</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
                  <option value="RESTAURANT">Restaurant</option>
                  <option value="HOTEL">Hôtel</option>
                </select>
              </div>
              <div className="form-group">
                <label>ID {form.type === 'RESTAURANT' ? 'du restaurant' : 'de l\'hôtel'}</label>
                <input type="number" value={form.targetId} onChange={(e) => setForm({...form, targetId: e.target.value})} required min="1" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date de visite</label>
                <input type="date" value={form.dateVisite} onChange={(e) => setForm({...form, dateVisite: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Note personnelle (1-5)</label>
                <select value={form.note} onChange={(e) => setForm({...form, note: e.target.value})}>
                  <option value="">Sans note</option>
                  <option value="1">1 - Décevant</option>
                  <option value="2">2 - Moyen</option>
                  <option value="3">3 - Bien</option>
                  <option value="4">4 - Très bien</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Commentaire personnel</label>
              <textarea value={form.commentaire} onChange={(e) => setForm({...form, commentaire: e.target.value})} rows={3} placeholder="Notes personnelles..." />
            </div>
            <button type="submit" className="btn btn-primary">Enregistrer la visite</button>
          </form>
        </div>
      )}

      {loading ? (
        <SkeletonGrid count={4} />
      ) : visites.length === 0 ? (
        <div className="empty-state">
          <p>Vous n'avez pas encore enregistré de visites.</p>
          <p>Ajoutez vos visites pour garder un historique de vos découvertes !</p>
        </div>
      ) : (
        <div className="visits-list">
          {visites.map(visite => (
            <div key={visite.id} className="card visite-card">
              <Link to={`/${visite.type === 'RESTAURANT' ? 'restaurants' : 'hotels'}/${visite.targetId}`} className="visite-link">
                <div className="visite-image">
                  {visite.imageEtablissement && <img src={visite.imageEtablissement} alt={visite.nomEtablissement} />}
                </div>
                <div className="visite-info">
                  <span className={`card-type-badge ${visite.type === 'RESTAURANT' ? 'badge-restaurant' : 'badge-hotel'}`}>
                    {visite.type === 'RESTAURANT' ? 'Restaurant' : 'Hôtel'}
                  </span>
                  <h3>{visite.nomEtablissement || `${visite.type} #${visite.targetId}`}</h3>
                  <p className="visite-date">{formatDate(visite.dateVisite)}</p>
                  {visite.note && <p className="visite-note">{'★'.repeat(visite.note)}{'☆'.repeat(5 - visite.note)}</p>}
                  {visite.commentaire && <p className="visite-comment">{visite.commentaire}</p>}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MesVisites;
