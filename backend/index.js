const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// AI Mock Interview / Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, role } = req.body;

    const systemInstruction = `You are an expert technical interviewer conducting a mock interview for the role of ${role || 'Full Stack Engineer'}. Maintain a professional, encouraging, yet rigorous tone. Ask follow-up questions one at a time based on the candidate's answers.`;

    const formattedHistory = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedHistory,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text() });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
});

// Generic AI Generation Endpoint (For Resume, STAR Stories, Code Review, Salary Coaching, etc.)
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, systemInstruction } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || 'You are an expert career and technical coach.',
        temperature: 0.7,
      }
    });

    res.json({ result: response.text() });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Virtus AI Backend running on port ${PORT}`);
});