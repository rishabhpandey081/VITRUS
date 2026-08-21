import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('virtus_user');
    return savedUser ? JSON.parse(savedUser) : {
      name: 'Rishabh Pandey',
      email: 'rishabh@example.com',
      role: 'Frontend Developer',
    };
  });

  const [selectedInterview, setSelectedInterview] = useState(() => {
    const savedInterview = localStorage.getItem('virtus_selected_interview');
    return savedInterview ? JSON.parse(savedInterview) : {
      title: 'Frontend Developer',
      category: 'Technical',
      description: 'React, State Management, Performance Optimization, and CSS layouts.',
    };
  });

  const [interviewHistory, setInterviewHistory] = useState(() => {
    const savedHistory = localStorage.getItem('virtus_history');
    return savedHistory ? JSON.parse(savedHistory) : [
      { id: 1, title: 'Frontend Developer', score: 85, date: 'Aug 4, 2026' },
    ];
  });

  // Global Toast State
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  useEffect(() => {
    localStorage.setItem('virtus_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('virtus_selected_interview', JSON.stringify(selectedInterview));
  }, [selectedInterview]);

  useEffect(() => {
    localStorage.setItem('virtus_history', JSON.stringify(interviewHistory));
  }, [interviewHistory]);

  return (
    <AppContext.Provider 
      value={{ 
        user, 
        setUser, 
        selectedInterview, 
        setSelectedInterview, 
        interviewHistory, 
        setInterviewHistory,
        toast,
        showToast 
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}