import React, { useState } from 'react';
import { useVideos } from '../context/VideoContext';
import { VIDEO_CATEGORIES, Video } from '../data/videos';
import VideoPlayer from '../components/VideoPlayer';

const PortfolioPage = () => {
  const { videos } = useVideos(); // <-- Using global state!
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Filter based on the global videos array
  const filtered = selectedCategory === 'All'
    ? videos
    : videos.filter(v => v.category === selectedCategory);

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div style={{
        textAlign: 'center', padding: '60px 24px 40px',
        background: 'linear-gradient(180deg, rgba(224,247,250,0.8) 0%, transparent 100%)',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20,
          background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)',
          borderRadius: 50, padding: '4px 16px',
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            🎬 Our Work
          </span>
        </div>
        <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 16 }}>
          Portfolio Stream
        </h1>
        <p style={{ color: '#64748b', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
          A curated collection of cinematic moments and visual stories.
        </p>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', padding: '0 24px 40px' }}>
        {VIDEO_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 20px', borderRadius: 50, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.25s ease',
              background: selectedCategory === cat
                ? 'linear-gradient(135deg, #0ea5e9, #06b6d4)'
                : 'rgba(255,255,255,0.6)',
              border: selectedCategory === cat ? 'none' : '1.5px solid rgba(14,165,233,0.25)',
              color: selectedCategory === cat ? 'white' : '#0284c7',
              boxShadow: selectedCategory === cat ? '0 4px 15px rgba(14,165,233,0.35)' : 'none',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
        {filtered.map(video => (
          <div
            key={video.id}
            onMouseEnter={() => setHoveredId(video.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelectedVideo(video)}
            style={{
              borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
              background: 'rgba(255,255,255,0.6)',
              border: `1.5px solid ${hoveredId === video.id ? 'rgba(14,165,233,0.4)' : 'rgba(255,255,255,0.8)'}`,
              backdropFilter: 'blur(16px)',
              transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
              transform: hoveredId === video.id ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
              boxShadow: hoveredId === video.id
                ? '0 20px 60px rgba(14,165,233,0.25), 0 8px 25px rgba(6,182,212,0.15)'
                : '0 4px 20px rgba(14,165,233,0.08)',
            }}
          >
            {/* Thumbnail */}
            <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#dff4ff' }}>
              <img
                src={video.thumbnail}
                alt={video.title}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transform: hoveredId === video.id ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 0.5s ease',
                }}
                onError={e => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: hoveredId === video.id ? 'rgba(0,20,40,0.35)' : 'rgba(0,20,40,0.1)',
                transition: 'background 0.3s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 60, height: 60,
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, color: 'white',
                  boxShadow: '0 8px 25px rgba(14,165,233,0.5)',
                  opacity: hoveredId === video.id ? 1 : 0,
                  transform: hoveredId === video.id ? 'scale(1)' : 'scale(0.7)',
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                }}>▶</div>
              </div>
              {/* Featured badge */}
              {video.featured && (
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  color: 'white', fontSize: 10, fontWeight: 700,
                  padding: '3px 10px', borderRadius: 20,
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                }}>⭐ Featured</div>
              )}
              {/* Duration */}
              <div style={{
                position: 'absolute', bottom: 10, right: 12,
                background: 'rgba(0,20,40,0.75)',
                color: 'white', fontSize: 11, fontWeight: 600,
                padding: '3px 9px', borderRadius: 6,
              }}>{video.duration}</div>
            </div>

            {/* Info */}
            <div style={{ padding: '20px 22px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0c4a6e', lineHeight: 1.3 }}>{video.title}</h3>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: '#0ea5e9',
                  background: 'rgba(14,165,233,0.1)',
                  padding: '3px 10px', borderRadius: 20, whiteSpace: 'nowrap', marginLeft: 8,
                }}>{video.category}</span>
              </div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 14 }}>{video.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>👁 {video.views} views</span>
                <button
                  onClick={e => { e.stopPropagation(); setSelectedVideo(video); }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(6,182,212,0.15))',
                    border: '1px solid rgba(14,165,233,0.3)',
                    color: '#0ea5e9', fontSize: 12, fontWeight: 600,
                    padding: '6px 16px', borderRadius: 20, cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >Watch Now →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
};

export default PortfolioPage;
