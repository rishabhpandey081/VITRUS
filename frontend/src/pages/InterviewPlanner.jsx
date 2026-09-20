import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import Layout from '../components/Layout';

const defaultChecklist = [
  { id: 1, category: 'Environment & Tech', text: 'Test webcam, microphone, and speakers on Zoom/Google Meet', completed: false },
  { id: 2, category: 'Environment & Tech', text: 'Ensure stable high-speed internet connection (and backup hotspot ready)', completed: false },
  { id: 3, category: 'Environment & Tech', text: 'Clean, professional background and quiet room with good lighting', completed: false },
  { id: 4, category: 'Mindset & Prep', text: 'Review top 5 STAR behavioral stories and map them to leadership principles', completed: false },
  { id: 5, category: 'Mindset & Prep', text: 'Review company core values and prepare 3 smart questions for the interviewer', completed: false },
  { id: 6, category: 'Code / Design Setup', text: 'Open blank scratchpad or preferred code editor (VS Code / IDE)', completed: false },
  { id: 7, category: 'Logistics', text: 'Have water bottle, notepad, and pen ready at your desk', completed: false }
];

export default function InterviewPlanner() {
  const [checklist, setChecklist] = useState([]);
  const [interviewDate, setInterviewDate] = useState('');
  const [targetCompany, setTargetCompany] = useState('Google');

  useEffect(() => {
    const savedChecklist = JSON.parse(localStorage.getItem('virtus_interview_checklist') || 'null');
    if (savedChecklist) {
      setChecklist(savedChecklist);
    } else {
      setChecklist(defaultChecklist);
      localStorage.setItem('virtus_interview_checklist', JSON.stringify(defaultChecklist));
    }

    const savedDate = localStorage.getItem('virtus_target_interview_date') || '';
    const savedComp = localStorage.getItem('virtus_target_company') || 'Google';
    setInterviewDate(savedDate);
    setTargetCompany(savedComp);
  }, []);

  const toggleItem = (id) => {
    const updated = checklist.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
    setChecklist(updated);
    localStorage.setItem('virtus_interview_checklist', JSON.stringify(updated));
  };

  const handleDateChange = (e) => {
    setInterviewDate(e.target.value);
    localStorage.setItem('virtus_target_interview_date', e.target.value);
  };

  const handleCompanyChange = (e) => {
    setTargetCompany(e.target.value);
    localStorage.setItem('virtus_target_company', e.target.value);
  };

  const completedCount = checklist.filter(i => i.completed).length;
  const progressPercentage = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
          Interview Day Planner
        </p>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>Pre-Flight Interview Checklist</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Header Summary Card */}
        <div className="v-card" style={{ padding: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div>
            <p style={{ margin: 0, fontSize: 13.5, color: 'var(--v-ink-muted)', maxWidth: 420, lineHeight: 1.6 }}>
              Complete your technical setup and mental preparation before stepping into the interview loop.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--v-ink-faint)', marginBottom: 6 }}>Target Company</label>
              <input
                type="text"
                value={targetCompany}
                onChange={handleCompanyChange}
                placeholder="e.g. Google, Meta"
                style={{ padding: 12, borderRadius: 10, background: 'rgba(0,0,0,0.35)', border: '1px solid var(--v-glass-border)', color: 'var(--v-ink)', fontSize: 13.5, outline: 'none', width: 170 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--v-ink-faint)', marginBottom: 6 }}>Interview Date</label>
              <input
                type="date"
                value={interviewDate}
                onChange={handleDateChange}
                style={{ padding: 12, borderRadius: 10, background: 'rgba(0,0,0,0.35)', border: '1px solid var(--v-glass-border)', color: 'var(--v-ink)', fontSize: 13.5, outline: 'none', cursor: 'pointer', width: 180 }}
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="v-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13.5, fontWeight: 700, marginBottom: 12 }}>
            <span style={{ color: 'var(--v-ink-muted)' }}>Readiness Progress</span>
            <span className="v-gold-text">{progressPercentage}% Complete ({completedCount}/{checklist.length})</span>
          </div>
          <div style={{ width: '100%', height: 10, borderRadius: 999, background: 'rgba(0,0,0,0.4)', overflow: 'hidden', border: '1px solid var(--v-glass-border)' }}>
            <motion.div
              style={{ height: '100%', background: 'var(--v-gold-gradient)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Checklist Items */}
        <div style={{ display: 'grid', gap: 12 }}>
          {checklist.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => toggleItem(item.id)}
              className="v-card"
              style={{
                padding: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16,
                background: item.completed ? 'rgba(226,183,20,0.08)' : undefined,
                borderColor: item.completed ? 'var(--v-glass-border-gold)' : undefined,
              }}
            >
              <span style={{ fontSize: 20, color: item.completed ? 'var(--v-gold-500)' : 'var(--v-ink-faint)', flexShrink: 0, display: 'flex' }}>
                {item.completed ? <FiCheckSquare /> : <FiSquare />}
              </span>
              <div>
                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '2px 9px', borderRadius: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--v-glass-border)', color: 'var(--v-ink-muted)', marginBottom: 6 }}>
                  {item.category}
                </span>
                <p style={{
                  margin: 0, fontSize: 13.5, fontWeight: 600,
                  color: item.completed ? 'var(--v-ink-muted)' : 'var(--v-ink)',
                  textDecoration: item.completed ? 'line-through' : 'none',
                }}>
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}