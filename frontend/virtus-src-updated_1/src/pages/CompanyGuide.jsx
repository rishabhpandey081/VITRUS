import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CompanyGuide() {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-slate-950 p-6 text-white flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white text-sm">
          ← Dashboard
        </button>
        <h1 className="text-xl font-bold">Company Guides & Interview Loops</h1>
        <div className="w-16"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 max-w-6xl mx-auto w-full">
        <div className="lg:col-span-1 space-y-2">
          {Object.keys(guides).map((comp) => (
            <button
              key={comp}
              onClick={() => setSelectedCompany(comp)}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition ${
                selectedCompany === comp
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {comp} Interview Guide
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6 shadow-xl">
          <div>
            <h2 className="text-3xl font-bold text-white">{current.name}</h2>
            <p className="text-sm text-slate-400 mt-1">Comprehensive preparation guide and interview loop breakdown</p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Interview Rounds & Structure</h3>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-300">
                {current.rounds.map((round, idx) => (
                  <li key={idx}>{round}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Technical & Core Focus</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{current.focus}</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Pro Tips for Success</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{current.tips}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}