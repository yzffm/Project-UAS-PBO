// src/services/tripService.js
import api from './api';

const tripService = {
  /**
   * Mengambil semua daftar trip milik user yang sedang login
   */
  getAllTrips: async () => {
    try {
      const response = await api.get('/trips');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil daftar perjalanan';
    }
  },

  /**
   * Mengambil detail lengkap satu trip (termasuk hari & itinerary)
   * @param {string|number} id - ID Trip
   */
  getTripById: async (id) => {
    try {
      const response = await api.get(`/trips/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Detail perjalanan tidak ditemukan';
    }
  },

  /**
   * Membuat trip baru (Menggunakan PerjalananFactory di Backend)
   * @param {Object} tripData - { nama, lokasi, tanggalMulai, tipeTrip, ... }
   */
  createTrip: async (tripData) => {
    try {
      const response = await api.post('/trips', tripData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal membuat rencana perjalanan';
    }
  },

  /**
   * Memperbarui informasi dasar trip
   */
  updateTrip: async (id, tripData) => {
    try {
      const response = await api.put(`/trips/${id}`, tripData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal memperbarui perjalanan';
    }
  },

  /**
   * Menghapus trip
   */
  deleteTrip: async (id) => {
    try {
      const response = await api.delete(`/trips/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menghapus perjalanan';
    }
  }
};

export default tripService;