import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMic, FiSquare, FiArrowRight, FiCheckCircle, FiChevronLeft } from 'react-icons/fi';
import { useApp } from '../context/AppContext';

export default function InterviewRoom() {
  const navigate = useNavigate();
  const { selectedInterview, interviewHistory, setInterviewHistory, showToast } = useApp();

  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Dynamic questions based on the selected interview track
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
      // Calculate a score and save to history
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
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <button 
          onClick={() => navigate('/interviews')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition"
        >
          <FiChevronLeft size={18} /> Exit Room
        </button>
        <div className="text-center">
          <h2 className="text-sm font-bold text-gray-800">{selectedInterview?.title} Mock Assessment</h2>
          <p className="text-xs text-gray-400">Question {currentStep + 1} of {questions.length}</p>
        </div>
        <div className="w-24"></div>
      </header>

      {/* Main Room Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-8 flex flex-col justify-center">
        {!isCompleted ? (
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col gap-6"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold px-3 py-1 bg-teal-50 text-teal-800 rounded-full">
                AI Interviewer Active
              </span>
              <span className="text-xs font-bold text-gray-400">
                Progress: {Math.round(((currentStep + 1) / questions.length) * 100)}%
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 leading-snug">
              {questions[currentStep]}
            </h1>

            {/* Video / Audio Preview Box */}
            <div className="bg-gray-900 rounded-2xl h-64 flex flex-col items-center justify-center relative overflow-hidden text-white p-6 shadow-inner">
              <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs flex items-center gap-2 border border-white/10">
                <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-teal-400'}`}></span>
                {isRecording ? 'Recording Answer...' : 'AI Ready'}
              </div>

              {transcript ? (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-300 text-sm text-center max-w-xl italic bg-white/5 p-4 rounded-xl border border-white/10"
                >
                  "{transcript}"
                </motion.p>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto mb-3 border border-teal-500/30">
                    <FiMic size={28} />
                  </div>
                  <p className="text-sm text-gray-400">Click record to speak your response.</p>
                </div>
              )}
            </div>

            {/* Control Bar */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handleToggleRecording}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition shadow-sm ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-teal-700 hover:bg-teal-800 text-white'
                }`}
              >
                {isRecording ? <><FiSquare size={16} /> Stop Recording</> : <><FiMic size={16} /> Answer with Audio</>}
              </button>

              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium text-sm transition shadow-sm"
              >
                {currentStep === questions.length - 1 ? 'Finish Interview' : 'Next Question'} <FiArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-3xl border border-gray-200 shadow-sm text-center flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
              <FiCheckCircle size={40} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Interview Successfully Completed!</h1>
              <p className="text-gray-500 max-w-md mx-auto text-sm">
                Your responses have been saved and evaluated. Check your analytics dashboard to review your performance metrics.
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => navigate('/analytics')}
                className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-xl font-medium text-sm transition shadow-sm"
              >
                View Analytics
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium text-sm transition"
              >
                Return to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}