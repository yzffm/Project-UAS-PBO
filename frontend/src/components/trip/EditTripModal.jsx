import React, { useState } from 'react';
import { X } from 'lucide-react';
import tripService from '../../services/tripService';

const EditTripModal = ({ trip, token, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        namaTrip: trip.namaTrip || '',
        deskripsiTrip: trip.deskripsiTrip || '',
        tanggalMulai: trip.tanggalMulai || '',
        tanggalSelesai: trip.tanggalSelesai || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await tripService.updateTrip(trip.id, formData, token);
            onSuccess();
        } catch (err) {
            alert('Gagal mengupdate trip');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
            <div className="bg-white/90 backdrop-blur-2xl border border-white/50 p-6 w-full max-w-md shadow-2xl rounded-3xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Edit Detail Trip</h2>
                    <button onClick={onClose}><X className="text-gray-500" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nama Trip</label>
                        <input type="text" required value={formData.namaTrip} onChange={(e) => setFormData({ ...formData, namaTrip: e.target.value })} className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Mulai</label>
                            <input type="date" required value={formData.tanggalMulai} onChange={(e) => setFormData({ ...formData, tanggalMulai: e.target.value })} className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Selesai</label>
                            <input type="date" required value={formData.tanggalSelesai} onChange={(e) => setFormData({ ...formData, tanggalSelesai: e.target.value })} className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi</label>
                        <textarea value={formData.deskripsiTrip} onChange={(e) => setFormData({ ...formData, deskripsiTrip: e.target.value })} className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition h-20"></textarea>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-xl font-bold">Batal</button>
                        <button type="submit" disabled={loading} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition">{loading ? 'Loading...' : 'Simpan'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTripModal;