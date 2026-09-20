import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function BehavioralCoach() {
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateSTAR = async (e) => {
    e.preventDefault();
    if (!question || !context || loading) return;
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Behavioral Interview Question:\n${question}\n\nMy Experience/Context:\n${context}`,
          systemInstruction: 'You are an expert executive career coach. Transform the user\'s raw experience into a compelling, professional STAR format (Situation, Task, Action, Result) response with impact metrics.'
        })
      });
      const data = await response.json();
      setResult(data.result || 'Failed to generate STAR story.');
    } catch (err) {
      console.error('Error:', err);
      setResult('Network error connecting to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
          Behavioral Prep
        </p>
        <h1 className="font-bold text-lg" style={{ color: 'var(--v-ink)' }}>STAR Behavioral Coach</h1>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleGenerateSTAR} className="v-card p-6 space-y-4 flex flex-col">
          <h2 className="font-semibold" style={{ color: 'var(--v-ink)' }}>Craft Your Story</h2>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--v-ink-muted)' }}>Behavioral Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Tell me about a time you faced a difficult deadline."
              className="w-full rounded-xl p-3 text-sm focus:outline-none"
              style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--v-glass-border)', color: 'var(--v-ink)' }}
              required
            />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--v-ink-muted)' }}>Your Raw Experience / Notes</label>
            <textarea
              rows={6}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Describe what happened in your own words..."
              className="w-full rounded-xl p-3 text-sm focus:outline-none"
              style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--v-glass-border)', color: 'var(--v-ink)' }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="v-btn-gold w-full justify-center"
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Structuring STAR Story...' : 'Generate STAR Response'}
          </button>
        </form>

        <div className="v-card p-6 flex flex-col">
          <h2 className="font-semibold mb-3" style={{ color: 'var(--v-ink)' }}>Generated STAR Output</h2>
          <div
            className="flex-1 rounded-xl p-4 text-sm overflow-y-auto whitespace-pre-wrap leading-relaxed"
            style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--v-glass-border)', color: 'var(--v-ink-muted)' }}
          >
            {result || 'Your structured Situation, Task, Action, and Result response will appear here...'}
          </div>
        </div>
      </div>
    </Layout>
  );
}
