import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Layout from '../components/Layout';

export default function QuestionBank() {
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

  const difficultyStyle = (d) => {
    if (d === 'Hard') return { bg: 'rgba(248, 113, 113, 0.12)', color: '#fca5a5', border: 'rgba(248, 113, 113, 0.35)' };
    if (d === 'Medium') return { bg: 'rgba(226, 183, 20, 0.14)', color: '#f4e3a1', border: 'rgba(226, 183, 20, 0.4)' };
    return { bg: 'rgba(52, 211, 153, 0.12)', color: '#6ee7b7', border: 'rgba(52, 211, 153, 0.35)' };
  };

  const controlStyle = {
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid var(--v-glass-border)',
    borderRadius: 12,
    padding: '12px 16px',
    color: 'var(--v-ink)',
    fontSize: 13.5,
    outline: 'none',
  };

  return (
    <Layout>
      <div style={{ marginBottom: 28 }}>
        <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
          Question Bank
        </p>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>Interview Question Bank</h1>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 22 }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
          <FiSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--v-ink-faint)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or companies..."
            style={{ ...controlStyle, width: '100%', paddingLeft: 40 }}
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={controlStyle}
        >
          <option value="All">All Categories</option>
          <option value="Data Structures">Data Structures</option>
          <option value="Algorithms">Algorithms</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="System Design">System Design</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.length > 0 ? (
          filtered.map((q) => {
            const d = difficultyStyle(q.difficulty);
            return (
              <div key={q.id} className="v-card" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(226,183,20,0.12)', color: 'var(--v-gold-300)', border: '1px solid rgba(226,183,20,0.32)', padding: '2px 9px', borderRadius: 6 }}>
                      {q.category}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--v-ink-faint)' }}>
                      Asked by <strong style={{ color: 'var(--v-ink-muted)' }}>{q.company}</strong>
                    </span>
                  </div>
                  <h3 style={{ margin: 0, fontSize: 15.5, fontWeight: 700, color: 'var(--v-ink)' }}>{q.title}</h3>
                </div>
                <span style={{
                  fontSize: 11.5, fontWeight: 700, padding: '5px 13px', borderRadius: 999,
                  background: d.bg, color: d.color, border: `1px solid ${d.border}`, flexShrink: 0,
                }}>
                  {q.difficulty}
                </span>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--v-ink-faint)', fontSize: 13.5 }}>
            No matching interview questions found.
          </div>
        )}
      </div>
    </Layout>
  );
}
