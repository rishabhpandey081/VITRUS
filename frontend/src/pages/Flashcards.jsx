import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Flashcards() {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-slate-950 p-6 text-white flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white text-sm">
          ← Dashboard
        </button>
        <h1 className="text-xl font-bold">Interview Flashcards</h1>
        <div className="w-16"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full space-y-6">
        <div className="text-slate-400 text-sm">
          Card {currentIndex + 1} of {cards.length}
        </div>

        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full h-80 bg-slate-900 border border-slate-800 hover:border-indigo-500 rounded-2xl p-8 cursor-pointer transition-all flex flex-col justify-between shadow-xl select-none"
        >
          <div className="flex justify-between items-center text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <span>{isFlipped ? 'Answer' : 'Question'}</span>
            <span>Click to flip</span>
          </div>

          <div className="my-auto text-center">
            <p className="text-xl font-medium text-slate-200 leading-relaxed">
              {isFlipped ? cards[currentIndex].answer : cards[currentIndex].question}
            </p>
          </div>

          <div className="text-center text-xs text-indigo-400">
            {isFlipped ? 'Click to see question' : 'Click to reveal answer'}
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <button
            onClick={handlePrev}
            className="flex-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 py-3 rounded-xl font-medium transition text-sm"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-medium transition text-sm"
          >
            Next Card
          </button>
        </div>
      </div>
    </div>
  );
}