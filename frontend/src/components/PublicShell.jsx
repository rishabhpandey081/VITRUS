import React from 'react';
import AuroraBackground from './AuroraBackground';
import Footer from './Footer';

/**
 * PublicShell
 * Used for pre-auth pages (Login, Signup, marketing landing) that need the
 * obsidian + aurora backdrop but no sidebar navigation.
 */
export default function PublicShell({ children, footer = true, center = true }) {
  return (
    <div className="v-shell">
      <AuroraBackground />
      <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: center ? 'center' : 'stretch',
            justifyContent: center ? 'center' : 'flex-start',
            padding: '24px',
          }}
        >
          {children}
        </div>
        {footer && <Footer />}
      </div>
    </div>
  );
}
