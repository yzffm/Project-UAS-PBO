import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import TripCard from '../components/trip/TripCard';

const DashboardPage = () => {
  const [trips, setTrips] = useState([
    { id: 1, nama: "Explorasi Bali", tipe: "SOLO", tanggal: "15 Mei 2026", totalAnggaran: 4500000 },
    { id: 2, nama: "Jalan-jalan Jogja", tipe: "GRUP", tanggal: "10 Juni 2026", totalAnggaran: 12000000 }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Saya</h1>
            <p className="text-gray-500">Anda memiliki {trips.length} rencana perjalanan aktif.</p>
          </div>
          <Link to="/create-trip" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2">
            <span>+</span> Rencana Baru
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
          {/* Card Kosong untuk pemicu buat baru */}
          <Link to="/create-trip" className="border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-10 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition">
            <span className="text-4xl mb-2">+</span>
            <p className="font-medium">Tambah Trip Lainnya</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;