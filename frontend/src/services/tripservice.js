import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

const tripService = {
  getAllTrips: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/trips`, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to fetch trips';
    }
  },
  getTripById: async (id, token) => {
    try {
      const response = await axios.get(`${API_URL}/trips/${id}`, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to fetch trip details';
    }
  },
  createTrip: async (data, token) => {
    try {
      const response = await axios.post(`${API_URL}/trips`, data, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to create trip';
    }
  },
  updateTrip: async (id, data, token) => {
    try {
      const response = await axios.put(`${API_URL}/trips/${id}`, data, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to update trip';
    }
  },
  deleteTrip: async (id, token) => {
    try {
      const response = await axios.delete(`${API_URL}/trips/${id}`, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to delete trip';
    }
  },
  getTripSummary: async (id, token) => {
    try {
      const response = await axios.get(`${API_URL}/trips/${id}/summary`, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to fetch trip summary';
    }
  }
};

export default tripService;