import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicShell from '../components/PublicShell';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('rishabh@example.com');
  const [password, setPassword] = useState('password');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid var(--v-glass-border)',
    borderRadius: 10,
    padding: 13,
    fontSize: 14,
    color: 'var(--v-ink)',
    boxSizing: 'border-box',
    outline: 'none',
  };

  return (
    <PublicShell>
      <div className="v-card v-glass-strong" style={{ width: '100%', maxWidth: 420, padding: 34 }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div
            style={{
              width: 46, height: 46, borderRadius: 14, margin: '0 auto 14px',
              background: 'var(--v-gold-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(226,183,20,0.5)',
            }}
          >
            <span style={{ color: '#1a1305', fontWeight: 900, fontSize: 20, fontFamily: 'JetBrains Mono, monospace' }}>V</span>
          </div>
          <h1 className="v-gold-text" style={{ fontSize: 26, fontWeight: 800, margin: '0 0 8px' }}>Virtus AI</h1>
          <p style={{ fontSize: 13, color: 'var(--v-ink-muted)', margin: 0 }}>Your intelligent interview &amp; career preparation platform</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: 'var(--v-ink-muted)', marginBottom: 6 }}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, color: 'var(--v-ink-muted)', marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} required />
          </div>

          <button type="submit" className="v-btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
            Sign In to Dashboard
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--v-ink-faint)', marginTop: 18, marginBottom: 0 }}>
          Demo mode enabled. Click Sign In to access all tools.
        </p>

        <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--v-ink-muted)', marginTop: 14, marginBottom: 0 }}>
          New here?{' '}
          <a href="/signup" style={{ color: 'var(--v-gold-500)', fontWeight: 700 }}>Create an account</a>
        </p>
      </div>
    </PublicShell>
  );
}
