// src/services/budgetService.js
import api from './api';

const budgetService = {
  /**
   * Mengambil semua item anggaran untuk satu trip tertentu
   * Digunakan untuk mengisi BudgetTable
   */
  getBudgetItems: async (tripId) => {
    try {
      const response = await api.get(`/budget/trips/${tripId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil daftar anggaran';
    }
  },

  /**
   * Mengambil ringkasan anggaran berdasarkan kategori (Strategy Pattern result)
   * Digunakan untuk mengisi BudgetSummaryChart
   */
  getBudgetSummary: async (tripId) => {
    try {
      const response = await api.get(`/budget/summary/${tripId}`);
      return response.data; // Output berupa objek: { "Transportasi": 5000, "Makan": 2000, ... }
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil ringkasan anggaran';
    }
  },

  /**
   * Menambahkan item anggaran baru
   * Backend akan menggunakan AnggaranFactory untuk menentukan subclass (Akomodasi, Transport, dll)
   * @param {number} tripId 
   * @param {Object} budgetData - { nama, kategori, biaya }
   */
  addBudgetItem: async (tripId, budgetData) => {
    try {
      const response = await api.post(`/budget/trips/${tripId}`, budgetData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menambahkan item anggaran';
    }
  },

  /**
   * Menghapus item anggaran
   */
  deleteBudgetItem: async (itemId) => {
    try {
      const response = await api.delete(`/budget/items/${itemId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menghapus item anggaran';
    }
  },

  /**
   * Memperbarui item anggaran
   */
  updateBudgetItem: async (itemId, budgetData) => {
    try {
      const response = await api.put(`/budget/items/${itemId}`, budgetData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal memperbarui item anggaran';
    }
  }
};

export default budgetService;