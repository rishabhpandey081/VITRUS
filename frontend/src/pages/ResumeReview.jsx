import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiFileText, FiCpu, FiCheckCircle, FiAlertCircle, FiStar } from 'react-icons/fi';

export default function ResumeReview() {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!resumeText.trim() || !jobDescription.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const matchScore = Math.floor(Math.random() * (96 - 72 + 1)) + 72;
      const analysis = {
        score: matchScore,
        atsCompatibility: matchScore > 85 ? 'Excellent' : 'Good',
        matchedKeywords: ['React', 'JavaScript', 'Tailwind CSS', 'REST APIs', 'State Management'],
        missingKeywords: ['TypeScript', 'Jest / Testing', 'CI/CD Pipelines'],
        recommendation: matchScore > 85
          ? 'Your resume strongly aligns with the target job description. Ensure you highlight quantifiable metrics in your project bullet points.'
          : 'Good foundational match. Consider integrating missing modern keywords and emphasizing scalable system design experience.'
      };

      setResult(analysis);
      setIsAnalyzing(false);

      // Save to localStorage
      const savedReviews = JSON.parse(localStorage.getItem('virtus_resumes') || '[]');
      localStorage.setItem('virtus_resumes', JSON.stringify([...savedReviews, { analysis, date: new Date().toLocaleDateString() }]));
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 md:p-10 flex flex-col">
      <header className="max-w-4xl w-full mx-auto flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-sm font-medium cursor-pointer"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>
        <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-semibold flex items-center gap-1">
          <FiCpu /> AI Resume ATS Matcher
        </span>
      </header>

      <main className="max-w-4xl w-full mx-auto flex-1">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl mb-8"
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Resume & Job Description Analysis</h1>
            <p className="text-slate-300 text-sm">
              Paste your resume details and the target job description below to check your ATS match score and identify critical skill gaps.
            </p>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Your Resume Summary & Skills</label>
                <textarea
                  rows="6"
                  required
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume content or technical skills summary here..."
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Target Job Description</label>
                <textarea
                  rows="6"
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the target job description requirements here..."
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm resize-none"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/30 hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>Analyzing Resume...</>
                ) : (
                  <>
                    <FiFileText /> Run ATS Match Analysis
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold">Analysis Results</h2>
                <p className="text-slate-400 text-xs">Simulated ATS evaluation against target job requirements</p>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10">
                <FiStar className="w-6 h-6 text-yellow-400" />
                <div>
                  <div className="text-xs text-slate-400">Match Score</div>
                  <div className="text-2xl font-bold text-white">{result.score}%</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <FiCheckCircle /> Matched Keywords
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.matchedKeywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <FiAlertCircle /> Missing / Recommended Keywords
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-200">
              <span className="font-semibold block mb-1">AI Recommendation:</span>
              {result.recommendation}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}