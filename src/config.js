// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://jobconnect-vietnam-app-588c0b4ff56c.herokuapp.com'
  : 'http://localhost:3001';

export const API_ENDPOINTS = {
  JOBS: `${API_BASE_URL}/api/jobs`,
  SEARCH: `${API_BASE_URL}/api/search`,
  COMPANIES: `${API_BASE_URL}/api/companies`,
  STATS: `${API_BASE_URL}/api/stats`,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    ME: `${API_BASE_URL}/api/auth/me`
  }
};

export default API_BASE_URL; 