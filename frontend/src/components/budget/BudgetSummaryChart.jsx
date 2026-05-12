import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registrasi komponen Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Komponen BudgetSummaryChart
 * @param {Object} dataSummary - Data ringkasan dari backend (format: { Kategori: Total })
 */
const BudgetSummaryChart = ({ dataSummary = {} }) => {
  
  // Menyiapkan label (Kategori) dan data (Total Biaya)
  const labels = Object.keys(dataSummary);
  const values = Object.values(dataSummary);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Pengeluaran',
        data: values,
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',  // Biru (Transportasi)
          'rgba(153, 102, 255, 0.7)', // Ungu (Akomodasi)
          'rgba(255, 159, 64, 0.7)',  // Oranye (Makan/Lainnya)
          'rgba(255, 99, 132, 0.7)',  // Merah
          'rgba(75, 192, 192, 0.7)',  // Hijau
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('id-ID', { 
                style: 'currency', 
                currency: 'IDR',
                maximumFractionDigits: 0 
              }).format(context.parsed);
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
        Proporsi Anggaran
      </h3>
      
      <div className="h-64 w-full">
        {values.length > 0 ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-100 rounded-lg">
            <p className="text-gray-400 text-sm">Data belum tersedia</p>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-2">
        {labels.map((label, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-500">{label}</span>
            <span className="font-semibold text-gray-700">
              {new Intl.NumberFormat('id-ID', { 
                style: 'currency', 
                currency: 'IDR',
                maximumFractionDigits: 0 
              }).format(values[index])}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetSummaryChart;