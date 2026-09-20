import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuestionBank() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const questions = [
    { id: 1, title: 'Implement an LRU Cache', category: 'Data Structures', difficulty: 'Medium', company: 'Google' },
    { id: 2, title: 'Explain the JavaScript Event Loop', category: 'Frontend', difficulty: 'Easy', company: 'Amazon' },
    { id: 3, title: 'Design a Scalable Chat System', category: 'System Design', difficulty: 'Hard', company: 'Meta' },
    { id: 4, title: 'What is a Database Index and how does it work?', category: 'Backend', difficulty: 'Medium', company: 'Microsoft' },
    { id: 5, title: 'Find Median from Data Stream', category: 'Algorithms', difficulty: 'Hard', company: 'Google' },
    { id: 6, title: 'Explain React Fiber Architecture', category: 'Frontend', difficulty: 'Hard', company: 'Netflix' },
    { id: 7, title: 'Difference between SQL and NoSQL databases', category: 'Backend', difficulty: 'Easy', company: 'Amazon' },
  ];

  const filtered = questions.filter(q => {
    const matchesCategory = category === 'All' || q.category === category;
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase()) || q.company.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white text-sm">
          ← Dashboard
        </button>
        <h1 className="text-xl font-bold">Interview Question Bank</h1>
        <div className="w-16"></div>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-6 flex-1">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or companies..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Categories</option>
            <option value="Data Structures">Data Structures</option>
            <option value="Algorithms">Algorithms</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="System Design">System Design</option>
          </select>
        </div>

        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((q) => (
              <div key={q.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex justify-between items-center hover:border-indigo-500/50 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-indigo-950 text-indigo-400 border border-indigo-800 px-2 py-0.5 rounded font-medium">
                      {q.category}
                    </span>
                    <span className="text-xs text-slate-400">Asked by <strong className="text-slate-300">{q.company}</strong></span>
                  </div>
                  <h3 className="font-semibold text-base text-slate-100">{q.title}</h3>
                </div>
                <div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                    q.difficulty === 'Hard' ? 'bg-red-950 text-red-400 border-red-800' :
                    q.difficulty === 'Medium' ? 'bg-amber-950 text-amber-400 border-amber-800' :
                    'bg-emerald-950 text-emerald-400 border-emerald-800'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-500 text-sm">
              No matching interview questions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}