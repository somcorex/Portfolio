import { useState, useEffect } from 'react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navbar = ({ currentPage, setCurrentPage }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar" style={{
      background: scrolled ? 'rgba(240,249,255,0.95)' : 'rgba(240,249,255,0.7)',
      boxShadow: scrolled ? '0 4px 30px rgba(14,165,233,0.1)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        {/* Logo */}
        <button
          onClick={() => setCurrentPage('home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <div style={{
            width: 42, height: 42,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 900, color: 'white',
            boxShadow: '0 4px 15px rgba(14,165,233,0.4)',
          }}>S</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0284c7', lineHeight: 1.1 }}>Som Core X</div>
            <div style={{ fontSize: 10, fontWeight: 500, color: '#0ea5e9', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Studio</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setCurrentPage(link.id)}
              style={{
                background: currentPage === link.id ? 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(6,182,212,0.15))' : 'transparent',
                border: currentPage === link.id ? '1px solid rgba(14,165,233,0.3)' : '1px solid transparent',
                color: currentPage === link.id ? '#0ea5e9' : '#0c4a6e',
                padding: '8px 18px',
                borderRadius: 50,
                fontSize: 14,
                fontWeight: currentPage === link.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                if (currentPage !== link.id) {
                  (e.target as HTMLButtonElement).style.background = 'rgba(14,165,233,0.08)';
                  (e.target as HTMLButtonElement).style.color = '#0ea5e9';
                }
              }}
              onMouseLeave={e => {
                if (currentPage !== link.id) {
                  (e.target as HTMLButtonElement).style.background = 'transparent';
                  (e.target as HTMLButtonElement).style.color = '#0c4a6e';
                }
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage('admin')}
            className="btn-primary"
            style={{ fontSize: 13, padding: '8px 18px', marginLeft: 8 }}
          >
            ⚡ Admin
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', flexDirection: 'column', gap: 5, padding: 8 }}
          className="mobile-menu-btn"
        >
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 24, height: 2,
              background: '#0ea5e9', borderRadius: 2,
              transform: menuOpen && i === 0 ? 'rotate(45deg) translate(5px,5px)' :
                        menuOpen && i === 1 ? 'scaleX(0)' :
                        menuOpen && i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(240,249,255,0.98)',
          borderTop: '1px solid rgba(14,165,233,0.15)',
          padding: '16px 24px 24px',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => { setCurrentPage(link.id); setMenuOpen(false); }}
              style={{
                background: currentPage === link.id ? 'rgba(14,165,233,0.1)' : 'transparent',
                border: 'none',
                color: currentPage === link.id ? '#0ea5e9' : '#0c4a6e',
                padding: '12px 16px',
                borderRadius: 10,
                fontSize: 15, fontWeight: 600,
                cursor: 'pointer', textAlign: 'left',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { setCurrentPage('admin'); setMenuOpen(false); }}
            className="btn-primary"
            style={{ marginTop: 8 }}
          >
            ⚡ Admin Panel
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
