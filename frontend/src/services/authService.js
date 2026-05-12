import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const authService = {
  register: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Registration failed';
    }
  },
  login: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Login failed';
    }
  },
  getMe: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to fetch user';
    }
  }
};

export default authService;