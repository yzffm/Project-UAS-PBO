import { Link } from 'react-router-dom';
import { Map, Users, Wallet, Compass, Star, ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const HERO_VIDEO_URL = 'https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect: video moves slower than scroll
  const parallaxOffset = scrollY * 0.4;
  // Fade out hero content as user scrolls
  const heroOpacity = Math.max(0, 1 - scrollY / 500);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* ===== HERO SECTION — Full Screen Video ===== */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* Background Video */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Transparent Navbar */}
        <nav
          className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center p-6 md:px-12 lg:px-20"
          style={{ opacity: heroOpacity }}
        >
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg border border-white/10">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              TravelPlanner<span className="text-blue-300">.ai</span>
            </h1>
          </div>
          <Link
            to="/login"
            className="text-white/80 font-semibold hover:text-white transition border border-white/20 px-5 py-2 rounded-full backdrop-blur-sm hover:bg-white/10"
          >
            Login
          </Link>
        </nav>

        {/* Hero Content */}
        <div
          className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6"
          style={{ opacity: heroOpacity }}
        >
          <p className="text-white/70 text-sm md:text-base tracking-[0.3em] uppercase font-medium mb-6 animate-pulse">
            Mulai petualanganmu
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 max-w-4xl">
            Setiap Perjalanan{' '}
            <br className="hidden sm:block" />
            Dimulai dari{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
              Satu Langkah.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-12 leading-relaxed font-light">
            Wujudkan rencana perjalanan impianmu, susun itinerary hingga mengatur anggaran, semuanya dalam satu tempat.
          </p>

          <Link
            to="/group-info"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold text-lg rounded-full overflow-hidden border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            <span className="relative z-10">Mulai Sekarang</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/50" />
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">Fitur Unggulan</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Semua yang kamu butuhkan, dalam satu platform.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-gray-50 rounded-3xl p-8 hover:bg-blue-50 hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-100 group">
            <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-blue-600 transition-colors">
              <Map className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Itinerary Cerdas</h3>
            <p className="text-gray-600 leading-relaxed">
              Susun jadwal harian dengan mudah. Tambahkan destinasi favorit dan urutkan sesuai rencana perjalanan Anda.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-50 rounded-3xl p-8 hover:bg-indigo-50 hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-indigo-100 group">
            <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-indigo-600 transition-colors">
              <Users className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Tipe Trip Fleksibel</h3>
            <p className="text-gray-600 leading-relaxed">
              Dukungan penuh untuk Solo Trip, Group Trip, atau Family Trip dengan pembagian biaya per orang yang disesuaikan secara otomatis.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-50 rounded-3xl p-8 hover:bg-blue-50 hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-100 group">
            <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-blue-600 transition-colors">
              <Wallet className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Pantau Anggaran</h3>
            <p className="text-gray-600 leading-relaxed">
              Catat estimasi pengeluaran dan biaya aktual. Dapatkan ringkasan visual untuk menjaga keuangan tetap on-track.
            </p>
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-32 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
          </div>
          <p className="text-gray-600 font-medium">Dipercaya oleh para mahasiswa untuk menyusun rencana perjalanan liburan akhir semester.</p>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;