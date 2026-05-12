import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

const budgetService = {
  getBudgetItems: async (tripId, token) => {
    try {
      const response = await axios.get(`${API_URL}/trips/${tripId}/budget`, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to fetch budget items';
    }
  },
  addBudgetItem: async (tripId, data, token) => {
    try {
      const response = await axios.post(`${API_URL}/trips/${tripId}/budget`, data, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to add budget item';
    }
  },
  updateBudgetItem: async (tripId, itemId, data, token) => {
    try {
      const response = await axios.put(`${API_URL}/trips/${tripId}/budget/${itemId}`, data, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to update budget item';
    }
  },
  deleteBudgetItem: async (tripId, itemId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/trips/${tripId}/budget/${itemId}`, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to delete budget item';
    }
  },
  getBudgetSummary: async (tripId, token) => {
    try {
      const response = await axios.get(`${API_URL}/trips/${tripId}/budget/summary`, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to fetch budget summary';
    }
  }
};

export default budgetService;