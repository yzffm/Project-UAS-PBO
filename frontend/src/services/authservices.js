// src/services/authService.js
import api from './api';

const authService = {
  /**
   * Mendaftarkan user baru
   * @param {Object} userData - { username, email, password }
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal melakukan registrasi';
    }
  },

  /**
   * Login user dan simpan token
   * @param {Object} credentials - { username, password }
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login gagal, periksa kembali akun Anda';
    }
  },

  /**
   * Menghapus session
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  /**
   * Mendapatkan data user yang tersimpan di local
   */
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Mengecek apakah user masih terautentikasi
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;