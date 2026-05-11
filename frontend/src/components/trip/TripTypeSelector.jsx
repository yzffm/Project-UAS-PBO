import React from 'react';
import { User, Users, Home } from 'lucide-react';

const TripTypeSelector = ({ selectedType, onTypeChange }) => {
  const types = [
    { id: 'SOLO', label: 'Solo', icon: <User size={20} />, desc: 'Jalan sendiri lebih bebas' },
    { id: 'GRUP', label: 'Grup', icon: <Users size={20} />, desc: 'Bareng teman/sahabat' },
    { id: 'KELUARGA', label: 'Keluarga', icon: <Home size={20} />, desc: 'Momen hangat keluarga' },
  ];

  return (
    <div className="space-y-4">
      <label className="block text-sm font-bold text-gray-700">Tipe Perjalanan</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {types.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => onTypeChange(type.id)}
            className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200 ${
              selectedType === type.id
                ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md'
                : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
            }`}
          >
            <div className={`p-3 rounded-full mb-2 ${selectedType === type.id ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
              {type.icon}
            </div>
            <span className="font-bold text-sm">{type.label}</span>
            <span className="text-[10px] mt-1 opacity-70">{type.desc}</span>
          </button>
        ))}
      </div>

      {/* Logic Field Tambahan (Conditional Rendering) */}
      <div className="mt-6 space-y-4">
        {selectedType === 'GRUP' && (
          <div className="animate-in fade-in slide-in-from-top-2">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nama Grup / Komunitas</label>
            <input 
              type="text" 
              placeholder="Contoh: Pendaki Santuy"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        )}

        {selectedType === 'KELUARGA' && (
          <div className="animate-in fade-in slide-in-from-top-2">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nama Keluarga</label>
            <input 
              type="text" 
              placeholder="Contoh: Keluarga Cemara"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TripTypeSelector;