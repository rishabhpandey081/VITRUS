import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const cards = [
    {
      question: 'What is the JavaScript Event Loop?',
      answer: 'The Event Loop is a constantly running process that monitors the Call Stack and the Callback Queue. If the call stack is empty, it takes the first event from the queue and pushes it to the call stack.'
    },
    {
      question: 'What are the ACID properties in database management?',
      answer: 'Atomicity, Consistency, Isolation, and Durability. These properties ensure reliable processing of database transactions.'
    },
    {
      question: 'What is a Closure in JavaScript?',
      answer: 'A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).'
    },
    {
      question: 'What is the Virtual DOM in React?',
      answer: 'The Virtual DOM is a lightweight conceptual representation of the real DOM kept in memory and synced with the actual DOM by a library such as ReactDOM.'
    }
  ];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <Layout>
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
          Study Mode
        </p>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>Interview Flashcards</h1>
      </div>

      <div style={{ maxWidth: 560, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
        <div style={{ fontSize: 13, color: 'var(--v-ink-faint)' }}>
          Card {currentIndex + 1} of {cards.length}
        </div>

        <div style={{ perspective: 1400, width: '100%', height: 320 }}>
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="v-card"
            style={{
              width: '100%', height: '100%', padding: 30, cursor: 'pointer', userSelect: 'none',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transform: isFlipped ? 'rotateY(4deg) scale(1.01)' : 'rotateY(0deg)',
              transition: 'transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 250ms ease',
              transformStyle: 'preserve-3d',
              borderColor: isFlipped ? 'var(--v-glass-border-gold)' : undefined,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-ink-faint)' }}>
              <span>{isFlipped ? 'Answer' : 'Question'}</span>
              <span>Click to flip</span>
            </div>

            <div style={{ margin: 'auto 0', textAlign: 'center' }}>
              <p style={{ fontSize: 19, fontWeight: 600, color: 'var(--v-ink)', lineHeight: 1.6, margin: 0 }}>
                {isFlipped ? cards[currentIndex].answer : cards[currentIndex].question}
              </p>
            </div>

            <div className="v-gold-text" style={{ textAlign: 'center', fontSize: 12, fontWeight: 700 }}>
              {isFlipped ? 'Click to see question' : 'Click to reveal answer'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, width: '100%' }}>
          <button onClick={handlePrev} className="v-btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
            Previous
          </button>
          <button onClick={handleNext} className="v-btn-gold" style={{ flex: 1, justifyContent: 'center' }}>
            Next Card
          </button>
        </div>
      </div>
    </Layout>
  );
}
