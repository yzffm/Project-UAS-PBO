import React, { useState } from 'react';
import { X, Search, Clock, MapPin } from 'lucide-react';
const AddDestinationModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    jam: '09:00',
    kategori: 'WISATA',
    destinasiId: ''
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Tambah Destinasi</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form className="p-6 space-y-5" onSubmit={(e) => { e.preventDefault(); onAdd(formData); }}>
          {/* Pilih Destinasi (Nanti dikoneksikan ke DestinasiModule) */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Cari Destinasi</label>
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <select 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setFormData({...formData, destinasiId: e.target.value})}
              >
                <option value="">Pilih destinasi yang tersedia...</option>
                <option value="1">Pura Ulun Danu Beratan</option>
                <option value="2">Pantai Melasti</option>
                <option value="3">Nasi Campur Ibu Oka</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Input Jam */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Clock size={14} /> Waktu
              </label>
              <input 
                type="time" 
                value={formData.jam}
                onChange={(e) => setFormData({...formData, jam: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Input Kategori */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Kategori</label>
              <select 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setFormData({...formData, kategori: e.target.value})}
              >
                <option value="WISATA">Wisata</option>
                <option value="KULINER">Kuliner</option>
                <option value="TRANSPORT">Transport</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDestinationModal;