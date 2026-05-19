import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ nama: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const data = await authService.register(formData);
      login(data.user, data.token);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
            TravelPlanner.ai
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Buat Akun</h2>
          <p className="text-gray-500 mt-2">Gabung sekarang dan mulai petualanganmu</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
            <input type="text" required value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="Joko Widodo" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="joko@example.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="••••••••" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition mt-6 shadow-md disabled:opacity-70 flex justify-center items-center">
            {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Sudah punya akun? <Link to="/login" className="text-blue-600 font-bold hover:underline">Masuk</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;