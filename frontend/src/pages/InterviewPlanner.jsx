import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiCheckSquare, FiCheckCircle, FiSquare, FiCalendar, FiClock, FiShield, FiCpu, FiSmile } from 'react-icons/fi';

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
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 md:p-10 flex flex-col">
      <header className="max-w-4xl w-full mx-auto flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-sm font-medium cursor-pointer"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>
        <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1">
          <FiCheckSquare /> Interview Day Planner
        </span>
      </header>

      <main className="max-w-4xl w-full mx-auto flex-1 space-y-6">
        {/* Header Summary Card */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Pre-Flight Interview Checklist</h1>
            <p className="text-slate-300 text-sm">Complete your technical setup and mental preparation before stepping into the interview loop.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Target Company</label>
              <input
                type="text"
                value={targetCompany}
                onChange={handleCompanyChange}
                placeholder="e.g. Google, Meta"
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm w-full sm:w-40"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Interview Date</label>
              <input
                type="date"
                value={interviewDate}
                onChange={handleDateChange}
                className="p-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm cursor-pointer w-full sm:w-44"
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl space-y-3">
          <div className="flex justify-between items-center text-sm font-semibold">
            <span className="text-slate-300">Readiness Progress</span>
            <span className="text-emerald-400">{progressPercentage}% Complete ({completedCount}/{checklist.length})</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Checklist Items */}
        <div className="grid grid-cols-1 gap-3">
          {checklist.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => toggleItem(item.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${item.completed ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/10 border-white/20 hover:bg-white/15'}`}
            >
              <div className="flex items-center gap-4 flex-1">
                <button
                  type="button"
                  className={`text-xl transition-colors ${item.completed ? 'text-emerald-400' : 'text-slate-400'}`}
                >
                  {item.completed ? <FiCheckSquare /> : <FiSquare />}
                </button>
                <div className="space-y-0.5">
                  <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-semibold inline-block mb-1">
                    {item.category}
                  </span>
                  <p className={`text-sm font-medium ${item.completed ? 'text-emerald-200 line-through opacity-80' : 'text-white'}`}>
                    {item.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}