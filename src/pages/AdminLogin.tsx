import { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    if (username === 'somcorex' && password === 'som@1980') {
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', zIndex: 1, padding: '24px',
    }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)', top: '10%', left: '5%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', bottom: '10%', right: '5%', pointerEvents: 'none' }} />

      <div style={{
        width: '100%', maxWidth: 440,
        background: 'rgba(255,255,255,0.75)',
        border: '1.5px solid rgba(14,165,233,0.25)',
        borderRadius: 32, padding: '48px 44px',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 20px 60px rgba(14,165,233,0.15), 0 4px 20px rgba(0,0,0,0.05)',
        animation: 'fadeInUp 0.5s ease',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 70, height: 70, borderRadius: '50%',
            background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, margin: '0 auto 16px',
            boxShadow: '0 8px 25px rgba(14,165,233,0.4)',
          }}>⚡</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0284c7', marginBottom: 6 }}>Admin Access</h1>
          <p style={{ fontSize: 14, color: '#64748b' }}>Som Core X Studio Control Panel</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Username
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="somcorex"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="form-input"
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                style={{ paddingRight: 50 }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#94a3b8',
                }}
              >{showPwd ? '🙈' : '👁'}</button>
            </div>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: 10, padding: '10px 14px', marginBottom: 18,
              color: '#dc2626', fontSize: 13, fontWeight: 500,
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', fontSize: 15, padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            disabled={loading}
          >
            {loading ? (
              <>
                <div style={{
                  width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white', borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }} />
                Authenticating...
              </>
            ) : '⚡ Enter Admin Panel'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 20 }}>
          🔐 Secured Access · Som Core X Studio
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default AdminLogin;
