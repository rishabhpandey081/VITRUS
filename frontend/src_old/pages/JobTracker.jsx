import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JobTracker() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([
    { id: 1, company: 'Google', role: 'Full Stack Engineer', status: 'Interviewing', date: 'Aug 1, 2026' },
    { id: 2, company: 'Amazon', role: 'Software Engineer', status: 'Applied', date: 'Aug 3, 2026' },
    { id: 3, company: 'Microsoft', role: 'Frontend Developer', status: 'Offer', date: 'Jul 25, 2026' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ company: '', role: '', status: 'Applied', date: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.company || !form.role) return;
    setApplications([...applications, { id: Date.now(), ...form, date: form.date || 'Aug 7, 2026' }]);
    setForm({ company: '', role: '', status: 'Applied', date: '' });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white text-sm">
          ← Dashboard
        </button>
        <h1 className="text-xl font-bold">Job Application Tracker</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Add Application
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Company</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date Applied</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-850 transition">
                  <td className="p-4 font-medium text-slate-200">{app.company}</td>
                  <td className="p-4 text-slate-300">{app.role}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      app.status === 'Offer' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                      app.status === 'Interviewing' ? 'bg-amber-950 text-amber-400 border-amber-800' :
                      'bg-indigo-950 text-indigo-400 border-indigo-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{app.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <h2 className="text-xl font-bold text-white">Add Job Application</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Company</label>
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                  placeholder="e.g. Netflix"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Role</label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                  placeholder="e.g. Full Stack Engineer"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                >
                  <option>Applied</option>
                  <option>Interviewing</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-lg text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg text-sm font-medium transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}