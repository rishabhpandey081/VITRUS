import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FiGrid, FiMic, FiCode, FiFileText, FiBarChart2,
  FiUser, FiLogOut, FiMenu, FiX, FiTarget, FiBookOpen,
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: FiGrid },
  { label: 'Mock Interviews', path: '/mock-interviews', icon: FiMic },
  { label: 'Coding Practice', path: '/coding-practice', icon: FiCode },
  { label: 'Resume Builder', path: '/resume-builder', icon: FiFileText },
  { label: 'Analytics', path: '/analytics', icon: FiBarChart2 },
];

const SECONDARY_ITEMS = [
  { label: 'Job Tracker', path: '/job-tracker', icon: FiTarget },
  { label: 'Question Bank', path: '/question-bank', icon: FiBookOpen },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp() || {};
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ item }) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    return (
      <button
        onClick={() => { navigate(item.path); setMobileOpen(false); }}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          padding: '11px 14px',
          border: 'none',
          borderRadius: '12px',
          background: active ? 'var(--v-glass-bg-strong)' : 'transparent',
          color: active ? 'var(--v-ink)' : 'var(--v-ink-muted)',
          fontSize: '14px',
          fontWeight: active ? 700 : 600,
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 200ms ease, color 200ms ease, padding-left 200ms ease',
        }}
        onMouseEnter={(e) => { if (!active) e.currentTarget.style.paddingLeft = '18px'; }}
        onMouseLeave={(e) => { if (!active) e.currentTarget.style.paddingLeft = '14px'; }}
      >
        {active && (
          <span
            style={{
              position: 'absolute',
              left: '-14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '3px',
              height: '60%',
              borderRadius: '999px',
              background: 'var(--v-gold-gradient)',
              boxShadow: '0 0 12px rgba(226,183,20,0.7)',
              transition: 'all 220ms ease',
            }}
          />
        )}
        <Icon size={17} style={{ flexShrink: 0, color: active ? 'var(--v-gold-500)' : 'inherit' }} />
        <span>{item.label}</span>
      </button>
    );
  };

  const SidebarInner = (
    <div
      className="v-glass"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '24px 18px',
        borderRadius: 0,
        borderRight: '1px solid var(--v-glass-border)',
        borderTop: 'none',
        borderBottom: 'none',
        borderLeft: 'none',
      }}
    >
      {/* Brand */}
      <div
        onClick={() => navigate('/dashboard')}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '4px 8px 28px' }}
      >
        <div
          style={{
            width: 34, height: 34, borderRadius: '10px',
            background: 'var(--v-gold-gradient)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 18px rgba(226,183,20,0.45)',
            flexShrink: 0,
          }}
        >
          <span style={{ color: '#1a1305', fontWeight: 900, fontSize: 16, fontFamily: 'JetBrains Mono, monospace' }}>V</span>
        </div>
        <span
          className="v-gold-text"
          style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          Virtus
        </span>
      </div>

      {/* Primary nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginLeft: '14px' }}>
        {NAV_ITEMS.map((item) => <NavLink key={item.path} item={item} />)}
      </nav>

      <div style={{ height: 1, background: 'var(--v-glass-border)', margin: '18px 8px' }} />

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginLeft: '14px' }}>
        {SECONDARY_ITEMS.map((item) => <NavLink key={item.path} item={item} />)}
      </nav>

      <div style={{ flex: 1 }} />

      {/* User + sign out */}
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '12px', borderRadius: '14px',
          background: 'var(--v-glass-bg)', border: '1px solid var(--v-glass-border)',
        }}
      >
        <div
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--v-gold-gradient)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#1a1305', fontWeight: 800, fontSize: 13, flexShrink: 0,
          }}
        >
          {(user?.name || 'V')[0]}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--v-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.name || 'Guest'}
          </p>
          <p style={{ margin: 0, fontSize: 11, color: 'var(--v-ink-faint)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.role || 'Candidate'}
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          aria-label="Sign out"
          style={{ background: 'none', border: 'none', color: 'var(--v-ink-faint)', cursor: 'pointer', display: 'flex', padding: 4 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--v-gold-500)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--v-ink-faint)')}
        >
          <FiLogOut size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0,
          width: 'var(--v-sidebar-w)', zIndex: 40,
        }}
        className="v-sidebar-desktop"
      >
        {SidebarInner}
      </aside>

      {/* Mobile top bar */}
      <div
        className="v-sidebar-mobile-bar v-glass"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 56, zIndex: 50,
          display: 'none', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px', borderRadius: 0,
        }}
      >
        <div onClick={() => navigate('/dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--v-gold-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#1a1305', fontWeight: 900, fontSize: 12 }}>V</span>
          </div>
          <span className="v-gold-text" style={{ fontSize: 17, fontWeight: 800 }}>Virtus</span>
        </div>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          style={{ background: 'none', border: 'none', color: 'var(--v-ink)', cursor: 'pointer' }}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          style={{ position: 'fixed', inset: 0, top: 56, zIndex: 49 }}
        >
          {SidebarInner}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .v-sidebar-desktop { display: none; }
          .v-sidebar-mobile-bar { display: flex !important; }
        }
      `}</style>
    </>
  );
}
