import React, { useState, useEffect } from 'react';
import { X, Search, Clock, AlignLeft } from 'lucide-react';
import destinationService from '../../services/destinationService';
import { useAuth } from '../../context/AuthContext';

const DestinationScheduleModal = ({ isOpen, onClose, onSave, itemToEdit }) => {
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
    if (itemToEdit) {
      setFormData({
        destinasiId: itemToEdit.destinasi?.id || '',
        jamMulai: itemToEdit.waktuMulai ? itemToEdit.waktuMulai.substring(0, 5) : '09:00',
        jamSelesai: itemToEdit.waktuSelesai ? itemToEdit.waktuSelesai.substring(0, 5) : '10:00',
        catatan: itemToEdit.catatan || ''
      });
    }
  }, [itemToEdit]);

  useEffect(() => {
    if (!isOpen) return;
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        let data = searchTerm.length > 2
          ? await destinationService.searchDestinations(searchTerm, token)
          : await destinationService.getAllDestinations({}, token);
        setDestinations(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const delay = setTimeout(fetchDestinations, 500);
    return () => clearTimeout(delay);
  }, [isOpen, searchTerm, token]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.destinasiId) return alert('Pilih destinasi terlebih dahulu');
    const payload = {
      destinasiId: parseInt(formData.destinasiId),
      waktuMulai: formData.jamMulai + ':00',
      waktuSelesai: formData.jamSelesai + ':00',
      urutan: 1,
      catatan: formData.catatan
    };
    onSave(payload, itemToEdit?.id); // Kirim id jika mode Edit
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-900">{itemToEdit ? 'Edit Jadwal' : 'Tambah Jadwal'}</h3>
          <button onClick={onClose}><X size={20} className="text-gray-500" /></button>
        </div>
        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Cari Destinasi</label>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input type="text" placeholder="Ketik..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-medium" value={formData.destinasiId} onChange={(e) => setFormData({ ...formData, destinasiId: e.target.value })} required>
              <option value="">-- Pilih Destinasi --</option>
              {!loading && destinations.map(d => <option key={d.id} value={d.id}>{d.nama} ({d.kategori})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2"><Clock size={14} /> Mulai</label>
              <input type="time" required value={formData.jamMulai} onChange={(e) => setFormData({ ...formData, jamMulai: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2"><Clock size={14} /> Selesai</label>
              <input type="time" required value={formData.jamSelesai} onChange={(e) => setFormData({ ...formData, jamSelesai: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold flex items-center gap-2"><AlignLeft size={14} /> Catatan</label>
            <textarea value={formData.catatan} onChange={(e) => setFormData({ ...formData, catatan: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none h-20"></textarea>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-gray-100 font-bold rounded-xl">Batal</button>
            <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DestinationScheduleModal;