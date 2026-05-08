import { useState, useEffect, useCallback } from 'react';
import { VideoProvider } from './context/VideoContext'; // <-- Imported the Video Provider
import WaterCanvas from './components/WaterCanvas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('Initializing river...');

  useEffect(() => {
    const phases = [
      { text: 'Initializing river...', at: 0 },
      { text: 'Loading cinematic flow...', at: 35 },
      { text: 'Preparing video stream...', at: 65 },
      { text: 'Launching Som Core X...', at: 85 },
    ];

    const timer = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + 2, 100);
        const ph = phases.filter(ph2 => ph2.at <= next).pop();
        if (ph) setPhase(ph.text);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onDone, 400);
        }
        return next;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'linear-gradient(180deg, #f0f9ff 0%, #e0f7fa 50%, #cffafe 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 32,
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0ea5e9, #06b6d4, #22d3ee)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 44, margin: '0 auto 20px',
          boxShadow: '0 0 40px rgba(14,165,233,0.4), 0 0 80px rgba(6,182,212,0.2)',
          animation: 'glowPulse 2s ease-in-out infinite',
        }}>🌊</div>
        <div style={{ fontSize: 28, fontWeight: 900, background: 'linear-gradient(135deg, #0284c7, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.02em' }}>
          Som Core X Studio
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 6 }}>
          Premium Cinematic Experience
        </div>
      </div>

      <div style={{ width: 280 }}>
        <div style={{ height: 4, background: 'rgba(14,165,233,0.15)', borderRadius: 2, overflow: 'hidden', marginBottom: 12 }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: 'linear-gradient(90deg, #0ea5e9, #06b6d4, #22d3ee)',
            borderRadius: 2, transition: 'width 0.1s ease',
            boxShadow: '0 0 10px rgba(14,165,233,0.5)',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>{phase}</span>
          <span style={{ fontSize: 12, color: '#0ea5e9', fontWeight: 700 }}>{progress}%</span>
        </div>
      </div>

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {Array.from({ length: 12 }).map((_, idx) => (
          <div key={idx} style={{
            position: 'absolute', bottom: '-10px',
            left: `${(idx / 12) * 100 + Math.random() * 8}%`,
            width: 6 + Math.random() * 8, height: 6 + Math.random() * 8,
            borderRadius: '50%',
            background: ['#0ea5e9', '#06b6d4', '#22d3ee', '#7dd3fc'][idx % 4],
            opacity: 0.5, animation: `particle ${3 + idx * 0.3}s ease-in-out ${idx * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(true);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const navigate = useCallback((page: string) => setCurrentPage(page), []);
  const isAdminPage = currentPage === 'admin';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleDoneLoading = useCallback(() => setLoading(false), []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={navigate} />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        if (!adminLoggedIn) return <AdminLogin onLogin={() => setAdminLoggedIn(true)} />;
        return <AdminDashboard onLogout={() => { setAdminLoggedIn(false); navigate('home'); }} />;
      default:
        return <HomePage setCurrentPage={navigate} />;
    }
  };

  return (
    // Wrapped the entire application in the VideoProvider!
    <VideoProvider> 
      {loading && <LoadingScreen onDone={handleDoneLoading} />}
      <WaterCanvas />
      <div style={{ position: 'relative', minHeight: '100vh', opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Navbar currentPage={currentPage} setCurrentPage={navigate} />
        <main>{renderPage()}</main>
        {!isAdminPage && <Footer setCurrentPage={navigate} />}
        {!isAdminPage && <AIAssistant />}
      </div>
    </VideoProvider>
  );
}

export default App;


