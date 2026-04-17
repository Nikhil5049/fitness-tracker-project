import React, { useState } from 'react';
import { API_BASE, saveSession } from '../utils/api';
import '../styles/pages.css';
import '../styles/components.css';

export default function Login({ setPage, onLogin, addToast }) {
  const [form, setForm]     = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Invalid email or password');
      const data = await res.json();
      saveSession(data.token, data.user);
      addToast('Welcome back! 💪', 'success');
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <div className="auth-card__logo">
          <span className="logo">Fit<span>Pulse</span></span>
        </div>
        <h1 className="auth-card__title">Welcome back</h1>
        <p className="auth-card__sub">Log in to continue your fitness journey</p>

        {error && <div className="alert alert--error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button className="btn-full" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Sign In'}
          </button>
        </form>

        <div className="auth-card__switch">
          Don't have an account?{' '}
          <a onClick={() => setPage('register')}>Sign up free</a>
        </div>
      </div>
    </div>
  );
}
