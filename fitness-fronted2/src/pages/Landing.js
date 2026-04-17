import React from 'react';
import '../styles/pages.css';

const FEATURES = [
  {
    icon: '🏃',
    bg: 'rgba(0,245,212,0.08)',
    title: 'Activity Tracking',
    desc: 'Log runs, lifts, swims, and more with rich metrics — duration, calories, and custom data fields.',
  },
  {
    icon: '🤖',
    bg: 'rgba(139,92,246,0.08)',
    title: 'AI Recommendations',
    desc: 'Receive personalised coaching insights generated directly from your performance data.',
  },
  {
    icon: '📊',
    bg: 'rgba(251,191,36,0.08)',
    title: 'Progress Dashboard',
    desc: 'Visualise your streaks, total effort, and achievements in a sleek real-time dashboard.',
  },
  {
    icon: '🔒',
    bg: 'rgba(96,165,250,0.08)',
    title: 'Secure & Private',
    desc: 'JWT-secured API with role-based access control. Your data belongs to you — always.',
  },
];

const STATS = [
  ['10+', 'Activity Types'],
  ['AI',  'Smart Coaching'],
  ['JWT', 'Secure Auth'],
  ['∞',   'Your Potential'],
];

export default function Landing({ setPage }) {
  return (
    <div className="page page--no-pt">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-dot" />
          AI-Powered Fitness Platform
        </div>
        <h1 className="hero-title">
          Move Smarter.<br />
          <span className="grad-text line2">Live Better.</span>
        </h1>
        <p className="hero-sub">
          Track every workout, unlock AI coaching insights, and build the body
          you've always wanted — one rep at a time.
        </p>
        <div className="hero-ctas">
          <button className="btn-primary" onClick={() => setPage('register')}>
            Start for Free →
          </button>
          <button className="btn-outline" onClick={() => setPage('login')}>
            Sign In
          </button>
        </div>
      </section>

      {/* ── Stats row ── */}
      <div className="stats-row">
        {STATS.map(([num, label]) => (
          <div className="stat-chip" key={label}>
            <span className="stat-chip__num">{num}</span>
            <span className="stat-chip__label">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Features ── */}
      <section className="features">
        <h2 className="section-title">
          Everything you need to <span className="grad-text">crush it</span>
        </h2>
        <p className="section-sub">
          Built for athletes who demand more than a basic step counter.
        </p>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="feat-card" key={f.title}>
              <div className="feat-icon" style={{ background: f.bg }}>{f.icon}</div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA banner ── */}
      <div style={{ textAlign: 'center', padding: '4rem 5%' }}>
        <h2 className="section-title">
          Ready to unlock your{' '}
          <span className="grad-text">peak performance?</span>
        </h2>
        <p className="section-sub" style={{ maxWidth: 440, margin: '0 auto 2rem' }}>
          Join FitPulse today and transform every workout into actionable intelligence.
        </p>
        <button
          className="btn-primary"
          style={{ fontSize: '1.05rem' }}
          onClick={() => setPage('register')}
        >
          Create Free Account
        </button>
      </div>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer__logo">
          Fit<span style={{ color: 'var(--coral)' }}>Pulse</span>
        </div>
        <div className="footer__copy">© 2026 FitPulse. Built with ❤️ for athletes.</div>
      </footer>
    </div>
  );
}
