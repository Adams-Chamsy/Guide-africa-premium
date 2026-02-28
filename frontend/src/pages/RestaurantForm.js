import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { restaurantApi, categoryApi, cityApi } from '../api/apiClient';
import Breadcrumbs from '../components/Breadcrumbs';

const RestaurantForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    nom: '', description: '', adresse: '', cuisine: '',
    telephone: '', email: '', horaires: '', image: '',
    latitude: '', longitude: '', galeriePhotos: '',
    fourchettePrix: '', siteWeb: '', instagram: '', facebook: '',
    codeVestimentaire: '', capacite: '',
    halal: false, vegetarienFriendly: false, optionsVegan: false, sansGluten: false,
    terrasse: false, wifi: false, parking: false, climatisation: false,
    sallePrivee: false, musiqueLive: false,
    villeId: '',
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    categoryApi.getAll({ type: 'RESTAURANT' })
      .then((res) => setAllCategories(res.data)).catch(() => {});
    cityApi.getAll()
      .then((res) => setCities(res.data)).catch(() => {});

    if (isEdit) {
      setLoading(true);
      restaurantApi.getById(id)
        .then((res) => {
          const r = res.data;
          setForm({
            nom: r.nom || '', description: r.description || '',
            adresse: r.adresse || '', cuisine: r.cuisine || '',
            telephone: r.telephone || '', email: r.email || '',
            horaires: r.horaires || '', image: r.image || '',
            latitude: r.coordonneesGps?.latitude || '',
            longitude: r.coordonneesGps?.longitude || '',
            galeriePhotos: r.galeriePhotos ? r.galeriePhotos.join(', ') : '',
            fourchettePrix: r.fourchettePrix || '',
            siteWeb: r.siteWeb || '', instagram: r.instagram || '', facebook: r.facebook || '',
            codeVestimentaire: r.codeVestimentaire || '',
            capacite: r.capacite || '',
            halal: r.halal || false, vegetarienFriendly: r.vegetarienFriendly || false,
            optionsVegan: r.optionsVegan || false, sansGluten: r.sansGluten || false,
            terrasse: r.terrasse || false, wifi: r.wifi || false,
            parking: r.parking || false, climatisation: r.climatisation || false,
            sallePrivee: r.sallePrivee || false, musiqueLive: r.musiqueLive || false,
            villeId: r.ville?.id || '',
          });
          setSelectedCategories(r.categories ? r.categories.map((c) => c.id) : []);
        })
        .catch(() => setError('Impossible de charger le restaurant.'))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
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
        nom: form.nom.trim(), description: form.description.trim(),
        adresse: form.adresse.trim(), cuisine: form.cuisine.trim(),
        telephone: form.telephone.trim(), email: form.email.trim(),
        horaires: form.horaires.trim(), image: form.image.trim(),
        siteWeb: form.siteWeb.trim(), instagram: form.instagram.trim(),
        facebook: form.facebook.trim(), codeVestimentaire: form.codeVestimentaire.trim(),
        capacite: form.capacite ? parseInt(form.capacite) : null,
        fourchettePrix: form.fourchettePrix ? parseInt(form.fourchettePrix) : null,
        halal: form.halal, vegetarienFriendly: form.vegetarienFriendly,
        optionsVegan: form.optionsVegan, sansGluten: form.sansGluten,
        terrasse: form.terrasse, wifi: form.wifi,
        parking: form.parking, climatisation: form.climatisation,
        sallePrivee: form.sallePrivee, musiqueLive: form.musiqueLive,
        coordonneesGps: form.latitude && form.longitude
          ? { latitude: parseFloat(form.latitude), longitude: parseFloat(form.longitude) }
          : null,
        galeriePhotos: form.galeriePhotos
          ? form.galeriePhotos.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        categories: selectedCategories.map((catId) => ({ id: catId })),
      };
      if (form.villeId) payload.ville = { id: parseInt(form.villeId) };

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
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Restaurants', to: '/restaurants' },
        { label: isEdit ? 'Modifier' : 'Ajouter' }
      ]} />
      <div className="african-pattern"></div>
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

        <div className="form-row">
          <div className="form-group">
            <label>Cuisine</label>
            <input name="cuisine" value={form.cuisine} onChange={handleChange} placeholder="Ex: Sénégalaise" />
          </div>
          <div className="form-group">
            <label>Ville</label>
            <select name="villeId" value={form.villeId} onChange={handleChange}>
              <option value="">Sélectionner une ville</option>
              {cities.map(c => <option key={c.id} value={c.id}>{c.nom}, {c.pays}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Adresse *</label>
          <input name="adresse" value={form.adresse} onChange={handleChange} placeholder="Adresse complète" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fourchette de prix</label>
            <select name="fourchettePrix" value={form.fourchettePrix} onChange={handleChange}>
              <option value="">Sélectionner</option>
              <option value="1">€ - Économique</option>
              <option value="2">€€ - Modéré</option>
              <option value="3">€€€ - Haut de gamme</option>
              <option value="4">€€€€ - Prestige</option>
            </select>
          </div>
          <div className="form-group">
            <label>Capacité (places)</label>
            <input name="capacite" type="number" min="0" value={form.capacite} onChange={handleChange} placeholder="80" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Horaires</label>
            <input name="horaires" value={form.horaires} onChange={handleChange} placeholder="Ex: Lun-Sam: 11h-23h" />
          </div>
          <div className="form-group">
            <label>Code vestimentaire</label>
            <input name="codeVestimentaire" value={form.codeVestimentaire} onChange={handleChange} placeholder="Ex: Smart casual" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Téléphone</label>
            <input name="telephone" value={form.telephone} onChange={handleChange} placeholder="+XXX XX XXX XX XX" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="contact@restaurant.com" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Site web</label>
            <input name="siteWeb" value={form.siteWeb} onChange={handleChange} placeholder="https://..." />
          </div>
          <div className="form-group">
            <label>Instagram</label>
            <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="@restaurant" />
          </div>
        </div>

        <div className="form-group">
          <label>Options alimentaires</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="halal" checked={form.halal} onChange={handleChange} /> Halal
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="vegetarienFriendly" checked={form.vegetarienFriendly} onChange={handleChange} /> Végétarien
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="optionsVegan" checked={form.optionsVegan} onChange={handleChange} /> Vegan
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="sansGluten" checked={form.sansGluten} onChange={handleChange} /> Sans gluten
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Équipements</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="terrasse" checked={form.terrasse} onChange={handleChange} /> Terrasse
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="wifi" checked={form.wifi} onChange={handleChange} /> Wi-Fi
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="parking" checked={form.parking} onChange={handleChange} /> Parking
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="climatisation" checked={form.climatisation} onChange={handleChange} /> Climatisation
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="sallePrivee" checked={form.sallePrivee} onChange={handleChange} /> Salle privée
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="musiqueLive" checked={form.musiqueLive} onChange={handleChange} /> Musique live
            </label>
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
          <label>URLs Galerie photos (séparées par des virgules)</label>
          <textarea name="galeriePhotos" value={form.galeriePhotos} onChange={handleChange} placeholder="https://..., https://..." rows={2} />
        </div>

        {allCategories.length > 0 && (
          <div className="form-group">
            <label>Catégories</label>
            <div className="category-checkboxes">
              {allCategories.map((cat) => (
                <span key={cat.id}
                  className={`category-checkbox ${selectedCategories.includes(cat.id) ? 'selected' : ''}`}
                  onClick={() => toggleCategory(cat.id)}>
                  {cat.nom}
                </span>
              ))}
            </div>
          </div>
        )}

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="btn btn-success" disabled={saving}>
            {saving ? 'Sauvegarde...' : isEdit ? 'Enregistrer' : 'Créer le restaurant'}
          </button>
          <Link to="/restaurants" className="btn btn-outline">Annuler</Link>
        </div>
      </form>
    </div>
  );
};

export default RestaurantForm;
