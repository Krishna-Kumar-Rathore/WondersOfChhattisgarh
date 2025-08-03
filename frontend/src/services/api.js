import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add user ID to requests if logged in
api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    config.headers['user-id'] = userId;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (name, email, password) => api.post('/auth/signup', { name, email, password }),
  getUser: () => api.get('/auth/user'),
  addToWishlist: (placeId) => api.post('/auth/wishlist/add', { placeId }),
  removeFromWishlist: (placeId) => api.post('/auth/wishlist/remove', { placeId }),
  getWishlist: () => api.get('/auth/wishlist')
};

// Places API
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
 
// Reviews API
export const reviewsAPI = {
  getByPlace: (placeId) => api.get(`/reviews/${placeId}`),
  create: (reviewData) => api.post('/reviews', reviewData),
  update: (reviewId, reviewData) => api.put(`/reviews/${reviewId}`, reviewData),
  delete: (reviewId) => api.delete(`/reviews/${reviewId}`)
};

// Admin API
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getPlaces: () => api.get('/admin/places'),
  toggleFeatured: (placeId) => api.patch(`/admin/places/${placeId}/featured`),
  getUsers: () => api.get('/admin/users'),
  getReviews: () => api.get('/admin/reviews')
};

export default api;