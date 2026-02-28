import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetail from './pages/RestaurantDetail';
import RestaurantForm from './pages/RestaurantForm';
import HotelList from './pages/HotelList';
import HotelDetail from './pages/HotelDetail';
import HotelForm from './pages/HotelForm';
import Destinations from './pages/Destinations';
import AtlasCulinaire from './pages/AtlasCulinaire';
import NotFound from './pages/NotFound';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
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
            <Route path="/atlas" element={<AtlasCulinaire />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
