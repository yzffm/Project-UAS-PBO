import { Link } from 'react-router-dom';
import { Map, Users, Wallet, Compass, Star, ArrowRight, ChevronDown, Heart, Globe, Sparkles, CalendarDays, Utensils } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const HERO_VIDEO_URL = 'https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero content fades out as user scrolls
  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  // Video overlay darkens progressively — starts at 0.4, reaches 1.0 (full black) by 800px scroll
  const overlayDarkness = Math.min(1, 0.4 + (scrollY / 800) * 0.6);

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">

      {/* ===== HERO SECTION — Full Screen Video ===== */}
      <section className="relative h-[110vh] w-full overflow-hidden">
        {/* Background Video — no parallax transform to prevent stutter */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover scale-110 pointer-events-none"
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
        </div>

        {/* Dynamic Dark Overlay — darkens as user scrolls to blend into content below */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-none"
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayDarkness})` }}
        ></div>
        {/* Bottom gradient blending video into page background color */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#faf9f7] z-10 pointer-events-none"></div>

        {/* Transparent Navbar */}
        <nav
          className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center p-6 md:px-12 lg:px-20 transition-opacity duration-500"
          style={{ opacity: heroOpacity }}
        >
          <div className="flex items-center gap-2">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              TravelPlanner
            </h1>
          </div>
          <Link
            to="/login"
            className="text-white font-medium hover:text-blue-100 transition border border-white/30 px-6 py-2.5 rounded-full backdrop-blur-sm hover:bg-white/10 text-sm tracking-wide"
          >
            Masuk
          </Link>
        </nav>

        {/* Hero Content */}
        <div
          className="relative z-20 flex flex-col items-center justify-center h-[90vh] text-center px-6"
          style={{ opacity: heroOpacity }}
        >
          <p className="text-white/80 text-sm md:text-sm tracking-[0.4em] uppercase font-medium mb-6">
            Rencanakan. Jelajahi. Kenang.
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.1] mb-8 max-w-5xl font-serif">
            Satu Rencana.<br />
            <span className="italic font-light text-white/90">Seribu Kenangan.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-12 leading-relaxed font-light">
            Dari puncak gunung hingga lorong budaya, dari cita rasa lokal hingga momen bersama <br />semua dimulai dari satu rencana yang terorganisir.
          </p>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="text-white/60 text-xs tracking-widest uppercase">Mulai Cerita</span>
            <ChevronDown className="w-5 h-5 text-white/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ===== NARRATIVE SECTION ===== */}
      <main className="relative z-20 bg-[#faf9f7] -mt-20 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        
        {/* Story Chapter 1 — Philosophy */}
        <section className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden">
          <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Globe className="w-12 h-12 text-blue-300 mx-auto mb-8 opacity-80" />
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight mb-8">
              Setiap perjalanan layak <br className="hidden md:block"/> direncanakan dengan sempurna.
            </h2>
            <p className="text-lg md:text-2xl text-gray-500 font-light leading-relaxed max-w-3xl mx-auto">
              TravelPlanner hadir untuk menyatukan seluruh aspek perjalanan Anda, mulai dari menyusun destinasi wisata, mengatur jadwal harian, hingga mengelola anggaran  dalam satu platform.
            </p>
          </div>
        </section>

        {/* Narrative Features */}
        <section className="py-24 px-6 bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto">

            {/* Feature 1 — Itinerary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
              <div className="order-2 lg:order-1 space-y-6">
                <span className="text-blue-600 font-medium tracking-widest uppercase text-sm">Itinerary Harian</span>
                <h3 className="text-3xl md:text-4xl font-serif text-gray-900 leading-tight">Susun jadwal perjalanan Anda, hari demi hari.</h3>
                <p className="text-gray-500 text-lg leading-relaxed font-light">
                  Tambahkan destinasi ke setiap hari perjalanan, atur waktu kunjungan, dan lihat seluruh jadwal Anda tersaji dengan rapi. Dari wisata alam, wisata budaya, hingga wisata kuliner. Semua bisa dipadukan dalam satu itinerary.
                </p>
              </div>
              <div className="order-1 lg:order-2 rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100 relative group">
                <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Perencanaan perjalanan" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
              </div>
            </div>

            {/* Feature 2 — Budget */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100 relative group">
                <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Perjalanan bersama" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
              </div>
              <div className="space-y-6">
                <span className="text-indigo-600 font-medium tracking-widest uppercase text-sm">Manajemen Anggaran</span>
                <h3 className="text-3xl md:text-4xl font-serif text-gray-900 leading-tight">Kelola budget secara transparan, tanpa khawatir.</h3>
                <p className="text-gray-500 text-lg leading-relaxed font-light">
                  Catat estimasi dan pengeluaran aktual untuk transportasi, akomodasi, konsumsi, dan lainnya. Trip solo, grup, atau keluarga. Anggaran dihitung sesuai kebutuhan masing-masing jenis perjalanan.
                </p>
              </div>
            </div>

            {/* Feature 3 — Trip Types */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-6">
                <span className="text-emerald-600 font-medium tracking-widest uppercase text-sm">Berbagai Jenis Perjalanan</span>
                <h3 className="text-3xl md:text-4xl font-serif text-gray-900 leading-tight">Solo, grup, atau keluarga. Kami mengerti kebutuhan Anda.</h3>
                <p className="text-gray-500 text-lg leading-relaxed font-light">
                  Setiap tipe perjalanan memiliki keunikannya masing-masing. Trip solo untuk momen healing pribadi, trip grup untuk petualangan bersama sahabat, atau trip keluarga dengan perhitungan khusus.
                </p>
              </div>
              <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100 relative group">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Pantai keluarga" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
              </div>
            </div>

          </div>
        </section>

        {/* Call to Action */}
        <section className="py-40 px-6 relative overflow-hidden bg-[#faf9f7]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-blue-50/50"></div>
          
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <Sparkles className="w-10 h-10 text-blue-400 mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-serif text-gray-900 mb-8 leading-tight">
              Mulai Rencanakan <br/> Perjalanan Impianmu.
            </h2>
            <p className="text-gray-500 text-xl font-light mb-12">
              Kenali cerita di balik platform ini, atau langsung mulai petualangan barumu.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center gap-4 px-12 py-5 bg-gray-900 text-white font-medium text-lg rounded-full overflow-hidden hover:bg-black hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-900/20"
              >
                <span>Mulai Sekarang</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-gray-700 font-medium text-lg rounded-full border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-md transition-all duration-300"
              >
                <Compass className="w-5 h-5" />
                <span>Jelajahi</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;