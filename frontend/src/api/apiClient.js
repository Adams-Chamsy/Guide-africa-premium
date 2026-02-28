import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ========== Restaurants ==========
export const restaurantApi = {
  getAll: (params) => apiClient.get('/restaurants', { params }),
  getById: (id) => apiClient.get(`/restaurants/${id}`),
  create: (data) => apiClient.post('/restaurants', data),
  update: (id, data) => apiClient.put(`/restaurants/${id}`, data),
  delete: (id) => apiClient.delete(`/restaurants/${id}`),
  getReviews: (id, params) => apiClient.get(`/restaurants/${id}/reviews`, { params }),
  addReview: (id, data) => apiClient.post(`/restaurants/${id}/reviews`, data),
  getMenu: (id, params) => apiClient.get(`/restaurants/${id}/menu`, { params }),
  getSignatures: (id) => apiClient.get(`/restaurants/${id}/menu/signatures`),
  getDistinctions: (id) => apiClient.get(`/restaurants/${id}/distinctions`),
  addDistinction: (id, data) => apiClient.post(`/restaurants/${id}/distinctions`, data),
  addMenuItem: (id, data) => apiClient.post(`/restaurants/${id}/menu`, data),
};

// ========== Hotels ==========
export const hotelApi = {
  getAll: (params) => apiClient.get('/hotels', { params }),
  getById: (id) => apiClient.get(`/hotels/${id}`),
  create: (data) => apiClient.post('/hotels', data),
  update: (id, data) => apiClient.put(`/hotels/${id}`, data),
  delete: (id) => apiClient.delete(`/hotels/${id}`),
  getReviews: (id, params) => apiClient.get(`/hotels/${id}/reviews`, { params }),
  addReview: (id, data) => apiClient.post(`/hotels/${id}/reviews`, data),
};

// ========== Reviews ==========
export const reviewApi = {
  update: (id, data) => apiClient.put(`/reviews/${id}`, data),
  delete: (id) => apiClient.delete(`/reviews/${id}`),
  vote: (id) => apiClient.post(`/reviews/${id}/vote`),
  addResponse: (id, reponse) => apiClient.post(`/reviews/${id}/response`, { reponse }),
};

// ========== Categories ==========
export const categoryApi = {
  getAll: (params) => apiClient.get('/categories', { params }),
  getById: (id) => apiClient.get(`/categories/${id}`),
  create: (data) => apiClient.post('/categories', data),
  update: (id, data) => apiClient.put(`/categories/${id}`, data),
  delete: (id) => apiClient.delete(`/categories/${id}`),
};

// ========== Cities ==========
export const cityApi = {
  getAll: (params) => apiClient.get('/cities', { params }),
  getById: (id) => apiClient.get(`/cities/${id}`),
};

// ========== Chefs ==========
export const chefApi = {
  getAll: (params) => apiClient.get('/chefs', { params }),
  getById: (id) => apiClient.get(`/chefs/${id}`),
};

// ========== Amenities ==========
export const amenityApi = {
  getAll: (params) => apiClient.get('/amenities', { params }),
  forRestaurants: () => apiClient.get('/amenities/restaurants'),
  forHotels: () => apiClient.get('/amenities/hotels'),
};

// ========== Regional Cuisines ==========
export const cuisineApi = {
  getAll: (params) => apiClient.get('/cuisines', { params }),
  getById: (id) => apiClient.get(`/cuisines/${id}`),
};

// ========== Distinctions ==========
export const distinctionApi = {
  getAll: (params) => apiClient.get('/distinctions', { params }),
};

// ========== Favorites (localStorage) ==========
export const favoritesApi = {
  getAll: () => {
    const favs = localStorage.getItem('guideafrica_favorites');
    return favs ? JSON.parse(favs) : { restaurants: [], hotels: [] };
  },
  toggle: (type, id) => {
    const favs = favoritesApi.getAll();
    const list = favs[type] || [];
    const idx = list.indexOf(id);
    if (idx === -1) {
      list.push(id);
    } else {
      list.splice(idx, 1);
    }
    favs[type] = list;
    localStorage.setItem('guideafrica_favorites', JSON.stringify(favs));
    return favs;
  },
  isFavorite: (type, id) => {
    const favs = favoritesApi.getAll();
    return (favs[type] || []).includes(id);
  },
};

export default apiClient;
