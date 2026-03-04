import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { hotelApi, categoryApi, cityApi } from '../api/apiClient';
import Breadcrumbs from '../components/Breadcrumbs';
import ImageUpload from '../components/ImageUpload';

const HotelForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    nom: '', description: '', adresse: '', etoiles: '',
    prixParNuit: '', telephone: '', email: '', image: '',
    latitude: '', longitude: '', galeriePhotos: '',
    siteWeb: '', instagram: '', facebook: '',
    checkIn: '', checkOut: '', nombreChambres: '',
    wifi: false, parking: false, piscine: false, spa: false,
    restaurantSurPlace: false, salleSport: false, navette: false,
    petitDejeunerInclus: false, animauxAcceptes: false,
    climatisation: false, roomService: false, conciergerie: false,
    villeId: '',
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    categoryApi.getAll({ type: 'HOTEL' })
      .then((res) => setAllCategories(res.data)).catch(() => {});
    cityApi.getAll()
      .then((res) => setCities(res.data)).catch(() => {});

    if (isEdit) {
      setLoading(true);
      hotelApi.getById(id)
        .then((res) => {
          const h = res.data;
          setForm({
            nom: h.nom || '', description: h.description || '',
            adresse: h.adresse || '', etoiles: h.etoiles || '',
            prixParNuit: h.prixParNuit || '', telephone: h.telephone || '',
            email: h.email || '', image: h.image || '',
            latitude: h.coordonneesGps?.latitude || '',
            longitude: h.coordonneesGps?.longitude || '',
            galeriePhotos: h.galeriePhotos ? h.galeriePhotos.join(', ') : '',
            siteWeb: h.siteWeb || '', instagram: h.instagram || '', facebook: h.facebook || '',
            checkIn: h.checkIn || '', checkOut: h.checkOut || '',
            nombreChambres: h.nombreChambres || '',
            wifi: h.wifi || false, parking: h.parking || false,
            piscine: h.piscine || false, spa: h.spa || false,
            restaurantSurPlace: h.restaurantSurPlace || false,
            salleSport: h.salleSport || false, navette: h.navette || false,
            petitDejeunerInclus: h.petitDejeunerInclus || false,
            animauxAcceptes: h.animauxAcceptes || false,
            climatisation: h.climatisation || false,
            roomService: h.roomService || false, conciergerie: h.conciergerie || false,
            villeId: h.ville?.id || '',
          });
          setSelectedCategories(h.categories ? h.categories.map((c) => c.id) : []);
        })
        .catch(() => setError('Impossible de charger l\'hôtel.'))
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
        adresse: form.adresse.trim(),
        etoiles: form.etoiles ? parseInt(form.etoiles) : null,
        prixParNuit: form.prixParNuit ? parseFloat(form.prixParNuit) : null,
        telephone: form.telephone.trim(), email: form.email.trim(),
        image: form.image.trim(),
        siteWeb: form.siteWeb.trim(), instagram: form.instagram.trim(),
        facebook: form.facebook.trim(),
        checkIn: form.checkIn.trim(), checkOut: form.checkOut.trim(),
        nombreChambres: form.nombreChambres ? parseInt(form.nombreChambres) : null,
        wifi: form.wifi, parking: form.parking, piscine: form.piscine,
        spa: form.spa, restaurantSurPlace: form.restaurantSurPlace,
        salleSport: form.salleSport, navette: form.navette,
        petitDejeunerInclus: form.petitDejeunerInclus,
        animauxAcceptes: form.animauxAcceptes, climatisation: form.climatisation,
        roomService: form.roomService, conciergerie: form.conciergerie,
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
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Hôtels', to: '/hotels' },
        { label: isEdit ? 'Modifier' : 'Ajouter' }
      ]} />
      <div className="african-pattern"></div>
      <h2 className="form-title">
        {isEdit ? 'Modifier l\'hôtel' : 'Ajouter un hôtel'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom *</label>
          <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom de l'hôtel" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description de l'hôtel" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Ville</label>
            <select name="villeId" value={form.villeId} onChange={handleChange}>
              <option value="">Sélectionner une ville</option>
              {cities.map(c => <option key={c.id} value={c.id}>{c.nom}, {c.pays}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Adresse *</label>
            <input name="adresse" value={form.adresse} onChange={handleChange} placeholder="Adresse complète" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Étoiles (1-5)</label>
            <select name="etoiles" value={form.etoiles} onChange={handleChange}>
              <option value="">Sélectionner</option>
              <option value="1">1 ★</option>
              <option value="2">2 ★★</option>
              <option value="3">3 ★★★</option>
              <option value="4">4 ★★★★</option>
              <option value="5">5 ★★★★★</option>
            </select>
          </div>
          <div className="form-group">
            <label>Prix par nuit (€)</label>
            <input name="prixParNuit" type="number" step="0.01" min="0" value={form.prixParNuit} onChange={handleChange} placeholder="120.00" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Check-in</label>
            <input name="checkIn" value={form.checkIn} onChange={handleChange} placeholder="14:00" />
          </div>
          <div className="form-group">
            <label>Check-out</label>
            <input name="checkOut" value={form.checkOut} onChange={handleChange} placeholder="11:00" />
          </div>
          <div className="form-group">
            <label>Nombre de chambres</label>
            <input name="nombreChambres" type="number" min="0" value={form.nombreChambres} onChange={handleChange} placeholder="120" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Téléphone</label>
            <input name="telephone" value={form.telephone} onChange={handleChange} placeholder="+XXX XX XXX XX XX" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="reservation@hotel.com" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Site web</label>
            <input name="siteWeb" value={form.siteWeb} onChange={handleChange} placeholder="https://..." />
          </div>
          <div className="form-group">
            <label>Instagram</label>
            <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="@hotel" />
          </div>
        </div>

        <div className="form-group">
          <label>Équipements & Services</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="wifi" checked={form.wifi} onChange={handleChange} /> Wi-Fi
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="parking" checked={form.parking} onChange={handleChange} /> Parking
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="piscine" checked={form.piscine} onChange={handleChange} /> Piscine
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="spa" checked={form.spa} onChange={handleChange} /> Spa
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="restaurantSurPlace" checked={form.restaurantSurPlace} onChange={handleChange} /> Restaurant
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="salleSport" checked={form.salleSport} onChange={handleChange} /> Salle de sport
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="navette" checked={form.navette} onChange={handleChange} /> Navette aéroport
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="petitDejeunerInclus" checked={form.petitDejeunerInclus} onChange={handleChange} /> Petit-déjeuner inclus
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="climatisation" checked={form.climatisation} onChange={handleChange} /> Climatisation
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="roomService" checked={form.roomService} onChange={handleChange} /> Room service
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="conciergerie" checked={form.conciergerie} onChange={handleChange} /> Conciergerie
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="animauxAcceptes" checked={form.animauxAcceptes} onChange={handleChange} /> Animaux acceptés
            </label>
          </div>
        </div>

        <ImageUpload
          value={form.image}
          onChange={(url) => setForm({ ...form, image: url })}
          label="Image principale"
        />

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
            {saving ? 'Sauvegarde...' : isEdit ? 'Enregistrer' : 'Créer l\'hôtel'}
          </button>
          <Link to="/hotels" className="btn btn-outline">Annuler</Link>
        </div>
      </form>
    </div>
  );
};

export default HotelForm;
