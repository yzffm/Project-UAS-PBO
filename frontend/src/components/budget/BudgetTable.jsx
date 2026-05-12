import React from 'react';
import { Trash2, Edit, CheckCircle, Circle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const BudgetTable = ({ items = [], onDelete, onEdit }) => {
  
  const totalEstimasi = items.reduce((sum, item) => sum + (item.estimasiHarga || 0), 0);
  const totalAktual = items.reduce((sum, item) => sum + (item.hargaAktual || 0), 0);

  const getCategoryStyle = (cat) => {
    switch (cat?.toUpperCase()) {
      case 'TRANSPORTASI': return 'bg-blue-100 text-blue-800';
      case 'AKOMODASI': return 'bg-purple-100 text-purple-800';
      case 'KONSUMSI': return 'bg-green-100 text-green-800';
      default: return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Item</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Estimasi</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Aktual</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${getCategoryStyle(item.kategoriAnggaran || item.kategori)}`}>
                    {item.kategoriAnggaran || item.kategori}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900 font-bold">{item.namaItem}</p>
                  {item.catatan && <p className="text-xs text-gray-500 mt-1 truncate max-w-[150px]">{item.catatan}</p>}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">
                  {formatCurrency(item.estimasiHarga)}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">
                  {formatCurrency(item.hargaAktual)}
                </td>
                <td className="px-6 py-4 text-center">
                  {item.sudahDibayar ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                      <CheckCircle className="w-4 h-4 fill-green-600 text-white" /> Lunas
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-md">
                      <Circle className="w-4 h-4" /> Belum
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() => onEdit(item)}
                      className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-12 text-center text-gray-400 font-medium">
                Belum ada data anggaran.
              </td>
            </tr>
          )}
        </tbody>
        {items.length > 0 && (
          <tfoot>
            <tr className="bg-blue-50/50 border-t border-blue-100">
              <td colSpan="2" className="px-6 py-4 text-right text-gray-700 font-bold uppercase text-xs tracking-wider">Total:</td>
              <td className="px-6 py-4 text-gray-700 font-bold text-sm">
                {formatCurrency(totalEstimasi)}
              </td>
              <td className="px-6 py-4 text-blue-700 font-black text-sm">
                {formatCurrency(totalAktual)}
              </td>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default BudgetTable;