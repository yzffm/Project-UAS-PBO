import React, { useState } from 'react';
import ScheduleItem from './ScheduleItem';
import AddDestinationModal from './AddDestinationModal';
import { Plus, Calendar, Trash2 } from 'lucide-react';
import itineraryService from '../../services/itineraryService';
import { useAuth } from '../../context/AuthContext';

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

  const handleAddSchedule = async (scheduleData) => {
    try {
      await itineraryService.addSchedule(tripId, day.id, scheduleData, token);
      setShowAddModal(false);
      onUpdate();
    } catch (err) {
      alert('Gagal menambah jadwal');
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-sm">
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
            className="flex items-center space-x-1 px-3 py-1.5 bg-white text-sm font-bold text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg border border-blue-200 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Tambah Destinasi</span>
          </button>
          <button
            onClick={handleDeleteDay}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Hapus Hari"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {day.listJadwal && day.listJadwal.length > 0 ? (
          <div className="relative border-l-2 border-dashed border-blue-200 ml-4 space-y-6">
            {day.listJadwal.map((item, index) => (
              <div key={item.id || index} className="relative pl-8">
                <div className="absolute -left-[11px] top-1.5 w-5 h-5 bg-blue-500 rounded-full border-4 border-white shadow-sm"></div>
                <ScheduleItem 
                  item={item}
                  onDelete={handleDeleteSchedule}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">Belum ada agenda untuk hari ini.</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="mt-3 text-sm font-bold text-blue-600 hover:text-blue-800"
            >
              + Susun Jadwal
            </button>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddDestinationModal 
          isOpen={showAddModal} 
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddSchedule}
        />
      )}
    </div>
  );
};

export default DayCard;