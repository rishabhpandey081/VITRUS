import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiTrendingUp, FiAward, FiCheckCircle, FiBarChart2, FiTarget, FiZap } from 'react-icons/fi';

export default function Analytics() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSessions: 0,
    overallAvgScore: 0,
    trackBreakdown: {},
    readinessLevel: 'Evaluating...'
  });

  useEffect(() => {
    const savedInterviews = JSON.parse(localStorage.getItem('virtus_interviews') || '[]');
    
    if (savedInterviews.length > 0) {
      const total = savedInterviews.length;
      const scores = savedInterviews.map(i => i.evaluation?.score || 0);
      const overallAvg = Math.round(scores.reduce((a, b) => a + b, 0) / total);

      // Group by track
      const breakdown = {};
      savedInterviews.forEach(item => {
        const track = item.track || 'general';
        if (!breakdown[track]) {
          breakdown[track] = { count: 0, totalScore: 0 };
        }
        breakdown[track].count += 1;
        breakdown[track].totalScore += (item.evaluation?.score || 0);
      });

      const trackAverages = {};
      Object.keys(breakdown).forEach(track => {
        trackAverages[track] = Math.round(breakdown[track].totalScore / breakdown[track].count);
      });

      let readiness = 'Beginner Candidate';
      if (overallAvg >= 88) readiness = 'Interview Ready (Tier 1)';
      else if (overallAvg >= 78) readiness = 'Strong Contender (Tier 2)';
      else if (overallAvg > 0) readiness = 'Developing Proficiency';

      setStats({
        totalSessions: total,
        overallAvgScore: overallAvg,
        trackBreakdown: trackAverages,
        readinessLevel: readiness
      });
    }
  }, []);

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
          <FiBarChart2 /> Performance Analytics
        </span>
      </header>

      <main className="max-w-4xl w-full mx-auto flex-1 space-y-6">
        {/* Top Summary Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <FiZap /> Candidate Readiness Index
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{stats.readinessLevel}</h1>
            <p className="text-slate-300 text-sm max-w-lg">
              Aggregated insights from all completed mock interview evaluations. Keep practicing to maintain high technical accuracy and response clarity.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center min-w-[160px]">
            <FiAward className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">{stats.overallAvgScore}/100</div>
            <div className="text-xs text-slate-400 mt-1">Global Avg Score</div>
          </div>
        </motion.div>

        {/* Track Performance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl space-y-4"
          >
            <div className="flex items-center gap-2 font-bold text-base pb-3 border-b border-white/10">
              <FiTarget className="text-indigo-400" /> Track Performance Breakdown
            </div>

            {Object.keys(stats.trackBreakdown).length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">
                No mock interview sessions recorded yet. Complete a session to view track metrics.
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(stats.trackBreakdown).map(([trackName, score], idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="capitalize font-semibold text-slate-200">{trackName} Track</span>
                      <span className="font-bold text-cyan-300">{score}/100</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-500" 
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl space-y-4"
          >
            <div className="flex items-center gap-2 font-bold text-base pb-3 border-b border-white/10">
              <FiTrendingUp className="text-emerald-400" /> Key Strengths & Growth Areas
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                  <FiCheckCircle /> Structured Problem Framing
                </div>
                <p className="text-xs text-slate-300">Candidates consistently demonstrate clear breakdown of technical requirements during simulated Q&A.</p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                  <FiTrendingUp /> Architectural Depth
                </div>
                <p className="text-xs text-slate-300">Incorporate real-world scale metrics and edge-case handling to push scores into the top 95th percentile.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}