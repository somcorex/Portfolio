import { useState, useEffect } from 'react';
import { 
  Play, MessageSquare, Clapperboard, Star, Award, Handshake, 
  Film, Smartphone, Building2, Music, Camera, Sparkles, 
  Instagram, Youtube, Facebook, Mail, Waves
} from 'lucide-react';
import { useVideos } from '../context/VideoContext'; // <-- Using global state!
import RiverVideoFlow from '../components/RiverVideoFlow';
import VideoPlayer from '../components/VideoPlayer';
import { Video } from '../data/videos';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

// Custom real icons for X (Twitter) and Threads
const XIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

const ThreadsIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.126 13.916c-.463.367-1.124.582-1.897.582-1.528 0-2.585-.898-2.585-2.222 0-1.393 1.144-2.179 2.766-2.179.622 0 1.258.118 1.688.307.039.638.07 1.472.07 2.128 0 .425-.015.937-.042 1.384zm.882-3.414c-.454-.22-1.125-.361-1.921-.361-2.235 0-4.08 1.187-4.08 3.515 0 2.108 1.472 3.422 3.461 3.422 1.124 0 2.052-.377 2.641-.881v.794c0 1.376-.841 2.21-2.28 2.21-1.132 0-2.06-.416-2.571-1.07l-1.085 1.164c.731.905 1.942 1.416 3.656 1.416 2.375 0 3.822-1.369 3.822-3.807v-4.137c0-.983-.031-1.872-.086-2.611a4.297 4.297 0 0 0-3.32-1.424c-1.819 0-3.328.983-3.665 2.508l1.415.424c.22-.92.991-1.502 2.147-1.502 1.187 0 2.005.59 2.005 1.636v.614c-.062 0-.132-.008-.196-.008z"/>
  </svg>
);

const WaveDivider = ({ flip = false, color = 'rgba(14,165,233,0.08)' }) => (
  <div style={{ lineHeight: 0, transform: flip ? 'scaleY(-1)' : 'none', margin: '-1px 0' }}>
    <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
      <path fill={color} d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
      <path fill={color.replace('0.08', '0.05')} d="M0,55 C360,20 720,70 1080,35 C1260,18 1380,50 1440,55 L1440,80 L0,80 Z" />
    </svg>
  </div>
);

const StatCard = ({ number, label, icon: Icon }: { number: string; label: string; icon: React.ElementType }) => (
  <div className="glass" style={{ padding: '24px 32px', textAlign: 'center', borderRadius: 20, flex: 1, minWidth: 140 }}>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, color: '#0ea5e9' }}>
      <Icon size={36} strokeWidth={1.5} />
    </div>
    <div style={{ fontSize: 36, fontWeight: 900, background: 'linear-gradient(135deg, #0284c7, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      {number}
    </div>
    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500, marginTop: 4 }}>{label}</div>
  </div>
);

const ServiceCard = ({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(14,165,233,0.08)' : 'rgba(255,255,255,0.5)',
        border: `1.5px solid ${hovered ? 'rgba(14,165,233,0.35)' : 'rgba(255,255,255,0.7)'}`,
        borderRadius: 20, padding: '32px 28px',
        backdropFilter: 'blur(16px)',
        transition: 'all 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 50px rgba(14,165,233,0.2)' : '0 4px 20px rgba(14,165,233,0.06)',
        cursor: 'default',
      }}
    >
      <div style={{ marginBottom: 20, color: '#0ea5e9' }}>
        <Icon size={44} strokeWidth={1.5} />
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#0284c7', marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.7 }}>{desc}</div>
    </div>
  );
};

const HomePage = ({ setCurrentPage }: HomePageProps) => {
  const { videos } = useVideos(); // <-- Using global state!
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallax = (speed: number) => `translateY(${scrollY * speed}px)`;

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* =========== HERO =========== */}
      <section className="hero-section" style={{ paddingTop: 68, minHeight: '90vh' }}>
        <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)',
          top: '10%', left: '-15%',
          transform: parallax(0.2),
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
          bottom: '10%', right: '-10%',
          transform: parallax(-0.15),
          pointerEvents: 'none',
        }} />

        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(14,165,233,0.1)',
            border: '1px solid rgba(14,165,233,0.25)',
            borderRadius: 50, padding: '6px 18px', marginBottom: 32,
            animation: loaded ? 'fadeInUp 0.6s ease forwards' : 'none',
            opacity: loaded ? 1 : 0,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0ea5e9', animation: 'glowPulse 2s infinite', display: 'inline-block' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Premium Video Production Studio
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-title" style={{
            marginBottom: 12,
            animation: loaded ? 'heroText 0.8s ease 0.2s forwards' : 'none',
            opacity: 0,
          }}>
            Som Core X
          </h1>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: 300,
            color: '#0284c7',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: 28,
            animation: loaded ? 'heroText 0.8s ease 0.4s forwards' : 'none',
            opacity: 0,
          }}>
            Studio
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: '#475569',
            lineHeight: 1.8,
            maxWidth: 600,
            margin: '0 auto 30px',
            animation: loaded ? 'fadeInUp 0.8s ease 0.6s forwards' : 'none',
            opacity: 0,
          }}>
            A living cinematic river of creative video art. Where every frame is a ripple
            in the stream of visual storytelling.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
            animation: loaded ? 'fadeInUp 0.8s ease 0.8s forwards' : 'none',
            opacity: 0,
          }}>
            <button className="btn-primary" style={{ fontSize: 15, padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 8 }}
              onClick={() => setCurrentPage('portfolio')}>
              <Play size={18} fill="currentColor" /> Explore Portfolio
            </button>
            <button className="btn-ghost" style={{ fontSize: 15, padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 8 }}
              onClick={() => setCurrentPage('contact')}>
              <MessageSquare size={18} /> Let's Connect
            </button>
          </div>

          {/* Scroll indicator */}
          <div style={{ margin: '40px auto 20px', animation: 'float 2s ease-in-out infinite' }}>
            <div style={{
              width: 28, height: 44,
              border: '2px solid rgba(14,165,233,0.4)',
              borderRadius: 14, margin: '0 auto',
              display: 'flex', justifyContent: 'center', paddingTop: 6,
            }}>
              <div style={{
                width: 4, height: 10, borderRadius: 2,
                background: '#0ea5e9',
                animation: 'float 1.5s ease-in-out infinite',
              }} />
            </div>
            <div style={{ fontSize: 11, color: 'rgba(14,165,233,0.5)', marginTop: 8, letterSpacing: '0.1em' }}>SCROLL</div>
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* =========== RIVER VIDEO FLOW =========== */}
      <section style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', padding: '10px 24px 20px', position: 'relative', zIndex: 5 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12,
            background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)',
            borderRadius: 50, padding: '6px 16px',
          }}>
            <Waves size={16} color="#06b6d4" />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Creative River Flow
            </span>
          </div>
          <h2 className="section-title">The Stream of Stories</h2>
          <p style={{ color: '#64748b', fontSize: 15, marginTop: 8, maxWidth: 500, margin: '8px auto 0' }}>
            Watch our video edits flow naturally like a cinematic river. Click any to explore.
          </p>
        </div>

        {/* River Flow Container */}
        <div style={{ position: 'relative', height: '280vh', overflow: 'hidden' }}>
          {/* Edge Fades */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8%', background: 'linear-gradient(90deg, rgba(14,165,233,0.05), transparent)', pointerEvents: 'none', zIndex: 20 }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8%', background: 'linear-gradient(-90deg, rgba(14,165,233,0.05), transparent)', pointerEvents: 'none', zIndex: 20 }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '15%', background: 'linear-gradient(180deg, var(--pale-blue,#e0f7fa), transparent)', pointerEvents: 'none', zIndex: 20 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '15%', background: 'linear-gradient(0deg, var(--pale-blue,#e0f7fa), transparent)', pointerEvents: 'none', zIndex: 20 }} />

          <RiverVideoFlow videos={videos} onVideoClick={setSelectedVideo} />
        </div>
      </section>

      <WaveDivider flip color="rgba(14,165,233,0.07)" />

      {/* =========== STATS =========== */}
      <section style={{ padding: '20px 24px 30px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          <StatCard number="250+" label="Projects Completed" icon={Clapperboard} />
          <StatCard number="98%" label="Client Satisfaction" icon={Star} />
          <StatCard number="5+" label="Years Experience" icon={Award} />
          <StatCard number="50+" label="Brand Partners" icon={Handshake} />
        </div>
      </section>

      <WaveDivider color="rgba(6,182,212,0.07)" />

      {/* =========== SERVICES =========== */}
      <section style={{ padding: '40px 24px 20px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title" style={{ marginBottom: 10 }}>What We Create</h2>
            <p style={{ color: '#64748b', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              Premium video production services crafted with cinematic precision.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            <ServiceCard icon={Film} title="Cinematic Edits" desc="Hollywood-grade color grading and editing that transforms raw footage into stunning visual narratives." />
            <ServiceCard icon={Smartphone} title="Social Media Content" desc="Scroll-stopping reels and shorts optimized for maximum engagement across all platforms." />
            <ServiceCard icon={Building2} title="Brand Films" desc="Premium brand storytelling that connects your audience emotionally to your vision and values." />
            <ServiceCard icon={Music} title="Music Videos" desc="Artistic music video production with creative direction, motion graphics, and VFX." />
            <ServiceCard icon={Camera} title="Product Showcase" desc="Luxury product visualization with dynamic camera movement and perfect lighting grading." />
            <ServiceCard icon={Sparkles} title="Motion Graphics" desc="Custom animated graphics, logo animations, and VFX that elevate your content quality." />
          </div>
        </div>
      </section>

      <WaveDivider color="rgba(6,182,212,0.06)" />

      {/* =========== SOCIAL LINKS =========== */}
      <section style={{ padding: '40px 24px 20px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: 10 }}>Connect With Us</h2>
          <p style={{ color: '#64748b', fontSize: 15, marginBottom: 30 }}>
            Follow our creative journey across platforms
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 30 }}>
            {[
              { name: 'Instagram', icon: <Instagram size={28} strokeWidth={1.5} />, url: 'https://instagram.com/somcorex', color: '#E1306C' },
              { name: 'YouTube', icon: <Youtube size={28} strokeWidth={1.5} />, url: 'https://youtube.com/@somcorex', color: '#FF0000' },
              { name: 'Facebook', icon: <Facebook size={28} strokeWidth={1.5} />, url: 'https://facebook.com/somcorex', color: '#1877F2' },
              { name: 'X / Twitter', icon: <XIcon size={26} />, url: 'https://x.com/somcorex', color: '#000000' },
              { name: 'Threads', icon: <ThreadsIcon size={28} />, url: 'https://threads.net/@somcorex', color: '#000000' },
            ].map(social => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                  textDecoration: 'none',
                  padding: '16px 24px',
                  background: 'rgba(255,255,255,0.6)',
                  border: '1.5px solid rgba(14,165,233,0.2)',
                  borderRadius: 20,
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s ease',
                  minWidth: 100,
                  color: social.color,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 16px 40px rgba(14,165,233,0.25)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(14,165,233,0.4)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(14,165,233,0.2)';
                }}
              >
                <div>{social.icon}</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0284c7' }}>{social.name}</span>
              </a>
            ))}
          </div>

          {/* Email */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: 'rgba(255,255,255,0.6)',
            border: '1.5px solid rgba(14,165,233,0.25)',
            borderRadius: 50, padding: '10px 24px',
            backdropFilter: 'blur(12px)',
          }}>
            <Mail size={20} color="#0284c7" />
            <a href="mailto:somcorex@gmail.com" style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'none', fontSize: 15 }}>
              somcorex@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* =========== CTA =========== */}
      <section style={{ padding: '40px 24px 80px', position: 'relative', zIndex: 2 }}>
        <div style={{
          maxWidth: 700, margin: '0 auto', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(6,182,212,0.08))',
          border: '1.5px solid rgba(14,165,233,0.25)',
          borderRadius: 32, padding: '50px 30px',
          backdropFilter: 'blur(20px)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Waves size={48} color="#0ea5e9" strokeWidth={1.5} />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0284c7', marginBottom: 12 }}>
            Ready to Make Waves?
          </h2>
          <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
            Let's create something extraordinary together. Your story deserves to flow
            through the world like a beautiful river.
          </p>
          <button
            className="btn-primary"
            style={{ fontSize: 15, padding: '14px 36px', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            onClick={() => setCurrentPage('contact')}
          >
            Start Your Project <Play size={16} fill="currentColor" />
          </button>
        </div>
      </section>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
};

export default HomePage;
