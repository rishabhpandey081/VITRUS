import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-dots" aria-hidden="true">
        <div className="footer-dots__line" />
      </div>

      <div className="site-footer__inner">
        <div className="site-footer__top">
          <h2>Practice Like It's the Real Interview.</h2>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            <a href="/dashboard">Dashboard</a>
            <a href="/mock-interviews">Mock Interviews</a>
            <a href="/coding-practice">Coding Practice</a>
            <a href="/resume-builder">Resume Builder</a>
            <a href="/analytics">Analytics</a>
          </nav>

          <nav className="site-footer__nav" aria-label="Company links">
            <a href="/job-tracker">Job Tracker</a>
            <a href="/question-bank">Question Bank</a>
            <a href="#about">About Virtus</a>
            <a href="#contact">Contact Us</a>
          </nav>

          <nav className="site-footer__nav" aria-label="Social links">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://x.com" target="_blank" rel="noreferrer">Follow Us on X</a>
          </nav>
        </div>

        <div className="site-footer__brand-row">
          <a href="/" className="site-footer__brand" aria-label="Virtus home">
            <span className="site-footer__mark" aria-hidden="true" />
            <span>Virtus</span>
          </a>
        </div>

        <div className="site-footer__legal">
          <p>© 2026 Virtus. All rights reserved.</p>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}
