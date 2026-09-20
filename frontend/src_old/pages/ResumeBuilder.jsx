import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResumeBuilder() {
  const navigate = useNavigate();

  // Chat & AI State
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I'm your AI Resume Architect. Type any prompt to update your resume (e.g., 'Add my GitHub at github.com/rishabh-pandey and LeetCode at leetcode.com/rishabh' or 'Enhance my work experience bullet points')."
    }
  ]);

  // Professional Resume Data State
  const [resumeData, setResumeData] = useState({
    fullName: 'Rishabh Pandey',
    headline: 'Full Stack Software Engineer & AI Enthusiast',
    email: 'rishabh@example.com',
    phone: '+91 98765 43210',
    location: 'Delhi, India',
    linkedin: 'https://linkedin.com/in/rishabh',
    github: 'https://github.com/rishabh',
    leetcode: 'https://leetcode.com/rishabh',
    summary: 'Results-driven Computer Science undergraduate and software developer with a strong foundation in modern web architectures, database management systems, and algorithmic problem-solving. Proven ability to build responsive applications and optimize backend performance.',
    skills: 'Java, JavaScript, React, Node.js, Express, SQL, NoSQL, Git, REST APIs, Data Structures & Algorithms',
    experienceTitle: 'Frontend Developer Intern',
    company: 'Tech Solutions Inc.',
    duration: 'Jan 2025 - Present',
    details: 'Architected and developed responsive user interfaces using React and Tailwind CSS, improving application load times by 25%. Integrated secure RESTful APIs and collaborated with senior engineers on component modularity.',
    education: 'Bachelor of Computer Applications (BCA) — University of Delhi | CGPA: 8.5 / 10 (2022 - 2025)'
  });

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // AI Prompt Handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    const userText = inputPrompt;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputPrompt('');
    setIsThinking(true);

    setTimeout(() => {
      let updatedData = { ...resumeData };
      let aiReply = "I've successfully updated and formatted your resume!";
      const lower = userText.toLowerCase();

      if (lower.includes('github')) {
        const match = userText.match(/github\.com\/[^\s]+/) || userText.match(/github[^\s]+/i);
        if (match) {
          updatedData.github = match[0].startsWith('http') ? match[0] : `https://${match[0]}`;
          aiReply = `Updated your GitHub profile link to ${updatedData.github}.`;
        }
      } else if (lower.includes('leetcode')) {
        const match = userText.match(/leetcode\.com\/[^\s]+/) || userText.match(/leetcode[^\s]+/i);
        if (match) {
          updatedData.leetcode = match[0].startsWith('http') ? match[0] : `https://${match[0]}`;
          aiReply = `Updated your LeetCode profile link to ${updatedData.leetcode}.`;
        }
      } else if (lower.includes('email') || lower.includes('mail')) {
        const match = userText.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (match) {
          updatedData.email = match[0];
          aiReply = `Updated your email address to ${match[0]}.`;
        }
      } else if (lower.includes('name')) {
        const parts = userText.split(/is|to/i);
        if (parts.length > 1) {
          updatedData.fullName = parts[1].trim();
          aiReply = `Updated your full name to ${updatedData.fullName}.`;
        }
      } else if (lower.includes('summary') || lower.includes('about')) {
        updatedData.summary = userText;
        aiReply = "Polished and updated your professional summary for maximum HR impact.";
      } else if (lower.includes('skill')) {
        const newSkills = userText.replace(/add skills|skills|to my/gi, '').trim();
        updatedData.skills = `${resumeData.skills}, ${newSkills}`;
        aiReply = "Successfully integrated your new technical skills into the expertise section.";
      } else {
        updatedData.summary = `Specialized Technologist: ${userText}`;
        aiReply = "I processed your prompt and incorporated the details into your recruiter-ready resume.";
      }

      setResumeData(updatedData);
      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
      setIsThinking(false);
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#020617',
      color: 'white',
      fontFamily: 'sans-serif',
      padding: '24px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Header */}
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto 20px auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            backgroundColor: '#0f172a',
            color: '#818cf8',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ← Dashboard
        </button>

        <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', margin: 0 }}>
          AI Professional Resume Builder
        </h1>

        <button
          onClick={handlePrint}
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
          }}
        >
          📥 Download / Print PDF
        </button>
      </div>

      {/* Main Split Layout */}
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '400px 1fr',
        gap: '24px',
        flex: 1,
        height: 'calc(100vh - 110px)'
      }}>
        {/* Left Side: AI Prompt Assistant */}
        <div style={{
          backgroundColor: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: '100%'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e293b', backgroundColor: '#020617' }}>
            <h2 style={{ fontSize: '14px', color: '#818cf8', margin: 0, fontWeight: '600' }}>
              ✨ AI Prompt Assistant
            </h2>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>
              Modify your resume naturally using AI chat.
            </p>
          </div>

          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'user' ? '#4f46e5' : '#1e293b',
                  color: 'white',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  maxWidth: '85%',
                  lineHeight: '1.4'
                }}
              >
                {msg.text}
              </div>
            ))}
            {isThinking && (
              <div style={{
                alignSelf: 'flex-start',
                backgroundColor: '#1e293b',
                color: '#94a3b8',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '12px',
                fontStyle: 'italic'
              }}>
                ✨ Building professional layout...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} style={{
            padding: '12px',
            borderTop: '1px solid #1e293b',
            backgroundColor: '#020617',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="e.g. Add my GitHub as github.com/rishabh..."
              style={{
                flex: 1,
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '10px 12px',
                color: 'white',
                fontSize: '12px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0 16px',
                fontWeight: '600',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </form>
        </div>

        {/* Right Side: Ultra-Professional Resume Document Preview */}
        <div style={{
          backgroundColor: '#ffffff',
          color: '#111827',
          borderRadius: '16px',
          padding: '50px 60px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          overflowY: 'auto',
          height: '100%',
          boxSizing: 'border-box',
          fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '1px solid #e5e7eb', paddingBottom: '18px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '800', margin: '0 0 4px 0', color: '#111827', letterSpacing: '-0.5px' }}>
              {resumeData.fullName}
            </h1>
            <p style={{ fontSize: '12px', fontWeight: '700', color: '#4f46e5', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              {resumeData.headline}
            </p>
            <div style={{ fontSize: '11px', color: '#4b5563', display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap', fontWeight: '500' }}>
              <a href={`mailto:${resumeData.email}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{resumeData.email}</a>
              <span>•</span>
              <span>{resumeData.phone}</span>
              <span>•</span>
              <span>{resumeData.location}</span>
              <span>•</span>
              <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>LinkedIn</a>
              <span>•</span>
              <a href={resumeData.github} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>GitHub</a>
              <span>•</span>
              <a href={resumeData.leetcode} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>LeetCode</a>
            </div>
          </div>

          {/* PROFESSIONAL SUMMARY */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#111827', borderBottom: '2px solid #111827', paddingBottom: '3px', marginBottom: '8px', letterSpacing: '1px', fontWeight: '700' }}>
              Professional Summary
            </h3>
            <p style={{ fontSize: '12px', color: '#374151', margin: 0, lineHeight: '1.6' }}>
              {resumeData.summary}
            </p>
          </div>

          {/* TECHNICAL SKILLS */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#111827', borderBottom: '2px solid #111827', paddingBottom: '3px', marginBottom: '8px', letterSpacing: '1px', fontWeight: '700' }}>
              Technical Expertise
            </h3>
            <p style={{ fontSize: '12px', color: '#374151', margin: 0, lineHeight: '1.5', fontWeight: '600' }}>
              {resumeData.skills}
            </p>
          </div>

          {/* PROFESSIONAL EXPERIENCE */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#111827', borderBottom: '2px solid #111827', paddingBottom: '3px', marginBottom: '10px', letterSpacing: '1px', fontWeight: '700' }}>
              Professional Experience
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#111827' }}>{resumeData.experienceTitle} — <span style={{ color: '#4f46e5' }}>{resumeData.company}</span></span>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280' }}>{resumeData.duration}</span>
            </div>
            <ul style={{ margin: '4px 0 0 16px', padding: 0, color: '#374151', fontSize: '12px', lineHeight: '1.5' }}>
              <li>{resumeData.details}</li>
            </ul>
          </div>

          {/* EDUCATION */}
          <div>
            <h3 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#111827', borderBottom: '2px solid #111827', paddingBottom: '3px', marginBottom: '8px', letterSpacing: '1px', fontWeight: '700' }}>
              Education
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#111827' }}>{resumeData.education}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}