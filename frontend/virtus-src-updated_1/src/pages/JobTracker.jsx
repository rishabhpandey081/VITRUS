import React, { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import Layout from '../components/Layout';

export default function JobTracker() {
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

  const statusStyle = (status) => {
    if (status === 'Offer') return { bg: 'rgba(52, 211, 153, 0.12)', color: '#6ee7b7', border: 'rgba(52, 211, 153, 0.35)' };
    if (status === 'Interviewing') return { bg: 'rgba(226, 183, 20, 0.14)', color: '#f4e3a1', border: 'rgba(226, 183, 20, 0.4)' };
    if (status === 'Rejected') return { bg: 'rgba(248, 113, 113, 0.12)', color: '#fca5a5', border: 'rgba(248, 113, 113, 0.35)' };
    return { bg: 'rgba(255,255,255,0.08)', color: '#f7f6f2', border: 'rgba(255,255,255,0.18)' };
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid var(--v-glass-border)',
    borderRadius: 10,
    padding: '11px 13px',
    color: 'var(--v-ink)',
    fontSize: 13.5,
    outline: 'none',
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6" style={{ flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
            Pipeline
          </p>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>Job Application Tracker</h1>
        </div>
        <button onClick={() => setShowModal(true)} className="v-btn-gold">
          <FiPlus size={16} /> Add Application
        </button>
      </div>

      <div className="v-card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--v-glass-border)' }}>
                {['Company', 'Role', 'Status', 'Date Applied'].map((h) => (
                  <th key={h} style={{ padding: 16, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--v-ink-faint)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ fontSize: 13.5 }}>
              {applications.map((app) => {
                const s = statusStyle(app.status);
                return (
                  <tr key={app.id} style={{ borderBottom: '1px solid var(--v-glass-border)' }}>
                    <td style={{ padding: 16, fontWeight: 700, color: 'var(--v-ink)' }}>{app.company}</td>
                    <td style={{ padding: 16, color: 'var(--v-ink-muted)' }}>{app.role}</td>
                    <td style={{ padding: 16 }}>
                      <span style={{
                        padding: '5px 12px', borderRadius: 999, fontSize: 11.5, fontWeight: 700,
                        background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                      }}>
                        {app.status}
                      </span>
                    </td>
                    <td style={{ padding: 16, color: 'var(--v-ink-faint)' }}>{app.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 100,
        }}>
          <div className="v-card v-glass-strong" style={{ padding: 26, maxWidth: 420, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: 'var(--v-ink)' }}>Add Job Application</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--v-ink-faint)', cursor: 'pointer' }}>
                <FiX size={18} />
              </button>
            </div>
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12.5, color: 'var(--v-ink-muted)', marginBottom: 6 }}>Company</label>
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. Netflix"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12.5, color: 'var(--v-ink-muted)', marginBottom: 6 }}>Role</label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. Full Stack Engineer"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12.5, color: 'var(--v-ink-muted)', marginBottom: 6 }}>Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  style={inputStyle}
                >
                  <option>Applied</option>
                  <option>Interviewing</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 12, paddingTop: 6 }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="v-btn-ghost"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Cancel
                </button>
                <button type="submit" className="v-btn-gold" style={{ flex: 1, justifyContent: 'center' }}>
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
