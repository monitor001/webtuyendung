// API Configuration - Updated for production
const API_BASE_URL = 'https://jobconnect-vietnam-backend-b74d68215fab.herokuapp.com';

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