// services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Enhanced request interceptor with JWT support
api.interceptors.request.use((config) => {
  // Try JWT first
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  }
  
  // Fallback to legacy auth
  const userId = localStorage.getItem('userId');
  if (userId) {
    config.headers['user-id'] = userId;
  }
  
  return config;
});

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken
          });
          
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, logout user
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('userName');
          localStorage.removeItem('isAdmin');
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (name, email, password) => api.post('/auth/signup', { name, email, password }),
  getUser: () => api.get('/auth/user'),
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
  addToWishlist: (placeId) => api.post('/auth/wishlist/add', { placeId }),
  removeFromWishlist: (placeId) => api.post('/auth/wishlist/remove', { placeId }),
  getWishlist: () => api.get('/auth/wishlist')
};

// Places API (MISSING FROM YOUR CODE)
export const placesAPI = {
  getFeatured: () => api.get('/places/featured'),
  getAll: () => api.get('/places/all'),
  search: (city, category) => {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (category) params.append('category', category);
    return api.get(`/places/search?${params.toString()}`);
  },
  getById: (id) => api.get(`/places/${id}`),
  create: (placeData) => api.post('/places', placeData),
  update: (id, placeData) => api.put(`/places/${id}`, placeData),
  delete: (id) => api.delete(`/places/${id}`),
  getCities: () => api.get('/places/filters/cities')
};
 
// Reviews API (MISSING FROM YOUR CODE)
export const reviewsAPI = {
  getByPlace: (placeId) => api.get(`/reviews/${placeId}`),
  create: (reviewData) => api.post('/reviews', reviewData),
  update: (reviewId, reviewData) => api.put(`/reviews/${reviewId}`, reviewData),
  delete: (reviewId) => api.delete(`/reviews/${reviewId}`)
};

// Admin API (MISSING FROM YOUR CODE)
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getPlaces: () => api.get('/admin/places'),
  toggleFeatured: (placeId) => api.patch(`/admin/places/${placeId}/featured`),
  getUsers: () => api.get('/admin/users'),
  getReviews: () => api.get('/admin/reviews')
};

// Utility functions
export const setAuthTokens = (accessToken, refreshToken, user) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('userId', user.id);
  localStorage.setItem('userName', user.name);
  localStorage.setItem('isAdmin', user.isAdmin);
};

export const clearAuthTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  localStorage.removeItem('isAdmin');
};

export const isAuthenticated = () => {
  return !!(localStorage.getItem('accessToken') || localStorage.getItem('userId'));
};

// Default export
export default api;