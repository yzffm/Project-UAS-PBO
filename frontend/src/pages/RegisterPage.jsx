import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulasikan pendaftaran
    console.log(formData);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Buat Akun</h2>
        <p className="text-gray-500 mb-8">Gabung sekarang dan mulai petualanganmu.</p>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="Nama Lengkap" className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition mt-4">
            Daftar Sekarang
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Dengan mendaftar, Anda menyetujui Ketentuan Layanan kami.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;