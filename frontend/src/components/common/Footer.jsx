import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Kolom 1: Branding */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <MapIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                TripPlan.io
              </span>
            </Link>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              Solusi cerdas untuk merencanakan perjalanan impian Anda dengan manajemen anggaran yang transparan dan jadwal yang terorganisir.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Aplikasi
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/dashboard" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Eksplorasi Destinasi</Link>
              </li>
              <li>
                <Link to="/create-trip" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Buat Trip Baru</Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak & Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Bantuan
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <EnvelopeIcon className="h-4 w-4 text-blue-500" />
                support@tripplan.io
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <PhoneIcon className="h-4 w-4 text-blue-500" />
                +62 812 3456 789
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <GlobeAltIcon className="h-4 w-4 text-blue-500" />
                Madiun, Jawa Timur
              </li>
            </ul>
          </div>

          {/* Kolom 4: Newsletter/Promo */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Berlangganan Info
            </h3>
            <p className="text-xs text-gray-500 mb-4">Dapatkan update destinasi menarik setiap minggunya.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email anda" 
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <EnvelopeIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Baris Bawah: Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {currentYear} TripPlan.io - Tugas Besar Kelompok Pemrograman Berorientasi Objek.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-blue-600 text-xs">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-blue-600 text-xs">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;