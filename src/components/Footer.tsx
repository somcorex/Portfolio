interface FooterProps {
  setCurrentPage: (page: string) => void;
}

const Footer = ({ setCurrentPage }: FooterProps) => {
  const socials = [
    { name: 'Instagram', icon: '📸', url: 'https://instagram.com/somcorex' },
    { name: 'YouTube', icon: '▶️', url: 'https://youtube.com/@somcorex' },
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com/somcorex' },
    { name: 'X', icon: '𝕏', url: 'https://x.com/somcorex' },
    { name: 'Threads', icon: '🧵', url: 'https://threads.net/@somcorex' },
  ];

  return (
    <footer style={{
      background: 'linear-gradient(180deg, rgba(224,247,250,0.5) 0%, rgba(207,250,254,0.8) 100%)',
      borderTop: '1px solid rgba(14,165,233,0.15)',
      position: 'relative', zIndex: 1,
    }}>
      {/* Wave top */}
      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
          <path fill="rgba(14,165,233,0.06)" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 50 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: 'white' }}>S</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#0284c7' }}>Som Core X Studio</div>
                <div style={{ fontSize: 10, color: '#0ea5e9', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Premium Video Production</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.8 }}>
              A living cinematic river of creative video art. Where every frame tells a story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#0284c7', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Quick Links</h4>
            {[
              { label: 'Home', page: 'home' },
              { label: 'Portfolio', page: 'portfolio' },
              { label: 'Services', page: 'services' },
              { label: 'About Us', page: 'about' },
              { label: 'Contact', page: 'contact' },
            ].map(link => (
              <button key={link.page} onClick={() => setCurrentPage(link.page)} style={{ display: 'block', background: 'none', border: 'none', color: '#475569', fontSize: 14, fontWeight: 500, cursor: 'pointer', padding: '4px 0', textAlign: 'left', transition: 'color 0.2s ease' }}
                onMouseEnter={e => (e.target as HTMLButtonElement).style.color = '#0ea5e9'}
                onMouseLeave={e => (e.target as HTMLButtonElement).style.color = '#475569'}>
                → {link.label}
              </button>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#0284c7', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Services</h4>
            {['Cinematic Edits', 'Social Media Reels', 'Brand Films', 'Music Videos', 'Motion Graphics', 'Product Showcase'].map(s => (
              <div key={s} style={{ fontSize: 14, color: '#475569', padding: '4px 0' }}>→ {s}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#0284c7', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Connect</h4>
            <a href="mailto:somcorex@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0284c7', textDecoration: 'none', fontSize: 14, fontWeight: 500, marginBottom: 16 }}>
              ✉️ somcorex@gmail.com
            </a>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {socials.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="social-link"
                  title={s.name}
                  style={{ textDecoration: 'none', fontSize: 16 }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(14,165,233,0.12)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 13, color: '#94a3b8' }}>
            © 2024 Som Core X Studio. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #22d3ee)', animation: `float ${1.5 + i * 0.3}s ease-in-out infinite` }} />
            ))}
            <span style={{ fontSize: 13, color: '#94a3b8', marginLeft: 6 }}>Crafted with 💙 & Cinematic Passion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
