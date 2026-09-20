import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function CompanyGuide() {
  const [selectedCompany, setSelectedCompany] = useState('Google');

  const guides = {
    Google: {
      name: 'Google',
      rounds: ['Recruiter Screen', 'Technical Phone Screen (1-2 rounds)', 'Onsite (4-5 rounds: Coding, System Design, Leadership)'],
      focus: 'Strong emphasis on optimal data structures & algorithms (DSA), clean code, trade-off analysis, and "Googleyness".',
      tips: 'Practice LeetCode Medium/Hard questions, articulate your thought process clearly, and be ready to discuss system scaling and edge cases.'
    },
    Amazon: {
      name: 'Amazon',
      rounds: ['Online Assessment (OA)', 'Technical Phone Screen', 'Onsite / Loop (4-5 rounds including Bar Raiser)'],
      focus: 'Deep dive into Leadership Principles (Customer Obsession, Ownership, etc.) combined with scalable backend design and coding.',
      tips: 'Prepare STAR stories for every single Leadership Principle. Amazon heavily weighs behavioral alignment alongside technical competency.'
    },
    Microsoft: {
      name: 'Microsoft',
      rounds: ['Initial Recruiter Call', 'Technical Screening', 'Onsite (4-5 rounds including As Appropriate / Generalist / Principal)'],
      focus: 'System design, robust coding practices, problem-solving adaptability, and cross-functional collaboration.',
      tips: 'Focus on writing bug-free code on a shared editor or whiteboard. Understand cloud architecture (Azure concepts).'
    }
  };

  const current = guides[selectedCompany];

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
          Research
        </p>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>Company Guides &amp; Interview Loops</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {Object.keys(guides).map((comp) => {
            const active = selectedCompany === comp;
            return (
              <button
                key={comp}
                onClick={() => setSelectedCompany(comp)}
                className={active ? 'v-btn-gold' : undefined}
                style={active ? { width: '100%', justifyContent: 'flex-start', borderRadius: 12 } : {
                  width: '100%', textAlign: 'left', padding: '13px 16px', borderRadius: 12,
                  background: 'var(--v-glass-bg)', border: '1px solid var(--v-glass-border)',
                  color: 'var(--v-ink-muted)', fontWeight: 600, fontSize: 13.5, cursor: 'pointer',
                }}
              >
                {comp} Interview Guide
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-3 v-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: 'var(--v-ink)' }}>{current.name}</h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--v-ink-muted)' }}>Comprehensive preparation guide and interview loop breakdown</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: 'rgba(0,0,0,0.35)', padding: 18, borderRadius: 14, border: '1px solid var(--v-glass-border)' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
                Interview Rounds &amp; Structure
              </h3>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: 'var(--v-ink-muted)', lineHeight: 1.8 }}>
                {current.rounds.map((round, idx) => <li key={idx}>{round}</li>)}
              </ul>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.35)', padding: 18, borderRadius: 14, border: '1px solid var(--v-glass-border)' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
                Technical &amp; Core Focus
              </h3>
              <p style={{ margin: 0, fontSize: 13.5, color: 'var(--v-ink-muted)', lineHeight: 1.7 }}>{current.focus}</p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.35)', padding: 18, borderRadius: 14, border: '1px solid var(--v-glass-border)' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
                Pro Tips for Success
              </h3>
              <p style={{ margin: 0, fontSize: 13.5, color: 'var(--v-ink-muted)', lineHeight: 1.7 }}>{current.tips}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
