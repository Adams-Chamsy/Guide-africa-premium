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
  getReviews: (id) => apiClient.get(`/restaurants/${id}/reviews`),
  addReview: (id, data) => apiClient.post(`/restaurants/${id}/reviews`, data),
};

// ========== Hotels ==========
export const hotelApi = {
  getAll: (params) => apiClient.get('/hotels', { params }),
  getById: (id) => apiClient.get(`/hotels/${id}`),
  create: (data) => apiClient.post('/hotels', data),
  update: (id, data) => apiClient.put(`/hotels/${id}`, data),
  delete: (id) => apiClient.delete(`/hotels/${id}`),
  getReviews: (id) => apiClient.get(`/hotels/${id}/reviews`),
  addReview: (id, data) => apiClient.post(`/hotels/${id}/reviews`, data),
};

// ========== Reviews ==========
export const reviewApi = {
  update: (id, data) => apiClient.put(`/reviews/${id}`, data),
  delete: (id) => apiClient.delete(`/reviews/${id}`),
};

// ========== Categories ==========
export const categoryApi = {
  getAll: (params) => apiClient.get('/categories', { params }),
  getById: (id) => apiClient.get(`/categories/${id}`),
  create: (data) => apiClient.post('/categories', data),
  update: (id, data) => apiClient.put(`/categories/${id}`, data),
  delete: (id) => apiClient.delete(`/categories/${id}`),
};

export default apiClient;
