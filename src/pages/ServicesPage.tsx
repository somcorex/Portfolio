import { useState } from 'react';

const ServicesPage = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activePlan, setActivePlan] = useState<'monthly' | 'project'>('project');

  const services = [
    {
      icon: '🎬', title: 'Cinematic Video Editing',
      desc: 'Professional-grade editing with Hollywood color science, smooth transitions, and narrative-driven storytelling that keeps viewers engaged from first to last frame.',
      features: ['4K / 8K Support', 'Color Science Grading', 'Sound Design', 'Motion Graphics', 'Fast Delivery'],
      price: '₹25,000+',
    },
    {
      icon: '📱', title: 'Social Media Reels & Shorts',
      desc: 'Viral-ready vertical content optimized for Instagram, YouTube Shorts, and TikTok with trending effects, music sync, and platform-specific optimization.',
      features: ['Trending Effects', 'Music Sync', 'Caption Design', 'Thumbnail Creation', 'Bulk Packages'],
      price: '₹8,000+',
    },
    {
      icon: '🏢', title: 'Corporate Brand Films',
      desc: 'Premium brand storytelling that emotionally connects your audience to your company vision through cinematic visuals and powerful narrative structure.',
      features: ['Script Development', 'On-location Shooting', 'Drone Footage', 'Voiceover', '3D Graphics'],
      price: '₹75,000+',
    },
    {
      icon: '🎵', title: 'Music Video Production',
      desc: 'Creative music video direction and editing that visually interprets your music with artistic flair, synchronized cuts, and stunning visual aesthetics.',
      features: ['Creative Direction', 'Synchronized Editing', 'VFX Integration', 'Lyric Videos', 'Visualizers'],
      price: '₹45,000+',
    },
    {
      icon: '📸', title: 'Product Showcase Videos',
      desc: 'Luxury product visualization with dynamic camera movement, perfect lighting simulation, and aspirational storytelling that drives purchase decisions.',
      features: ['360° Views', 'Macro Shots', 'CGI Integration', 'E-commerce Ready', 'Amazon/Shopify Optimized'],
      price: '₹18,000+',
    },
    {
      icon: '✨', title: 'Motion Graphics & VFX',
      desc: 'Custom animated graphics, logo animations, title sequences, and visual effects that add production value and professional polish to any video content.',
      features: ['Logo Animation', 'Title Sequences', 'Lower Thirds', 'Particle FX', 'Green Screen'],
      price: '₹12,000+',
    },
  ];

  const plans = [
    {
      name: 'Starter', icon: '🌱', price: activePlan === 'project' ? '₹15,000' : '₹45,000/mo',
      desc: 'Perfect for individuals and small brands',
      features: ['2 Short Videos/month', 'Basic Color Grading', 'Standard Resolution', '3 Revisions', '7-day Delivery'],
      highlight: false,
    },
    {
      name: 'Professional', icon: '⭐', price: activePlan === 'project' ? '₹45,000' : '₹1,20,000/mo',
      desc: 'Best for growing brands and businesses',
      features: ['5 Videos/month', 'Advanced Color Science', '4K Resolution', 'Unlimited Revisions', '5-day Delivery', 'Motion Graphics Included'],
      highlight: true,
    },
    {
      name: 'Enterprise', icon: '👑', price: 'Custom',
      desc: 'For agencies and large-scale productions',
      features: ['Unlimited Videos', 'Full Production Suite', '8K Support', 'Dedicated Editor', 'Priority Delivery', 'On-site Shooting', 'VFX & CGI'],
      highlight: false,
    },
  ];

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '60px 24px 50px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: 50, padding: '4px 16px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase' }}>What We Offer</span>
        </div>
        <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 16 }}>Our Services</h1>
        <p style={{ color: '#64748b', fontSize: 16, maxWidth: 550, margin: '0 auto' }}>
          Premium video production services tailored for brands that demand excellence.
        </p>
      </div>

      {/* Services Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
        {services.map((svc, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === i ? 'rgba(14,165,233,0.06)' : 'rgba(255,255,255,0.6)',
              border: `1.5px solid ${hovered === i ? 'rgba(14,165,233,0.35)' : 'rgba(255,255,255,0.8)'}`,
              borderRadius: 24, padding: '32px 28px',
              backdropFilter: 'blur(16px)',
              transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
              transform: hovered === i ? 'translateY(-8px)' : 'translateY(0)',
              boxShadow: hovered === i ? '0 20px 50px rgba(14,165,233,0.2)' : '0 4px 20px rgba(14,165,233,0.06)',
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 18 }}>{svc.icon}</div>
            <h3 style={{ fontSize: 19, fontWeight: 700, color: '#0284c7', marginBottom: 12 }}>{svc.title}</h3>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 20 }}>{svc.desc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {svc.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#334155' }}>
                  <span style={{ color: '#0ea5e9', fontWeight: 700 }}>✓</span> {f}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#0284c7' }}>{svc.price}</span>
              <button style={{ fontSize: 13, padding: '8px 18px', borderRadius: 20, border: '1.5px solid rgba(14,165,233,0.4)', background: 'transparent', color: '#0ea5e9', cursor: 'pointer', fontWeight: 600 }}>
                Get Quote →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Plans */}
      <div style={{ background: 'linear-gradient(180deg, rgba(14,165,233,0.04) 0%, rgba(6,182,212,0.06) 100%)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <h2 className="section-title" style={{ marginBottom: 16 }}>Transparent Pricing</h2>
            <p style={{ color: '#64748b', fontSize: 15, marginBottom: 24 }}>Choose what works best for your needs</p>

            {/* Toggle */}
            <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(14,165,233,0.2)', borderRadius: 50, padding: 4 }}>
              {(['project', 'monthly'] as const).map(plan => (
                <button key={plan} onClick={() => setActivePlan(plan)} style={{
                  padding: '8px 20px', borderRadius: 50, fontSize: 13, fontWeight: 600,
                  background: activePlan === plan ? 'linear-gradient(135deg, #0ea5e9, #06b6d4)' : 'transparent',
                  color: activePlan === plan ? 'white' : '#64748b',
                  border: 'none', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.3s ease',
                }}>{plan === 'project' ? 'Per Project' : 'Monthly Retainer'}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {plans.map((plan, i) => (
              <div key={i} style={{
                background: plan.highlight ? 'linear-gradient(135deg, #0ea5e9, #06b6d4)' : 'rgba(255,255,255,0.7)',
                border: plan.highlight ? 'none' : '1.5px solid rgba(14,165,233,0.2)',
                borderRadius: 28, padding: '36px 32px',
                backdropFilter: 'blur(16px)',
                transform: plan.highlight ? 'scale(1.03)' : 'scale(1)',
                boxShadow: plan.highlight ? '0 20px 50px rgba(14,165,233,0.4)' : '0 4px 20px rgba(14,165,233,0.08)',
                position: 'relative', overflow: 'hidden',
              }}>
                {plan.highlight && (
                  <div style={{ position: 'absolute', top: 16, right: 20, background: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: '3px 12px', fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: '0.05em' }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ fontSize: 36, marginBottom: 12 }}>{plan.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: plan.highlight ? 'white' : '#0284c7', marginBottom: 6 }}>{plan.name}</h3>
                <p style={{ fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.8)' : '#64748b', marginBottom: 20 }}>{plan.desc}</p>
                <div style={{ fontSize: 32, fontWeight: 900, color: plan.highlight ? 'white' : '#0284c7', marginBottom: 24 }}>{plan.price}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: plan.highlight ? 'rgba(255,255,255,0.9)' : '#334155' }}>
                      <span style={{ color: plan.highlight ? 'rgba(255,255,255,0.9)' : '#22c55e', fontWeight: 700 }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                <button style={{
                  width: '100%', padding: '14px', borderRadius: 50, fontSize: 15, fontWeight: 700,
                  background: plan.highlight ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  border: plan.highlight ? '2px solid rgba(255,255,255,0.5)' : 'none',
                  color: 'white', cursor: 'pointer', transition: 'all 0.3s ease',
                  boxShadow: plan.highlight ? 'none' : '0 4px 15px rgba(14,165,233,0.35)',
                }}>Get Started →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
