import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TripCard from '../components/trip/TripCard';
import tripService from '../services/tripService';
import budgetService from '../services/budgetService'; // FIX 1: Tambahkan import budgetService
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DashboardPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        // 1. Ambil data list trip dasar
        const data = await tripService.getAllTrips(token);
        const tripsArray = Array.isArray(data) ? data : data ? [data] : [];

        // 2. FIX 2: Loop semua trip untuk mengambil summary budgetnya masing-masing
        const tripsWithBudget = await Promise.all(tripsArray.map(async (trip) => {
          try {
            // Panggil API summary untuk trip ini
            const summary = await budgetService.getBudgetSummary(trip.id, token);
            return {
              ...trip,
              // Sisipkan totalEstimasi (atau totalAktual) ke dalam object trip
              totalAnggaran: summary.totalEstimasi || 0
            };
          } catch (err) {
            // Kalau misal belum ada budget, set 0
            return { ...trip, totalAnggaran: 0 };
          }
        }));

        // 3. Simpan data yang sudah digabung dengan budget ke state
        setTrips(tripsWithBudget);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [token]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Saya</h1>
          <p className="text-gray-500">Halo {user?.nama}, Anda memiliki {trips.length} rencana perjalanan.</p>
        </div>
        <Link to="/trips/new" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-md">
          <span>+</span> Rencana Baru
        </Link>
      </header>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">
          {error}
        </div>
      )}

      {trips.length === 0 && !error ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="text-5xl mb-4">✈️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada trip</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">Mulai rencanakan petualangan pertama Anda dengan membuat rencana perjalanan baru.</p>
          <Link to="/trips/new" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
            Buat Trip Sekarang
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
          {/* Card Kosong untuk pemicu buat baru */}
          <Link to="/trips/new" className="border-2 border-dashed border-gray-300 bg-white rounded-2xl flex flex-col items-center justify-center p-10 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition hover:shadow-md">
            <span className="text-4xl mb-2">+</span>
            <p className="font-medium">Tambah Trip Lainnya</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;