import React from 'react';

const StatusBadge = ({ status }) => {
  // Mapping label dan warna berdasarkan status dinamis dari Backend
  const statusConfig = {
    DRAFT: {
      label: 'Draft',
      style: 'bg-gray-100 text-gray-500 border-gray-200',
    },
    PLANNED: {
      label: 'Direncanakan',
      style: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    },
    ONGOING: {
      label: 'Sedang Liburan',
      style: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    COMPLETED: {
      label: 'Selesai',
      style: 'bg-green-50 text-green-700 border-green-100', // Warna Hijau untuk trip Selesai
    },
    FINISHED: { // Fallback antisipasi
      label: 'Selesai',
      style: 'bg-green-50 text-green-700 border-green-100',
    },
  };

  // Gunakan fallback ke DRAFT jika status tidak dikenali
  const config = statusConfig[status] || statusConfig.DRAFT;

  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm ${config.style}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;