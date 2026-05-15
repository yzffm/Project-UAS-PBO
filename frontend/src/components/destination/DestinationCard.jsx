import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Tag } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const DestinationCard = ({ destination }) => {
  // FIX: Sesuaikan nama variabel dengan Destinasi.java (Backend)
  const { id, nama, lokasi, estimasiBiaya, kategori, gambarUrl } = destination;

  return (
    <Link
      to={`/destination/${id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={gambarUrl || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=500'}
          alt={nama}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-blue-600 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
            <Tag size={10} />
            {kategori}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
          <Star size={10} className="text-yellow-400 fill-yellow-400" />
          4.5
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center text-gray-400 text-[10px] gap-1 mb-1 font-medium">
          <MapPin size={10} />
          <span className="uppercase tracking-wider">{lokasi}</span>
        </div>

        <h3 className="text-gray-900 font-bold group-hover:text-blue-600 transition-colors line-clamp-1 mb-3">
          {nama}
        </h3>

        <div className="mt-auto flex justify-between items-end">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter leading-none mb-1">Mulai Dari</p>
            <p className="text-sm font-extrabold text-blue-600">{formatCurrency(estimasiBiaya)}</p>
          </div>
          <span className="text-xs font-bold text-gray-300 group-hover:text-blue-500 transition-colors">
            Detail →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;