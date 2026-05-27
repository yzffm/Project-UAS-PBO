import React, { useState } from 'react';
import ScheduleItem from './ScheduleItem';
import { Plus, Calendar, Trash2 } from 'lucide-react';
import itineraryService from '../../services/itineraryService';
import { useAuth } from '../../context/AuthContext';
import DestinationScheduleModal from './DestinationScheduleModal';

const DayCard = ({ day, tripId, onUpdate }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { token } = useAuth();

  const handleDeleteDay = async () => {
    if (window.confirm(`Hapus Hari ${day.urutanHari}?`)) {
      try {
        await itineraryService.deleteDay(tripId, day.id, token);
        onUpdate();
      } catch (err) {
        alert('Gagal menghapus hari');
      }
    }
  };

  const [editingSchedule, setEditingSchedule] = useState(null);

  const handleSaveSchedule = async (scheduleData, schedId) => {
    try {
      if (schedId) {
        await itineraryService.updateSchedule(tripId, day.id, schedId, scheduleData, token);
      } else {
        await itineraryService.addSchedule(tripId, day.id, scheduleData, token);
      }
      setShowAddModal(false);
      setEditingSchedule(null);
      onUpdate();
    } catch (err) {
      alert(err);
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    if (window.confirm('Hapus jadwal ini?')) {
      try {
        await itineraryService.deleteSchedule(tripId, day.id, scheduleId, token);
        onUpdate();
      } catch (err) {
        alert('Gagal menghapus jadwal');
      }
    }
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-6">
      <div className="bg-blue-50/50 backdrop-blur-sm px-6 py-4 border-b border-blue-100/50 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2.5 rounded-xl shadow-md shadow-blue-500/25">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Hari {day.urutanHari}</h3>
            {day.catatan && <p className="text-sm text-gray-500 font-medium">{day.catatan}</p>}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1 px-3 py-1.5 btn-secondary text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Tambah Destinasi</span>
          </button>
          <button
            onClick={handleDeleteDay}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50/80 rounded-lg transition-colors"
            title="Hapus Hari"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* FIX: Mengubah listJadwal menjadi jadwalList sesuai API response */}
        {day.jadwalList && day.jadwalList.length > 0 ? (
          <div className="relative border-l-2 border-dashed border-blue-200/60 ml-4 space-y-6">
            {day.jadwalList.map((item, index) => (
              <div key={item.id || index} className="relative pl-8">
                <div className="absolute -left-[11px] top-1.5 w-5 h-5 bg-blue-500 rounded-full border-4 border-white/80 backdrop-blur-sm shadow-sm"></div>
                <ScheduleItem
                  item={item}
                  onEdit={(sch) => { setEditingSchedule(sch); setShowAddModal(true); }}
                  onDelete={handleDeleteSchedule}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50/50 backdrop-blur-sm rounded-xl border border-dashed border-gray-200/80">
            <p className="text-gray-400 font-medium">Belum ada agenda untuk hari ini.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-3 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              + Susun Jadwal
            </button>
          </div>
        )}
      </div>

      {showAddModal && (
        <DestinationScheduleModal
          isOpen={showAddModal}
          itemToEdit={editingSchedule}
          onClose={() => { setShowAddModal(false); setEditingSchedule(null); }}
          onSave={handleSaveSchedule}
        />
      )}
    </div>
  );
};

export default DayCard;