import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { restaurantApi, categoryApi } from '../api/apiClient';

const RestaurantForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    nom: '',
    description: '',
    adresse: '',
    cuisine: '',
    telephone: '',
    email: '',
    horaires: '',
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
    categoryApi.getAll({ type: 'RESTAURANT' })
      .then((res) => setAllCategories(res.data))
      .catch(() => {});

    if (isEdit) {
      setLoading(true);
      restaurantApi.getById(id)
        .then((res) => {
          const r = res.data;
          setForm({
            nom: r.nom || '',
            description: r.description || '',
            adresse: r.adresse || '',
            cuisine: r.cuisine || '',
            telephone: r.telephone || '',
            email: r.email || '',
            horaires: r.horaires || '',
            image: r.image || '',
            latitude: r.coordonneesGps?.latitude || '',
            longitude: r.coordonneesGps?.longitude || '',
            galeriePhotos: r.galeriePhotos ? r.galeriePhotos.join(', ') : '',
          });
          setSelectedCategories(r.categories ? r.categories.map((c) => c.id) : []);
        })
        .catch(() => setError('Impossible de charger le restaurant.'))
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
        cuisine: form.cuisine.trim(),
        telephone: form.telephone.trim(),
        email: form.email.trim(),
        horaires: form.horaires.trim(),
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
        await restaurantApi.update(id, payload);
        navigate(`/restaurants/${id}`);
      } else {
        const res = await restaurantApi.create(payload);
        navigate(`/restaurants/${res.data.id}`);
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
      <Link to="/restaurants" className="btn btn-back">&larr; Retour</Link>
      <h2 className="form-title">
        {isEdit ? 'Modifier le restaurant' : 'Ajouter un restaurant'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom *</label>
          <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom du restaurant" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description du restaurant" />
        </div>

        <div className="form-group">
          <label>Adresse *</label>
          <input name="adresse" value={form.adresse} onChange={handleChange} placeholder="Adresse compl\u00e8te" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Cuisine</label>
            <input name="cuisine" value={form.cuisine} onChange={handleChange} placeholder="Ex: S\u00e9n\u00e9galaise" />
          </div>
          <div className="form-group">
            <label>Horaires</label>
            <input name="horaires" value={form.horaires} onChange={handleChange} placeholder="Ex: Lun-Sam: 11h-23h" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>T&eacute;l&eacute;phone</label>
            <input name="telephone" value={form.telephone} onChange={handleChange} placeholder="+XXX XX XXX XX XX" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="contact@restaurant.com" />
          </div>
        </div>

        <div className="form-group">
          <label>URL Image principale</label>
          <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Latitude</label>
            <input name="latitude" type="number" step="any" value={form.latitude} onChange={handleChange} placeholder="14.6937" />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input name="longitude" type="number" step="any" value={form.longitude} onChange={handleChange} placeholder="-17.4441" />
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
            {saving ? 'Sauvegarde...' : isEdit ? 'Enregistrer' : 'Cr\u00e9er le restaurant'}
          </button>
          <Link to="/restaurants" className="btn btn-outline">Annuler</Link>
        </div>
      </form>
    </div>
  );
};

export default RestaurantForm;
