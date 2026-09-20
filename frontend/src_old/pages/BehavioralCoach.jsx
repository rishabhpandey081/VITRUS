import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BehavioralCoach() {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-slate-950 p-6 text-white flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white text-sm cursor-pointer">
          ← Dashboard
        </button>
        <h1 className="font-bold text-lg text-indigo-400">STAR Behavioral Coach</h1>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleGenerateSTAR} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 flex flex-col shadow-xl">
          <h2 className="font-semibold text-white">Craft Your Story</h2>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Behavioral Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Tell me about a time you faced a difficult deadline."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Your Raw Experience / Notes</label>
            <textarea
              rows={6}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Describe what happened in your own words..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-medium transition text-sm disabled:opacity-50 cursor-pointer shadow-lg shadow-indigo-600/20"
          >
            {loading ? 'Structuring STAR Story...' : 'Generate STAR Response'}
          </button>
        </form>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col shadow-xl">
          <h2 className="font-semibold text-white mb-3">Generated STAR Output</h2>
          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {result || 'Your structured Situation, Task, Action, and Result response will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}