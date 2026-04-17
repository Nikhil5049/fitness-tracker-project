import React, { useState } from 'react';
import { API_BASE, saveSession } from '../utils/api';
import '../styles/pages.css';
import '../styles/components.css';

export default function Register({ setPage, onLogin, addToast }) {
  const [form, setForm] = useState({
    email: '', password: '', firstName: '', lastName: '', role: 'USER',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || 'Registration failed. Please try again.');
      }

      // Auto-login after successful registration
      const loginRes = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      if (!loginRes.ok) {
        addToast('Registered! Please log in.', 'success');
        setPage('login');
        return;
      }
      const data = await loginRes.json();
      saveSession(data.token, data.user);
      addToast("Account created! Let's go 🚀", 'success');
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
        <h1 className="auth-card__title">Create account</h1>
        <p className="auth-card__sub">Join thousands of athletes pushing their limits</p>

        {error && <div className="alert alert--error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                className="form-input"
                placeholder="Alex"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                className="form-input"
                placeholder="Doe"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
          </div>

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
              placeholder="Min. 8 characters"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="USER">Athlete</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button className="btn-full" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Create Account 🚀'}
          </button>
        </form>

        <div className="auth-card__switch">
          Already have an account?{' '}
          <a onClick={() => setPage('login')}>Sign in</a>
        </div>
      </div>
    </div>
  );
}
