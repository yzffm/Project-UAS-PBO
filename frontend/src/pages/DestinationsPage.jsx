import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, MapPinIcon } from '@heroicons/react/24/outline';

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [loading, setLoading] = useState(true);

  // Kategori sesuai dengan enum/subclass di Backend
  const categories = ['Semua', 'Alam', 'Budaya', 'Kuliner', 'Hiburan'];

  useEffect(() => {
    // Simulasi Fetching dari DestinasiController
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        // Dummy data untuk development Milestone 5
        const mockData = [
          { id: 1, nama: "Pantai Pandawa", lokasi: "Bali", kategori: "Alam", harga: 15000, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4" },
          { id: 2, nama: "Candi Borobudur", lokasi: "Magelang", kategori: "Budaya", harga: 50000, image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272" },
          { id: 3, nama: "Gudeg Yu Djum", lokasi: "Yogyakarta", kategori: "Kuliner", harga: 35000, image: "https://images.unsplash.com/photo-1582201943021-e8e5b3061b33" },
          { id: 4, nama: "Dufan", lokasi: "Jakarta", kategori: "Hiburan", harga: 250000, image: "https://images.unsplash.com/photo-1513889959010-6534143a2ad7" },
        ];
        setDestinations(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Logika Filtering
  const filteredDestinations = destinations.filter(dest => {
    const matchSearch = dest.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'Semua' || dest.kategori === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Eksplorasi Destinasi</h1>
          <p className="text-gray-600 mt-2">Temukan tempat terbaik untuk rencana perjalanan Anda selanjutnya.</p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama destinasi..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Destinasi */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">Memuat destinasi...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map(dest => (
              <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.nama} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    {dest.kategori}
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
                    <MapPinIcon className="h-3 w-3" />
                    {dest.lokasi}
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{dest.nama}</h3>
                  <p className="text-blue-600 font-semibold text-sm">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(dest.harga)}
                  </p>
                  
                  <button className="w-full mt-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition-colors">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredDestinations.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">Destinasi tidak ditemukan. Coba kata kunci lain.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;