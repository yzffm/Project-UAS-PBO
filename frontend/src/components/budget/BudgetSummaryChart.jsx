import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatCurrency } from '../../utils/formatCurrency';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetSummaryChart = ({ summary }) => {
  const perKategori = summary?.perKategori || {};

  const categories = Object.keys(perKategori);
  const labels = categories.map(cat => `${perKategori[cat].icon || ''} ${cat}`);
  const estimasiValues = categories.map(cat => perKategori[cat].estimasi || 0);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Estimasi',
        data: estimasiValues,
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',  // Transportasi (Blue)
          'rgba(153, 102, 255, 0.8)', // Akomodasi (Purple)
          'rgba(75, 192, 192, 0.8)',  // Konsumsi (Green)
          'rgba(255, 159, 64, 0.8)',  // Lainnya (Orange)
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 8,
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
            weight: 'bold'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += formatCurrency(context.parsed);
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col items-center">
      <h3 className="text-lg font-bold text-gray-900 mb-6 text-center w-full border-b border-white/40 pb-2">
        Proporsi Estimasi Anggaran
      </h3>

      <div className="h-64 w-full relative">
        {estimasiValues.some(v => v > 0) ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-gray-200/60 rounded-xl bg-gray-50/50 backdrop-blur-sm">
            <p className="text-gray-400 font-medium">Belum ada data anggaran</p>
          </div>
        )}
      </div>

      <div className="mt-8 w-full space-y-3">
        {categories.map((cat, index) => (
          <div key={index} className="flex justify-between text-sm items-center p-2 rounded-lg hover:bg-white/40 transition-colors backdrop-blur-sm">
            <span className="text-gray-600 font-bold flex items-center gap-2">
              <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: chartData.datasets[0].borderColor[index] }}></span>
              {labels[index]}
            </span>
            <div className="text-right">
              <p className="font-bold text-gray-900">{formatCurrency(perKategori[cat].estimasi)}</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Aktual: <span className="text-gray-500">{formatCurrency(perKategori[cat].aktual)}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetSummaryChart;