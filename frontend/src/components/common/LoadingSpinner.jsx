import React from 'react';

/**
 * Komponen LoadingSpinner
 * @param {string} size - Ukuran spinner (sm, md, lg)
 * @param {string} text - Teks opsional di bawah spinner
 * @param {boolean} fullPage - Jika true, akan memenuhi layar (overlay)
 */
const LoadingSpinner = ({ size = 'md', text = 'Memuat data...', fullPage = false }) => {
  
  // Penentuan ukuran berdasarkan props
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-16 w-16 border-4'
  };

  const containerClasses = fullPage 
    ? "fixed inset-0 z-[99] flex flex-col items-center justify-center bg-gray-900/40 backdrop-blur-md"
    : "flex flex-col items-center justify-center p-8 w-full";

  return (
    <div className={containerClasses}>
      {fullPage && <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"></div>}
      <div className={`relative ${fullPage ? 'glass-card p-10 rounded-3xl flex flex-col items-center' : ''}`}>
      <div className="relative">
        {/* Ring Latar Belakang */}
        <div className={`${sizeClasses[size]} border-gray-100 rounded-full`}></div>
        
        {/* Spinner Utama (Animated) */}
        <div className={`absolute top-0 left-0 ${sizeClasses[size]} border-blue-600 border-t-transparent rounded-full animate-spin`}></div>
      </div>
      
      {text && (
        <p className="mt-4 text-sm font-medium text-gray-500 animate-pulse">
          {text}
        </p>
      )}
      </div>
    </div>
  );
};

export default LoadingSpinner;