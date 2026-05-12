import React from 'react';
import ScheduleItem from './ScheduleItem';
import { PlusIcon, CalendarIcon } from '@heroicons/react/24/outline';

/**
 * Komponen DayCard
 * @param {number} dayNumber - Urutan hari (1, 2, dst)
 * @param {string} date - Tanggal spesifik (opsional)
 * @param {Array} schedules - Array berisi objek jadwal destinasi
 * @param {Function} onAddActivity - Fungsi untuk membuka modal tambah destinasi
 */
const DayCard = ({ dayNumber, date, schedules = [], onAddActivity }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8">
      {/* Header Hari */}
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Hari {dayNumber}</h3>
            {date && <p className="text-sm text-gray-500">{date}</p>}
          </div>
        </div>
        
        <button
          onClick={() => onAddActivity(dayNumber)}
          className="flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Tambah Destinasi</span>
        </button>
      </div>

      {/* Daftar Jadwal (Schedule Items) */}
      <div className="p-6">
        {schedules.length > 0 ? (
          <div className="relative border-l-2 border-dashed border-blue-200 ml-3 space-y-6">
            {schedules.map((item, index) => (
              <div key={item.id || index} className="relative pl-8">
                {/* Dot Indikator pada Garis Timeline */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-sm"></div>
                
                <ScheduleItem 
                  startTime={item.jamMulai}
                  endTime={item.jamSelesai}
                  destinationName={item.destinasi?.nama || 'Destinasi Tidak Diketahui'}
                  category={item.destinasi?.kategori}
                  note={item.catatan}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 italic text-sm">Belum ada agenda untuk hari ini.</p>
            <button 
              onClick={() => onAddActivity(dayNumber)}
              className="mt-2 text-xs text-blue-500 underline"
            >
              Klik untuk menyusun jadwal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayCard;