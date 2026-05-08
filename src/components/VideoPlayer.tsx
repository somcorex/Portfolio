import { useRef, useEffect, useState } from 'react';
import { Video } from '../data/videos';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

const VideoPlayer = ({ video, onClose }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const controlsTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setProgress((v.currentTime / v.duration) * 100 || 0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    resetControlsTimer();
    return () => { if (controlsTimer.current) clearTimeout(controlsTimer.current); };
  }, []);

  return (
    <div
      className="video-player-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onMouseMove={resetControlsTimer}
    >
      <div className="video-player-container">
        {/* Header */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          background: 'linear-gradient(180deg, rgba(0,20,40,0.9) 0%, transparent 100%)',
          padding: '20px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          zIndex: 10,
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>{video.title}</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{video.category} · {video.duration}</div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white', borderRadius: '50%',
              width: 40, height: 40, fontSize: 18,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          >
            ✕
          </button>
        </div>

        {/* Video */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          style={{ width: '100%', display: 'block', maxHeight: '80vh', background: '#000' }}
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay}
          playsInline
          preload="auto"
        />

        {/* Controls */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(0deg, rgba(0,20,40,0.95) 0%, transparent 100%)',
          padding: '40px 24px 20px',
          zIndex: 10,
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          {/* Progress Bar */}
          <div
            style={{
              height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2,
              cursor: 'pointer', marginBottom: 16, position: 'relative',
            }}
            onClick={handleSeek}
          >
            <div style={{
              height: '100%', width: `${progress}%`,
              background: 'linear-gradient(90deg, #0ea5e9, #22d3ee)',
              borderRadius: 2, transition: 'width 0.1s linear',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%)',
                width: 12, height: 12, borderRadius: '50%',
                background: 'white', boxShadow: '0 0 8px rgba(14,165,233,0.8)',
              }} />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={togglePlay}
              style={{
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                border: 'none', borderRadius: '50%',
                width: 44, height: 44, fontSize: 18,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', boxShadow: '0 4px 15px rgba(14,165,233,0.4)',
              }}
            >
              {playing ? '⏸' : '▶'}
            </button>

            {/* Volume */}
            <button
              onClick={() => { setMuted(!muted); if (videoRef.current) videoRef.current.muted = !muted; }}
              style={{ background: 'transparent', border: 'none', color: 'white', fontSize: 18, cursor: 'pointer' }}
            >
              {muted ? '🔇' : '🔊'}
            </button>
            <input
              type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume}
              onChange={e => {
                const v = parseFloat(e.target.value);
                setVolume(v);
                if (videoRef.current) videoRef.current.volume = v;
              }}
              style={{ width: 80, accentColor: '#0ea5e9' }}
            />

            <div style={{ flex: 1 }} />

            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
              👁 {video.views}
            </div>

            {/* Fullscreen */}
            <button
              onClick={() => videoRef.current?.requestFullscreen?.()}
              style={{ background: 'transparent', border: 'none', color: 'white', fontSize: 18, cursor: 'pointer' }}
            >
              ⛶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
