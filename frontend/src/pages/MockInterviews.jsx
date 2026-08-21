import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MockInterviews() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  
  const [role, setRole] = useState('Full Stack Engineer');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm your AI interviewer today. Let's begin—could you introduce yourself and walk me through a key project you built recently?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    startCamera();
    speakText("Hello! I'm your AI interviewer today. Let's begin—could you introduce yourself and walk me through a key project you built recently?");
    
    return () => {
      stopCamera();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setCameraError('');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError('Could not access camera/microphone. Please check browser permissions.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const toggleMic = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getAudioTracks().forEach(track => {
        track.enabled = isMicMuted;
      });
    }
    setIsMicMuted(!isMicMuted);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setInputMessage(transcript);
        }
      };

      recognition.onerror = (err) => {
        console.error("Speech recognition error:", err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setIsListening(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    if (isListening && recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
      setIsListening(false);
    }

    const userText = inputMessage;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    setTimeout(() => {
      const aiReply = `Thank you for sharing. Analyzing your response... Let's follow up: How do you handle scalability and performance optimization in your architecture?`;
      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
      speakText(aiReply);
    }, 1200);
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
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #1e293b',
        paddingBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => { stopCamera(); navigate('/dashboard'); }}
            style={{
              backgroundColor: '#0f172a',
              color: 'white',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            &larr; Dashboard
          </button>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#818cf8', margin: 0 }}>Live AI Video & Voice Mock Interview</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '13px', color: '#94a3b8' }}>Target Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              backgroundColor: '#0f172a',
              color: 'white',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '13px',
              outline: 'none'
            }}
          >
            <option>Full Stack Engineer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Data Scientist</option>
          </select>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        gap: '24px',
        flex: 1,
        alignItems: 'stretch'
      }}>
        {/* Left Side: Live Camera View */}
        <div style={{
          backgroundColor: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '400px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8' }}>Your Live Camera Feed</span>
            <span style={{
              fontSize: '11px',
              backgroundColor: isCameraActive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: isCameraActive ? '#4ade80' : '#f87171',
              border: `1px solid ${isCameraActive ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
              padding: '2px 8px',
              borderRadius: '999px'
            }}>
              {isCameraActive ? '● Camera Active & Tracking' : 'Camera Off'}
            </span>
          </div>

          <div style={{
            flex: 1,
            backgroundColor: '#020617',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {cameraError ? (
              <p style={{ color: '#f87171', fontSize: '13px', textAlign: 'center', padding: '20px' }}>{cameraError}</p>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'scaleX(-1)'
                }}
              />
            )}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
            <button
              onClick={toggleMic}
              style={{
                backgroundColor: isMicMuted ? '#ef4444' : '#334155',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 16px',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              {isMicMuted ? 'Unmute Mic' : 'Mute Mic'}
            </button>
            <button
              onClick={isCameraActive ? stopCamera : startCamera}
              style={{
                backgroundColor: isCameraActive ? '#334155' : '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 16px',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              {isCameraActive ? 'Turn Off Camera' : 'Turn On Camera'}
            </button>
          </div>
        </div>

        {/* Right Side: AI Conversation */}
        <div style={{
          backgroundColor: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          height: '600px'
        }}>
          <div style={{ marginBottom: '16px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>AI Voice & Video Interviewer</h2>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Role: <span style={{ color: '#818cf8' }}>{role}</span></p>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            paddingRight: '4px',
            marginBottom: '16px'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'user' ? '#4f46e5' : '#1e293b',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  maxWidth: '85%',
                  fontSize: '13px',
                  lineHeight: '1.5'
                }}
              >
                <strong>{msg.sender === 'ai' ? 'AI Voice Interviewer: ' : 'You: '}</strong>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Bar with Exact Custom Mic SVG Icon */}
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#020617',
              border: `1px solid ${isListening ? '#ef4444' : '#334155'}`,
              borderRadius: '12px',
              padding: '0 12px',
              boxShadow: isListening ? '0 0 12px rgba(239, 68, 68, 0.5)' : 'none'
            }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={isListening ? "Listening... speak now into your mic..." : "Type your answer or click the mic button..."}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: '12px 0',
                  fontSize: '13px',
                  color: 'white',
                  outline: 'none'
                }}
              />
              
              {/* Exact Mic Icon Button matching reference image */}
              <button
                type="button"
                onClick={toggleListening}
                title={isListening ? "Stop listening" : "Start speaking"}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isListening ? '#ef4444' : '#94a3b8',
                  transition: 'color 0.2s'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v1a7 7 0 0 1-14 0v-1"></path>
                  <line x1="12" y1="19" x2="12" y2="22"></line>
                </svg>
              </button>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 20px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}