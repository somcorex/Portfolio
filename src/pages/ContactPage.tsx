import { useState } from 'react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', project: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ paddingTop: 68, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          textAlign: 'center', maxWidth: 600, margin: '0 auto', padding: '60px 40px',
          background: 'rgba(255,255,255,0.7)',
          border: '1.5px solid rgba(14,165,233,0.25)',
          borderRadius: 32, backdropFilter: 'blur(20px)',
          animation: 'fadeInUp 0.6s ease',
        }}>
          <div className="thank-you-icon" style={{ fontSize: 80, marginBottom: 24 }}>🌊</div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0284c7', marginBottom: 20 }}>
            Thank You!
          </h2>
          <p style={{
            fontSize: 18, color: '#475569', lineHeight: 1.8, marginBottom: 32,
            background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(6,182,212,0.06))',
            border: '1px solid rgba(14,165,233,0.2)',
            borderRadius: 16, padding: '20px 24px',
          }}>
            ✨ <strong>Thank you for contacting Som Core X Studio.</strong><br />
            Our team will contact you soon. We look forward to creating something beautiful together! 🎬
          </p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
            {[0,1,2,3,4].map(i => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: 'linear-gradient(135deg, #0ea5e9, #22d3ee)',
                animation: `float ${1.5 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }} />
            ))}
          </div>
          <button
            className="btn-primary"
            onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', project: '', message: '' }); }}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '60px 24px 40px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20,
          background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)',
          borderRadius: 50, padding: '4px 16px',
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Get In Touch
          </span>
        </div>
        <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 16 }}>
          Start Your Project
        </h1>
        <p style={{ color: '#64748b', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
          Tell us about your vision and let's create something extraordinary together.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'start' }}>
        {/* Contact Info */}
        <div>
          <div style={{
            background: 'rgba(255,255,255,0.55)', border: '1.5px solid rgba(14,165,233,0.2)',
            borderRadius: 24, padding: '36px 32px', backdropFilter: 'blur(16px)',
            marginBottom: 24,
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0284c7', marginBottom: 24 }}>Contact Details</h3>
            {[
              { icon: '✉️', label: 'Email', value: 'somcorex@gmail.com', href: 'mailto:somcorex@gmail.com' },
              { icon: '📸', label: 'Instagram', value: '@somcorex', href: 'https://instagram.com/somcorex' },
              { icon: '▶️', label: 'YouTube', value: '@somcorex', href: 'https://youtube.com/@somcorex' },
              { icon: '📘', label: 'Facebook', value: '@somcorex', href: 'https://facebook.com/somcorex' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid rgba(14,165,233,0.1)' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'rgba(14,165,233,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</div>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(6,182,212,0.08))',
            border: '1.5px solid rgba(14,165,233,0.2)',
            borderRadius: 24, padding: '32px', backdropFilter: 'blur(16px)',
          }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>⚡</div>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: '#0284c7', marginBottom: 10 }}>Fast Response Guaranteed</h4>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7 }}>
              We respond to all inquiries within 24 hours. For urgent projects,
              reach out directly via Instagram DM for the fastest response.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            background: 'rgba(255,255,255,0.65)',
            border: '1.5px solid rgba(14,165,233,0.2)',
            borderRadius: 28, padding: '40px 36px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 10px 40px rgba(14,165,233,0.1)',
          }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0284c7', marginBottom: 28 }}>
              Tell Us About Your Project
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Your Name *
                </label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.name}</div>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Phone Number
                </label>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Email Address *
              </label>
              <input
                className="form-input"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.email}</div>}
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Project Type
              </label>
              <select
                className="form-input"
                value={form.project}
                onChange={e => setForm({ ...form, project: e.target.value })}
                style={{ cursor: 'pointer' }}
              >
                <option value="">Select Project Type</option>
                <option>Cinematic Edit</option>
                <option>Brand Film</option>
                <option>Social Media Content</option>
                <option>Music Video</option>
                <option>Product Showcase</option>
                <option>Motion Graphics</option>
                <option>Other</option>
              </select>
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Your Message *
              </label>
              <textarea
                className="form-input"
                placeholder="Tell us about your vision, timeline, and any specific requirements..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={5}
                style={{ resize: 'vertical', fontFamily: 'inherit' }}
              />
              {errors.message && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.message}</div>}
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', fontSize: 16, padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <div style={{
                    width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white', borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }} />
                  Sending...
                </>
              ) : (
                <>Send Message 🚀</>
              )}
            </button>

            <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', marginTop: 16 }}>
              🔒 Your information is completely secure and private.
            </p>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
