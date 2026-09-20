import React, { useState } from 'react';
import Layout from '../components/Layout';

const fieldStyle = {
  width: '100%', background: 'rgba(0,0,0,0.35)', border: '1px solid var(--v-glass-border)',
  borderRadius: 10, padding: 12, color: 'var(--v-ink)', fontSize: 13.5, outline: 'none', boxSizing: 'border-box', resize: 'none',
};
const labelStyle = { display: 'block', fontSize: 12.5, color: 'var(--v-ink-muted)', marginBottom: 6 };

export default function StarStoryBuilder() {
  const [form, setForm] = useState({
    title: 'Handling a Critical Production Bug Under Tight Deadlines',
    situation: 'During a product launch at my internship, a critical memory leak surfaced in the frontend rendering pipeline right before peak user traffic.',
    task: 'As the frontend engineer on duty, I needed to identify the root cause, patch the memory leak, and ensure zero downtime for users within a 2-hour window.',
    action: 'I immediately isolated the faulty component using browser profiling tools, identified an uncleaned useEffect subscription causing stale closures, and deployed an optimized memoized fix.',
    result: 'Successfully resolved the bug 30 minutes before launch, preventing crashes and maintaining a seamless user experience for over 10,000 active concurrent users.'
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const previewBlock = (label, value, fallback) => (
    <div style={{ background: 'rgba(0,0,0,0.35)', padding: 16, borderRadius: 12, border: '1px solid var(--v-glass-border)' }}>
      <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--v-gold-500)', marginBottom: 6 }}>{label}</span>
      <p style={{ margin: 0, fontSize: 13.5, color: 'var(--v-ink-muted)', lineHeight: 1.7 }}>{value || fallback}</p>
    </div>
  );

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
          Behavioral Prep
        </p>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>STAR Story Builder</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="v-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto', maxHeight: '80vh' }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700, color: 'var(--v-ink)' }}>Build Your Behavioral Story</h2>
          <div>
            <label style={labelStyle}>Story Title / Topic</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} style={{ ...fieldStyle, resize: undefined }} />
          </div>
          <div>
            <label style={labelStyle}>Situation (Context &amp; Background)</label>
            <textarea name="situation" value={form.situation} onChange={handleChange} rows="3" style={fieldStyle} />
          </div>
          <div>
            <label style={labelStyle}>Task (Your Responsibility or Goal)</label>
            <textarea name="task" value={form.task} onChange={handleChange} rows="3" style={fieldStyle} />
          </div>
          <div>
            <label style={labelStyle}>Action (Specific Steps You Took)</label>
            <textarea name="action" value={form.action} onChange={handleChange} rows="3" style={fieldStyle} />
          </div>
          <div>
            <label style={labelStyle}>Result (Quantifiable Outcome &amp; Impact)</label>
            <textarea name="result" value={form.result} onChange={handleChange} rows="3" style={fieldStyle} />
          </div>
        </div>

        <div className="v-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto', maxHeight: '60vh' }}>
            <h2 className="v-gold-text" style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Preview: {form.title || 'Untitled Story'}</h2>
            {previewBlock('Situation', form.situation, 'No situation provided.')}
            {previewBlock('Task', form.task, 'No task provided.')}
            {previewBlock('Action', form.action, 'No action provided.')}
            {previewBlock('Result', form.result, 'No result provided.')}
          </div>

          <button onClick={handleSave} className="v-btn-gold" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
            {saved ? 'Story Saved Successfully! ✓' : 'Save STAR Story'}
          </button>
        </div>
      </div>
    </Layout>
  );
}
