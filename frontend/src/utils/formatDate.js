/**
 * Mengubah string tanggal menjadi format tanggal Indonesia
 * @param {string} dateString - Contoh: "2026-05-12"
 * @returns {string} - Contoh: "12 Mei 2026"
 */
export const formatDate = (dateString) => {
  if (!dateString) return '-';

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  
  return date.toLocaleDateString('id-ID', options);
};