import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import destinationService from '../services/destinationService';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatCurrency';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const categories = ['Semua', 'ALAM', 'BUDAYA', 'KULINER'];

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      setError('');
      try {
        const filters = {};
        if (selectedCategory && selectedCategory !== 'Semua') {
          filters.tipe = selectedCategory;
        }
        
        let data;
        if (searchTerm.length > 2) {
          data = await destinationService.searchDestinations(searchTerm, token);
        } else {
          data = await destinationService.getAllDestinations(filters, token);
        }
        setDestinations(data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchDestinations();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory, token]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat === 'Semua' ? '' : cat);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Eksplorasi Destinasi</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">Temukan keindahan alam, kekayaan budaya, dan cita rasa kuliner untuk petualangan Anda selanjutnya.</p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="h-5 w-5 absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari destinasi..."
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map(cat => {
            const isSelected = (selectedCategory === cat) || (selectedCategory === '' && cat === 'Semua');
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-6 py-3.5 rounded-2xl font-bold whitespace-nowrap transition-all ${
                  isSelected 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid Destinasi */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center py-20 text-red-600 font-medium bg-red-50 rounded-3xl">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {destinations.map(dest => (
            <div key={dest.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img 
                  src={dest.gambarUrl || 'https://via.placeholder.com/400x300?text=No+Image'} 
                  alt={dest.nama} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-blue-600 shadow-sm border border-white/20">
                  {dest.kategori}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{dest.lokasi}</span>
                </div>
                <h3 className="font-extrabold text-gray-900 text-xl mb-2 line-clamp-1">{dest.nama}</h3>
                <p className="text-green-600 font-black text-lg mb-6">
                  {formatCurrency(dest.estimasiBiaya)}
                </p>
                
                <div className="mt-auto">
                  <Link to={`/destinations/${dest.id}`} className="block w-full py-3 text-center bg-gray-50 text-gray-800 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-colors duration-300">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && destinations.length === 0 && (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="text-5xl mb-4 text-gray-300">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ditemukan</h3>
          <p className="text-gray-500">Destinasi tidak ditemukan. Coba gunakan kata kunci lain atau ubah filter kategori.</p>
        </div>
      )}
    </div>
  );
};

export default DestinationsPage;