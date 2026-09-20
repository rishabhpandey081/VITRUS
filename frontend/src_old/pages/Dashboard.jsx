import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#020617',
      color: 'white',
      fontFamily: 'sans-serif',
      padding: '40px 24px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Top Header */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#818cf8', margin: '0 0 6px 0' }}>Virtus AI Dashboard</h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Welcome back! Choose a tool to accelerate your career prep.</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            backgroundColor: '#0f172a',
            color: 'white',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Sign Out
        </button>
      </div>

      {/* Grid of Tools */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px'
      }}>
        {/* Mock Interviews Card */}
        <div
          onClick={() => alert('Mock Interviews module coming soon!')}
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '16px',
            padding: '24px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <span style={{
            fontSize: '11px',
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            color: '#818cf8',
            border: '1px solid rgba(79, 70, 229, 0.4)',
            padding: '2px 8px',
            borderRadius: '999px',
            width: 'fit-content',
            fontWeight: '600'
          }}>
            AI
          </span>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0 }}>Mock Interviews</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
            Practice live technical interviews with an AI interviewer powered by Gemini.
          </p>
        </div>

        {/* Card 2: Resume Builder (Navigates to /resume-builder) */}
        <div
          onClick={() => navigate('/resume-builder')}
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #4f46e5',
            borderRadius: '16px',
            padding: '24px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 0 15px rgba(79, 70, 229, 0.15)'
          }}
        >
          <span style={{
            fontSize: '11px',
            backgroundColor: 'rgba(56, 189, 248, 0.2)',
            color: '#38bdf8',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            padding: '2px 8px',
            borderRadius: '999px',
            width: 'fit-content',
            fontWeight: '600'
          }}>
            BUILD
          </span>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0 }}>Resume Builder</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
            Tailor and optimize your resume against a target job description with AI.
          </p>
        </div>

        {/* Card 3: Resume Reviewer (Navigates to /resume-review) */}
        <div
          onClick={() => navigate('/resume-review')}
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #4f46e5',
            borderRadius: '16px',
            padding: '24px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 0 15px rgba(79, 70, 229, 0.15)'
          }}
        >
          <span style={{
            fontSize: '11px',
            backgroundColor: 'rgba(168, 85, 247, 0.2)',
            color: '#c084fc',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            padding: '2px 8px',
            borderRadius: '999px',
            width: 'fit-content',
            fontWeight: '600'
          }}>
            REVIEW
          </span>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0 }}>Resume Reviewer</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
            Get a comprehensive ATS score, structural feedback, and section critique.
          </p>
        </div>

        {/* Behavioral Coach Card */}
        <div
          onClick={() => alert('Behavioral Coach module coming soon!')}
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '16px',
            padding: '24px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <span style={{
            fontSize: '11px',
            backgroundColor: 'rgba(168, 85, 247, 0.2)',
            color: '#c084fc',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            padding: '2px 8px',
            borderRadius: '999px',
            width: 'fit-content',
            fontWeight: '600'
          }}>
            STAR
          </span>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0 }}>Behavioral Coach</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
            Structure your experiences into impactful STAR format answers for interviews.
          </p>
        </div>

        {/* Coding Practice Card */}
        <div
          onClick={() => alert('Coding Practice module coming soon!')}
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '16px',
            padding: '24px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <span style={{
            fontSize: '11px',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            color: '#4ade80',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            padding: '2px 8px',
            borderRadius: '999px',
            width: 'fit-content',
            fontWeight: '600'
          }}>
            &lt;/&gt;
          </span>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0 }}>Coding Practice</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
            Get instant AI code reviews, time/space complexity analysis, and clean refactoring.
          </p>
        </div>

        {/* Job Tracker Card */}
        <div
          onClick={() => alert('Job Tracker module coming soon!')}
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '16px',
            padding: '24px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <span style={{
            fontSize: '11px',
            backgroundColor: 'rgba(234, 179, 8, 0.2)',
            color: '#facc15',
            border: '1px solid rgba(234, 179, 8, 0.4)',
            padding: '2px 8px',
            borderRadius: '999px',
            width: 'fit-content',
            fontWeight: '600'
          }}>
            JT
          </span>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0 }}>Job Tracker</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
            Track your target companies, application pipeline, and interview statuses.
          </p>
        </div>
      </div>
    </div>
  );
}