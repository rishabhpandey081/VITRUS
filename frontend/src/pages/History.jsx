import React from 'react';
import Layout from '../components/Layout';

export default function History() {
  const sessions = [
    {
      id: 1,
      role: 'Full Stack Engineer',
      type: 'Technical Mock Interview',
      date: 'Aug 5, 2026',
      score: '88/100',
      status: 'Passed',
      feedback: 'Strong understanding of React architecture and state management. Recommended deeper review of database indexing.'
    },
    {
      id: 2,
      role: 'Software Engineer',
      type: 'Behavioral Interview',
      date: 'Jul 30, 2026',
      score: '92/100',
      status: 'Excellent',
      feedback: 'Excellent use of the STAR framework with clear quantifiable metrics and leadership examples.'
    },
    {
      id: 3,
      role: 'Frontend Developer',
      type: 'Coding & System Design',
      date: 'Jul 22, 2026',
      score: '79/100',
      status: 'Good',
      feedback: 'Good problem-solving approach. Remember to test edge cases before finalizing your code submission.'
    }
  ];

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
          History
        </p>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>Interview &amp; Session History</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sessions.map((session) => (
          <div key={session.id} className="v-card" style={{ padding: 24 }}>
            <div style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10,
              borderBottom: '1px solid var(--v-glass-border)', paddingBottom: 16, marginBottom: 16,
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--v-ink)' }}>{session.role}</h2>
                  <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(226,183,20,0.12)', color: 'var(--v-gold-300)', border: '1px solid rgba(226,183,20,0.32)', padding: '2px 9px', borderRadius: 6 }}>
                    {session.type}
                  </span>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--v-ink-faint)' }}>Completed on {session.date}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="v-gold-text" style={{ fontSize: 14, fontWeight: 800 }}>{session.score}</span>
                <span style={{ padding: '5px 13px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, background: 'rgba(52, 211, 153, 0.12)', color: '#6ee7b7', border: '1px solid rgba(52, 211, 153, 0.35)' }}>
                  {session.status}
                </span>
              </div>
            </div>

            <div>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--v-ink-faint)', marginBottom: 6 }}>
                AI Feedback &amp; Summary
              </span>
              <p style={{ margin: 0, fontSize: 13.5, color: 'var(--v-ink-muted)', lineHeight: 1.6 }}>{session.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
