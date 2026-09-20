import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMic, FiSquare, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';

export default function InterviewRoom() {
  const navigate = useNavigate();
  const { selectedInterview, interviewHistory, setInterviewHistory, showToast } = useApp();

  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    `Explain the core architectural patterns you use when building a scalable ${selectedInterview?.title || 'Frontend'} application.`,
    `How do you handle state management and performance optimizations in complex workflows?`,
    `Describe a time you had to debug a difficult performance bottleneck or race condition under a tight deadline.`,
    `What are your strategies for maintaining high code quality and test coverage across a team?`,
    `Do you have any questions about our technical stack or engineering culture?`
  ];

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTranscript('Listening to your response... (Speak clearly into your microphone)');
      setTimeout(() => {
        setTranscript('I typically rely on modular component design, memoization techniques like useMemo/useCallback, and clean Context state architecture to prevent unnecessary re-renders and maintain optimal performance.');
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setTranscript('');
      setIsRecording(false);
    } else {
      const newScore = Math.floor(Math.random() * (95 - 78 + 1)) + 78;
      const newSession = {
        id: Date.now(),
        title: selectedInterview?.title || 'Technical Interview',
        score: newScore,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      setInterviewHistory([newSession, ...interviewHistory]);
      showToast(`Interview completed! Scored ${newScore}%.`);
      setIsCompleted(true);
    }
  };

  return (
    <Layout footer={false}>
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
          {selectedInterview?.title || 'Technical'} Mock Assessment
        </p>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Question {currentStep + 1} of {questions.length}</h1>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {!isCompleted ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="v-card"
            style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, padding: '4px 12px', background: 'rgba(226,183,20,0.14)', color: 'var(--v-gold-300)', border: '1px solid rgba(226,183,20,0.4)', borderRadius: 999 }}>
                AI Interviewer Active
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--v-ink-faint)' }}>
                Progress: {Math.round(((currentStep + 1) / questions.length) * 100)}%
              </span>
            </div>

            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--v-ink)', lineHeight: 1.5, margin: 0 }}>
              {questions[currentStep]}
            </h1>

            {/* Video / Audio Preview Box */}
            <div
              style={{
                background: 'rgba(0,0,0,0.5)', border: '1px solid var(--v-glass-border)', borderRadius: 18,
                height: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden', padding: 24,
              }}
            >
              <div style={{
                position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
                padding: '5px 14px', borderRadius: 999, fontSize: 11.5, display: 'flex', alignItems: 'center', gap: 8,
                border: '1px solid var(--v-glass-border)', color: 'var(--v-ink-muted)',
              }}>
                <span style={{
                  width: 9, height: 9, borderRadius: '50%',
                  background: isRecording ? '#ef4444' : 'var(--v-gold-500)',
                  boxShadow: isRecording ? '0 0 8px #ef4444' : '0 0 8px rgba(226,183,20,0.7)',
                }} />
                {isRecording ? 'Recording Answer...' : 'AI Ready'}
              </div>

              {transcript ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ color: 'var(--v-ink-muted)', fontSize: 13.5, textAlign: 'center', maxWidth: 480, fontStyle: 'italic', background: 'rgba(255,255,255,0.04)', padding: 16, borderRadius: 14, border: '1px solid var(--v-glass-border)' }}
                >
                  "{transcript}"
                </motion.p>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%', background: 'rgba(226,183,20,0.14)', color: 'var(--v-gold-500)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', border: '1px solid rgba(226,183,20,0.35)',
                  }}>
                    <FiMic size={28} />
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--v-ink-faint)', margin: 0 }}>Click record to speak your response.</p>
                </div>
              )}
            </div>

            {/* Control Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
              <button
                onClick={handleToggleRecording}
                className={isRecording ? undefined : 'v-btn-gold'}
                style={isRecording ? {
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 999,
                  background: '#ef4444', color: '#fff', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                } : undefined}
              >
                {isRecording ? <><FiSquare size={16} /> Stop Recording</> : <><FiMic size={16} /> Answer with Audio</>}
              </button>

              <button onClick={handleNextQuestion} className="v-btn-ghost">
                {currentStep === questions.length - 1 ? 'Finish Interview' : 'Next Question'} <FiArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="v-card"
            style={{ padding: 44, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}
          >
            <div style={{
              width: 76, height: 76, borderRadius: '50%', background: 'var(--v-gold-gradient)', color: '#1a1305',
              display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(226,183,20,0.5)',
            }}>
              <FiCheckCircle size={38} />
            </div>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--v-ink)', margin: '0 0 8px' }}>Interview Successfully Completed!</h1>
              <p style={{ color: 'var(--v-ink-muted)', maxWidth: 420, margin: '0 auto', fontSize: 13.5, lineHeight: 1.6 }}>
                Your responses have been saved and evaluated. Check your analytics dashboard to review your performance metrics.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              <button onClick={() => navigate('/analytics')} className="v-btn-gold">
                View Analytics
              </button>
              <button onClick={() => navigate('/dashboard')} className="v-btn-ghost">
                Return to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
