import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { hotelApi, categoryApi } from '../api/apiClient';

const HotelForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    nom: '',
    description: '',
    adresse: '',
    etoiles: '',
    prixParNuit: '',
    telephone: '',
    email: '',
    image: '',
    latitude: '',
    longitude: '',
    galeriePhotos: '',
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    categoryApi.getAll({ type: 'HOTEL' })
      .then((res) => setAllCategories(res.data))
      .catch(() => {});

    if (isEdit) {
      setLoading(true);
      hotelApi.getById(id)
        .then((res) => {
          const h = res.data;
          setForm({
            nom: h.nom || '',
            description: h.description || '',
            adresse: h.adresse || '',
            etoiles: h.etoiles || '',
            prixParNuit: h.prixParNuit || '',
            telephone: h.telephone || '',
            email: h.email || '',
            image: h.image || '',
            latitude: h.coordonneesGps?.latitude || '',
            longitude: h.coordonneesGps?.longitude || '',
            galeriePhotos: h.galeriePhotos ? h.galeriePhotos.join(', ') : '',
          });
          setSelectedCategories(h.categories ? h.categories.map((c) => c.id) : []);
        })
        .catch(() => setError('Impossible de charger l\'h\u00f4tel.'))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleCategory = (catId) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.nom.trim()) { setError('Le nom est obligatoire.'); return; }
    if (!form.adresse.trim()) { setError('L\'adresse est obligatoire.'); return; }

    setSaving(true);
    try {
      const payload = {
        nom: form.nom.trim(),
        description: form.description.trim(),
        adresse: form.adresse.trim(),
        etoiles: form.etoiles ? parseInt(form.etoiles) : null,
        prixParNuit: form.prixParNuit ? parseFloat(form.prixParNuit) : null,
        telephone: form.telephone.trim(),
        email: form.email.trim(),
        image: form.image.trim(),
        coordonneesGps: form.latitude && form.longitude
          ? { latitude: parseFloat(form.latitude), longitude: parseFloat(form.longitude) }
          : null,
        galeriePhotos: form.galeriePhotos
          ? form.galeriePhotos.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        categories: selectedCategories.map((catId) => ({ id: catId })),
      };

      if (isEdit) {
        await hotelApi.update(id, payload);
        navigate(`/hotels/${id}`);
      } else {
        const res = await hotelApi.create(payload);
        navigate(`/hotels/${res.data.id}`);
      }
    } catch (err) {
      const msg = err.response?.data?.errors
        ? Object.values(err.response.data.errors).join(', ')
        : 'Erreur lors de la sauvegarde.';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

  return (
    <div className="form-container">
      <div className="african-pattern"></div>
      <Link to="/hotels" className="btn btn-back">&larr; Retour</Link>
      <h2 className="form-title">
        {isEdit ? 'Modifier l\'h\u00f4tel' : 'Ajouter un h\u00f4tel'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom *</label>
          <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom de l'h\u00f4tel" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description de l'h\u00f4tel" />
        </div>

        <div className="form-group">
          <label>Adresse *</label>
          <input name="adresse" value={form.adresse} onChange={handleChange} placeholder="Adresse compl\u00e8te" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>&Eacute;toiles (1-5)</label>
            <select name="etoiles" value={form.etoiles} onChange={handleChange}>
              <option value="">S&eacute;lectionner</option>
              <option value="1">1 ★</option>
              <option value="2">2 ★★</option>
              <option value="3">3 ★★★</option>
              <option value="4">4 ★★★★</option>
              <option value="5">5 ★★★★★</option>
            </select>
          </div>
          <div className="form-group">
            <label>Prix par nuit (\u20AC)</label>
            <input name="prixParNuit" type="number" step="0.01" min="0" value={form.prixParNuit} onChange={handleChange} placeholder="120.00" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>T&eacute;l&eacute;phone</label>
            <input name="telephone" value={form.telephone} onChange={handleChange} placeholder="+XXX XX XXX XX XX" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="reservation@hotel.com" />
          </div>
        </div>

        <div className="form-group">
          <label>URL Image principale</label>
          <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Latitude</label>
            <input name="latitude" type="number" step="any" value={form.latitude} onChange={handleChange} placeholder="-1.2921" />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input name="longitude" type="number" step="any" value={form.longitude} onChange={handleChange} placeholder="36.8219" />
          </div>
        </div>

        <div className="form-group">
          <label>URLs Galerie photos (s&eacute;par&eacute;es par des virgules)</label>
          <textarea name="galeriePhotos" value={form.galeriePhotos} onChange={handleChange} placeholder="https://..., https://..." rows={2} />
        </div>

        {allCategories.length > 0 && (
          <div className="form-group">
            <label>Cat&eacute;gories</label>
            <div className="category-checkboxes">
              {allCategories.map((cat) => (
                <span
                  key={cat.id}
                  className={`category-checkbox ${selectedCategories.includes(cat.id) ? 'selected' : ''}`}
                  onClick={() => toggleCategory(cat.id)}
                >
                  {cat.nom}
                </span>
              ))}
            </div>
          </div>
        )}

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="btn btn-success" disabled={saving}>
            {saving ? 'Sauvegarde...' : isEdit ? 'Enregistrer' : 'Cr\u00e9er l\'h\u00f4tel'}
          </button>
          <Link to="/hotels" className="btn btn-outline">Annuler</Link>
        </div>
      </form>
    </div>
  );
};

export default HotelForm;
