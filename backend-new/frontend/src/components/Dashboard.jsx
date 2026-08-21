import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // 1. Import motion
import { FiHome, FiVideo, FiBarChart2, FiUser, FiLogOut, FiArrowRight, FiCheckCircle, FiClock } from 'react-icons/fi';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, interviewHistory } = useApp();

  const latestScore = interviewHistory.length > 0 ? interviewHistory[0].score : 0;

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-6">
        <div>
          <div className="text-2xl font-bold text-teal-800 mb-10 tracking-wide">
            Virtus<span className="text-teal-500">.</span>
          </div>
          <nav className="space-y-2">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-teal-50 text-teal-800 font-medium">
              <FiHome size={20} /> Dashboard
            </Link>
            <Link to="/interviews" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition">
              <FiVideo size={20} /> Mock Interviews
            </Link>
            <Link to="/analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition">
              <FiBarChart2 size={20} /> Analytics
            </Link>
            <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition">
              <FiUser size={20} /> Profile
            </Link>
          </nav>
        </div>
        
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition font-medium w-full"
        >
          <FiLogOut size={20} /> Log Out
        </button>
      </aside>

      {/* 2. Main Content Area wrapped in motion.div */}
      <motion.main 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex-1 p-10 overflow-y-auto"
      >
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
            <p className="text-gray-500 mt-1">Here is an overview of your interview readiness and progress.</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-400">{user.role}</p>
            </div>
          </div>
        </header>

        {/* Quick Stats Grid with stagger effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
              <FiCheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Completed Sessions</p>
              <h3 className="text-2xl font-bold text-gray-800">{interviewHistory.length}</h3>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
              <FiBarChart2 size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Latest Score</p>
              <h3 className="text-2xl font-bold text-gray-800">{latestScore}%</h3>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
              <FiClock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Target Role</p>
              <h3 className="text-lg font-bold text-gray-800 truncate">{user.role}</h3>
            </div>
          </motion.div>
        </div>

        {/* Action Banner */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-800 p-8 rounded-3xl text-white shadow-lg flex justify-between items-center">
          <div>
            <span className="text-xs font-semibold px-3 py-1 bg-teal-600 rounded-full uppercase tracking-wider">
              AI Coach Ready
            </span>
            <h2 className="text-2xl font-bold mt-3">Ready for your next mock interview?</h2>
            <p className="text-teal-100 text-sm mt-1 max-w-xl">
              Practice tailored technical and behavioral questions with instant AI scoring and actionable analytics.
            </p>
          </div>
          <button 
            onClick={() => navigate('/interviews')}
            className="flex items-center gap-2 bg-white text-teal-800 px-6 py-3 rounded-xl font-bold text-sm hover:bg-teal-50 transition shadow-md"
          >
            Start Interview <FiArrowRight size={16} />
          </button>
        </div>
      </motion.main>
    </div>
  );
}