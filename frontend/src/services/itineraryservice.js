import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

const itineraryService = {
  getDays: async (tripId, token) => {
    try {
      const response = await axios.get(`${API_URL}/trips/${tripId}/days`, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to fetch itinerary days';
    }
  },
  addDay: async (tripId, data, token) => {
    try {
      const response = await axios.post(`${API_URL}/trips/${tripId}/days`, data, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to add day';
    }
  },
  deleteDay: async (tripId, dayId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/trips/${tripId}/days/${dayId}`, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to delete day';
    }
  },
  addSchedule: async (tripId, dayId, data, token) => {
    try {
      const response = await axios.post(`${API_URL}/trips/${tripId}/days/${dayId}/schedule`, data, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to add schedule';
    }
  },

  // Tambahkan ini di bawah method addSchedule:
  updateSchedule: async (tripId, dayId, schedId, data, token) => {
    try {
      const response = await axios.put(`${API_URL}/trips/${tripId}/days/${dayId}/schedule/${schedId}`, data, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message || 'Failed to update schedule';
    }
  },

  deleteSchedule: async (tripId, dayId, schedId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/trips/${tripId}/days/${dayId}/schedule/${schedId}`, getHeaders(token));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to delete schedule';
    }
  }
};

export default itineraryService;