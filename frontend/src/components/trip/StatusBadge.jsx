import React from 'react';

const StatusBadge = ({ status }) => {
  // Mapping warna berdasarkan status dari Backend
  const statusConfig = {
    PLANNED: {
      label: 'Direncanakan',
      style: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    },
    ONGOING: {
      label: 'Berlangsung',
      style: 'bg-green-50 text-green-700 border-green-100',
    },
    FINISHED: {
      label: 'Selesai',
      style: 'bg-gray-100 text-gray-600 border-gray-200',
    },
  };

  // Fallback jika status tidak dikenal
  const config = statusConfig[status] || { label: status, style: 'bg-gray-50 text-gray-500 border-gray-100' };

  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${config.style}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;