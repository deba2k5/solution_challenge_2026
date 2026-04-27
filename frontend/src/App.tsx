import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TerminalPage from './pages/TerminalPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import OrgPortal from './pages/OrgPortal';
import WorkflowPage from './pages/WorkflowPage';
import './index.css';

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role?: string }) => {
  const userRole = localStorage.getItem('user_role');
  if (!userRole) return <Navigate to="/login" replace />;
  if (role && userRole !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
};

function App() {
  useEffect(() => {
    // Initial theme setup in case it wasn't caught by Navbar (e.g. if Navbar unmounts, though it's always rendered here)
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <div style={{ minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'Inter, sans-serif' }}>
        {/* Blueprint grid overlay */}
        <div className="grid-bg" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

        <Navbar />

        <main style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<TerminalPage />} />
            <Route path="/workflow" element={<WorkflowPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/org"
              element={
                <ProtectedRoute role="org">
                  <OrgPortal />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* System status footer */}
        <footer style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 50, pointerEvents: 'none', opacity: 0.5, textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.6 }}>
          <p>AEGISNET-X v2.04</p>
          <p>ENCRYPTION: ACTIVE</p>
          <p>NODES: CONNECTED</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
