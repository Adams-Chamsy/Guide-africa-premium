import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authApi, userApi } from '../api/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncLocalFavorites = useCallback(async () => {
    const localFavs = JSON.parse(localStorage.getItem('guideafrica_favorites') || '{}');
    const requests = [];
    if (localFavs.restaurants) {
      localFavs.restaurants.forEach(id =>
        requests.push({ type: 'RESTAURANT', targetId: id })
      );
    }
    if (localFavs.hotels) {
      localFavs.hotels.forEach(id =>
        requests.push({ type: 'HOTEL', targetId: id })
      );
    }
    if (requests.length > 0) {
      try {
        await userApi.syncFavorites(requests);
        localStorage.removeItem('guideafrica_favorites');
      } catch (err) {
        // Error handled silently
      }
    }
  }, []);

  const login = useCallback(async (email, motDePasse) => {
    const response = await authApi.login({ email, motDePasse });
    const data = response.data;
    localStorage.setItem('guideafrica_token', data.token);
    setUser({
      id: data.id, nom: data.nom, prenom: data.prenom,
      email: data.email, role: data.role, avatar: data.avatar
    });
    // Sync localStorage favorites to server
    await syncLocalFavorites();
    return data;
  }, [syncLocalFavorites]);

  const register = useCallback(async (inscriptionData) => {
    const response = await authApi.register(inscriptionData);
    const data = response.data;
    localStorage.setItem('guideafrica_token', data.token);
    setUser({
      id: data.id, nom: data.nom, prenom: data.prenom,
      email: data.email, role: data.role, avatar: data.avatar
    });
    await syncLocalFavorites();
    return data;
  }, [syncLocalFavorites]);

  const logout = useCallback(() => {
    localStorage.removeItem('guideafrica_token');
    setUser(null);
  }, []);

  // On mount, verify existing token
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('guideafrica_token');
      if (!token) { setLoading(false); return; }
      try {
        const response = await authApi.me();
        const data = response.data;
        setUser({
          id: data.id, nom: data.nom, prenom: data.prenom,
          email: data.email, role: data.role, avatar: data.avatar
        });
      } catch {
        localStorage.removeItem('guideafrica_token');
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  // Listen for auth:logout events dispatched by the API interceptor
  useEffect(() => {
    const handleAuthLogout = () => {
      logout();
    };
    window.addEventListener('auth:logout', handleAuthLogout);
    return () => {
      window.removeEventListener('auth:logout', handleAuthLogout);
    };
  }, [logout]);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth doit être utilisé dans un AuthProvider');
  return context;
};

export default AuthContext;
