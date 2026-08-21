import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SalaryNegotiator() {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-slate-950 p-6 text-white flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white text-sm">
          ← Dashboard
        </button>
        <h1 className="text-xl font-bold">AI Salary Negotiator</h1>
        <div className="w-16"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-lg font-semibold mb-2">Negotiation Inputs</h2>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Current Offer ($)</label>
            <input
              type="text"
              value={form.currentOffer}
              onChange={(e) => setForm({ ...form, currentOffer: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Target Salary ($)</label>
            <input
              type="text"
              value={form.targetSalary}
              onChange={(e) => setForm({ ...form, targetSalary: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Tone</label>
            <select
              value={form.tone}
              onChange={(e) => setForm({ ...form, tone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
            >
              <option>Professional & Confident</option>
              <option>Firm & Direct</option>
              <option>Enthusiastic & Collaborative</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Key Leverage / Highlights</label>
            <textarea
              value={form.keyLeverage}
              onChange={(e) => setForm({ ...form, keyLeverage: e.target.value })}
              rows="3"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm resize-none"
            />
          </div>
          <button
            onClick={handleGenerate}
            className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg font-medium transition text-sm"
          >
            Generate Negotiation Script
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-between">
          <div className="flex-1 flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-indigo-400">Generated Counter-Offer Script</h2>
            <div className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-lg font-mono text-xs text-slate-300 whitespace-pre-line overflow-y-auto max-h-[350px]">
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
            className="mt-6 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-medium transition text-sm"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}