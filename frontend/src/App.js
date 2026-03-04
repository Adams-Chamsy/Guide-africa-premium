import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ScrollToTop from './components/ScrollToTop';
import BottomNav from './components/BottomNav';
import ChatWidget from './components/ChatWidget';
import NewsletterModal from './components/NewsletterModal';
import SplashScreen from './components/SplashScreen';
import GoldCursor from './components/GoldCursor';
import './App.css';

// Lazy-loaded page components
const Home = React.lazy(() => import('./pages/Home'));
const RestaurantList = React.lazy(() => import('./pages/RestaurantList'));
const RestaurantDetail = React.lazy(() => import('./pages/RestaurantDetail'));
const RestaurantForm = React.lazy(() => import('./pages/RestaurantForm'));
const HotelList = React.lazy(() => import('./pages/HotelList'));
const HotelDetail = React.lazy(() => import('./pages/HotelDetail'));
const HotelForm = React.lazy(() => import('./pages/HotelForm'));
const Destinations = React.lazy(() => import('./pages/Destinations'));
const AtlasCulinaire = React.lazy(() => import('./pages/AtlasCulinaire'));
const CarteAfrique = React.lazy(() => import('./pages/CarteAfrique'));
const Connexion = React.lazy(() => import('./pages/Connexion'));
const Inscription = React.lazy(() => import('./pages/Inscription'));
const MotDePasseOublie = React.lazy(() => import('./pages/MotDePasseOublie'));
const MesFavoris = React.lazy(() => import('./pages/MesFavoris'));
const MesVisites = React.lazy(() => import('./pages/MesVisites'));
const MesReservations = React.lazy(() => import('./pages/MesReservations'));
const MonProfil = React.lazy(() => import('./pages/MonProfil'));
const MesCollections = React.lazy(() => import('./pages/MesCollections'));
const CollectionDetail = React.lazy(() => import('./pages/CollectionDetail'));
const DashboardAdmin = React.lazy(() => import('./pages/admin/DashboardAdmin'));
const GestionUtilisateurs = React.lazy(() => import('./pages/admin/GestionUtilisateurs'));
const GestionAvis = React.lazy(() => import('./pages/admin/GestionAvis'));
const GestionReservations = React.lazy(() => import('./pages/admin/GestionReservations'));
const Classements = React.lazy(() => import('./pages/Classements'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// New luxury pages
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogArticle = React.lazy(() => import('./pages/BlogArticle'));
const Events = React.lazy(() => import('./pages/Events'));
const Comparateur = React.lazy(() => import('./pages/Comparateur'));
const SocialFeed = React.lazy(() => import('./pages/SocialFeed'));
const ActiviteList = React.lazy(() => import('./pages/ActiviteList'));
const ActiviteDetail = React.lazy(() => import('./pages/ActiviteDetail'));
const VoitureList = React.lazy(() => import('./pages/VoitureList'));
const VoitureDetail = React.lazy(() => import('./pages/VoitureDetail'));
const VoitureForm = React.lazy(() => import('./pages/VoitureForm'));
const Confidentialite = React.lazy(() => import('./pages/Confidentialite'));
const Conditions = React.lazy(() => import('./pages/Conditions'));
const Contact = React.lazy(() => import('./pages/Contact'));

const App = () => {
  return (
    <ErrorBoundary>
    <HelmetProvider>
    <ThemeProvider>
    <AuthProvider>
      <ToastProvider>
        <SplashScreen onComplete={() => {}} />
        <GoldCursor />
        <Router>
          <ScrollToTop />
          <div className="app">
            <Header />
            <main className="main-content" id="main-content">
              <React.Suspense fallback={
                <div className="page-loading">
                  <div className="page-loading-content">
                    <span className="page-loading-star">&#9733;</span>
                    <div className="loading-spinner"></div>
                  </div>
                </div>
              }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/restaurants" element={<RestaurantList />} />
                <Route path="/restaurants/new" element={<RestaurantForm />} />
                <Route path="/restaurants/:id" element={<RestaurantDetail />} />
                <Route path="/restaurants/:id/edit" element={<RestaurantForm />} />
                <Route path="/hotels" element={<HotelList />} />
                <Route path="/hotels/new" element={<HotelForm />} />
                <Route path="/hotels/:id" element={<HotelDetail />} />
                <Route path="/hotels/:id/edit" element={<HotelForm />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/carte" element={<CarteAfrique />} />
                <Route path="/atlas" element={<AtlasCulinaire />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/inscription" element={<Inscription />} />
                <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />
                <Route path="/mes-favoris" element={<ProtectedRoute><MesFavoris /></ProtectedRoute>} />
                <Route path="/mes-visites" element={<ProtectedRoute><MesVisites /></ProtectedRoute>} />
                <Route path="/mes-reservations" element={<ProtectedRoute><MesReservations /></ProtectedRoute>} />
                <Route path="/mes-collections" element={<ProtectedRoute><MesCollections /></ProtectedRoute>} />
                <Route path="/collections/:id" element={<CollectionDetail />} />
                <Route path="/profil" element={<ProtectedRoute><MonProfil /></ProtectedRoute>} />
                <Route path="/admin" element={<AdminRoute><DashboardAdmin /></AdminRoute>} />
                <Route path="/admin/utilisateurs" element={<AdminRoute><GestionUtilisateurs /></AdminRoute>} />
                <Route path="/admin/avis" element={<AdminRoute><GestionAvis /></AdminRoute>} />
                <Route path="/admin/reservations" element={<AdminRoute><GestionReservations /></AdminRoute>} />
                <Route path="/classements" element={<Classements />} />
                {/* New luxury routes */}
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogArticle />} />
                <Route path="/evenements" element={<Events />} />
                <Route path="/comparateur" element={<Comparateur />} />
                <Route path="/communaute" element={<ProtectedRoute><SocialFeed /></ProtectedRoute>} />
                {/* Activités */}
                <Route path="/activites" element={<ActiviteList />} />
                <Route path="/activites/:id" element={<ActiviteDetail />} />
                {/* Location de voitures */}
                <Route path="/voitures" element={<VoitureList />} />
                <Route path="/voitures/proposer" element={<ProtectedRoute><VoitureForm /></ProtectedRoute>} />
                <Route path="/voitures/:id/edit" element={<ProtectedRoute><VoitureForm /></ProtectedRoute>} />
                <Route path="/voitures/:id" element={<VoitureDetail />} />
                {/* Pages légales & contact */}
                <Route path="/confidentialite" element={<Confidentialite />} />
                <Route path="/conditions" element={<Conditions />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </React.Suspense>
            </main>
            <Footer />
            <BottomNav />
            <ChatWidget />
            <NewsletterModal />
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
    </ThemeProvider>
    </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
