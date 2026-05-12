import React from 'react';
import { Clock, Trash2, MapPin } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const ScheduleItem = ({ item, onDelete }) => {
  const destinasi = item.destinasi || {};
  
  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString.substring(0, 5); // Extract HH:mm from HH:mm:ss
  };

  return (
    <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
      {/* Waktu */}
      <div className="min-w-[80px] text-center bg-gray-50 py-2 px-3 rounded-xl border border-gray-100">
        <p className="text-sm font-black text-gray-900">{formatTime(item.jamMulai)}</p>
        <div className="flex items-center justify-center my-0.5">
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-300 rounded-full mx-0.5"></div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        </div>
        <p className="text-sm font-black text-gray-900">{formatTime(item.jamSelesai)}</p>
      </div>

      {/* Konten Utama */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider bg-blue-100 text-blue-700">
            {destinasi.kategori || 'Destinasi'}
          </span>
          <h4 className="font-extrabold text-gray-900 text-base truncate">{destinasi.nama || 'Nama Tidak Diketahui'}</h4>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-500 font-medium">
            <MapPin size={14} className="text-red-400" />
            <span className="truncate">{destinasi.lokasi || '-'}</span>
          </div>
          {destinasi.estimasiBiaya > 0 && (
             <div className="text-green-600 font-bold text-xs">
                {formatCurrency(destinasi.estimasiBiaya)}
             </div>
          )}
        </div>
        
        {item.catatan && (
          <p className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-100 italic">
            "{item.catatan}"
          </p>
        )}
      </div>

      {/* Action */}
      <button 
        onClick={() => onDelete(item.id)}
        className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0"
        title="Hapus Jadwal"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default ScheduleItem;