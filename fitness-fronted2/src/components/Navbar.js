import React from 'react';
import '../styles/components.css';

export default function Navbar({ user, setPage, onLogout }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setPage(user ? 'dashboard' : 'landing')}>
        Fit<span>Pulse</span>
      </div>

      <div className="nav-links">
        {!user ? (
          <>
            <button className="nav-btn nav-btn--ghost" onClick={() => setPage('login')}>
              Log in
            </button>
            <button className="nav-btn nav-btn--primary" onClick={() => setPage('register')}>
              Get Started
            </button>
          </>
        ) : (
          <div className="nav-user">
            <div className="nav-avatar">
              {user.firstName?.[0] || user.email?.[0] || 'U'}
            </div>
            <span className="nav-name">{user.firstName || user.email}</span>
            <button className="nav-logout" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
