import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function ResumeBuilder() {
  const navigate = useNavigate();

  // Chat & AI State
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I'm your AI Resume Architect. Type any prompt to update your resume (e.g., 'Add my GitHub as github.com/rishabh-pandey' or 'Rewrite my summary to highlight full-stack JavaScript experience')."
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

  // AI Prompt Handler using Gemini API
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isThinking) return;

    const userText = inputPrompt;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputPrompt('');
    setIsThinking(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: 'Error: VITE_GEMINI_API_KEY missing in .env file.' }
      ]);
      setIsThinking(false);
      return;
    }

    try {
      const systemPrompt = `You are an expert AI Resume Architect.
Current Resume Object:
${JSON.stringify(resumeData, null, 2)}

User Command: "${userText}"

Instructions:
1. Process the user command to rewrite, improve, add, or update the resume fields professionally.
2. If the user asks to rewrite or generate a summary or bullet points, construct HR-ready text rather than copying their prompt verbatim.
3. Return ONLY a raw JSON object matching the exact key structure of the Current Resume Object:
{
  "fullName": "",
  "headline": "",
  "email": "",
  "phone": "",
  "location": "",
  "linkedin": "",
  "github": "",
  "leetcode": "",
  "summary": "",
  "skills": "",
  "experienceTitle": "",
  "company": "",
  "duration": "",
  "details": "",
  "education": ""
}
Do not include any markdown formatting wrappers or extra text outside the valid JSON string.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }]
          })
        }
      );

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        setResumeData(parsedData);
        setMessages(prev => [
          ...prev,
          { sender: 'ai', text: "I've successfully updated and formatted your resume!" }
        ]);
      } else {
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (err) {
      console.error("Gemini API Error:", err);
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: "Failed to process request. Please verify your API key and try again." }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout contentClassName="v-p-0">
      <div style={{
        color: 'var(--v-ink)',
        fontFamily: 'inherit',
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
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              backgroundColor: 'var(--v-glass-bg-strong)',
              color: 'var(--v-gold-500)',
              border: '1px solid var(--v-glass-border)',
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
            backgroundColor: 'var(--v-glass-bg-strong)',
            border: '1px solid var(--v-glass-border)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            height: '100%'
          }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--v-glass-border)', backgroundColor: 'var(--v-bg-elevated)' }}>
              <h2 style={{ fontSize: '14px', color: 'var(--v-gold-500)', margin: 0, fontWeight: '600' }}>
                ✨ AI Prompt Assistant
              </h2>
              <p style={{ fontSize: '11px', color: 'var(--v-ink-muted)', margin: '4px 0 0 0' }}>
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
                    backgroundColor: msg.sender === 'user' ? 'var(--v-gold-700)' : 'var(--v-glass-border)',
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
                  backgroundColor: 'var(--v-glass-border)',
                  color: 'var(--v-ink-muted)',
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
              borderTop: '1px solid var(--v-glass-border)',
              backgroundColor: 'var(--v-bg-elevated)',
              display: 'flex',
              gap: '8px'
            }}>
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="e.g. Add my GitHub as github.com/rishabh..."
                disabled={isThinking}
                style={{
                  flex: 1,
                  backgroundColor: 'var(--v-glass-bg-strong)',
                  border: '1px solid var(--v-glass-border)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  color: 'white',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={isThinking}
                style={{
                  backgroundColor: 'var(--v-gold-700)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0 16px',
                  fontWeight: '600',
                  fontSize: '12px',
                  cursor: isThinking ? 'not-allowed' : 'pointer',
                  opacity: isThinking ? 0.6 : 1
                }}
              >
                Send
              </button>
            </form>
          </div>

          {/* Right Side: Resume Document Preview */}
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
              <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--v-gold-700)', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
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
                <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#111827' }}>{resumeData.experienceTitle} — <span style={{ color: 'var(--v-gold-700)' }}>{resumeData.company}</span></span>
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
    </Layout>
  );
}