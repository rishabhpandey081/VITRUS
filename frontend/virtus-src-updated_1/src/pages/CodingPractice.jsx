import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function CodingPractice() {
  const [problem, setProblem] = useState('');
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReviewCode = async (e) => {
    e.preventDefault();
    if (!problem || !code || loading) return;
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Coding Problem:\n${problem}\n\nCandidate Solution:\n${code}`,
          systemInstruction: 'You are an expert technical interviewer and senior software engineer. Review the candidate code for correctness, edge cases, time complexity, space complexity, and provide clean refactored code.'
        })
      });
      const data = await response.json();
      setResult(data.result || 'Failed to analyze code.');
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
          Coding Practice
        </p>
        <h1 className="font-bold text-lg" style={{ color: 'var(--v-ink)' }}>AI Coding Assistant</h1>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleReviewCode} className="v-card p-6 space-y-4 flex flex-col">
          <h2 className="font-semibold" style={{ color: 'var(--v-ink)' }}>Submit Code Solution</h2>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--v-ink-muted)' }}>Problem Description</label>
            <input
              type="text"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g., Two Sum - Find indices that add up to target"
              className="w-full rounded-xl p-3 text-sm focus:outline-none"
              style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--v-glass-border)', color: 'var(--v-ink)' }}
              required
            />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--v-ink-muted)' }}>Your Code / Solution</label>
            <textarea
              rows={8}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your Java, JavaScript, or Python code here..."
              className="w-full rounded-xl p-3 font-mono text-xs focus:outline-none"
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
            {loading ? 'Analyzing Complexity & Code...' : 'Review & Optimize Code'}
          </button>
        </form>

        <div className="v-card p-6 flex flex-col">
          <h2 className="font-semibold mb-3" style={{ color: 'var(--v-ink)' }}>AI Code Review & Complexity</h2>
          <div
            className="flex-1 rounded-xl p-4 font-mono text-xs overflow-y-auto whitespace-pre-wrap leading-relaxed"
            style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--v-glass-border)', color: 'var(--v-ink-muted)' }}
          >
            {result || 'Your complexity analysis, bug fixes, and optimized solution will appear here...'}
          </div>
        </div>
      </div>
    </Layout>
  );
}