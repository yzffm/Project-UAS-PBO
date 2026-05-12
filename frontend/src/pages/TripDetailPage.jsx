import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  CalendarDaysIcon, 
  BanknotesIcon, 
  ChartBarIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';

// Import Komponen yang sudah kita buat sebelumnya
import DayCard from '../components/itinerary/DayCard';
import BudgetTable from '../components/budget/BudgetTable';
import BudgetSummaryChart from '../components/budget/BudgetSummaryChart';

const TripDetailPage = () => {
  const { id } = useParams(); // Mengambil ID Trip dari URL
  const [activeTab, setActiveTab] = useState('itinerary');
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock Data untuk simulasi sebelum API Backend siap (Anggota 4 & 5)
  useEffect(() => {
    // Simulasi Fetching Data
    const fetchData = async () => {
      setLoading(true);
      try {
        // Gantilah ini dengan call axios: const res = await getTripDetails(id);
        // setTripData(res.data);
        setTimeout(() => {
          setTripData({
            nama: "Liburan Musim Panas Bali",
            lokasi: "Bali, Indonesia",
            tanggal: "12 Mei - 15 Mei 2026",
            days: [
              { id: 1, urutanHari: 1, listJadwal: [] },
              { id: 2, urutanHari: 2, listJadwal: [] }
            ],
            budgetItems: [],
            budgetSummary: { "Transportasi": 0, "Akomodasi": 0, "Makan": 0 }
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Gagal mengambil data trip", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen font-medium">Loading Trip Details...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header Banner */}
      <div className="bg-blue-600 text-white pt-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold">{tripData?.nama}</h1>
          <div className="flex flex-wrap gap-4 mt-3 text-blue-100 italic">
            <span className="flex items-center gap-1">
              <MapPinIcon className="h-4 w-4" /> {tripData?.lokasi}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDaysIcon className="h-4 w-4" /> {tripData?.tanggal}
            </span>
          </div>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="max-w-5xl mx-auto px-6 -mt-10">
        {/* Navigasi Tab */}
        <div className="flex bg-white p-1 rounded-xl shadow-md mb-8 border border-gray-100">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'itinerary' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <CalendarDaysIcon className="h-5 w-5" /> Itinerary
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'budget' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <BanknotesIcon className="h-5 w-5" /> Budget
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'summary' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <ChartBarIcon className="h-5 w-5" /> Summary
          </button>
        </div>

        {/* Tab Content Rendering */}
        <div className="transition-all duration-300">
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Rencana Perjalanan</h2>
              </div>
              {tripData.days.map((day) => (
                <DayCard 
                  key={day.id} 
                  dayNumber={day.urutanHari} 
                  schedules={day.listJadwal} 
                  onAddActivity={(num) => console.log("Tambah jadwal hari ke-", num)}
                />
              ))}
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Manajemen Anggaran</h2>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
                  + Tambah Item
                </button>
              </div>
              <BudgetTable 
                items={tripData.budgetItems} 
                onDelete={(id) => console.log("Hapus", id)}
              />
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BudgetSummaryChart dataSummary={tripData.budgetSummary} />
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Tips Hemat</h3>
                <ul className="list-disc ml-5 space-y-2 text-gray-600 text-sm">
                  <li>Gunakan transportasi umum untuk menekan biaya harian.</li>
                  <li>Cari promo kuliner lokal di sekitar destinasi.</li>
                  <li>Pastikan budget akomodasi tidak melebihi 40% total anggaran.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetailPage;