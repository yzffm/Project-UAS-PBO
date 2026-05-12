import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Wallet, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

const TripCard = ({ trip }) => {
  // Destructuring data trip dari backend
  const { id, nama, tipe, tanggal, destinasiUtama, totalAnggaran, status } = trip;

  // Logika warna berdasarkan tipe trip (untuk aksen visual)
  const getTypeStyles = (type) => {
    switch (type) {
      case 'SOLO': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'GRUP': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'KELUARGA': return 'bg-orange-50 text-orange-600 border-orange-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header: Tipe & Status */}
        <div className="flex justify-between items-start mb-4">
          <span className={`text-[10px] font-extrabold tracking-widest px-2.5 py-1 rounded-lg border ${getTypeStyles(tipe)}`}>
            {tipe}
          </span>
          <StatusBadge status={status || 'PLANNED'} />
        </div>

        {/* Title & Lokasi */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
            {nama}
          </h3>
          <div className="flex items-center text-gray-500 text-sm gap-1.5">
            <MapPin size={14} className="text-gray-400" />
            <span className="truncate">{destinasiUtama || 'Destinasi belum ditentukan'}</span>
          </div>
        </div>

        {/* Info Ringkas: Tanggal & Budget */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-50">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-gray-400">
              <Calendar size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Waktu</span>
            </div>
            <p className="text-sm font-semibold text-gray-700">{formatDate(tanggal)}</p>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-gray-400">
              <Wallet size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Anggaran</span>
            </div>
            <p className="text-sm font-bold text-green-600">{formatCurrency(totalAnggaran)}</p>
          </div>
        </div>

        {/* Action Button */}
        <Link 
          to={`/trips/${id}`}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-50 group-hover:bg-blue-600 group-hover:text-white text-gray-600 py-3 rounded-xl font-bold text-sm transition-all"
        >
          Lihat Detail Rencana
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default TripCard;