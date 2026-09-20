import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CodingPractice() {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-slate-950 p-6 text-white flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white text-sm cursor-pointer">
          ← Dashboard
        </button>
        <h1 className="font-bold text-lg text-indigo-400">AI Coding Assistant</h1>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleReviewCode} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 flex flex-col shadow-xl">
          <h2 className="font-semibold text-white">Submit Code Solution</h2>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Problem Description</label>
            <input
              type="text"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g., Two Sum - Find indices that add up to target"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Your Code / Solution</label>
            <textarea
              rows={8}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your Java, JavaScript, or Python code here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-medium transition text-sm disabled:opacity-50 cursor-pointer shadow-lg shadow-indigo-600/20"
          >
            {loading ? 'Analyzing Complexity & Code...' : 'Review & Optimize Code'}
          </button>
        </form>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col shadow-xl">
          <h2 className="font-semibold text-white mb-3">AI Code Review & Complexity</h2>
          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {result || 'Your complexity analysis, bug fixes, and optimized solution will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}