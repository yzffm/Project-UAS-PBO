/**
 * Mengubah angka menjadi format Rupiah
 * @param {number} amount - Angka yang akan diformat
 * @returns {string} - Hasil format Rp
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return 'Rp0';
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};