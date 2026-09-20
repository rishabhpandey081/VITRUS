import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiAward, FiCheckCircle, FiTarget, FiZap } from 'react-icons/fi';
import Layout from '../components/Layout';
import BentoCard from '../components/BentoCard';

export default function Analytics() {
  const [stats, setStats] = useState({
    totalSessions: 0,
    overallAvgScore: 0,
    trackBreakdown: {},
    readinessLevel: 'Evaluating...'
  });

  useEffect(() => {
    const savedInterviews = JSON.parse(localStorage.getItem('virtus_interviews') || '[]');

    if (savedInterviews.length > 0) {
      const total = savedInterviews.length;
      const scores = savedInterviews.map(i => i.evaluation?.score || 0);
      const overallAvg = Math.round(scores.reduce((a, b) => a + b, 0) / total);

      const breakdown = {};
      savedInterviews.forEach(item => {
        const track = item.track || 'general';
        if (!breakdown[track]) {
          breakdown[track] = { count: 0, totalScore: 0 };
        }
        breakdown[track].count += 1;
        breakdown[track].totalScore += (item.evaluation?.score || 0);
      });

      const trackAverages = {};
      Object.keys(breakdown).forEach(track => {
        trackAverages[track] = Math.round(breakdown[track].totalScore / breakdown[track].count);
      });

      let readiness = 'Beginner Candidate';
      if (overallAvg >= 88) readiness = 'Interview Ready (Tier 1)';
      else if (overallAvg >= 78) readiness = 'Strong Contender (Tier 2)';
      else if (overallAvg > 0) readiness = 'Developing Proficiency';

      setStats({
        totalSessions: total,
        overallAvgScore: overallAvg,
        trackBreakdown: trackAverages,
        readinessLevel: readiness
      });
    }
  }, []);

  return (
    <Layout>
      <div style={{ marginBottom: 28 }}>
        <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
          Performance Analytics
        </p>
        <h1 style={{ margin: 0, fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 800, letterSpacing: '-0.02em' }}>
          {stats.readinessLevel}
        </h1>
      </div>

      {/* Top summary banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="v-card"
        style={{
          padding: 30, display: 'flex', flexWrap: 'wrap', gap: 24,
          justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--v-gold-500)', marginBottom: 10 }}>
            <FiZap /> Candidate Readiness Index
          </div>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--v-ink-muted)', lineHeight: 1.6 }}>
            Aggregated insights from all completed mock interview evaluations. Keep practicing to maintain high technical accuracy and response clarity.
          </p>
        </div>

        <div
          className="v-glass"
          style={{ padding: '20px 28px', borderRadius: 'var(--v-radius-md)', textAlign: 'center', minWidth: 160 }}
        >
          <FiAward size={28} color="var(--v-gold-500)" style={{ margin: '0 auto 8px' }} />
          <div className="v-gold-text" style={{ fontSize: 32, fontWeight: 800 }}>{stats.overallAvgScore}/100</div>
          <div style={{ fontSize: 11, color: 'var(--v-ink-faint)', marginTop: 4 }}>Global Avg Score</div>
        </div>
      </motion.div>

      {/* Bento breakdown */}
      <div className="v-bento-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gridAutoRows: 'auto' }}>
        <BentoCard glow={false} style={{ minHeight: 260 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, paddingBottom: 14, borderBottom: '1px solid var(--v-glass-border)', marginBottom: 14 }}>
            <FiTarget color="var(--v-gold-500)" /> Track Performance Breakdown
          </div>

          {Object.keys(stats.trackBreakdown).length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--v-ink-faint)', fontSize: 13 }}>
              No mock interview sessions recorded yet. Complete a session to view track metrics.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {Object.entries(stats.trackBreakdown).map(([trackName, score], idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, color: 'var(--v-ink)', textTransform: 'capitalize' }}>{trackName} Track</span>
                    <span className="v-gold-text" style={{ fontWeight: 700 }}>{score}/100</span>
                  </div>
                  <div style={{ width: '100%', height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${score}%`, borderRadius: 999, background: 'var(--v-gold-gradient)', transition: 'width 500ms ease' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </BentoCard>

        <BentoCard glow={false} style={{ minHeight: 260 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, paddingBottom: 14, borderBottom: '1px solid var(--v-glass-border)', marginBottom: 14 }}>
            <FiTrendingUp color="var(--v-gold-500)" /> Key Strengths &amp; Growth Areas
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: 14, borderRadius: 14, background: 'rgba(226,183,20,0.08)', border: '1px solid rgba(226,183,20,0.22)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 13, color: 'var(--v-gold-300)', marginBottom: 4 }}>
                <FiCheckCircle /> Structured Problem Framing
              </div>
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--v-ink-muted)' }}>
                Candidates consistently demonstrate clear breakdown of technical requirements during simulated Q&amp;A.
              </p>
            </div>

            <div style={{ padding: 14, borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 13, color: 'var(--v-ink)', marginBottom: 4 }}>
                <FiTrendingUp /> Architectural Depth
              </div>
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--v-ink-muted)' }}>
                Incorporate real-world scale metrics and edge-case handling to push scores into the top 95th percentile.
              </p>
            </div>
          </div>
        </BentoCard>
      </div>
    </Layout>
  );
}
