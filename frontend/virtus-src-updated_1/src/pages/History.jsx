import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-slate-950 p-6 text-white flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white text-sm">
          ← Dashboard
        </button>
        <h1 className="text-xl font-bold">Interview & Session History</h1>
        <div className="w-16"></div>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-4 flex-1">
        {sessions.map((session) => (
          <div key={session.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-white">{session.role}</h2>
                  <span className="text-xs bg-indigo-950 text-indigo-400 border border-indigo-800 px-2 py-0.5 rounded font-medium">
                    {session.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Completed on {session.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-indigo-400">{session.score}</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {session.status}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">AI Feedback & Summary</span>
              <p className="text-sm text-slate-300 leading-relaxed">{session.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}