import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('virtus_user');
    return saved ? JSON.parse(saved) : { name: 'Rishabh Pandey', email: 'rishabh@example.com', role: 'Frontend Developer' };
  });

  const [selectedInterview, setSelectedInterview] = useState(() => {
    const saved = localStorage.getItem('virtus_selected_track');
    return saved ? JSON.parse(saved) : { title: 'Frontend Engineering', description: 'React, State Management, Performance, and Architecture' };
  });

  const [interviewHistory, setInterviewHistory] = useState(() => {
    const saved = localStorage.getItem('virtus_history');
    return saved ? JSON.parse(saved) : [
      { title: 'Frontend Engineering', score: 85, date: '2026-06-01' },
      { title: 'System Architecture', score: 78, date: '2026-06-15' }
    ];
  });

  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    localStorage.setItem('virtus_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('virtus_selected_track', JSON.stringify(selectedInterview));
  }, [selectedInterview]);

  useEffect(() => {
    localStorage.setItem('virtus_history', JSON.stringify(interviewHistory));
  }, [interviewHistory]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      selectedInterview,
      setSelectedInterview,
      interviewHistory,
      setInterviewHistory,
      toast,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}