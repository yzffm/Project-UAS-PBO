import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-accent-900 flex items-center justify-center">
      <div className="text-center px-6">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-500/20 backdrop-blur-sm border border-primary-400/30">
          <span className="text-4xl">✈️</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
          Travel <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Planner</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-200/80 max-w-2xl mx-auto mb-8 leading-relaxed">
          Rencanakan perjalanan impianmu dengan mudah. Kelola itinerari, destinasi, dan anggaran dalam satu platform.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-500/25">
            Mulai Sekarang
          </button>
          <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20">
            Pelajari Lebih
          </button>
        </div>
        <div className="mt-12 flex items-center justify-center gap-8 text-primary-300/60 text-sm">
          <div className="flex items-center gap-2">
            <span>🗺️</span>
            <span>Itinerari Cerdas</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💰</span>
            <span>Manajemen Budget</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🏔️</span>
            <span>15+ Destinasi</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default App
