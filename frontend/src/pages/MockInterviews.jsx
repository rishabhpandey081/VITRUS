import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

// ---------------------------------------------------------------------------
// Gemini Bidi WebSocket API Configuration
// ---------------------------------------------------------------------------
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-2.0-flash-exp';
const WS_URL = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${GEMINI_API_KEY}`;

const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000;
const MIC_BUFFER_SIZE = 4096;

const PERSONA_INSTRUCTION = (role) => `You are Ava, a warm, sharp, and highly experienced technical interviewer conducting a live, spoken interview for a ${role} position.

Personality & style:
- You sound genuinely human: natural pacing, casual warmth, occasional light humor.
- Keep your spoken turns short — 1 to 3 sentences at a time.
- Ask one question at a time. Listen to the answer, react to specifics, then ask a follow-up.
- Never break character or mention that you are an AI model.`;

// --- Audio PCM Encoding / Decoding Helpers ---------------------------------

function floatTo16BitPCM(float32Array) {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  for (let i = 0, offset = 0; i < float32Array.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}

function downsampleBuffer(buffer, inputSampleRate, outputSampleRate) {
  if (outputSampleRate === inputSampleRate) return buffer;
  const ratio = inputSampleRate / outputSampleRate;
  const newLength = Math.round(buffer.length / ratio);
  const result = new Float32Array(newLength);
  let offsetResult = 0;
  let offsetBuffer = 0;
  while (offsetResult < newLength) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * ratio);
    let accum = 0;
    let count = 0;
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
      accum += buffer[i];
      count++;
    }
    result[offsetResult] = count > 0 ? accum / count : 0;
    offsetResult++;
    offsetBuffer = nextOffsetBuffer;
  }
  return result;
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function pcm16ToFloat32(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  const length = arrayBuffer.byteLength / 2;
  const result = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    const int16 = view.getInt16(i * 2, true);
    result[i] = int16 / (int16 < 0 ? 0x8000 : 0x7fff);
  }
  return result;
}

// ---------------------------------------------------------------------------

export default function MockInterviews() {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const wsRef = useRef(null);
  const isSetupCompleteRef = useRef(false);

  const micStreamRef = useRef(null);
  const micContextRef = useRef(null);
  const micSourceRef = useRef(null);
  const micProcessorRef = useRef(null);
  const isMicMutedRef = useRef(false);

  const playbackContextRef = useRef(null);
  const nextPlayTimeRef = useRef(0);
  const activeSourcesRef = useRef([]);

  const [role, setRole] = useState('Full Stack Engineer');
  const [hasStarted, setHasStarted] = useState(false);
  const [connectionState, setConnectionState] = useState('IDLE');
  const [connectionError, setConnectionError] = useState('');

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [cameraError, setCameraError] = useState('');

  const [transcript, setTranscript] = useState([]);
  const liveUserLineRef = useRef('');
  const liveModelLineRef = useRef('');

  useEffect(() => {
    return () => {
      endCall();
    };
  }, []);

  useEffect(() => {
    isMicMutedRef.current = isMicMuted;
  }, [isMicMuted]);

  // --- Camera Operations ---
  const startCamera = async () => {
    try {
      setCameraError('');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsCameraActive(true);
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError('Could not access camera. Please verify media permissions.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const toggleCamera = () => (isCameraActive ? stopCamera() : startCamera());
  const toggleMic = () => setIsMicMuted((m) => !m);

  // --- Audio Output Playback ---
  const ensurePlaybackContext = () => {
    if (!playbackContextRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      playbackContextRef.current = new Ctx({ sampleRate: OUTPUT_SAMPLE_RATE });
      nextPlayTimeRef.current = playbackContextRef.current.currentTime;
    }
    return playbackContextRef.current;
  };

  const stopAllPlayback = () => {
    activeSourcesRef.current.forEach((src) => {
      try { src.stop(); } catch (e) {}
    });
    activeSourcesRef.current = [];
    if (playbackContextRef.current) {
      nextPlayTimeRef.current = playbackContextRef.current.currentTime;
    }
  };

  const playAudioChunk = (base64Data) => {
    const ctx = ensurePlaybackContext();
    const arrayBuffer = base64ToArrayBuffer(base64Data);
    const float32 = pcm16ToFloat32(arrayBuffer);

    const audioBuffer = ctx.createBuffer(1, float32.length, OUTPUT_SAMPLE_RATE);
    audioBuffer.copyToChannel(float32, 0);

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);

    const startAt = Math.max(nextPlayTimeRef.current, ctx.currentTime);
    source.start(startAt);
    nextPlayTimeRef.current = startAt + audioBuffer.duration;

    activeSourcesRef.current.push(source);
    source.onended = () => {
      activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== source);
      if (activeSourcesRef.current.length === 0 && nextPlayTimeRef.current <= ctx.currentTime + 0.05) {
        setConnectionState((prev) => (prev === 'AI_SPEAKING' ? 'LISTENING' : prev));
      }
    };
  };

  // --- Microphone Capture ---
  const startMicStreaming = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micStreamRef.current = stream;

    const Ctx = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new Ctx();
    micContextRef.current = audioCtx;

    const source = audioCtx.createMediaStreamSource(stream);
    micSourceRef.current = source;

    const processor = audioCtx.createScriptProcessor(MIC_BUFFER_SIZE, 1, 1);
    micProcessorRef.current = processor;

    processor.onaudioprocess = (event) => {
      if (!isSetupCompleteRef.current || isMicMutedRef.current) return;
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

      const inputData = event.inputBuffer.getChannelData(0);
      const downsampled = downsampleBuffer(inputData, audioCtx.sampleRate, INPUT_SAMPLE_RATE);
      const pcm16 = floatTo16BitPCM(downsampled);
      const base64Audio = arrayBufferToBase64(pcm16);

      wsRef.current.send(JSON.stringify({
        realtimeInput: {
          mediaChunks: [{
            mimeType: 'audio/pcm',
            data: base64Audio,
          }],
        },
      }));
    };

    source.connect(processor);
    processor.connect(audioCtx.destination);
  };

  const stopMicStreaming = () => {
    if (micProcessorRef.current) {
      micProcessorRef.current.disconnect();
      micProcessorRef.current.onaudioprocess = null;
      micProcessorRef.current = null;
    }
    if (micSourceRef.current) {
      micSourceRef.current.disconnect();
      micSourceRef.current = null;
    }
    if (micContextRef.current) {
      micContextRef.current.close().catch(() => {});
      micContextRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
  };

  // --- Transcript Line Handling ---
  const appendOrUpdateLine = (speakerRole, textChunk) => {
    const lineRef = speakerRole === 'user' ? liveUserLineRef : liveModelLineRef;
    lineRef.current += textChunk;

    setTranscript((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (last && last.role === speakerRole && last.live) {
        next[next.length - 1] = { role: speakerRole, text: lineRef.current, live: true };
      } else {
        next.push({ role: speakerRole, text: lineRef.current, live: true });
      }
      return next;
    });
  };

  const finalizeLine = (speakerRole) => {
    const lineRef = speakerRole === 'user' ? liveUserLineRef : liveModelLineRef;
    if (!lineRef.current) return;
    setTranscript((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (last && last.role === speakerRole && last.live) {
        next[next.length - 1] = { role: speakerRole, text: lineRef.current, live: false };
      }
      return next;
    });
    lineRef.current = '';
  };

  // --- WebSocket Connection ---
  const connectAndStart = async () => {
    console.log("Loaded VITE_GEMINI_API_KEY:", GEMINI_API_KEY ? `${GEMINI_API_KEY.slice(0, 6)}...` : "UNDEFINED");

    if (!GEMINI_API_KEY) {
      setConnectionError('VITE_GEMINI_API_KEY is undefined in environment variables. Restart your Vite dev server after updating .env');
      return;
    }

    setHasStarted(true);
    setConnectionState('CONNECTING');
    setConnectionError('');
    isSetupCompleteRef.current = false;

    await startCamera();

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = async () => {
      ws.send(JSON.stringify({
        setup: {
          model: `models/${MODEL_NAME}`,
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Aoede' } },
            },
          },
          systemInstruction: {
            parts: [{ text: PERSONA_INSTRUCTION(role) }],
          },
        },
      }));

      try {
        await startMicStreaming();
      } catch (err) {
        console.error('Microphone access error:', err);
        setConnectionError('Microphone permission required to start interview call.');
      }
    };

    ws.onmessage = (event) => {
      let msg;
      try {
        msg = typeof event.data === 'string' ? JSON.parse(event.data) : null;
      } catch (e) {
        return;
      }
      if (!msg) return;

      if (msg.setupComplete) {
        isSetupCompleteRef.current = true;
        setConnectionState('LISTENING');

        // Send initial user trigger to start interview
        ws.send(JSON.stringify({
          clientContent: {
            turns: [{
              role: 'user',
              parts: [{ text: `Hello, I am ready for the ${role} interview. Please introduce yourself and begin.` }]
            }],
            turnComplete: true
          }
        }));
        return;
      }

      const serverContent = msg.serverContent;
      if (!serverContent) return;

      if (serverContent.interrupted) {
        stopAllPlayback();
        finalizeLine('model');
        setConnectionState('LISTENING');
      }

      if (serverContent.inputTranscription?.text) {
        appendOrUpdateLine('user', serverContent.inputTranscription.text);
      }

      if (serverContent.outputTranscription?.text) {
        appendOrUpdateLine('model', serverContent.outputTranscription.text);
      }

      const parts = serverContent.modelTurn?.parts || [];
      parts.forEach((part) => {
        if (part.inlineData?.data) {
          setConnectionState('AI_SPEAKING');
          playAudioChunk(part.inlineData.data);
        }
      });

      if (serverContent.turnComplete) {
        finalizeLine('user');
        finalizeLine('model');
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    ws.onclose = (e) => {
      isSetupCompleteRef.current = false;
      if (e.code === 1008) {
        setConnectionError('Connection failed (Error 1008). Ensure VITE_GEMINI_API_KEY in your .env file is valid and Vite was restarted.');
      } else if (e.code !== 1000) {
        setConnectionError(`Connection closed (Code ${e.code}). Please try reconnecting.`);
      }
      setConnectionState('IDLE');
    };
  };

  const endCall = () => {
    isSetupCompleteRef.current = false;
    stopMicStreaming();
    stopAllPlayback();
    if (wsRef.current) {
      try { wsRef.current.close(1000, 'End Call'); } catch (e) {}
      wsRef.current = null;
    }
    if (playbackContextRef.current) {
      playbackContextRef.current.close().catch(() => {});
      playbackContextRef.current = null;
    }
    stopCamera();
    setConnectionState('IDLE');
  };

  const handleEndCall = () => {
    endCall();
    navigate('/dashboard');
  };

  // --- UI Styling States ---
  const stateLabel = {
    IDLE: 'Ready',
    CONNECTING: 'Connecting…',
    LISTENING: 'Listening to you…',
    AI_SPEAKING: 'Speaking…',
  }[connectionState];

  const stateColor = {
    IDLE: { bg: 'rgba(34, 197, 94, 0.2)', fg: '#4ade80' },
    CONNECTING: { bg: 'rgba(59, 130, 246, 0.2)', fg: '#60a5fa' },
    LISTENING: { bg: 'rgba(34, 197, 94, 0.2)', fg: '#4ade80' },
    AI_SPEAKING: { bg: 'rgba(226, 183, 20, 0.2)', fg: '#f4e3a1' },
  }[connectionState];

  return (
    <Layout contentClassName="v-p-0">
      <div style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', gap: '16px', color: 'white' }}>

        {/* Header Bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          backgroundColor: 'var(--v-glass-bg-strong)', padding: '12px 20px',
          borderRadius: '12px', border: '1px solid var(--v-glass-border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              width: '10px', height: '10px', borderRadius: '50%',
              backgroundColor: connectionState === 'LISTENING' ? '#22c55e' : connectionState === 'AI_SPEAKING' ? 'var(--v-gold-500)' : '#ef4444',
              display: 'inline-block',
            }} />
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: 'white' }}>Live Voice Interview Call</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontSize: '13px', color: 'var(--v-ink-muted)' }}>Role:</label>
            <select
              value={role}
              disabled={hasStarted}
              onChange={(e) => setRole(e.target.value)}
              style={{
                backgroundColor: 'var(--v-bg-elevated)', color: 'white',
                border: '1px solid var(--v-glass-border)', borderRadius: '6px',
                padding: '6px 10px', fontSize: '13px',
              }}
            >
              <option>Full Stack Engineer</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Data Scientist</option>
            </select>
          </div>
        </div>

        {connectionError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#fca5a5', padding: '10px 16px', borderRadius: '10px', fontSize: '13px',
          }}>
            {connectionError}
          </div>
        )}

        {/* Viewport */}
        {!hasStarted ? (
          <div style={{
            flex: 1, backgroundColor: 'var(--v-bg-elevated)', borderRadius: '16px',
            border: '1px solid var(--v-glass-border)', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '20px',
          }}>
            <div style={{
              width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'var(--v-gold-700)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold',
            }}>
              AI
            </div>
            <h2 style={{ margin: 0, fontSize: '22px' }}>Ready for your {role} interview?</h2>
            <p style={{ color: 'var(--v-ink-muted)', fontSize: '14px', margin: 0 }}>
              Ensure your camera and microphone are connected before joining.
            </p>
            <button
              onClick={connectAndStart}
              className="v-btn-gold"
              style={{ padding: '14px 36px', fontSize: '16px' }}
            >
              Start Interview Call
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', minHeight: 0 }}>

            {/* AI Avatar Pane */}
            <div style={{
              backgroundColor: 'var(--v-bg-elevated)', borderRadius: '16px',
              border: connectionState === 'AI_SPEAKING' ? '2px solid var(--v-gold-500)' : '1px solid var(--v-glass-border)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              position: 'relative', padding: '24px',
              boxShadow: connectionState === 'AI_SPEAKING' ? '0 0 24px rgba(226, 183, 20, 0.3)' : 'none',
              transition: 'box-shadow 200ms ease, border-color 200ms ease',
            }}>
              <div style={{
                width: '110px', height: '110px', borderRadius: '50%', backgroundColor: 'var(--v-gold-700)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 'bold',
                color: 'white', marginBottom: '16px', border: '4px solid rgba(255, 255, 255, 0.1)',
                transform: connectionState === 'AI_SPEAKING' ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 200ms ease',
              }}>
                AI
              </div>

              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Ava — AI Interviewer</h3>

              <div style={{
                fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px',
                backgroundColor: stateColor.bg, color: stateColor.fg, border: '1px solid currentColor',
              }}>
                {connectionState === 'AI_SPEAKING' && '🔊 '}
                {connectionState === 'LISTENING' && '🎙️ '}
                {connectionState === 'CONNECTING' && '⏳ '}
                {stateLabel}
              </div>
            </div>

            {/* Candidate Video Pane */}
            <div style={{
              backgroundColor: 'var(--v-bg-elevated)', borderRadius: '16px',
              border: connectionState === 'LISTENING' ? '2px solid #22c55e' : '1px solid var(--v-glass-border)',
              position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: connectionState === 'LISTENING' ? '0 0 24px rgba(34, 197, 94, 0.3)' : 'none',
              transition: 'box-shadow 200ms ease, border-color 200ms ease',
            }}>
              {cameraError ? (
                <p style={{ color: '#f87171', padding: '20px', textAlign: 'center', fontSize: '14px' }}>{cameraError}</p>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
                />
              )}

              {isMicMuted && (
                <div style={{
                  position: 'absolute', top: '16px', right: '16px', background: 'rgba(239, 68, 68, 0.85)',
                  color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px',
                }}>
                  MIC MUTED
                </div>
              )}
            </div>
          </div>
        )}

        {/* Live Transcript Display */}
        {hasStarted && (
          <div style={{
            backgroundColor: 'var(--v-glass-bg-strong)', border: '1px solid var(--v-glass-border)',
            borderRadius: '12px', padding: '14px 18px', maxHeight: '160px', overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: '8px',
          }}>
            {transcript.length === 0 ? (
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--v-ink-faint)' }}>Transcript will appear here as you speak…</p>
            ) : (
              transcript.map((line, idx) => (
                <p key={idx} style={{ margin: 0, fontSize: '13px', lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 700, color: line.role === 'model' ? 'var(--v-gold-500)' : '#4ade80' }}>
                    {line.role === 'model' ? 'Ava: ' : 'You: '}
                  </span>
                  <span style={{ color: 'var(--v-ink-muted)' }}>{line.text}</span>
                </p>
              ))
            )}
          </div>
        )}

        {/* Call Controls */}
        {hasStarted && (
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px',
            backgroundColor: 'var(--v-glass-bg-strong)', padding: '14px', borderRadius: '16px',
            border: '1px solid var(--v-glass-border)',
          }}>
            <button
              onClick={toggleMic}
              title={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
              style={{
                backgroundColor: isMicMuted ? '#ef4444' : 'var(--v-glass-border)', color: 'white', border: 'none',
                borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', fontSize: '18px',
              }}
            >
              {isMicMuted ? '🔇' : '🎙️'}
            </button>

            <button
              onClick={toggleCamera}
              title={isCameraActive ? 'Turn Off Camera' : 'Turn On Camera'}
              style={{
                backgroundColor: isCameraActive ? 'var(--v-glass-border)' : '#ef4444', color: 'white', border: 'none',
                borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', fontSize: '18px',
              }}
            >
              {isCameraActive ? '📹' : '🚫'}
            </button>

            <button
              onClick={handleEndCall}
              style={{
                backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '24px',
                padding: '0 24px', height: '48px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer',
              }}
            >
              End Call
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}