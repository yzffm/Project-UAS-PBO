import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const data = await authService.login({ email, password });
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
          <h2 className="text-3xl font-bold text-gray-900">Selamat Datang</h2>
          <p className="text-gray-500 mt-2">Masuk untuk melihat rencana perjalananmu</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="user@example.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="••••••••" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md disabled:opacity-70 flex justify-center items-center">
            {isLoading ? 'Memproses...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Belum punya akun? <Link to="/register" className="text-blue-600 font-bold hover:underline">Daftar</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;