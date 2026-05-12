import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Clock, ArrowLeft, Lightbulb } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
import destinationService from '../services/destinationService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DestinationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const data = await destinationService.getDestinationById(id, token);
        setDestination(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestination();
  }, [id, token]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;
  if (!destination) return <div className="text-center mt-20 text-gray-500">Destinasi tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section with Back Button */}
      <div className="relative h-[450px] w-full">
        <img 
          src={destination.gambarUrl || 'https://via.placeholder.com/1200x600?text=No+Image'} 
          alt={destination.nama} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-gray-900 transition border border-white/20"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 -mt-24 relative z-10">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10 border-b border-gray-100 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                  {destination.kategori}
                </span>
                <span className="text-2xl">{destination.iconKategori}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">{destination.nama}</h1>
              <div className="flex items-center text-gray-500 mt-4 gap-2 font-medium">
                <MapPin size={20} className="text-red-500" />
                <span>{destination.lokasi}</span>
              </div>
              {destination.alamatLengkap && (
                <p className="text-gray-400 mt-2 text-sm max-w-xl">{destination.alamatLengkap}</p>
              )}
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 min-w-[200px] text-center md:text-left">
               <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Estimasi Biaya</p>
               <p className="text-3xl font-black text-green-600">
                 {formatCurrency(destination.estimasiBiaya)}
               </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left Side: Description */}
            <div className="md:col-span-2 space-y-10">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Tentang Destinasi</h2>
                <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                  {destination.deskripsi}
                </p>
              </section>

              <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-900">
                  <Lightbulb size={24} className="text-blue-500" /> Tips Kunjungan
                </h2>
                <p className="text-blue-800 leading-relaxed">
                  {destination.tipsKunjungan}
                </p>
              </section>

              {/* Dynamic properties based on subclass */}
              <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(destination).map(([key, value]) => {
                  // Skip base fields to only show subclass specific fields
                  const skipFields = ['id', 'nama', 'deskripsi', 'lokasi', 'alamatLengkap', 'estimasiBiaya', 'gambarUrl', 'durasiRekomendasi', 'kategori', 'iconKategori', 'tipsKunjungan', 'ringkasan'];
                  if (skipFields.includes(key) || value === null || value === '') return null;
                  
                  return (
                    <div key={key} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="font-semibold text-gray-800">{String(value)}</p>
                    </div>
                  )
                })}
              </section>
            </div>

            {/* Right Side: Quick Info Card */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-6 text-gray-700">
                  <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Durasi Rekomendasi</p>
                    <p className="font-extrabold text-lg">{destination.durasiRekomendasi} Menit</p>
                  </div>
                </div>
                
                <Link 
                  to="/trips/new"
                  state={{ destinationName: destination.nama }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200"
                >
                  Rencanakan Trip ke Sini
                </Link>
                <p className="text-center text-xs text-gray-400 mt-4 font-medium">Buka dashboard untuk menambahkannya ke Itinerary Anda.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DestinationDetailPage;