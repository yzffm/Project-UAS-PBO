import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, ArrowLeft, Plus, Check } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import { formatCurrency } from '../utils/formatCurrency';

const DestinationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [added, setAdded] = useState(false);

  // Simulasi fetch data berdasarkan ID
  useEffect(() => {
    // Nanti ini diganti destinationService.getById(id)
    const mockData = {
      id: id,
      nama: "Pura Ulun Danu Beratan",
      lokasi: "Bedugul, Bali",
      deskripsi: "Pura ikonik yang terletak di tepi Danau Beratan. Tempat ini menawarkan udara sejuk pegunungan dan pemandangan pura yang seolah terapung di atas air. Sangat cocok untuk fotografi dan wisata religi.",
      rating: 4.8,
      kategori: "Budaya & Religi",
      hargaTiket: 50000,
      jamBuka: "07:00 - 19:00",
      imageUrl: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1000",
      fasilitas: ["Parkir Luas", "Toilet", "Restoran", "Sewa Perahu"]
    };
    setDestination(mockData);
  }, [id]);

  if (!destination) return <div className="flex justify-center mt-20 font-bold">Memuat destinasi...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      {/* Hero Section with Back Button */}
      <div className="relative h-[400px] w-full">
        <img 
          src={destination.imageUrl} 
          alt={destination.nama} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-gray-900 transition"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
            <div>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {destination.kategori}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mt-2">{destination.nama}</h1>
              <div className="flex items-center text-gray-500 mt-2 gap-2">
                <MapPin size={18} className="text-red-500" />
                <span className="font-medium">{destination.lokasi}</span>
              </div>
            </div>
            
            <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-2xl">
              <Star className="text-yellow-500 fill-yellow-500 mr-1" size={20} />
              <span className="font-bold text-gray-800">{destination.rating}</span>
              <span className="text-gray-400 text-sm ml-1">/ 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Side: Description */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">Tentang Destinasi</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {destination.deskripsi}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">Fasilitas</h2>
                <div className="flex flex-wrap gap-2">
                  {destination.fasilitas.map((item, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Quick Info Card */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3 mb-4 text-gray-700">
                  <Clock size={20} className="text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Jam Operasional</p>
                    <p className="font-bold">{destination.jamBuka}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Harga Tiket</p>
                  <p className="text-2xl font-extrabold text-green-600">
                    {formatCurrency(destination.hargaTiket)}
                  </p>
                </div>
                
                <button 
                  onClick={() => setAdded(!added)}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition shadow-lg ${
                    added 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
                  }`}
                >
                  {added ? (
                    <><Check size={20} /> Tersimpan</>
                  ) : (
                    <><Plus size={20} /> Tambah ke Trip</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DestinationDetailPage;