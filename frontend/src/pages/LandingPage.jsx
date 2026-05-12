import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">TravelPlanner.ai</h1>
        <Link to="/login" className="text-gray-600 font-medium hover:text-blue-600 transition">Login</Link>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          v2.0 Is Now Live 🚀
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
          Rencanakan Perjalanan <br /> <span className="text-blue-600">Tanpa Ribet.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mb-10">
          Kelola itinerary, kolaborasi grup, dan pantau anggaran perjalanan dalam satu platform cerdas. Selesai dalam hitungan menit.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
            Mulai Gratis
          </Link>
          <button className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition">
            Lihat Demo
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;