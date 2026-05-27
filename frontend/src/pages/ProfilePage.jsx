import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';

const ProfilePage = () => {
    const { user, token, setUser } = useAuth();
    const [formData, setFormData] = useState({
        nama: user?.nama || '',
        email: user?.email || '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg({ type: '', text: '' });
        try {
            const updatedUser = await userService.updateProfile(formData, token);

            // Update context & localstorage
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const newUser = { ...storedUser, nama: updatedUser.nama, email: updatedUser.email };
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);

            setFormData({ ...formData, password: '' }); // Reset password field
            setMsg({ type: 'success', text: 'Profil berhasil diperbarui!' });
        } catch (err) {
            setMsg({ type: 'error', text: err });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-12 relative z-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Profil Saya</h1>
            <div className="glass-card rounded-3xl p-8">
                {msg.text && (
                    <div className={`p-4 rounded-xl mb-6 backdrop-blur-sm border ${msg.type === 'success' ? 'bg-green-50/80 text-green-700 border-green-200/50' : 'bg-red-50/80 text-red-700 border-red-200/50'}`}>
                        {msg.text}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Lengkap</label>
                        <input type="text" required value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                            className="w-full px-4 py-3 glass-input rounded-xl outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 glass-input rounded-xl outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Password Baru <span className="text-gray-400 font-normal">(Kosongkan jika tidak ingin mengubah)</span></label>
                        <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 glass-input rounded-xl outline-none" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 rounded-xl font-bold transition">
                        {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;