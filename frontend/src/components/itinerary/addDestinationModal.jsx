import React, { useState, useEffect } from 'react';
import { X, Search, Clock, AlignLeft } from 'lucide-react';
import destinationService from '../../services/destinationService';
import { useAuth } from '../../context/AuthContext';

const AddDestinationModal = ({ isOpen, onClose, onAdd }) => {
  const { token } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    destinasiId: '',
    jamMulai: '09:00',
    jamSelesai: '10:00',
    catatan: ''
  });

  useEffect(() => {
    if (!isOpen) return;
    
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        let data;
        if (searchTerm.length > 2) {
          data = await destinationService.searchDestinations(searchTerm, token);
        } else {
          data = await destinationService.getAllDestinations({}, token);
        }
        setDestinations(data || []);
      } catch (err) {
        console.error('Failed to load destinations', err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchDestinations();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [isOpen, searchTerm, token]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.destinasiId) {
      alert('Pilih destinasi terlebih dahulu');
      return;
    }
    // format as expected by JadwalDestinasi
    const payload = {
      destinasiId: parseInt(formData.destinasiId),
      jamMulai: formData.jamMulai + ':00', // API expects LocalTime
      jamSelesai: formData.jamSelesai + ':00',
      catatan: formData.catatan
    };
    onAdd(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-900">Tambah Jadwal Destinasi</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          {/* Pilih Destinasi */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Cari Destinasi</label>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input 
                type="text"
                placeholder="Ketik untuk mencari..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              value={formData.destinasiId}
              onChange={(e) => setFormData({...formData, destinasiId: e.target.value})}
              required
            >
              <option value="">-- Pilih Destinasi --</option>
              {loading ? (
                <option value="" disabled>Memuat...</option>
              ) : (
                destinations.map(d => (
                  <option key={d.id} value={d.id}>{d.nama} ({d.kategori})</option>
                ))
              )}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Clock size={14} /> Jam Mulai
              </label>
              <input 
                type="time" 
                required
                value={formData.jamMulai}
                onChange={(e) => setFormData({...formData, jamMulai: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Clock size={14} /> Jam Selesai
              </label>
              <input 
                type="time" 
                required
                value={formData.jamSelesai}
                onChange={(e) => setFormData({...formData, jamSelesai: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <AlignLeft size={14} /> Catatan Tambahan
            </label>
            <textarea 
              value={formData.catatan}
              onChange={(e) => setFormData({...formData, catatan: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none h-24"
              placeholder="Contoh: Bawa payung, pakai sepatu nyaman..."
            ></textarea>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="flex-1 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
            >
              Simpan Jadwal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDestinationModal;