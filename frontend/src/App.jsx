import React from 'react';
import './App.css'; 

function App() {
  return (
    <div className="stage" id="stage">
      
      {/* Background Video */}
      <div className="plate">
        <video className="plate-video" autoPlay muted loop playsInline>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Navigation */}
      <header className="topbar">
        <a href="/" className="brand">
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
        </a>
        
        <nav className="links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#architecture">Architecture</a>
          <a href="#contact">Contact</a>
        </nav>
        
        <a href="#start" className="pill pill-nav">
          <span>Try Mock Interview</span>
        </a>
      </header>

      {/* Hero Section */}
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
          <a href="#start" className="pill pill-cta"><span>Start Mock Interview</span></a>
          <a href="#architecture" className="ghost">View Architecture</a>
        </div>
      </main>

      {/* Tech Stack Logos */}
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

    </div>
  );
}

export default App;