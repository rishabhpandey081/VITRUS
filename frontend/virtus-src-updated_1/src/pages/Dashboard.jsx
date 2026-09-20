import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiMic, FiFileText, FiSearch, FiZap, FiCode,
  FiTarget, FiArrowUpRight, FiTrendingUp,
} from 'react-icons/fi';
import Layout from '../components/Layout';
import BentoCard from '../components/BentoCard';
import { useApp } from '../context/AppContext';

const Tag = ({ children, tone = 'gold' }) => {
  const tones = {
    gold: { bg: 'rgba(226,183,20,0.14)', border: 'rgba(226,183,20,0.4)', color: '#f4e3a1' },
    white: { bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.18)', color: '#f7f6f2' },
  };
  const t = tones[tone];
  return (
    <span
      style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
        padding: '4px 10px', borderRadius: 999, width: 'fit-content',
        background: t.bg, border: `1px solid ${t.border}`, color: t.color,
      }}
    >
      {children}
    </span>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, interviewHistory } = useApp() || {};

  const avgScore = interviewHistory?.length
    ? Math.round(interviewHistory.reduce((a, b) => a + (b.score || 0), 0) / interviewHistory.length)
    : null;

  return (
    <Layout>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </p>
          <h1 style={{ margin: 0, fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Your career command center
          </h1>
        </div>
        <button className="v-btn-gold" onClick={() => navigate('/mock-interviews')}>
          <FiZap size={16} /> Start Mock Interview
        </button>
      </div>

      {/* Bento grid */}
      <div className="v-bento-grid" style={{ gridAutoRows: '170px' }}>
        {/* Featured: Mock Interviews */}
        <BentoCard
          style={{ gridColumn: 'span 2', gridRow: 'span 2' }}
          onClick={() => navigate('/mock-interviews')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Tag>Live AI Interview</Tag>
            <FiArrowUpRight color="var(--v-ink-faint)" />
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiMic size={56} color="var(--v-gold-500)" style={{ filter: 'drop-shadow(0 0 24px rgba(226,183,20,0.45))' }} />
          </div>
          <div>
            <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700 }}>Mock Interviews</h2>
            <p style={{ margin: 0, fontSize: 13.5, color: 'var(--v-ink-muted)', lineHeight: 1.5 }}>
              Practice live technical interviews with an AI interviewer, real-time voice, and instant feedback.
            </p>
          </div>
        </BentoCard>

        {/* Resume Builder */}
        <BentoCard style={{ gridColumn: 'span 1', gridRow: 'span 1' }} onClick={() => navigate('/resume-builder')}>
          <Tag tone="white">Build</Tag>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <FiFileText size={28} color="var(--v-ink)" />
          </div>
          <h2 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700 }}>Resume Builder</h2>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--v-ink-muted)' }}>AI-tailored resumes per job description.</p>
        </BentoCard>

        {/* Resume Reviewer */}
        <BentoCard style={{ gridColumn: 'span 1', gridRow: 'span 1' }} onClick={() => navigate('/resume-review')}>
          <Tag tone="white">Review</Tag>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <FiSearch size={28} color="var(--v-ink)" />
          </div>
          <h2 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700 }}>Resume Reviewer</h2>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--v-ink-muted)' }}>ATS score and structural critique.</p>
        </BentoCard>

        {/* Readiness score */}
        <BentoCard style={{ gridColumn: 'span 1', gridRow: 'span 1' }} onClick={() => navigate('/analytics')}>
          <Tag>Readiness</Tag>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
            <FiTrendingUp size={24} color="var(--v-gold-500)" />
            <span className="v-gold-text" style={{ fontSize: 34, fontWeight: 800 }}>
              {avgScore !== null ? `${avgScore}%` : '—'}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--v-ink-muted)' }}>Average interview score</p>
        </BentoCard>

        {/* Coding Practice */}
        <BentoCard style={{ gridColumn: 'span 1', gridRow: 'span 1' }} onClick={() => navigate('/coding-practice')}>
          <Tag tone="white">Code</Tag>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <FiCode size={28} color="var(--v-ink)" />
          </div>
          <h2 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700 }}>Coding Practice</h2>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--v-ink-muted)' }}>Instant reviews and complexity analysis.</p>
        </BentoCard>

        {/* Job Tracker - wide */}
        <BentoCard
          style={{ gridColumn: 'span 2', gridRow: 'span 1' }}
          onClick={() => navigate('/job-tracker')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
            <div>
              <Tag>Pipeline</Tag>
              <h2 style={{ margin: '10px 0 4px', fontSize: 18, fontWeight: 700 }}>Job Tracker</h2>
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--v-ink-muted)' }}>
                Track target companies, applications, and interview stages in one place.
              </p>
            </div>
            <FiTarget size={40} color="var(--v-gold-500)" style={{ opacity: 0.85, flexShrink: 0 }} />
          </div>
        </BentoCard>
      </div>
    </Layout>
  );
}
