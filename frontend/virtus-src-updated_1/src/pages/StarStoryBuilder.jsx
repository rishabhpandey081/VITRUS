import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StarStoryBuilder() {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white text-sm">
          ← Dashboard
        </button>
        <h1 className="text-xl font-bold">STAR Story Builder</h1>
        <div className="w-16"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4 overflow-y-auto max-h-[80vh]">
          <h2 className="text-lg font-semibold mb-2">Build Your Behavioral Story</h2>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Story Title / Topic</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Situation (Context & Background)</label>
            <textarea
              name="situation"
              value={form.situation}
              onChange={handleChange}
              rows="3"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Task (Your Responsibility or Goal)</label>
            <textarea
              name="task"
              value={form.task}
              onChange={handleChange}
              rows="3"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Action (Specific Steps You Took)</label>
            <textarea
              name="action"
              value={form.action}
              onChange={handleChange}
              rows="3"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Result (Quantifiable Outcome & Impact)</label>
            <textarea
              name="result"
              value={form.result}
              onChange={handleChange}
              rows="3"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm resize-none"
            />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-between">
          <div className="space-y-4 overflow-y-auto max-h-[60vh]">
            <h2 className="text-lg font-semibold text-indigo-400">Preview: {form.title || 'Untitled Story'}</h2>
            
            <div className="space-y-3 text-sm">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">Situation</span>
                <p className="text-slate-300 leading-relaxed">{form.situation || 'No situation provided.'}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">Task</span>
                <p className="text-slate-300 leading-relaxed">{form.task || 'No task provided.'}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">Action</span>
                <p className="text-slate-300 leading-relaxed">{form.action || 'No action provided.'}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">Result</span>
                <p className="text-slate-300 leading-relaxed">{form.result || 'No result provided.'}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-medium transition text-sm"
          >
            {saved ? 'Story Saved Successfully! ✓' : 'Save STAR Story'}
          </button>
        </div>
      </div>
    </div>
  );
}