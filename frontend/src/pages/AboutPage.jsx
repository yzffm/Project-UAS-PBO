import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Compass,
  Heart,
  Globe,
  Code2,
  Users,
  Map,
  CalendarDays,
  Wallet,
  Sparkles,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Target,
  Layers,
} from 'lucide-react';

const AboutPage = () => {
  const { isAuthenticated } = useAuth();

  const techStack = [
    { name: 'Spring Boot', version: '3.3.4', category: 'Backend Framework' },
    { name: 'React', version: '18.3.1', category: 'Frontend Library' },
    { name: 'PostgreSQL', version: '15.x', category: 'Database (Supabase)' },
    { name: 'Java', version: '21 LTS', category: 'Backend Language' },
    { name: 'Tailwind CSS', version: '3.4.10', category: 'Styling' },
    { name: 'Vite', version: '5.4.2', category: 'Build Tool' },
  ];

  const oopConcepts = [
    {
      icon: Layers,
      title: 'Inheritance',
      description: 'Tiga hierarki class utama — Destinasi, Perjalanan, dan AnggaranItem — masing-masing dengan subclass yang merepresentasikan variasi nyata dari dunia perjalanan.',
    },
    {
      icon: Target,
      title: 'Polymorphism',
      description: 'Setiap subclass mengimplementasikan perilaku uniknya sendiri. Satu pemanggilan method, hasil yang berbeda — sesuai tipe objek yang sesungguhnya.',
    },
    {
      icon: Code2,
      title: 'Encapsulation',
      description: 'Semua field bersifat private dengan setter bervalidasi. Data tetap terjaga integritasnya, terhindar dari manipulasi yang tidak diinginkan.',
    },
    {
      icon: Lightbulb,
      title: 'Design Patterns',
      description: 'Factory Pattern untuk penciptaan objek, Strategy Pattern untuk kalkulasi budget, dan Builder Pattern untuk konstruksi objek kompleks — semuanya bekerja dalam harmoni.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 pt-32 pb-24">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-white/70 text-sm tracking-wide">Our Story</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-8">
            Tentang <br />
            <span className="italic font-light bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">TravelPlanner</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
            Sebuah karya yang lahir dari semangat belajar, dikembangkan dengan prinsip-prinsip rekayasa perangkat lunak yang solid.
          </p>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <main className="relative z-20 bg-[#faf9f7]">

        {/* Chapter 1 — The Beginning */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl"></div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <Heart className="w-10 h-10 text-blue-300 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight mb-6">
                Bermula dari Sebuah Pertanyaan Sederhana
              </h2>
              <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-3xl mx-auto">
                "Bagaimana jika merencanakan perjalanan bisa semudah menulis cerita?"
              </p>
            </div>

            <div className="space-y-8 text-gray-600 text-lg leading-relaxed font-light max-w-3xl mx-auto">
              <p>
                TravelPlanner lahir sebagai proyek tugas akhir mata kuliah <strong className="font-medium text-gray-800">Pemrograman Berorientasi Objek (PBO)</strong> di Universitas Negeri Surabaya. Namun, sejak awal kami memutuskan bahwa ini bukan sekadar tugas — ini adalah kesempatan untuk membangun sesuatu yang benar-benar bermakna.
              </p>
              <p>
                Tujuh orang, satu visi: menciptakan platform perencanaan perjalanan yang tidak hanya fungsional, tetapi juga indah dan menyentuh. Kami ingin setiap pengguna merasakan bahwa merencanakan perjalanan itu sendiri sudah merupakan bagian dari petualangan.
              </p>
              <p>
                Dari sesi brainstorming di kelas hingga malam-malam coding yang panjang, setiap baris kode ditulis dengan tujuan yang jelas — mendemonstrasikan bahwa prinsip <em>Object-Oriented Programming</em> bukan sekadar teori di buku, melainkan fondasi nyata untuk membangun perangkat lunak modern yang berkualitas.
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 2 — What We Built */}
        <section className="py-24 px-6 bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <Globe className="w-10 h-10 text-indigo-300 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight mb-6">
                Lebih dari Sekadar Aplikasi
              </h2>
              <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
                Fitur-fitur yang kami rancang untuk menghadirkan pengalaman perencanaan perjalanan yang utuh.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="group p-8 rounded-3xl bg-gradient-to-b from-blue-50/80 to-white border border-blue-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                  <CalendarDays className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Itinerary Harian</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Susun jadwal perjalanan hari demi hari. Tambahkan destinasi wisata alam, budaya, atau kuliner ke dalam setiap hari — semuanya dalam antarmuka yang rapi dan intuitif.
                </p>
              </div>

              <div className="group p-8 rounded-3xl bg-gradient-to-b from-indigo-50/80 to-white border border-indigo-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="bg-indigo-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 transition-colors duration-300">
                  <Wallet className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Manajemen Anggaran</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Catat estimasi dan pengeluaran aktual untuk transportasi, akomodasi, konsumsi, dan lainnya. Sistem secara otomatis menyesuaikan kalkulasi berdasarkan jenis perjalanan Anda.
                </p>
              </div>

              <div className="group p-8 rounded-3xl bg-gradient-to-b from-emerald-50/80 to-white border border-emerald-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="bg-emerald-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
                  <Users className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Tiga Mode Perjalanan</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Solo trip untuk healing, group trip untuk petualangan bersama sahabat, atau family trip dengan perhitungan khusus yang mempertimbangkan kebutuhan keluarga.
                </p>
              </div>
            </div>

            {/* Architecture Illustration */}
            <div className="rounded-3xl bg-gray-900 p-8 md:p-12 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <span className="text-blue-400 font-medium tracking-widest uppercase text-xs">Arsitektur</span>
                <h3 className="text-2xl md:text-3xl font-serif mt-3 mb-6">Dibangun dengan Arsitektur MVC</h3>
                <p className="text-gray-400 font-light leading-relaxed max-w-2xl mb-10">
                  Pemisahan tanggung jawab yang jelas antara <strong className="text-gray-200">View</strong> (React), <strong className="text-gray-200">Controller</strong> (Spring Boot REST API), dan <strong className="text-gray-200">Model</strong> (JPA Entities) — memastikan kode yang bersih, terstruktur, dan mudah di-maintain.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                    <div className="text-blue-400 font-bold text-sm mb-2">VIEW</div>
                    <div className="text-white/80 text-sm font-light">React 18 + Tailwind CSS</div>
                    <div className="text-white/40 text-xs mt-1">Pages, Components, Services</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                    <div className="text-indigo-400 font-bold text-sm mb-2">CONTROLLER + SERVICE</div>
                    <div className="text-white/80 text-sm font-light">Spring Boot 3.3.4</div>
                    <div className="text-white/40 text-xs mt-1">REST API, Business Logic, Patterns</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                    <div className="text-emerald-400 font-bold text-sm mb-2">MODEL</div>
                    <div className="text-white/80 text-sm font-light">JPA + Supabase PostgreSQL 15</div>
                    <div className="text-white/40 text-xs mt-1">Entities, Repositories, Inheritance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 3 — OOP Principles */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 -left-64 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <Code2 className="w-10 h-10 text-purple-300 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight mb-6">
                Fondasi yang Kokoh
              </h2>
              <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
                Setiap baris kode dilandasi oleh prinsip-prinsip OOP dan SOLID yang kami pelajari di kelas, diterapkan dalam konteks nyata.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {oopConcepts.map((concept, index) => {
                const Icon = concept.icon;
                return (
                  <div
                    key={index}
                    className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-blue-200/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="flex items-start gap-5">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{concept.title}</h3>
                        <p className="text-gray-500 font-light leading-relaxed text-[15px]">{concept.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Chapter 4 — Tech Stack */}
        <section className="py-24 px-6 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Sparkles className="w-10 h-10 text-amber-300 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight mb-6">
                Teknologi Pilihan
              </h2>
              <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
                Dipilih dengan saksama untuk menghadirkan performa, keandalan, dan pengalaman pengembangan terbaik.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:border-blue-200/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white font-bold text-xs">{tech.name.substring(0, 2).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{tech.name} <span className="font-normal text-blue-600">{tech.version}</span></div>
                    <div className="text-gray-400 text-xs font-light">{tech.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter 5 — The Mission */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-blue-50/50"></div>

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <Map className="w-10 h-10 text-blue-300 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight mb-8">
                Filosofi Kami
              </h2>
            </div>

            <div className="space-y-8 text-gray-600 text-lg leading-relaxed font-light max-w-3xl mx-auto text-center">
              <p>
                Kami percaya bahwa <em className="text-gray-800 not-italic font-medium">kode yang baik adalah kode yang bercerita</em>. Sama seperti perjalanan, setiap class, setiap method, setiap pattern memiliki tujuannya masing-masing — membentuk narasi besar yang utuh dan koheren.
              </p>
              <p>
                TravelPlanner bukan hanya tentang merencanakan liburan. Ini adalah bukti bahwa prinsip-prinsip yang kami pelajari di bangku kuliah — <strong className="font-medium text-gray-800">SOLID, Clean Code, Design Patterns</strong> — memiliki kekuatan nyata untuk menciptakan perangkat lunak yang elegan, bisa diandalkan, dan siap berkembang.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 relative overflow-hidden bg-[#faf9f7]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-transparent"></div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <Compass className="w-10 h-10 text-blue-400 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight">
              Siap Memulai Perjalanan?
            </h2>
            <p className="text-gray-500 text-xl font-light mb-12">
              Jelajahi platform kami, atau kenali tim yang membangunnya.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={isAuthenticated ? '/dashboard' : '/register'}
                className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-gray-900 text-white font-medium text-base rounded-full hover:bg-black hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-900/20"
              >
                <span>{isAuthenticated ? 'Ke Dashboard' : 'Daftar Sekarang'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/group-info"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-gray-700 font-medium text-base rounded-full border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-md transition-all duration-300"
              >
                <Users className="w-5 h-5" />
                <span>Kenali Tim Kami</span>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AboutPage;
