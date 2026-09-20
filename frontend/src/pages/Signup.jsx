import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import PublicShell from '../components/PublicShell';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    navigate('/dashboard');
  };

  const inputStyle = {
    width: '100%',
    padding: '11px 40px 11px 14px',
    borderRadius: 10,
    border: '1px solid var(--v-glass-border)',
    background: 'rgba(0,0,0,0.35)',
    color: 'var(--v-ink)',
    fontSize: 13.5,
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = { display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--v-ink-muted)', marginBottom: 6 };

  return (
    <PublicShell>
      <div className="v-card v-glass-strong" style={{ width: '100%', maxWidth: 440, padding: 34 }}>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <div
            style={{
              width: 46, height: 46, borderRadius: 14, margin: '0 auto 14px',
              background: 'var(--v-gold-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(226,183,20,0.5)',
            }}
          >
            <span style={{ color: '#1a1305', fontWeight: 900, fontSize: 20, fontFamily: 'JetBrains Mono, monospace' }}>V</span>
          </div>
          <h1 className="v-gold-text" style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Create Account</h1>
        </div>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" style={{ ...inputStyle, paddingRight: 14 }} required />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" style={{ ...inputStyle, paddingRight: 14 }} required />
          </div>

          <div>
            <label style={labelStyle}>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" style={{ ...inputStyle, paddingRight: 14 }} required />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                style={inputStyle}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--v-ink-faint)', cursor: 'pointer', display: 'flex' }}
              >
                {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
              </button>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                style={inputStyle}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--v-ink-faint)', cursor: 'pointer', display: 'flex' }}
              >
                {showConfirmPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
              </button>
            </div>
          </div>

          <button type="submit" className="v-btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: 22, textAlign: 'center', fontSize: 13, color: 'var(--v-ink-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--v-gold-500)', fontWeight: 700 }}>Log in.</Link>
        </p>
      </div>
    </PublicShell>
  );
}
