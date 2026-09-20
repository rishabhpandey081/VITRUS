import React, { useState } from 'react';
import Layout from '../components/Layout';

const fieldStyle = {
  width: '100%', background: 'rgba(0,0,0,0.35)', border: '1px solid var(--v-glass-border)',
  borderRadius: 10, padding: 12, color: 'var(--v-ink)', fontSize: 13.5, outline: 'none', boxSizing: 'border-box',
};
const labelStyle = { display: 'block', fontSize: 12.5, color: 'var(--v-ink-muted)', marginBottom: 6 };

export default function SalaryNegotiator() {
  const [form, setForm] = useState({
    currentOffer: '95,000',
    targetSalary: '115,000',
    tone: 'Professional & Confident',
    keyLeverage: 'Specialized project experience in modern web stacks and strong interview performance.'
  });

  const [script, setScript] = useState('');

  const handleGenerate = (e) => {
    e.preventDefault();
    setScript(`Dear Hiring Team,\n\nThank you once again for the fantastic offer for the Full Stack Software Engineer role. I am genuinely excited about the opportunity to contribute to your engineering team and help scale your core products.\n\nBased on my specialized experience in full-stack development, modern frontend frameworks, and database architecture—alongside market rates for this role—I was hoping we could discuss adjusting the base salary to $${form.targetSalary}.\n\nGiven my strong alignment with your technical stack and my ability to deliver impact from day one, I am confident this adjustment makes sense. I am eager to sign and get started as soon as we reach an agreement on this figure.\n\nBest regards,\nRishabh Pandey`);
  };

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
          Offer Strategy
        </p>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>AI Salary Negotiator</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="v-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700, color: 'var(--v-ink)' }}>Negotiation Inputs</h2>
          <div>
            <label style={labelStyle}>Current Offer ($)</label>
            <input type="text" value={form.currentOffer} onChange={(e) => setForm({ ...form, currentOffer: e.target.value })} style={fieldStyle} />
          </div>
          <div>
            <label style={labelStyle}>Target Salary ($)</label>
            <input type="text" value={form.targetSalary} onChange={(e) => setForm({ ...form, targetSalary: e.target.value })} style={fieldStyle} />
          </div>
          <div>
            <label style={labelStyle}>Tone</label>
            <select value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })} style={fieldStyle}>
              <option>Professional & Confident</option>
              <option>Firm & Direct</option>
              <option>Enthusiastic & Collaborative</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Key Leverage / Highlights</label>
            <textarea value={form.keyLeverage} onChange={(e) => setForm({ ...form, keyLeverage: e.target.value })} rows="3" style={{ ...fieldStyle, resize: 'none' }} />
          </div>
          <button onClick={handleGenerate} className="v-btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
            Generate Negotiation Script
          </button>
        </div>

        <div className="v-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 className="v-gold-text" style={{ margin: '0 0 14px', fontSize: 17, fontWeight: 700 }}>Generated Counter-Offer Script</h2>
            <div
              className="v-font-mono"
              style={{
                flex: 1, background: 'rgba(0,0,0,0.35)', border: '1px solid var(--v-glass-border)', borderRadius: 12,
                padding: 16, fontSize: 12, color: 'var(--v-ink-muted)', whiteSpace: 'pre-line', overflowY: 'auto', maxHeight: 350,
              }}
            >
              {script || 'Click "Generate Negotiation Script" to create your tailored counter-offer message.'}
            </div>
          </div>
          <button
            onClick={() => {
              if (script) {
                navigator.clipboard.writeText(script);
                alert('Script copied to clipboard!');
              }
            }}
            className="v-btn-ghost"
            style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </Layout>
  );
}
