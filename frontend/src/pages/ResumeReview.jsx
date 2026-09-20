import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiCheckCircle, FiAlertCircle, FiStar } from 'react-icons/fi';
import Layout from '../components/Layout';

export default function ResumeReview() {
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
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
          AI Resume ATS Matcher
        </p>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>Resume &amp; Job Description Analysis</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="v-card"
        style={{ padding: 32, marginBottom: 24 }}
      >
        <div style={{ marginBottom: 22 }}>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--v-ink-muted)', lineHeight: 1.6, maxWidth: 640 }}>
            Paste your resume details and the target job description below to check your ATS match score and identify critical skill gaps.
          </p>
        </div>

        <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--v-ink-faint)', marginBottom: 8 }}>Your Resume Summary &amp; Skills</label>
              <textarea
                rows="6"
                required
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content or technical skills summary here..."
                style={{ width: '100%', padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.35)', border: '1px solid var(--v-glass-border)', color: 'var(--v-ink)', fontSize: 13.5, outline: 'none', resize: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--v-ink-faint)', marginBottom: 8 }}>Target Job Description</label>
              <textarea
                rows="6"
                required
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description requirements here..."
                style={{ width: '100%', padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.35)', border: '1px solid var(--v-glass-border)', color: 'var(--v-ink)', fontSize: 13.5, outline: 'none', resize: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isAnalyzing}
              className="v-btn-gold"
              style={{ opacity: isAnalyzing ? 0.6 : 1 }}
            >
              {isAnalyzing ? 'Analyzing Resume...' : <><FiFileText /> Run ATS Match Analysis</>}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="v-card"
          style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 22 }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, borderBottom: '1px solid var(--v-glass-border)', paddingBottom: 20 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: 'var(--v-ink)' }}>Analysis Results</h2>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--v-ink-faint)' }}>Simulated ATS evaluation against target job requirements</p>
            </div>
            <div className="v-glass" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderRadius: 14 }}>
              <FiStar size={22} color="var(--v-gold-500)" />
              <div>
                <div style={{ fontSize: 11, color: 'var(--v-ink-faint)' }}>Match Score</div>
                <div className="v-gold-text" style={{ fontSize: 22, fontWeight: 800 }}>{result.score}%</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{ padding: 18, borderRadius: 14, background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6ee7b7', fontWeight: 700, fontSize: 13.5, marginBottom: 10 }}>
                <FiCheckCircle /> Matched Keywords
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {result.matchedKeywords.map((kw, i) => (
                  <span key={i} style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(52, 211, 153, 0.15)', color: '#a7f3d0', fontSize: 11.5 }}>{kw}</span>
                ))}
              </div>
            </div>

            <div style={{ padding: 18, borderRadius: 14, background: 'rgba(226, 183, 20, 0.08)', border: '1px solid rgba(226, 183, 20, 0.28)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--v-gold-300)', fontWeight: 700, fontSize: 13.5, marginBottom: 10 }}>
                <FiAlertCircle /> Missing / Recommended Keywords
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {result.missingKeywords.map((kw, i) => (
                  <span key={i} style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(226, 183, 20, 0.16)', color: 'var(--v-gold-100)', fontSize: 11.5 }}>{kw}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--v-glass-border)', fontSize: 13.5, color: 'var(--v-ink-muted)', lineHeight: 1.6 }}>
            <span style={{ display: 'block', fontWeight: 700, color: 'var(--v-ink)', marginBottom: 4 }}>AI Recommendation:</span>
            {result.recommendation}
          </div>
        </motion.div>
      )}
    </Layout>
  );
}