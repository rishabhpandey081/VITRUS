import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('rishabh@example.com');
  const [password, setPassword] = useState('password');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#020617',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#818cf8', margin: '0 0 8px 0' }}>Virtus AI</h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Your intelligent interview & career preparation platform</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#020617',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                color: 'white',
                boxSizing: 'border-box',
                outline: 'none'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#020617',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                color: 'white',
                boxSizing: 'border-box',
                outline: 'none'
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '8px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
          >
            Sign In to Dashboard
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#64748b', marginTop: '16px', marginBottoom: 0 }}>
          Demo mode enabled. Click Sign In to access all tools.
        </p>
      </div>
    </div>
  );
}