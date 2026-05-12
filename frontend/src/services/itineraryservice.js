// src/services/itineraryService.js
import api from './api';

const itineraryService = {
  /**
   * Menambahkan hari baru ke dalam rencana perjalanan
   * @param {number} tripId - ID dari Trip yang ingin ditambah harinya
   * @param {Object} dayData - { urutanHari, tanggal }
   */
  addDayToTrip: async (tripId, dayData) => {
    try {
      const response = await api.post(`/trips/${tripId}/days`, dayData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menambah hari perjalanan';
    }
  },

  /**
   * Menambahkan jadwal destinasi ke dalam hari tertentu
   * @param {number} dayId - ID dari HariPerjalanan
   * @param {Object} scheduleData - { destinasiId, jamMulai, jamSelesai, catatan }
   */
  addScheduleItem: async (dayId, scheduleData) => {
    try {
      const response = await api.post(`/itinerary/days/${dayId}/activities`, scheduleData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menambah jadwal destinasi';
    }
  },

  /**
   * Menghapus item jadwal tertentu
   * @param {number} scheduleId 
   */
  deleteScheduleItem: async (scheduleId) => {
    try {
      const response = await api.delete(`/itinerary/activities/${scheduleId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menghapus jadwal';
    }
  },

  /**
   * Memperbarui detail jadwal (misal ganti jam atau catatan)
   */
  updateScheduleItem: async (scheduleId, updateData) => {
    try {
      const response = await api.put(`/itinerary/activities/${scheduleId}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal memperbarui jadwal';
    }
  },

  /**
   * Mengambil urutan hari untuk satu trip tertentu
   */
  getDaysByTripId: async (tripId) => {
    try {
      const response = await api.get(`/trips/${tripId}/days`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data hari perjalanan';
    }
  }
};

export default itineraryService;