import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Mail, 
  Phone, 
  Globe,
  Users
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Kolom 1: Branding */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600/20 p-2 rounded-xl border border-blue-500/30">
                <Compass className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                TravelPlanner
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Solusi cerdas untuk merencanakan perjalanan impian Anda dengan manajemen anggaran yang transparan dan jadwal yang terorganisir.
            </p>
          </div>
 
          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h3 className="text-xs font-bold text-gray-100 tracking-[0.2em] uppercase mb-6">
              Aplikasi
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/dashboard" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 bg-blue-500 rounded-full opacity-0 -ml-3 transition-all"></span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 bg-blue-500 rounded-full opacity-0 -ml-3 transition-all"></span>
                  Eksplorasi Destinasi
                </Link>
              </li>
              <li>
                <Link to="/trips/new" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 bg-blue-500 rounded-full opacity-0 -ml-3 transition-all"></span>
                  Buat Trip Baru
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 bg-blue-500 rounded-full opacity-0 -ml-3 transition-all"></span>
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>
 
          {/* Kolom 3: Kontak & Support */}
          <div>
            <h3 className="text-xs font-bold text-gray-100 tracking-[0.2em] uppercase mb-6">
              Bantuan
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-gray-400 group">
                <Link to="/group-info" className="flex items-center gap-3 w-full">
                  <div className="bg-white/5 p-2 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <Users className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="group-hover:text-gray-200 transition-colors">Our Teams</span>
                </Link>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400 group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <span className="group-hover:text-gray-200 transition-colors">travelplanner@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400 group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <span className="group-hover:text-gray-200 transition-colors">+62 812 3456 789</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400 group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Globe className="h-4 w-4 text-blue-400" />
                </div>
                <span className="group-hover:text-gray-200 transition-colors">Madiun, Jawa Timur</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Newsletter/Promo */}
          <div>
            <h3 className="text-xs font-bold text-gray-100 tracking-[0.2em] uppercase mb-6">
              Berlangganan Info
            </h3>
            <p className="text-sm text-gray-400 mb-4 font-light">Dapatkan update destinasi menarik setiap minggunya.</p>
            <div className="flex gap-2 relative">
              <input 
                type="email" 
                placeholder="Email anda" 
                className="w-full pl-4 pr-12 py-3 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-white/10 text-white placeholder-gray-500 transition-all"
              />
              <button className="absolute right-1 top-1 bottom-1 aspect-square flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Baris Bawah: Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-light">
            &copy; {currentYear} TravelPlanner - Tugas Besar Kelompok Pemrograman Berorientasi Objek.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;