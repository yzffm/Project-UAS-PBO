import React from 'react';
import { Clock, Trash2, MapPin, GripVertical } from 'lucide-react';

const ScheduleItem = ({ item, onDelete }) => {
  // item: { id, jam, aktivitas, lokasi, kategori }
  
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'WISATA': return 'bg-orange-100 text-orange-600';
      case 'KULINER': return 'bg-green-100 text-green-600';
      case 'TRANSPORT': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="group flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all">
      {/* Handle Drag (Visual Only) */}
      <div className="text-gray-300 cursor-grab active:cursor-grabbing group-hover:text-gray-400">
        <GripVertical size={20} />
      </div>

      {/* Waktu */}
      <div className="min-w-[70px] text-center">
        <p className="text-sm font-bold text-gray-900">{item.jam}</p>
        <p className="text-[10px] font-medium text-gray-400 uppercase">WIB</p>
      </div>

      {/* Konten Utama */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${getCategoryColor(item.kategori)}`}>
            {item.kategori}
          </span>
          <h4 className="font-bold text-gray-800 text-sm">{item.aktivitas}</h4>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <MapPin size={12} />
          <span className="text-xs truncate">{item.lokasi}</span>
        </div>
      </div>

      {/* Action */}
      <button 
        onClick={() => onDelete(item.id)}
        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default ScheduleItem;