import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = (token) => ({
    headers: { Authorization: `Bearer ${token}` }
});

const userService = {
    updateProfile: async (data, token) => {
        try {
            const response = await axios.put(`${API_URL}/users/me`, data, getHeaders(token));
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error.message || 'Gagal update profil';
        }
    }
};

export default userService;