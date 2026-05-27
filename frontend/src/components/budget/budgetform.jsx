import React, { useState, useEffect } from 'react';
import { X, Banknote } from 'lucide-react';
import budgetService from '../../services/budgetService';
import { useAuth } from '../../context/AuthContext';

const BudgetForm = ({ tripId, itemToEdit, onClose, onSuccess }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    kategori: 'TRANSPORTASI',
    namaItem: '',
    estimasiHarga: '',
    hargaAktual: '',
    sudahDibayar: false,
    catatan: ''
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        kategori: itemToEdit.kategoriAnggaran || itemToEdit.kategori || 'TRANSPORTASI',
        namaItem: itemToEdit.namaItem || '',
        estimasiHarga: itemToEdit.estimasiHarga || '',
        hargaAktual: itemToEdit.hargaAktual || '',
        sudahDibayar: itemToEdit.sudahDibayar || false,
        catatan: itemToEdit.catatan || ''
      });
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      estimasiHarga: parseFloat(formData.estimasiHarga) || 0,
      hargaAktual: parseFloat(formData.hargaAktual) || 0
    };

    try {
      if (itemToEdit) {
        await budgetService.updateBudgetItem(tripId, itemToEdit.id, payload, token);
      } else {
        await budgetService.addBudgetItem(tripId, payload, token);
      }
      onSuccess();
    } catch (err) {
      alert('Gagal menyimpan anggaran');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative glass-modal rounded-3xl p-6 w-full max-w-md shadow-2xl shadow-blue-900/20 overflow-hidden animate-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/40">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-xl border border-white/60 shadow-sm">
              <Banknote className="h-6 w-6 text-blue-600" />
            </div>
            {itemToEdit ? 'Edit Anggaran' : 'Tambah Anggaran'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 p-2 hover:bg-white/50 rounded-xl transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Kategori
            </label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              disabled={!!itemToEdit} // Do not allow changing category for existing items since backend factory uses it
              className="w-full px-4 py-3 glass-input rounded-xl focus:ring-2 focus:ring-blue-400 outline-none font-medium disabled:opacity-50"
            >
              <option value="TRANSPORTASI">Transportasi</option>
              <option value="AKOMODASI">Akomodasi</option>
              <option value="KONSUMSI">Konsumsi</option>
              <option value="LAINNYA">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Nama Item
            </label>
            <input
              type="text"
              name="namaItem"
              required
              value={formData.namaItem}
              onChange={handleChange}
              placeholder="Contoh: Tiket Pesawat PP"
              className="w-full px-4 py-3 glass-input rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Estimasi (Rp)
              </label>
              <input
                type="number"
                name="estimasiHarga"
                required
                value={formData.estimasiHarga}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-3 glass-input rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Aktual (Rp)
              </label>
              <input
                type="number"
                name="hargaAktual"
                value={formData.hargaAktual}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-3 glass-input rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Catatan
            </label>
            <textarea
              name="catatan"
              value={formData.catatan}
              onChange={handleChange}
              className="w-full px-4 py-3 glass-input rounded-xl focus:ring-2 focus:ring-blue-400 outline-none resize-none h-20 transition-all"
            ></textarea>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="sudahDibayar"
              name="sudahDibayar"
              checked={formData.sudahDibayar}
              onChange={handleChange}
              disabled={!formData.hargaAktual || parseFloat(formData.hargaAktual) <= 0}
              className="w-4 h-4 text-blue-600 bg-white/50 border-white/60 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <label htmlFor="sudahDibayar" className="text-sm font-bold text-gray-700 cursor-pointer">
              Tandai Lunas (Sudah Dibayar)
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3.5 btn-secondary rounded-xl font-bold transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3.5 btn-primary rounded-xl font-bold transition-all disabled:opacity-70"
            >
              {loading ? 'Menyimpan...' : (itemToEdit ? 'Simpan' : 'Tambah')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;