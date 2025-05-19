import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
});

// Attach the token from either key
API.interceptors.request.use((req) => {
  const token =
    localStorage.getItem('snapwear-token') ||
    localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// On 401, clear storage and send user to login
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('snapwear-token');
      localStorage.removeItem('token');
      localStorage.removeItem('snapwear-user');
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default API;
