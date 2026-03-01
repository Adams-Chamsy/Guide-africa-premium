import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { restaurantApi } from '../api/apiClient';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import ConfirmDialog from '../components/ConfirmDialog';
import Breadcrumbs from '../components/Breadcrumbs';
import FavoriteButton from '../components/FavoriteButton';
import DistinctionBadge from '../components/DistinctionBadge';
import BackToTop from '../components/BackToTop';
import MapView from '../components/MapView';
import ReservationForm from '../components/ReservationForm';
import AddToCollectionModal from '../components/AddToCollectionModal';
import RatingDistribution from '../components/RatingDistribution';
import { SkeletonDetail } from '../components/Skeleton';
import usePageTitle from '../hooks/usePageTitle';
import LightboxGallery from '../components/LightboxGallery';
import SEOHead from '../components/SEOHead';
import ShareButtons from '../components/ShareButtons';
import ScrollReveal from '../components/ScrollReveal';
import AmenityIcon from '../components/AmenityIcon';
import { restaurantJsonLd } from '../components/SEOHead';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  usePageTitle(restaurant?.nom || 'Restaurant');

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
    <>
      <SEOHead
        title={`${restaurant.nom} — Guide Africa`}
        description={restaurant.description ? restaurant.description.substring(0, 160) : ''}
        jsonLd={restaurantJsonLd(restaurant)}
      />
    <div className="detail-page">
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Restaurants', to: '/restaurants' },
        { label: restaurant.nom }
      ]} />

      {restaurant.image && (
        <div className="detail-hero">
          <img src={restaurant.image} alt={restaurant.nom} className="detail-main-image" loading="lazy"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'; }} />
          <div className="detail-hero-overlay">
            <div className="detail-hero-actions">
              <FavoriteButton type="restaurants" id={parseInt(id)} />
              <ShareButtons title={restaurant.nom} url={window.location.href} />
              <button className="btn-collection" onClick={() => setShowCollectionModal(true)} title="Ajouter à une collection">
                &#128194;
              </button>
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
          <button className={`tab-btn ${activeTab === 'reserver' ? 'active' : ''}`} onClick={() => setActiveTab('reserver')}>Réserver</button>
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
                    <AmenityIcon key={a.id} name={a.nom} />
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

            {restaurant.coordonneesGps && restaurant.coordonneesGps.lat && restaurant.coordonneesGps.lng && (
              <div className="mini-map">
                <div className="mini-map-label">Localisation</div>
                <MapView
                  markers={[{
                    lat: restaurant.coordonneesGps.lat,
                    lng: restaurant.coordonneesGps.lng,
                    name: restaurant.nom,
                    type: 'restaurant',
                    id: restaurant.id,
                    note: restaurant.note,
                  }]}
                  center={[restaurant.coordonneesGps.lat, restaurant.coordonneesGps.lng]}
                  zoom={13}
                  height="300px"
                />
              </div>
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
                          {item.deSaison && <span className="seasonal-badge" title={item.saison}>&#127807;</span>}
                        </span>
                        <span className="menu-item-desc">{item.description}</span>
                        {item.accordMetsVins && (
                          <span className="wine-pairing">&#127863; {item.accordMetsVins}</span>
                        )}
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
                <img src={restaurant.chef.photo} alt={restaurant.chef.nom} className="chef-photo" loading="lazy"
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
              <LightboxGallery images={restaurant.galeriePhotos} alt={restaurant.nom} />
            ) : (
              <p style={{ color: 'var(--ivory-subtle)' }}>Aucune photo disponible.</p>
            )}
          </div>
        )}

        {activeTab === 'avis' && (
          <div className="tab-content">
            <RatingDistribution type="restaurant" id={id} />
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

        {activeTab === 'reserver' && (
          <div className="tab-content">
            <ReservationForm type="RESTAURANT" establishmentId={parseInt(id)} establishmentName={restaurant.nom} />
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
      <AddToCollectionModal
        show={showCollectionModal}
        onClose={() => setShowCollectionModal(false)}
        type="RESTAURANT"
        targetId={parseInt(id)}
        targetName={restaurant.nom}
      />
    </div>
    </>
  );
};

export default RestaurantDetail;
