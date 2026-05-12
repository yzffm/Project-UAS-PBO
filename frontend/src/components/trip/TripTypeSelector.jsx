import React from 'react';
import { User, Users, Home } from 'lucide-react';

const TripTypeSelector = ({ formData, setFormData }) => {
  const types = [
    { id: 'SOLO', label: 'Solo', icon: <User size={20} />, desc: 'Jalan sendiri lebih bebas' },
    { id: 'GRUP', label: 'Grup', icon: <Users size={20} />, desc: 'Bareng teman/sahabat' },
    { id: 'KELUARGA', label: 'Keluarga', icon: <Home size={20} />, desc: 'Momen hangat keluarga' },
  ];

  const handleTypeChange = (newType) => {
    setFormData({ ...formData, tipePerjalanan: newType });
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-bold text-gray-700">Tipe Perjalanan</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {types.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => handleTypeChange(type.id)}
            className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200 ${
              formData.tipePerjalanan === type.id
                ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md'
                : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
            }`}
          >
            <div className={`p-3 rounded-full mb-2 ${formData.tipePerjalanan === type.id ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
              {type.icon}
            </div>
            <span className="font-bold text-sm">{type.label}</span>
            <span className="text-[10px] mt-1 opacity-70">{type.desc}</span>
          </button>
        ))}
      </div>

      {/* Logic Field Tambahan (Conditional Rendering) */}
      <div className="mt-6 space-y-4">
        {formData.tipePerjalanan === 'SOLO' && (
          <div className="animate-in fade-in slide-in-from-top-2 flex gap-4">
             <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Mood Perjalanan</label>
                <input 
                  type="text" 
                  value={formData.moodPerjalanan}
                  onChange={(e) => setFormData({...formData, moodPerjalanan: e.target.value})}
                  placeholder="Contoh: Healing / Backpacker"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
             </div>
             <div className="flex items-center gap-2 mt-6">
                <input 
                  type="checkbox" 
                  id="modeHemat"
                  checked={formData.modeHemat}
                  onChange={(e) => setFormData({...formData, modeHemat: e.target.checked})}
                  className="w-5 h-5"
                />
                <label htmlFor="modeHemat" className="text-sm font-semibold text-gray-700">Mode Hemat</label>
             </div>
          </div>
        )}

        {formData.tipePerjalanan === 'GRUP' && (
          <div className="animate-in fade-in slide-in-from-top-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nama Grup</label>
                <input 
                  type="text" 
                  value={formData.namaGrup}
                  onChange={(e) => setFormData({...formData, namaGrup: e.target.value})}
                  placeholder="Contoh: Pendaki Santuy"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tema Grup</label>
                <input 
                  type="text" 
                  value={formData.temaGrup}
                  onChange={(e) => setFormData({...formData, temaGrup: e.target.value})}
                  placeholder="Contoh: Liburan Akhir Tahun"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Jumlah Peserta</label>
              <input 
                type="number" 
                min="2"
                value={formData.jumlahPeserta}
                onChange={(e) => setFormData({...formData, jumlahPeserta: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>
        )}

        {formData.tipePerjalanan === 'KELUARGA' && (
          <div className="animate-in fade-in slide-in-from-top-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Jumlah Dewasa</label>
                  <input 
                    type="number" 
                    min="1"
                    value={formData.jumlahDewasa}
                    onChange={(e) => setFormData({...formData, jumlahDewasa: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Jumlah Anak</label>
                  <input 
                    type="number" 
                    min="0"
                    value={formData.jumlahAnak}
                    onChange={(e) => setFormData({...formData, jumlahAnak: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
               </div>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="adaLansia"
                    checked={formData.adaLansia}
                    onChange={(e) => setFormData({...formData, adaLansia: e.target.checked})}
                    className="w-5 h-5"
                  />
                  <label htmlFor="adaLansia" className="text-sm font-semibold text-gray-700">Membawa Lansia</label>
              </div>
              <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="adaBalita"
                    checked={formData.adaBalita}
                    onChange={(e) => setFormData({...formData, adaBalita: e.target.checked})}
                    className="w-5 h-5"
                  />
                  <label htmlFor="adaBalita" className="text-sm font-semibold text-gray-700">Membawa Balita</label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripTypeSelector;