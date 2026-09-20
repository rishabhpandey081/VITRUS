import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import './App.css';
import AuroraBackground from './components/AuroraBackground';
import Footer from './components/Footer';

// Page Imports
import Dashboard from './pages/Dashboard';
import MockInterviews from './pages/MockInterviews';
import CodingPractice from './pages/CodingPractice';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumeReview from './pages/ResumeReview';
import Analytics from './pages/Analytics';
import JobTracker from './pages/JobTracker';
import QuestionBank from './pages/QuestionBank';
import BehavioralCoach from './pages/BehavioralCoach';
import CompanyGuide from './pages/CompanyGuide';
import Flashcards from './pages/Flashcards';
import History from './pages/History';
import InterviewPlanner from './pages/InterviewPlanner';
import InterviewRoom from './pages/InterviewRoom';
import Profile from './pages/Profile';
import SalaryNegotiator from './pages/SalaryNegotiator';
import StarStoryBuilder from './pages/StarStoryBuilder';

function LandingPage() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="stage" id="stage">
      <AuroraBackground />

      <header className="topbar">
        <Link to="/" className="brand">
          <svg viewBox="0 0 31.5 48.5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bg1" x1="8" y1="0" x2="34.1" y2="28.9" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#9e9e9e"/>
                <stop offset="0.55" stopColor="#414141"/>
                <stop offset="1" stopColor="#cccccc"/>
              </linearGradient>
            </defs>
            <path d="M21.5 0 L21.5 19.5 L31.5 19.5 L31.5 29 L10 48.5 L10 28.5 L0.5 28.5 L0.5 18.5 Z" fill="url(#bg1)"/>
            <rect x="0.5" y="18.5" width="9" height="10" fill="#fdfdfd"/>
            <rect x="22" y="19.5" width="9.5" height="9.5" fill="#fdfdfd"/>
          </svg>
        </Link>
        
        <nav className="links">
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a>
          <a href="#architecture" onClick={(e) => { e.preventDefault(); scrollToSection('architecture'); }}>Architecture</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
        </nav>
        
        <Link to="/login" className="pill pill-nav">
          <span>Sign In</span>
        </Link>
      </header>

      <main className="hero">
        <h1 className="headline">
          <span>Master Your Next</span>
          <span>Technical Interview</span>
        </h1>
        <p className="sub">
          <span>Real-time adaptive simulations with Gemini AI, voice</span>
          <span>recognition, and instant feedback to elevate your skills.</span>
        </p>
        <div className="actions">
          <button type="button" className="pill pill-cta" onClick={() => navigate('/dashboard')}>
            <span>Start Mock Interview</span>
          </button>
          <button type="button" className="ghost" onClick={() => scrollToSection('architecture')}>
            View Architecture
          </button>
        </div>
      </main>

      <section id="about" style={{ padding: '80px 20px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h2>About Virtus</h2>
        <p style={{ opacity: 0.8, maxWidth: '600px', margin: '10px auto' }}>
          An AI-powered interview preparation suite designed to conduct real-time simulations and provide direct feedback.
        </p>
      </section>

      <section id="features" style={{ padding: '80px 20px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h2>Features</h2>
        <p style={{ opacity: 0.8, maxWidth: '600px', margin: '10px auto' }}>
          Adaptive Gemini AI, Voice-to-Text Recognition, and instant performance analysis.
        </p>
      </section>

      <section id="architecture" style={{ padding: '80px 20px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h2>Architecture</h2>
        <div className="logos">
          <div className="lg lg1">
            <svg viewBox="0 0 30 31">
              <mask id="m1"><path d="M0 0h30v31H0z" fill="#fff"/><circle cx="19.5" cy="10.5" r="5.1" fill="#000"/></mask>
              <path d="M0 0h30v31H0z" mask="url(#m1)"/><circle cx="19.5" cy="10.5" r="3" />
            </svg>
            <span>react.js</span>
          </div>
          <div className="lg lg2">
            <svg viewBox="0 0 25 30">
              <path d="M0 0h8v30H0z"/><path d="M12 15a8 8 0 0 1 8-8v16a8 8 0 0 1-8-8z"/>
            </svg>
            <span>node.js</span>
          </div>
          <div className="lg lg3">
            <svg viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="12.35" fill="none" stroke="currentColor" strokeWidth="3.1"/>
              <path d="M9 9Q14 4 19 9" fill="none" stroke="currentColor" strokeWidth="3.1" strokeLinecap="round"/>
              <path d="M9 19Q14 24 19 19" fill="none" stroke="currentColor" strokeWidth="3.1" strokeLinecap="round"/>
            </svg>
            <span>gemini api</span>
          </div>
          <div className="lg lg4">
            <svg viewBox="0 0 28 25.5">
              <path d="M0 12 Q7 2 14 12 T28 12 L28 25.5 L0 25.5 Z"/>
              <path d="M0 16 Q7 6 14 16 T28 16" fill="none" stroke="currentColor" strokeWidth="3.05"/>
              <path d="M0 20 Q7 10 14 20 T28 20" fill="none" stroke="currentColor" strokeWidth="3.05"/>
            </svg>
            <span>web speech</span>
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: '80px 20px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h2>Contact</h2>
        <p style={{ opacity: 0.8, maxWidth: '600px', margin: '10px auto' }}>
          Connect with us to integrate Virtus into your workflow.
        </p>
      </section>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Footer />
      </div>
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="stage">
      <AuroraBackground />
      <main className="hero" style={{ padding: '40px 20px' }}>
        <h1 className="headline"><span>Sign In</span></h1>
        <p className="sub"><span>Access your mock interview dashboard.</span></p>
        <div className="actions">
          <button type="button" className="pill pill-cta" onClick={() => navigate('/dashboard')}>
            <span>Continue with Google</span>
          </button>
          <button type="button" className="ghost" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Main Application Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mock-interviews" element={<MockInterviews />} />
        <Route path="/coding-practice" element={<CodingPractice />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/resume-review" element={<ResumeReview />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/job-tracker" element={<JobTracker />} />
        <Route path="/question-bank" element={<QuestionBank />} />
        <Route path="/behavioral-coach" element={<BehavioralCoach />} />
        <Route path="/company-guide" element={<CompanyGuide />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/history" element={<History />} />
        <Route path="/interview-planner" element={<InterviewPlanner />} />
        <Route path="/interview-room" element={<InterviewRoom />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/salary-negotiator" element={<SalaryNegotiator />} />
        <Route path="/star-story-builder" element={<StarStoryBuilder />} />

        {/* Fallback */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;