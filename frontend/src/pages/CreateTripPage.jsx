import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TripTypeSelector from '../components/trip/TripTypeSelector';
import tripService from '../services/tripService';
import { useAuth } from '../context/AuthContext';

const CreateTripPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    namaTrip: location.state?.destinationName ? `Trip ke ${location.state.destinationName}` : '',
    deskripsiTrip: '',
    tanggalMulai: '',
    tanggalSelesai: '',
    tipePerjalanan: 'SOLO',

    // Solo specific
    moodPerjalanan: '',
    modeHemat: false,

    // Grup specific
    jumlahPeserta: 2,
    namaGrup: '',
    temaGrup: '',

    // Keluarga specific
    jumlahDewasa: 1,
    jumlahAnak: 0,
    adaLansia: false,
    adaBalita: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const dataToSubmit = { ...formData };

      // Bersihkan data yang tidak sesuai tipe
      if (formData.tipePerjalanan === 'SOLO') {
        delete dataToSubmit.jumlahPeserta;
        delete dataToSubmit.namaGrup;
        delete dataToSubmit.temaGrup;
        delete dataToSubmit.jumlahDewasa;
        delete dataToSubmit.jumlahAnak;
        delete dataToSubmit.adaLansia;
        delete dataToSubmit.adaBalita;
      } else if (formData.tipePerjalanan === 'GRUP') {
        delete dataToSubmit.moodPerjalanan;
        delete dataToSubmit.modeHemat;
        delete dataToSubmit.jumlahDewasa;
        delete dataToSubmit.jumlahAnak;
        delete dataToSubmit.adaLansia;
        delete dataToSubmit.adaBalita;
      } else {
        delete dataToSubmit.moodPerjalanan;
        delete dataToSubmit.modeHemat;
        delete dataToSubmit.jumlahPeserta;
        delete dataToSubmit.namaGrup;
        delete dataToSubmit.temaGrup;
      }

      const trip = await tripService.createTrip(dataToSubmit, token);
      navigate(`/trips/${trip.id}`);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <button onClick={() => navigate('/dashboard')} className="text-gray-500 mb-6 hover:text-blue-600 transition flex items-center gap-2 font-medium">
        ← Kembali ke Dashboard
      </button>

      <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5 rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Buat Rencana Baru</h1>
        <p className="text-gray-500 mb-8">Lengkapi detail di bawah untuk memulai perencanaan petualangan Anda.</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="space-y-4">
            <label className="block text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Informasi Dasar</label>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Perjalanan *</label>
              <input type="text" required value={formData.namaTrip} onChange={(e) => setFormData({ ...formData, namaTrip: e.target.value })}
                placeholder="Contoh: Liburan Musim Panas di Bali"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Mulai *</label>
                <input type="date" required value={formData.tanggalMulai} onChange={(e) => setFormData({ ...formData, tanggalMulai: e.target.value })}
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition text-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Selesai *</label>
                <input type="date" required value={formData.tanggalSelesai} onChange={(e) => setFormData({ ...formData, tanggalSelesai: e.target.value })}
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition text-gray-700" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi Singkat</label>
              <textarea rows="3" value={formData.deskripsiTrip} onChange={(e) => setFormData({ ...formData, deskripsiTrip: e.target.value })}
                placeholder="Tujuan, harapan, atau catatan untuk trip ini..."
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition resize-none"></textarea>
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-gray-100">
            <TripTypeSelector formData={formData} setFormData={setFormData} />
          </section>

          <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-500/25 disabled:opacity-70 mt-8">
            {isLoading ? 'Menyimpan...' : 'Buat Rencana Perjalanan →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTripPage;