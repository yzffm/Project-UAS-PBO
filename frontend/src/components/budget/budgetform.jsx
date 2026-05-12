import React, { useState, useEffect } from 'react';
import { XMarkIcon, BanknotesIcon } from '@heroicons/react/24/outline';

/**
 * Komponen BudgetForm
 * @param {Object} initialData - Data untuk edit (kosongkan jika tambah baru)
 * @param {Function} onSubmit - Fungsi handle submit (tambah/update)
 * @param {Function} onClose - Fungsi menutup modal/form
 */
const BudgetForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    nama: '',
    kategori: 'Transportasi',
    biaya: ''
  });

  // Sinkronisasi data jika masuk dalam mode Edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        nama: initialData.nama || '',
        kategori: initialData.kategori || 'Transportasi',
        biaya: initialData.biaya || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi sederhana: biaya harus angka
    const dataToSubmit = {
      ...formData,
      biaya: parseFloat(formData.biaya)
    };
    onSubmit(dataToSubmit);
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <BanknotesIcon className="h-6 w-6 text-blue-600" />
          {initialData ? 'Edit Anggaran' : 'Tambah Anggaran'}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Input Nama Pengeluaran */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Pengeluaran
          </label>
          <input
            type="text"
            name="nama"
            required
            value={formData.nama}
            onChange={handleChange}
            placeholder="Contoh: Tiket Pesawat PP"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Pilihan Kategori */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          >
            <option value="Transportasi">Transportasi</option>
            <option value="Akomodasi">Akomodasi</option>
            <option value="Makan">Makan & Minum</option>
            <option value="Hiburan">Hiburan/Wisata</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        {/* Input Biaya */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimasi Biaya (Rp)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 font-medium">Rp</span>
            <input
              type="number"
              name="biaya"
              required
              value={formData.biaya}
              onChange={handleChange}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md shadow-blue-100 transition-colors"
          >
            {initialData ? 'Simpan Perubahan' : 'Tambah Sekarang'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;