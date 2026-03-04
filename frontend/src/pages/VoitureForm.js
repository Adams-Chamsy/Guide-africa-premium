import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import { voitureApi, cityApi } from '../api/apiClient';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import ImageUpload from '../components/ImageUpload';
import usePageTitle from '../hooks/usePageTitle';

const VoitureForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  usePageTitle(isEdit ? 'Modifier la voiture' : 'Proposer une voiture');

  const [form, setForm] = useState({
    marque: '', modele: '', annee: '', description: '',
    categorie: '', carburant: '', transmission: '',
    nombrePlaces: '', nombrePortes: '',
    prixParJour: '', villeId: '', adresse: '',
    telephone: '', whatsapp: '',
    kilometrageInclus: '', conditions: '',
    imagePrincipale: '', galeriePhotos: '',
    climatisation: false, gps: false, bluetooth: false, siegesBebe: false,
  });
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    cityApi.getAll()
      .then((res) => setCities(res.data)).catch(() => {});

    if (isEdit) {
      setLoading(true);
      voitureApi.getById(id)
        .then((res) => {
          const v = res.data;
          setForm({
            marque: v.marque || '', modele: v.modele || '',
            annee: v.annee || '', description: v.description || '',
            categorie: v.categorie || '', carburant: v.carburant || '',
            transmission: v.transmission || '',
            nombrePlaces: v.nombrePlaces || '', nombrePortes: v.nombrePortes || '',
            prixParJour: v.prixParJour || '', villeId: v.ville?.id || '',
            adresse: v.adresse || '', telephone: v.telephone || '',
            whatsapp: v.whatsapp || '',
            kilometrageInclus: v.kilometrageInclus || '',
            conditions: v.conditions || '',
            imagePrincipale: v.imagePrincipale || '',
            galeriePhotos: v.galeriePhotos ? v.galeriePhotos.join(', ') : '',
            climatisation: v.climatisation || false,
            gps: v.gps || false,
            bluetooth: v.bluetooth || false,
            siegesBebe: v.siegesBebe || false,
          });
        })
        .catch(() => setError('Impossible de charger la voiture.'))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.marque.trim()) { setError('La marque est obligatoire.'); return; }
    if (!form.modele.trim()) { setError('Le mod\u00e8le est obligatoire.'); return; }
    if (!form.prixParJour) { setError('Le prix par jour est obligatoire.'); return; }

    setSaving(true);
    try {
      const payload = {
        marque: form.marque.trim(),
        modele: form.modele.trim(),
        annee: form.annee ? parseInt(form.annee) : null,
        description: form.description.trim(),
        categorie: form.categorie || null,
        carburant: form.carburant || null,
        transmission: form.transmission || null,
        nombrePlaces: form.nombrePlaces ? parseInt(form.nombrePlaces) : null,
        nombrePortes: form.nombrePortes ? parseInt(form.nombrePortes) : null,
        prixParJour: parseFloat(form.prixParJour),
        adresse: form.adresse.trim(),
        telephone: form.telephone.trim(),
        whatsapp: form.whatsapp.trim(),
        kilometrageInclus: form.kilometrageInclus.trim(),
        conditions: form.conditions.trim(),
        imagePrincipale: form.imagePrincipale.trim(),
        galeriePhotos: form.galeriePhotos
          ? form.galeriePhotos.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        climatisation: form.climatisation,
        gps: form.gps,
        bluetooth: form.bluetooth,
        siegesBebe: form.siegesBebe,
      };
      if (form.villeId) payload.ville = { id: parseInt(form.villeId) };

      if (isEdit) {
        await voitureApi.update(id, payload);
        navigate(`/voitures/${id}`);
      } else {
        const res = await voitureApi.create(payload);
        navigate(`/voitures/${res.data.id}`);
      }
    } catch (err) {
      const msg = err.response?.data?.errors
        ? Object.values(err.response.data.errors).join(', ')
        : err.response?.data?.message || 'Erreur lors de la sauvegarde.';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

  return (
    <>
      <SEOHead title={isEdit ? 'Modifier la voiture' : 'Proposer une voiture'} />
      <div className="form-container">
        <Breadcrumbs items={[
          { label: 'Accueil', to: '/' },
          { label: 'Voitures', to: '/voitures' },
          { label: isEdit ? 'Modifier' : 'Proposer' }
        ]} />
        <div className="african-pattern"></div>
        <h2 className="form-title">
          {isEdit ? 'Modifier la voiture' : 'Proposer ma voiture'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="marque">Marque *</label>
              <input id="marque" name="marque" value={form.marque} onChange={handleChange} placeholder="Ex: Toyota" />
            </div>
            <div className="form-group">
              <label htmlFor="modele">Mod\u00e8le *</label>
              <input id="modele" name="modele" value={form.modele} onChange={handleChange} placeholder="Ex: Land Cruiser" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="annee">Ann\u00e9e</label>
              <input id="annee" name="annee" type="number" min="1990" max="2030" value={form.annee} onChange={handleChange} placeholder="2023" />
            </div>
            <div className="form-group">
              <label htmlFor="categorie">Cat\u00e9gorie</label>
              <select id="categorie" name="categorie" value={form.categorie} onChange={handleChange}>
                <option value="">S\u00e9lectionner</option>
                <option value="BERLINE">Berline</option>
                <option value="SUV">SUV</option>
                <option value="CITADINE">Citadine</option>
                <option value="MONOSPACE">Monospace</option>
                <option value="LUXE">Luxe</option>
                <option value="PICKUP">Pickup</option>
                <option value="UTILITAIRE">Utilitaire</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange}
              placeholder="D\u00e9crivez votre v\u00e9hicule (confort, \u00e9tat, particularit\u00e9s...)" rows={4} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="carburant">Carburant</label>
              <select id="carburant" name="carburant" value={form.carburant} onChange={handleChange}>
                <option value="">S\u00e9lectionner</option>
                <option value="ESSENCE">Essence</option>
                <option value="DIESEL">Diesel</option>
                <option value="HYBRIDE">Hybride</option>
                <option value="ELECTRIQUE">\u00c9lectrique</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="transmission">Transmission</label>
              <select id="transmission" name="transmission" value={form.transmission} onChange={handleChange}>
                <option value="">S\u00e9lectionner</option>
                <option value="MANUELLE">Manuelle</option>
                <option value="AUTOMATIQUE">Automatique</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombrePlaces">Nombre de places</label>
              <input id="nombrePlaces" name="nombrePlaces" type="number" min="1" max="50" value={form.nombrePlaces} onChange={handleChange} placeholder="5" />
            </div>
            <div className="form-group">
              <label htmlFor="nombrePortes">Nombre de portes</label>
              <input id="nombrePortes" name="nombrePortes" type="number" min="2" max="6" value={form.nombrePortes} onChange={handleChange} placeholder="4" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prixParJour">Prix par jour (FCFA) *</label>
              <input id="prixParJour" name="prixParJour" type="number" min="0" value={form.prixParJour} onChange={handleChange} placeholder="25000" />
            </div>
            <div className="form-group">
              <label htmlFor="kilometrageInclus">Kilom\u00e9trage inclus</label>
              <input id="kilometrageInclus" name="kilometrageInclus" value={form.kilometrageInclus} onChange={handleChange} placeholder="Ex: 200 km/jour" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="villeId">Ville</label>
              <select id="villeId" name="villeId" value={form.villeId} onChange={handleChange}>
                <option value="">S\u00e9lectionner une ville</option>
                {cities.map(c => <option key={c.id} value={c.id}>{c.nom}, {c.pays}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="adresse">Adresse</label>
              <input id="adresse" name="adresse" value={form.adresse} onChange={handleChange} placeholder="Adresse de r\u00e9cup\u00e9ration" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telephone">T\u00e9l\u00e9phone</label>
              <input id="telephone" name="telephone" value={form.telephone} onChange={handleChange} placeholder="+XXX XX XXX XX XX" />
            </div>
            <div className="form-group">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input id="whatsapp" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+XXX XX XXX XX XX" />
            </div>
          </div>

          <div className="form-group">
            <label>\u00c9quipements</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" name="climatisation" checked={form.climatisation} onChange={handleChange} /> Climatisation
              </label>
              <label className="checkbox-label">
                <input type="checkbox" name="gps" checked={form.gps} onChange={handleChange} /> GPS
              </label>
              <label className="checkbox-label">
                <input type="checkbox" name="bluetooth" checked={form.bluetooth} onChange={handleChange} /> Bluetooth
              </label>
              <label className="checkbox-label">
                <input type="checkbox" name="siegesBebe" checked={form.siegesBebe} onChange={handleChange} /> Si\u00e8ges b\u00e9b\u00e9
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="conditions">Conditions de location</label>
            <textarea id="conditions" name="conditions" value={form.conditions} onChange={handleChange}
              placeholder="Conditions de location, d\u00e9p\u00f4t de garantie, documents requis..." rows={3} />
          </div>

          <ImageUpload
            value={form.imagePrincipale}
            onChange={(url) => setForm({ ...form, imagePrincipale: url })}
            label="Image principale"
          />

          <div className="form-group">
            <label htmlFor="galeriePhotos">URLs Galerie photos (s\u00e9par\u00e9es par des virgules)</label>
            <textarea id="galeriePhotos" name="galeriePhotos" value={form.galeriePhotos} onChange={handleChange}
              placeholder="https://..., https://..." rows={2} />
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="form-actions">
            <button type="submit" className="btn btn-success" disabled={saving}>
              {saving ? 'Sauvegarde...' : isEdit ? (
                <><FiSave style={{ marginRight: 6 }} /> Enregistrer</>
              ) : (
                <><FiSave style={{ marginRight: 6 }} /> Publier l&apos;annonce</>
              )}
            </button>
            <Link to="/voitures" className="btn btn-outline"><FiArrowLeft style={{ marginRight: 6 }} /> Annuler</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default VoitureForm;
