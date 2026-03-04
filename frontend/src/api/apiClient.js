import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT Interceptor - automatically attach token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('guideafrica_token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Token refresh state
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor - handle 401 with token refresh attempt
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      const url = originalRequest?.url || '';
      // Don't retry for login/register failures
      if (url.includes('/auth/login') || url.includes('/auth/register')) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to re-validate current token via /auth/me
        const token = localStorage.getItem('guideafrica_token');
        if (!token) {
          throw new Error('No token');
        }
        const response = await axios.get(API_BASE_URL + '/auth/me', {
          headers: { Authorization: 'Bearer ' + token },
        });
        if (response.data) {
          processQueue(null, token);
          return apiClient(originalRequest);
        }
        throw new Error('Invalid token');
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('guideafrica_token');
        localStorage.removeItem('guideafrica_user');
        window.dispatchEvent(new CustomEvent('auth:logout'));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

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

// ========== Auth ==========
export const authApi = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  me: () => apiClient.get('/auth/me'),
  forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (data) => apiClient.post('/auth/reset-password', data),
};

// ========== User (Authenticated) ==========
export const userApi = {
  getFavorites: (params) => apiClient.get('/user/favorites', { params }),
  addFavorite: (data) => apiClient.post('/user/favorites', data),
  removeFavorite: (id) => apiClient.delete('/user/favorites/' + id),
  removeFavoriteByTarget: (type, targetId) => apiClient.delete('/user/favorites', { params: { type, targetId } }),
  checkFavorite: (type, targetId) => apiClient.get('/user/favorites/check', { params: { type, targetId } }),
  syncFavorites: (data) => apiClient.post('/user/favorites/sync', data),
  getVisits: (params) => apiClient.get('/user/visits', { params }),
  addVisit: (data) => apiClient.post('/user/visits', data),
  updateProfile: (data) => apiClient.put('/user/profile', data),
  changePassword: (data) => apiClient.put('/user/password', data),
};

// ========== Reservations ==========
export const reservationApi = {
  getAll: (params) => apiClient.get('/reservations', { params }),
  create: (data) => apiClient.post('/reservations', data),
  getById: (id) => apiClient.get('/reservations/' + id),
  cancel: (id) => apiClient.put('/reservations/' + id + '/cancel'),
};

// ========== Admin ==========
export const adminApi = {
  getStats: () => apiClient.get('/admin/stats'),
  getUsers: (params) => apiClient.get('/admin/users', { params }),
  toggleUserActive: (id) => apiClient.put('/admin/users/' + id + '/toggle-active'),
  getReviews: (params) => apiClient.get('/admin/reviews', { params }),
  deleteReview: (id) => apiClient.delete('/admin/reviews/' + id),
  getReservations: (params) => apiClient.get('/admin/reservations', { params }),
  updateReservationStatut: (id, statut) => apiClient.put('/admin/reservations/' + id + '/statut', { statut }),
};

// ========== Collections ==========
export const collectionApi = {
  getAll: () => apiClient.get('/collections'),
  create: (data) => apiClient.post('/collections', data),
  getById: (id) => apiClient.get('/collections/' + id),
  update: (id, data) => apiClient.put('/collections/' + id, data),
  delete: (id) => apiClient.delete('/collections/' + id),
  addItem: (id, data) => apiClient.post('/collections/' + id + '/items', data),
  removeItem: (collectionId, itemId) => apiClient.delete('/collections/' + collectionId + '/items/' + itemId),
  getPublic: () => apiClient.get('/collections/public'),
};

// ========== Search ==========
export const searchApi = {
  search: (q, limit) => apiClient.get('/search', { params: { q, limit } }),
};

// ========== Files ==========
export const fileApi = {
  upload: (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress,
    });
  },
  delete: (filename) => apiClient.delete('/files/' + filename),
};

// ========== Notifications ==========
export const notificationApi = {
  getAll: () => apiClient.get('/notifications'),
  getUnreadCount: () => apiClient.get('/notifications/count'),
  markAsRead: (id) => apiClient.put('/notifications/' + id + '/read'),
  markAllAsRead: () => apiClient.put('/notifications/read-all'),
};

// ========== Ratings ==========
export const ratingApi = {
  getTopRestaurants: (limit) => apiClient.get('/ratings/top/restaurants', { params: { limit } }),
  getTopHotels: (limit) => apiClient.get('/ratings/top/hotels', { params: { limit } }),
  getDistribution: (type, id) => apiClient.get(`/ratings/distribution/${type}/${id}`),
};

// ========== Blog ==========
export const blogApi = {
  getAll: (params) => apiClient.get('/blog', { params }),
  getPopular: () => apiClient.get('/blog/popular'),
  getBySlug: (slug) => apiClient.get('/blog/' + slug),
  create: (data) => apiClient.post('/blog', data),
  update: (id, data) => apiClient.put('/blog/' + id, data),
  delete: (id) => apiClient.delete('/blog/' + id),
};

// ========== Badges ==========
export const badgeApi = {
  getMyBadges: () => apiClient.get('/badges/my'),
  checkBadges: () => apiClient.post('/badges/check'),
};

// ========== Events ==========
export const eventApi = {
  getAll: (params) => apiClient.get('/events', { params }),
  getById: (id) => apiClient.get('/events/' + id),
  create: (data) => apiClient.post('/events', data),
  update: (id, data) => apiClient.put('/events/' + id, data),
  delete: (id) => apiClient.delete('/events/' + id),
};

// ========== Social Feed ==========
export const socialApi = {
  getFeed: (params) => apiClient.get('/social', { params }),
  getMyPosts: () => apiClient.get('/social/my'),
  create: (data) => apiClient.post('/social', data),
  like: (id) => apiClient.post('/social/' + id + '/like'),
  delete: (id) => apiClient.delete('/social/' + id),
};

// ========== Newsletter ==========
export const newsletterApi = {
  subscribe: (email) => apiClient.post('/newsletter/subscribe', { email }),
  unsubscribe: (email) => apiClient.post('/newsletter/unsubscribe', { email }),
};

// ========== Compare ==========
export const compareApi = {
  restaurants: (ids) => apiClient.get('/compare/restaurants', { params: { ids: ids.join(',') } }),
  hotels: (ids) => apiClient.get('/compare/hotels', { params: { ids: ids.join(',') } }),
};

// ========== Loyalty ==========
export const loyaltyApi = {
  getPoints: () => apiClient.get('/user/loyalty/points'),
};

// ========== Admin Analytics ==========
export const analyticsApi = {
  getAnalytics: () => apiClient.get('/admin/analytics'),
};

// ========== Activites ==========
export const activiteApi = {
  getAll: (params) => apiClient.get('/activites', { params }),
  getById: (id) => apiClient.get(`/activites/${id}`),
  getTop: () => apiClient.get('/activites/top'),
  create: (data) => apiClient.post('/activites', data),
  update: (id, data) => apiClient.put(`/activites/${id}`, data),
  delete: (id) => apiClient.delete(`/activites/${id}`),
};

// ========== Location Voitures ==========
export const voitureApi = {
  getAll: (params) => apiClient.get('/voitures', { params }),
  getById: (id) => apiClient.get(`/voitures/${id}`),
  getMine: () => apiClient.get('/voitures/mes-voitures'),
  create: (data) => apiClient.post('/voitures', data),
  update: (id, data) => apiClient.put(`/voitures/${id}`, data),
  delete: (id) => apiClient.delete(`/voitures/${id}`),
  toggleDisponibilite: (id) => apiClient.put(`/voitures/${id}/toggle-disponibilite`),
};

export default apiClient;
