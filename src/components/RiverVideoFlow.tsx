import { useState, useEffect, useRef } from 'react';
import { Video } from '../data/videos';

interface RiverVideoFlowProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
}

interface FlowingCard {
  video: Video;
  id: number;
  side: 'left' | 'right' | 'center';
  startY: number;
  xOffset: number;
  rotation: number;
  scale: number;
  delay: number;
  speed: number;
  width: number;
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return isMobile;
};

const VideoCard = ({ card, onClick }: { card: FlowingCard; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        width: card.width,
        cursor: 'pointer',
        top: card.startY,
        left: card.side === 'left' ? `calc(10% + ${card.xOffset}px)` :
              card.side === 'right' ? `calc(55% + ${card.xOffset}px)` :
              `calc(50% - ${card.width / 2}px + ${card.xOffset}px)`,
        animation: `riverFlow${card.side === 'left' ? 'Left' : ''} ${card.speed}s linear ${card.delay}s infinite`,
        zIndex: hovered ? 50 : 10,
        transform: hovered ? 'scale(1.06) rotate(0deg)' : `rotate(${card.rotation}deg)`,
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      <div className="glass-video" style={{
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 30px 70px rgba(14,165,233,0.45), 0 10px 30px rgba(6,182,212,0.3), inset 0 1px 0 rgba(255,255,255,0.9)'
          : '0 10px 35px rgba(14,165,233,0.2), 0 4px 12px rgba(6,182,212,0.15), inset 0 1px 0 rgba(255,255,255,0.7)',
        transition: 'all 0.4s ease',
      }}>
        {/* Thumbnail */}
        <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#dff4ff' }}>
          {!imgError ? (
            <img
              src={card.video.thumbnail}
              alt={card.video.title}
              onError={() => setImgError(true)}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transition: 'transform 0.5s ease',
                transform: hovered ? 'scale(1.08)' : 'scale(1)',
              }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(135deg, #caf0f8, #ade8f4, #90e0ef)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40,
            }}>
              🎬
            </div>
          )}

          {/* Water reflection overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(14,165,233,0.08) 100%)',
            pointerEvents: 'none',
          }} />

          {/* Play button */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            background: 'rgba(0,20,40,0.3)',
          }}>
            <div style={{
              width: 56, height: 56,
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, color: 'white',
              boxShadow: '0 8px 25px rgba(14,165,233,0.5)',
              transform: hovered ? 'scale(1)' : 'scale(0.8)',
              transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}>▶</div>
          </div>

          {/* Duration badge */}
          <div style={{
            position: 'absolute', bottom: 8, right: 10,
            background: 'rgba(0,20,40,0.7)',
            color: 'white', fontSize: 11, fontWeight: 600,
            padding: '2px 8px', borderRadius: 6,
          }}>
            {card.video.duration}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '12px 14px 14px' }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#0c4a6e', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {card.video.title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              fontSize: 10, fontWeight: 600, letterSpacing: '0.05em',
              padding: '2px 8px', borderRadius: 20,
              background: 'rgba(14,165,233,0.12)',
              color: '#0ea5e9',
            }}>{card.video.category}</span>
            <span style={{ fontSize: 11, color: '#64748b' }}>👁 {card.video.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RiverVideoFlow = ({ videos, onVideoClick }: RiverVideoFlowProps) => {
  const isMobile = useIsMobile();
  const [cards, setCards] = useState<FlowingCard[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (!videos.length) return;
    const cardWidth = isMobile ? 270 : 268;
    const generated: FlowingCard[] = [];
    const totalCards = isMobile ? videos.length * 2 : videos.length * 4;

    for (let i = 0; i < totalCards; i++) {
      const video = videos[i % videos.length];
      // Alternate left and right, with slight center offset variation
      const sideOptions: Array<'left' | 'right'> = ['left', 'right'];
      const side: 'left' | 'right' | 'center' = isMobile ? 'center' : sideOptions[i % 2];
      generated.push({
        video,
        id: nextId.current++,
        side,
        startY: -100,
        xOffset: (Math.random() - 0.5) * (isMobile ? 16 : 80),
        rotation: (Math.random() - 0.5) * (isMobile ? 2 : 5),
        scale: 0.92 + Math.random() * 0.12,
        delay: -(i * (32 / totalCards)),
        speed: 24 + Math.random() * 14,
        width: cardWidth,
      });
    }
    setCards(generated);
  }, [videos, isMobile]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
    }}>
      {/* River channel visual */}
      <div style={{
        position: 'absolute',
        left: isMobile ? '5%' : '8%',
        right: isMobile ? '5%' : '8%',
        top: 0, bottom: 0,
        background: 'linear-gradient(180deg, rgba(14,165,233,0.04) 0%, rgba(6,182,212,0.08) 50%, rgba(14,165,233,0.04) 100%)',
        borderLeft: '1px solid rgba(14,165,233,0.1)',
        borderRight: '1px solid rgba(14,165,233,0.1)',
        pointerEvents: 'none',
      }} />

      {/* Flow direction arrows */}
      {!isMobile && (
        <>
          {[20, 35, 50, 65, 80].map((top, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: '50%', top: `${top}%`,
              transform: 'translateX(-50%)',
              color: 'rgba(14,165,233,0.15)',
              fontSize: 24, zIndex: 1, pointerEvents: 'none',
              animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
            }}>↓</div>
          ))}
        </>
      )}

      {/* Flowing Cards */}
      {cards.map(card => (
        <VideoCard
          key={card.id}
          card={card}
          onClick={() => onVideoClick(card.video)}
        />
      ))}

      <style>{`
        @keyframes riverFlow {
          0% { transform: translateY(-350px) rotate(${-3}deg); opacity: 0; }
          3% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(${3}deg); opacity: 0; }
        }
        @keyframes riverFlowLeft {
          0% { transform: translateY(-350px) rotate(${3}deg); opacity: 0; }
          3% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(${-3}deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default RiverVideoFlow;
