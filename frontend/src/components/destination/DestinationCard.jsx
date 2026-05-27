import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Tag } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const DestinationCard = ({ destination }) => {
  // FIX: Sesuaikan nama variabel dengan Destinasi.java (Backend)
  const { id, nama, lokasi, estimasiBiaya, kategori, gambarUrl } = destination;

  return (
    <Link
      to={`/destinations/${id}`}
      className="group glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-100/50">
        <img
          src={gambarUrl || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=500'}
          alt={nama}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/80 backdrop-blur-md text-blue-600 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-white/50">
            <Tag size={10} />
            {kategori}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10">
          <Star size={10} className="text-yellow-400 fill-yellow-400" />
          4.5
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center text-gray-500 text-[10px] gap-1 mb-1 font-semibold">
          <MapPin size={10} className="text-blue-400" />
          <span className="uppercase tracking-wider">{lokasi}</span>
        </div>

        <h3 className="text-gray-900 font-bold group-hover:text-blue-600 transition-colors line-clamp-1 mb-3">
          {nama}
        </h3>

        <div className="mt-auto flex justify-between items-end">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter leading-none mb-1" title="Estimasi rata-rata harga tiket masuk atau biaya dasar destinasi">Harga Tiket/Entry</p>
            <p className="text-sm font-extrabold text-blue-600">{formatCurrency(estimasiBiaya)}</p>
          </div>
          <span className="text-xs font-bold text-gray-400 group-hover:text-blue-500 transition-colors">
            Detail →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;