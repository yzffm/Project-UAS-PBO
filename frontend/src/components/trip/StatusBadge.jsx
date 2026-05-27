import React from 'react';

const StatusBadge = ({ status }) => {
  // Mapping label dan warna berdasarkan status dinamis dari Backend
  const statusConfig = {
    DRAFT: {
      label: 'Draft',
      style: 'bg-gray-500/10 text-gray-600 border-gray-500/20 backdrop-blur-sm',
    },
    PLANNED: {
      label: 'Direncanakan',
      style: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 backdrop-blur-sm',
    },
    ONGOING: {
      label: 'Sedang Liburan',
      style: 'bg-blue-500/10 text-blue-700 border-blue-500/20 backdrop-blur-sm',
    },
    COMPLETED: {
      label: 'Selesai',
      style: 'bg-green-500/10 text-green-700 border-green-500/20 backdrop-blur-sm',
    },
    FINISHED: { // Fallback antisipasi
      label: 'Selesai',
      style: 'bg-green-500/10 text-green-700 border-green-500/20 backdrop-blur-sm',
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