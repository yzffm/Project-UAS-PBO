import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTripPage = () => {
  const [tipe, setTipe] = useState('SOLO');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <button onClick={() => navigate(-1)} className="text-gray-500 mb-6 hover:text-gray-800">← Kembali</button>
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Buat Rencana Baru</h1>
        
        <form className="space-y-8">
          <section className="space-y-4">
            <label className="block text-lg font-bold text-gray-800">Detail Perjalanan</label>
            <input type="text" placeholder="Nama Perjalanan (Contoh: Liburan Musim Panas)" 
              className="w-full border-b-2 border-gray-100 py-3 text-xl outline-none focus:border-blue-500 transition" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" className="w-full border p-3 rounded-xl text-gray-600 outline-none" />
              <input type="text" placeholder="Kota Tujuan" className="w-full border p-3 rounded-xl outline-none" />
            </div>
          </section>

          <section className="space-y-4">
            <label className="block text-lg font-bold text-gray-800">Tipe Traveler</label>
            <div className="flex gap-4">
              {['SOLO', 'GRUP', 'KELUARGA'].map((t) => (
                <button key={t} type="button" onClick={() => setTipe(t)}
                  className={`flex-1 py-3 rounded-xl border-2 font-bold transition ${tipe === t ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 text-gray-400'}`}>
                  {t}
                </button>
              ))}
            </div>
          </section>

          {/* Conditional Input */}
          {tipe !== 'SOLO' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {tipe === 'GRUP' ? 'Nama Grup / Geng' : 'Nama Keluarga'}
              </label>
              <input type="text" className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan nama..." />
            </div>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition">
            Lanjutkan ke Itinerary →
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTripPage;