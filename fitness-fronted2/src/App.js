import React, { useState } from 'react';
import { getStoredUser, clearSession } from './utils/api';

import Navbar  from './components/Navbar';
import Toast   from './components/Toast';

import Landing   from './pages/Landing';
import Login     from './pages/Login';
import Register  from './pages/Register';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [user, setUser] = useState(getStoredUser);
  const [page, setPage] = useState(() => (getStoredUser() ? 'dashboard' : 'landing'));
  const [toasts, setToasts] = useState([]);

  /* ── Toast helper ── */
  const addToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };

  /* ── Auth callbacks ── */
  const onLogin = (u) => {
    setUser(u);
    setPage('dashboard');
  };

  const onLogout = () => {
    clearSession();
    setUser(null);
    setPage('landing');
    addToast('Logged out successfully', 'success');
  };

  /* ── Page renderer ── */
  const renderPage = () => {
    switch (page) {
      case 'landing':
        return <Landing setPage={setPage} />;
      case 'login':
        return <Login setPage={setPage} onLogin={onLogin} addToast={addToast} />;
      case 'register':
        return <Register setPage={setPage} onLogin={onLogin} addToast={addToast} />;
      case 'dashboard':
        return user
          ? <Dashboard user={user} addToast={addToast} />
          : <Login setPage={setPage} onLogin={onLogin} addToast={addToast} />;
      default:
        return <Landing setPage={setPage} />;
    }
  };

  return (
    <>
      {/* Animated mesh background */}
      <div className="mesh-bg" />

      {/* Persistent navbar */}
      <Navbar user={user} setPage={setPage} onLogout={onLogout} />

      {/* Active page */}
      {renderPage()}

      {/* Toast notifications */}
      <Toast toasts={toasts} />
    </>
  );
}
