import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

const destinationService = {
  getAllDestinations: async (filters, token) => {
    try {
      let queryStr = '';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.tipe) params.append('tipe', filters.tipe);
        if (filters.lokasi) params.append('lokasi', filters.lokasi);
        queryStr = `?${params.toString()}`;
      }
      const response = await axios.get(`${API_URL}/destinasi${queryStr}`, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to fetch destinations';
    }
  },
  getDestinationById: async (id, token) => {
    try {
      const response = await axios.get(`${API_URL}/destinasi/${id}`, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to fetch destination details';
    }
  },
  searchDestinations: async (query, token) => {
    try {
      const response = await axios.get(`${API_URL}/destinasi/search?q=${query}`, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to search destinations';
    }
  }
};

export default destinationService;