import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { restaurantApi } from '../api/apiClient';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import ConfirmDialog from '../components/ConfirmDialog';
import Breadcrumbs from '../components/Breadcrumbs';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import DistinctionBadge from '../components/DistinctionBadge';
import BackToTop from '../components/BackToTop';
import { SkeletonDetail } from '../components/Skeleton';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  const fetchRestaurant = async () => {
    setLoading(true);
    try {
      const res = await restaurantApi.getById(id);
      setRestaurant(res.data);
    } catch (err) {
      setError('Restaurant introuvable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    try {
      await restaurantApi.delete(id);
      navigate('/restaurants');
    } catch (err) {
      setError('Erreur lors de la suppression.');
    }
    setShowDelete(false);
  };

  const handleAddReview = async (reviewData) => {
    await restaurantApi.addReview(id, reviewData);
    fetchRestaurant();
  };

  if (loading) return <SkeletonDetail />;
  if (error) return <div className="error-message">{error}</div>;
  if (!restaurant) return null;

  const prixLabels = { 1: '€', 2: '€€', 3: '€€€', 4: '€€€€' };
  const menuByCategorie = {};
  if (restaurant.menuItems) {
    restaurant.menuItems.forEach(item => {
      const cat = item.categorie || 'AUTRE';
      if (!menuByCategorie[cat]) menuByCategorie[cat] = [];
      menuByCategorie[cat].push(item);
    });
  }
  const categorieLabels = {
    ENTREE: 'Entrées', PLAT: 'Plats', DESSERT: 'Desserts',
    BOISSON: 'Boissons', MENU_DEGUSTATION: 'Menus Dégustation'
  };

  return (
    <div className="detail-page">
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Restaurants', to: '/restaurants' },
        { label: restaurant.nom }
      ]} />

      {restaurant.image && (
        <div className="detail-hero">
          <img src={restaurant.image} alt={restaurant.nom} className="detail-main-image"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'; }} />
          <div className="detail-hero-overlay">
            <div className="detail-hero-actions">
              <FavoriteButton type="restaurants" id={parseInt(id)} />
              <ShareButton title={restaurant.nom} text={`Découvrez ${restaurant.nom} sur Guide Africa`} />
            </div>
          </div>
        </div>
      )}

      <div className="detail-info">
        <div className="african-pattern"></div>

        {restaurant.distinctions && restaurant.distinctions.length > 0 && (
          <div className="detail-distinctions">
            {restaurant.distinctions.map((d, i) => (
              <DistinctionBadge key={i} type={d.type} />
            ))}
          </div>
        )}

        <h1 className="detail-title">{restaurant.nom}</h1>

        <div className="detail-rating">
          <StarRating rating={restaurant.note || 0} />
          {restaurant.avisUtilisateurs && (
            <span className="review-count">({restaurant.avisUtilisateurs.length} avis)</span>
          )}
          {restaurant.fourchettePrix && (
            <span className="prix-range">{prixLabels[restaurant.fourchettePrix]}</span>
          )}
          {restaurant.ville && (
            <span className="detail-ville">{restaurant.ville.nom}, {restaurant.ville.pays}</span>
          )}
        </div>

        <div className="badges" style={{ marginBottom: 16 }}>
          {restaurant.categories && restaurant.categories.map((c) => (
            <span key={c.id} className="badge">{c.nom}</span>
          ))}
          {restaurant.halal && <span className="badge badge-dietary">Halal</span>}
          {restaurant.vegetarienFriendly && <span className="badge badge-dietary">Végétarien</span>}
          {restaurant.optionsVegan && <span className="badge badge-dietary">Vegan</span>}
          {restaurant.sansGluten && <span className="badge badge-dietary">Sans gluten</span>}
        </div>

        {/* Tabs */}
        <div className="detail-tabs">
          <button className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>Infos</button>
          {restaurant.menuItems && restaurant.menuItems.length > 0 && (
            <button className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => setActiveTab('menu')}>Menu</button>
          )}
          {restaurant.chef && (
            <button className={`tab-btn ${activeTab === 'chef' ? 'active' : ''}`} onClick={() => setActiveTab('chef')}>Chef</button>
          )}
          <button className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => setActiveTab('photos')}>Photos</button>
          <button className={`tab-btn ${activeTab === 'avis' ? 'active' : ''}`} onClick={() => setActiveTab('avis')}>
            Avis ({restaurant.avisUtilisateurs ? restaurant.avisUtilisateurs.length : 0})
          </button>
        </div>

        {activeTab === 'info' && (
          <div className="tab-content">
            <p className="detail-description">{restaurant.description}</p>
            <div className="detail-meta">
              {restaurant.cuisine && <span className="detail-meta-item">&#127869; {restaurant.cuisine}</span>}
              <span className="detail-meta-item">&#128205; {restaurant.adresse}</span>
              {restaurant.telephone && <span className="detail-meta-item">&#128222; {restaurant.telephone}</span>}
              {restaurant.email && <span className="detail-meta-item">&#9993; {restaurant.email}</span>}
              {restaurant.horaires && <span className="detail-meta-item">&#128336; {restaurant.horaires}</span>}
              {restaurant.capacite && <span className="detail-meta-item">&#128101; Capacité: {restaurant.capacite} places</span>}
              {restaurant.codeVestimentaire && <span className="detail-meta-item">&#128084; {restaurant.codeVestimentaire}</span>}
            </div>

            {restaurant.amenities && restaurant.amenities.length > 0 && (
              <div className="detail-amenities">
                <h3 className="subsection-title">Équipements & Services</h3>
                <div className="amenity-grid">
                  {restaurant.amenities.map(a => (
                    <span key={a.id} className="amenity-item">{a.nom}</span>
                  ))}
                </div>
              </div>
            )}

            {(restaurant.siteWeb || restaurant.instagram || restaurant.facebook) && (
              <div className="detail-social">
                {restaurant.siteWeb && <a href={restaurant.siteWeb} target="_blank" rel="noopener noreferrer" className="social-link">Site web</a>}
                {restaurant.instagram && <span className="social-link">{restaurant.instagram}</span>}
                {restaurant.facebook && <span className="social-link">Facebook</span>}
              </div>
            )}

            {restaurant.modesPayement && restaurant.modesPayement.length > 0 && (
              <div className="detail-info-row"><strong>Paiement :</strong> {restaurant.modesPayement.join(', ')}</div>
            )}
            {restaurant.languesParlees && restaurant.languesParlees.length > 0 && (
              <div className="detail-info-row"><strong>Langues :</strong> {restaurant.languesParlees.join(', ')}</div>
            )}
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="tab-content">
            {Object.entries(menuByCategorie).map(([cat, items]) => (
              <div key={cat} className="menu-category">
                <h3 className="menu-category-title">{categorieLabels[cat] || cat}</h3>
                <div className="menu-items">
                  {items.map(item => (
                    <div key={item.id} className={`menu-item ${item.signature ? 'signature' : ''}`}>
                      <div className="menu-item-info">
                        <span className="menu-item-name">
                          {item.signature && <span className="signature-star">&#9733;</span>}
                          {item.nom}
                        </span>
                        <span className="menu-item-desc">{item.description}</span>
                      </div>
                      <span className="menu-item-prix">{item.prix}€</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'chef' && restaurant.chef && (
          <div className="tab-content">
            <div className="chef-profile">
              {restaurant.chef.photo && (
                <img src={restaurant.chef.photo} alt={restaurant.chef.nom} className="chef-photo"
                  onError={(e) => { e.target.style.display = 'none'; }} />
              )}
              <div className="chef-info">
                <h3 className="chef-name">{restaurant.chef.nom}</h3>
                <p className="chef-specialty">{restaurant.chef.specialite}</p>
                <div className="chef-meta">
                  {restaurant.chef.nationalite && <span>Nationalité : {restaurant.chef.nationalite}</span>}
                  {restaurant.chef.anneesExperience && <span>{restaurant.chef.anneesExperience} ans d'expérience</span>}
                </div>
                <p className="chef-bio">{restaurant.chef.bio}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="tab-content">
            {restaurant.galeriePhotos && restaurant.galeriePhotos.length > 0 ? (
              <div className="gallery">
                {restaurant.galeriePhotos.map((url, idx) => (
                  <img key={idx} src={url} alt={`${restaurant.nom} ${idx + 1}`}
                    onError={(e) => { e.target.style.display = 'none'; }} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--ivory-subtle)' }}>Aucune photo disponible.</p>
            )}
          </div>
        )}

        {activeTab === 'avis' && (
          <div className="tab-content">
            {restaurant.avisUtilisateurs && restaurant.avisUtilisateurs.length > 0 ? (
              restaurant.avisUtilisateurs.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <p style={{ color: 'var(--ivory-subtle)', margin: '16px 0' }}>Aucun avis pour le moment.</p>
            )}
            <ReviewForm onSubmit={handleAddReview} />
          </div>
        )}

        <div className="detail-actions">
          <Link to={`/restaurants/${id}/edit`} className="btn btn-primary">Modifier</Link>
          <button className="btn btn-danger" onClick={() => setShowDelete(true)}>Supprimer</button>
        </div>
      </div>

      {showDelete && (
        <ConfirmDialog
          title="Supprimer le restaurant"
          message={`Êtes-vous sûr de vouloir supprimer "${restaurant.nom}" ? Cette action est irréversible.`}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
      <BackToTop />
    </div>
  );
};

export default RestaurantDetail;
