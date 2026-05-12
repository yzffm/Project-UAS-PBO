import React from 'react';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

/**
 * Komponen BudgetTable
 * @param {Array} items - Daftar item anggaran dari backend
 * @param {Function} onDelete - Fungsi untuk menghapus item
 * @param {Function} onEdit - Fungsi untuk mengedit item
 */
const BudgetTable = ({ items = [], onDelete, onEdit }) => {
  
  // Helper untuk format mata uang Rupiah
  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Kalkulasi total otomatis
  const totalBudget = items.reduce((sum, item) => sum + item.biaya, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Kategori</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Nama Pengeluaran</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Estimasi Biaya</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${item.kategori === 'Akomodasi' ? 'bg-purple-100 text-purple-800' : 
                        item.kategori === 'Transportasi' ? 'bg-blue-100 text-blue-800' : 
                        'bg-orange-100 text-orange-800'}`}>
                      {item.kategori}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                    {item.nama}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatIDR(item.biaya)}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={() => onEdit(item)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => onDelete(item.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Hapus"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">
                  Belum ada data anggaran.
                </td>
              </tr>
            )}
          </tbody>
          {items.length > 0 && (
            <tfoot>
              <tr className="bg-gray-50 font-bold">
                <td colSpan="2" className="px-6 py-4 text-right text-gray-600">Total Estimasi:</td>
                <td colSpan="2" className="px-6 py-4 text-blue-600 text-lg">
                  {formatIDR(totalBudget)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default BudgetTable;