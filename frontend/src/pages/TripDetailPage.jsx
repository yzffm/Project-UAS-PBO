import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CalendarDays, Banknote, BarChart3, MapPin, ArrowLeft, Trash2 } from 'lucide-react';
import { Edit3 } from 'lucide-react'; // Tambahkan Edit3 ke import lucide-react
import EditTripModal from '../components/trip/EditTripModal';

import DayCard from '../components/itinerary/DayCard';
import BudgetTable from '../components/budget/BudgetTable';
import BudgetSummaryChart from '../components/budget/BudgetSummaryChart';
import BudgetForm from '../components/budget/BudgetForm';

import tripService from '../services/tripService';
import itineraryService from '../services/itineraryService';
import budgetService from '../services/budgetService';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatDate';
import LoadingSpinner from '../components/common/LoadingSpinner';

const TripDetailPage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate(); // Untuk navigasi balik ke dashboard

  // Fungsi untuk mengeksekusi penghapusan
  const handleDeleteTrip = async () => {
    if (window.confirm('Hapus rencana perjalanan ini secara permanen? Semua jadwal dan anggaran di dalamnya akan ikut terhapus dan tidak bisa dikembalikan.')) {
      try {
        await tripService.deleteTrip(id, token);
        alert('Rencana perjalanan berhasil dihapus!');
        navigate('/dashboard');
      } catch (err) {
        alert('Gagal menghapus trip: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const [activeTab, setActiveTab] = useState('itinerary');
  const [tripData, setTripData] = useState(null);
  const [days, setDays] = useState([]);
  const [budgetItems, setBudgetItems] = useState([]);
  const [budgetSummary, setBudgetSummary] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [editingBudgetItem, setEditingBudgetItem] = useState(null);
  const [showEditTrip, setShowEditTrip] = useState(false);

  const fetchTripDetails = async () => {
    try {
      const trip = await tripService.getTripById(id, token);
      setTripData(trip);
    } catch (err) {
      setError(err);
    }
  };

  const fetchItinerary = async () => {
    try {
      const daysData = await itineraryService.getDays(id, token);
      setDays(daysData || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBudget = async () => {
    try {
      const items = await budgetService.getBudgetItems(id, token);
      setBudgetItems(items || []);
      const summary = await budgetService.getBudgetSummary(id, token);
      setBudgetSummary(summary);
    } catch (err) {
      console.error(err);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([fetchTripDetails(), fetchItinerary(), fetchBudget()]);
    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
  }, [id, token]);

  const handleAddDay = async () => {
    try {
      // FIX 1: Validasi batas maksimal hari di frontend
      if (days.length >= tripData.durasiHari) {
        alert(`Maksimal jadwal untuk trip ini adalah ${tripData.durasiHari} hari.`);
        return;
      }

      const nextUrutan = days.length > 0 ? Math.max(...days.map(d => d.urutanHari || d.hariKe || 0)) + 1 : 1;

      // Calculate the date based on trip start date + day offset
      const startDate = new Date(tripData.tanggalMulai);
      startDate.setDate(startDate.getDate() + nextUrutan - 1);
      const tanggalStr = startDate.toISOString().split('T')[0];

      await itineraryService.addDay(id, {
        tanggal: tanggalStr,
        urutanHari: nextUrutan,
        catatan: `Hari ke-${nextUrutan}`
      }, token);
      fetchItinerary();
    } catch (err) {
      alert(err.response?.data?.error || 'Gagal menambah hari');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;
  if (!tripData) return <div className="text-center mt-20">Trip tidak ditemukan</div>;


  return (
    <div className="app-bg min-h-screen pb-12 relative z-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white pt-6 pb-20 px-6 shadow-lg shadow-blue-500/20">
        <div className="max-w-5xl mx-auto">
          {/* BAGIAN YANG DIPERBAIKI: Penambahan Tombol Edit & Delete di sejajar tombol kembali */}
          <div className="flex justify-between items-center mb-6">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition group">
              <span className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                <ArrowLeft className="h-4 w-4" /> 
              </span>
              Kembali ke Dashboard
            </Link>

            <div className="flex gap-2">
              <button
                onClick={() => setShowEditTrip(true)}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition text-sm font-bold border border-white/20 backdrop-blur-md shadow-sm"
              >
                <Edit3 className="h-4 w-4" /> Edit Trip
              </button>
              <button
                onClick={handleDeleteTrip}
                className="inline-flex items-center gap-2 bg-red-500/20 hover:bg-red-500 text-red-50 hover:text-white px-4 py-2 rounded-xl transition text-sm font-bold border border-red-400/30 backdrop-blur-md shadow-sm"
              >
                <Trash2 className="h-4 w-4" /> Hapus Trip
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-2">
            <span className="bg-blue-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-wider border border-blue-400/30">
              {tripData.tipePerjalanan}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-wider backdrop-blur-sm">
              {tripData.status}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-2">{tripData.namaTrip}</h1>
          <p className="text-blue-100 mb-4 max-w-2xl">{tripData.deskripsiTrip}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-blue-100 font-medium">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-5 w-5" />
              {formatDate(tripData.tanggalMulai)} — {formatDate(tripData.tanggalSelesai)}
            </span>
          </div>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="max-w-5xl mx-auto px-6 -mt-10">
        {/* Navigasi Tab */}
        <div className="flex glass-card p-1 rounded-xl shadow-lg shadow-blue-900/5 mb-8">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${activeTab === 'itinerary' ? 'bg-blue-600/90 backdrop-blur-sm text-white shadow-md shadow-blue-500/25' : 'text-gray-500 hover:bg-white/50 hover:text-blue-600'
              }`}
          >
            <CalendarDays className="h-5 w-5" /> Itinerary
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${activeTab === 'budget' ? 'bg-blue-600/90 backdrop-blur-sm text-white shadow-md shadow-blue-500/25' : 'text-gray-500 hover:bg-white/50 hover:text-blue-600'
              }`}
          >
            <Banknote className="h-5 w-5" /> Budget Items
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${activeTab === 'summary' ? 'bg-blue-600/90 backdrop-blur-sm text-white shadow-md shadow-blue-500/25' : 'text-gray-500 hover:bg-white/50 hover:text-blue-600'
              }`}
          >
            <BarChart3 className="h-5 w-5" /> Budget Summary
          </button>
        </div>

        {/* Tab Content Rendering */}
        <div className="transition-all duration-300">
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center glass-card p-6 rounded-2xl">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Rencana Perjalanan</h2>
                  <p className="text-gray-500 text-sm mt-1">Susun jadwal harian Anda di sini.</p>
                </div>
                <button
                  onClick={handleAddDay}
                  disabled={days.length >= tripData.durasiHari}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition shadow-sm ${days.length >= tripData.durasiHari
                    ? 'bg-gray-100/50 text-gray-400 cursor-not-allowed border border-gray-200/50'
                    : 'bg-blue-50/80 text-blue-600 hover:bg-blue-100 border border-blue-100/50'
                    }`}
                  title={days.length >= tripData.durasiHari ? "Kuota hari sudah maksimal" : "Tambah jadwal hari"}
                >
                  + Tambah Hari
                </button>
              </div>

              {days.length === 0 ? (
                <div className="text-center py-12 glass-card rounded-2xl border-dashed border-2">
                  <p className="text-gray-500">Belum ada hari yang ditambahkan.</p>
                </div>
              ) : (
                days.map((day) => (
                  <DayCard
                    key={day.id}
                    day={day}
                    tripId={id}
                    onUpdate={fetchItinerary}
                  />
                ))
              )}
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center glass-card p-6 rounded-2xl">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Manajemen Anggaran</h2>
                  <p className="text-gray-500 text-sm mt-1">Catat semua pengeluaran selama perjalanan.</p>
                </div>
                <button
                  onClick={() => { setEditingBudgetItem(null); setShowBudgetForm(true); }}
                  className="bg-green-50/80 text-green-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-100/80 transition border border-green-200/50 shadow-sm"
                >
                  + Tambah Item
                </button>
              </div>

              <div className="glass-card rounded-2xl overflow-hidden">
                <BudgetTable
                  items={budgetItems}
                  onEdit={(item) => { setEditingBudgetItem(item); setShowBudgetForm(true); }}
                  onDelete={async (itemId) => {
                    if (window.confirm('Hapus item ini?')) {
                      await budgetService.deleteBudgetItem(id, itemId, token);
                      fetchBudget();
                    }
                  }}
                />
              </div>

              {showBudgetForm && (
                <BudgetForm
                  tripId={id}
                  itemToEdit={editingBudgetItem}
                  onClose={() => setShowBudgetForm(false)}
                  onSuccess={() => { setShowBudgetForm(false); fetchBudget(); }}
                />
              )}
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {budgetSummary ? (
                <BudgetSummaryChart summary={budgetSummary} />
              ) : (
                <div className="glass-card p-6 rounded-2xl flex items-center justify-center">
                  <p className="text-gray-500">Data summary belum tersedia</p>
                </div>
              )}

              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Status Anggaran</h3>
                {budgetSummary && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                      <span className="text-gray-600 font-medium">Estimasi</span>
                      <span className="font-bold">Rp {budgetSummary.totalEstimasi?.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                      <span className="text-gray-600 font-medium">Aktual (Total)</span>
                      <span className="font-bold">Rp {budgetSummary.totalAktual?.toLocaleString('id-ID')}</span>
                    </div>

                    {(tripData?.tipePerjalanan === 'Group Trip' || tripData?.tipePerjalanan === 'Family Trip') && (
                      <div className="flex justify-between items-center p-3 bg-blue-50/80 border border-blue-100/50 rounded-xl shadow-sm">
                        <span className="text-blue-800 font-bold">Total Bayar (Per Orang)</span>
                        <span className="font-extrabold text-blue-700">
                          Rp {Math.round((budgetSummary.totalAktual || 0) / (tripData?.tipePerjalanan === 'Family Trip' ? (tripData?.jumlahDewasa || 1) : (tripData?.jumlahPeserta || 1))).toLocaleString('id-ID')}
                        </span>
                      </div>
                    )}

                    <div className={`flex justify-between items-center p-4 rounded-xl font-bold backdrop-blur-sm border ${budgetSummary.statusBudget === 'OVER_BUDGET' ? 'bg-red-50/80 text-red-600 border-red-200/50' : 'bg-green-50/80 text-green-600 border-green-200/50'
                      }`}>
                      <span>Selisih</span>
                      <span>Rp {Math.abs(budgetSummary.selisih || 0).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="mt-4 p-4 border border-blue-100/50 bg-blue-50/80 backdrop-blur-sm rounded-xl text-blue-800 text-sm">
                      <p className="mb-1"><strong>Tipe Perjalanan:</strong> {tripData?.tipePerjalanan}.</p>
                      {(tripData?.tipePerjalanan === 'Group Trip' || tripData?.tipePerjalanan === 'Family Trip') && (
                        <p className="text-xs text-blue-600 mt-2 font-medium">
                          * Karena ini adalah perjalanan Grup/Keluarga, sistem otomatis menghitung <b>Total Bayar (Per Orang)</b> dengan membagi total pengeluaran aktual dengan jumlah {tripData?.tipePerjalanan === 'Family Trip' ? `Orang Dewasa (${tripData?.jumlahDewasa || 1} orang)` : `Peserta (${tripData?.jumlahPeserta || 1} orang)`}.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BAGIAN YANG DIPERBAIKI: Pemanggilan EditTripModal */}
      {showEditTrip && (
        <EditTripModal
          trip={tripData}
          token={token}
          onClose={() => setShowEditTrip(false)}
          onSuccess={() => { setShowEditTrip(false); fetchTripDetails(); }}
          onDelete={handleDeleteTrip}
        />
      )}
    </div>
  );
};

export default TripDetailPage;