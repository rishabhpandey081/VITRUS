import React from 'react';
import AuroraBackground from './AuroraBackground';
import Sidebar from './Sidebar';
import Footer from './Footer';

/**
 * Layout
 * Shared shell for every authenticated Virtus page:
 * fixed aurora canvas -> fixed glass sidebar -> scrollable content -> footer.
 *
 * Pass `footer={false}` to omit the footer (e.g. full-screen interview room).
 */
export default function Layout({ children, footer = true, contentClassName = '' }) {
  return (
    <div className="v-shell">
      <AuroraBackground />
      <Sidebar />
      <div className="v-content">
        <div className={`v-content-inner ${contentClassName}`}>
          {children}
        </div>
        {footer && <Footer />}
      </div>
    </div>
  );
}
