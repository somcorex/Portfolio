import { useEffect, useRef } from 'react';

const WaterCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Wave parameters
    const waves: Array<{
      y: number; amplitude: number; frequency: number; speed: number;
      opacity: number; color: string; phase: number;
    }> = [
      { y: 0.15, amplitude: 28, frequency: 0.008, speed: 0.012, opacity: 0.18, color: '#0ea5e9', phase: 0 },
      { y: 0.25, amplitude: 22, frequency: 0.010, speed: 0.009, opacity: 0.14, color: '#06b6d4', phase: 1.2 },
      { y: 0.38, amplitude: 32, frequency: 0.007, speed: 0.014, opacity: 0.12, color: '#22d3ee', phase: 2.4 },
      { y: 0.50, amplitude: 25, frequency: 0.009, speed: 0.010, opacity: 0.16, color: '#0ea5e9', phase: 0.8 },
      { y: 0.62, amplitude: 30, frequency: 0.006, speed: 0.011, opacity: 0.13, color: '#38bdf8', phase: 1.6 },
      { y: 0.75, amplitude: 20, frequency: 0.011, speed: 0.013, opacity: 0.15, color: '#06b6d4', phase: 3.0 },
      { y: 0.88, amplitude: 26, frequency: 0.008, speed: 0.008, opacity: 0.17, color: '#22d3ee', phase: 0.5 },
    ];

    // Particles
    interface Particle {
      x: number; y: number; size: number; speedY: number; speedX: number;
      opacity: number; color: string; drift: number;
    }
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 60;

    const createParticle = (): Particle => ({
      x: Math.random() * W,
      y: H + 10,
      size: Math.random() * 4 + 1,
      speedY: -(Math.random() * 0.8 + 0.3),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2,
      color: ['#0ea5e9', '#06b6d4', '#22d3ee', '#7dd3fc', '#ffffff'][Math.floor(Math.random() * 5)],
      drift: (Math.random() - 0.5) * 2,
    });

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle();
      p.y = Math.random() * H;
      particles.push(p);
    }

    // Ripples
    interface Ripple { x: number; y: number; r: number; maxR: number; opacity: number; }
    const ripples: Ripple[] = [];

    const addRipple = () => {
      ripples.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0,
        maxR: Math.random() * 60 + 30,
        opacity: 0.3,
      });
    };

    setInterval(addRipple, 1200);

    let time = 0;

    const drawBackground = () => {
      // Main water gradient
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#f0f9ff');
      bg.addColorStop(0.2, '#e8f8ff');
      bg.addColorStop(0.5, '#d4f4ff');
      bg.addColorStop(0.8, '#caf0f8');
      bg.addColorStop(1, '#e0f9ff');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // River channel gradient - central flowing river
      const riverGrad = ctx.createLinearGradient(W * 0.3, 0, W * 0.7, 0);
      riverGrad.addColorStop(0, 'rgba(255,255,255,0)');
      riverGrad.addColorStop(0.2, 'rgba(14,165,233,0.06)');
      riverGrad.addColorStop(0.5, 'rgba(6,182,212,0.12)');
      riverGrad.addColorStop(0.8, 'rgba(14,165,233,0.06)');
      riverGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = riverGrad;
      ctx.fillRect(0, 0, W, H);
    };

    const drawWaves = () => {
      waves.forEach((wave) => {
        wave.phase += wave.speed;

        ctx.beginPath();
        ctx.moveTo(0, wave.y * H);

        for (let x = 0; x <= W; x += 3) {
          const y = wave.y * H
            + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude
            + Math.sin(x * wave.frequency * 1.7 + wave.phase * 0.8) * (wave.amplitude * 0.4)
            + Math.sin(x * wave.frequency * 0.5 + wave.phase * 1.2) * (wave.amplitude * 0.6);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();

        // Wave gradient fill
        const waveGrad = ctx.createLinearGradient(0, wave.y * H - wave.amplitude, 0, wave.y * H + wave.amplitude * 2);
        waveGrad.addColorStop(0, 'rgba(255,255,255,0)');
        waveGrad.addColorStop(0.3, wave.color + Math.floor(wave.opacity * 255).toString(16).padStart(2, '0'));
        waveGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = waveGrad;
        ctx.fill();

        // Wave crest line
        ctx.beginPath();
        for (let x = 0; x <= W; x += 3) {
          const y = wave.y * H
            + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude
            + Math.sin(x * wave.frequency * 1.7 + wave.phase * 0.8) * (wave.amplitude * 0.4)
            + Math.sin(x * wave.frequency * 0.5 + wave.phase * 1.2) * (wave.amplitude * 0.6);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color + '30';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    };

    const drawParticles = () => {
      particles.forEach((p, i) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time * 0.02 + i) * 0.3;
        p.opacity -= 0.001;

        if (p.y < -10 || p.opacity <= 0) {
          particles[i] = createParticle();
          return;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        // Glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });
    };

    const drawRipples = () => {
      ripples.forEach((r, i) => {
        r.r += 0.8;
        r.opacity -= 0.005;

        if (r.opacity <= 0 || r.r >= r.maxR) {
          ripples.splice(i, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = r.opacity;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.r, r.r * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = '#0ea5e9';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Second ripple ring
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.r * 0.6, r.r * 0.21, 0, 0, Math.PI * 2);
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
      });
    };

    const drawLightReflections = () => {
      const reflCount = 8;
      for (let idx = 0; idx < reflCount; idx++) {
        const x = (W / reflCount) * idx + Math.sin(time * 0.01 + idx) * 40;
        const y = H * 0.1 + Math.cos(time * 0.008 + idx * 0.5) * H * 0.8;
        const len = 40 + Math.sin(time * 0.02 + idx) * 20;

        ctx.save();
        ctx.globalAlpha = 0.04 + Math.sin(time * 0.03 + idx) * 0.02;
        const reflGrad = ctx.createLinearGradient(x, y - len, x, y + len);
        reflGrad.addColorStop(0, 'rgba(255,255,255,0)');
        reflGrad.addColorStop(0.5, 'rgba(255,255,255,1)');
        reflGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = reflGrad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y - len);
        ctx.lineTo(x, y + len);
        ctx.stroke();
        ctx.restore();
      }
    };

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, W, H);
      drawBackground();
      drawWaves();
      drawLightReflections();
      drawRipples();
      drawParticles();
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="river-canvas"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default WaterCanvas;
