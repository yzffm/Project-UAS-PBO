// src/services/destinationService.js
import api from './api';

const destinationService = {
  /**
   * Mengambil semua daftar destinasi yang tersedia di sistem
   * Digunakan untuk halaman katalog eksplorasi
   */
  getAllDestinations: async () => {
    try {
      const response = await api.get('/destinations');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data destinasi';
    }
  },

  /**
   * Mencari destinasi berdasarkan nama atau kategori
   * @param {string} query - Keyword pencarian
   */
  searchDestinations: async (query) => {
    try {
      const response = await api.get(`/destinations/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Pencarian gagal';
    }
  },

  /**
   * Mengambil detail satu destinasi secara spesifik
   * @param {number} id - ID Destinasi
   */
  getDestinationById: async (id) => {
    try {
      const response = await api.get(`/destinations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Detail destinasi tidak ditemukan';
    }
  },

  /**
   * Filter destinasi berdasarkan kategori (Alam, Budaya, Kuliner, dll)
   * @param {string} category 
   */
  getDestinationsByCategory: async (category) => {
    try {
      const response = await api.get(`/destinations/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal memfilter destinasi';
    }
  }
};

export default destinationService;