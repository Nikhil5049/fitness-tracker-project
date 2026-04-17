import React, { useState, useEffect, useCallback } from 'react';
import { authFetch } from '../utils/api';
import { getDayGreeting } from '../utils/helpers';
import ActivityCard from '../components/ActivityCard';
import RecommendationCard from '../components/RecommendationCard';
import LogActivityModal from '../components/LogActivityModal';
import RecommendationModal from '../components/RecommendationModal';
import '../styles/pages.css';

export default function Dashboard({ user, addToast }) {
  const [activities,      setActivities]      = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [tab,             setTab]             = useState('activities');
  const [showLog,         setShowLog]         = useState(false);
  const [recActivity,     setRecActivity]     = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [actRes, recRes] = await Promise.all([
        authFetch('/api/activities'),
        authFetch(`/api/recommendations/user/${user.id}`),
      ]);
      if (actRes.ok) setActivities(await actRes.json());
      if (recRes.ok) setRecommendations(await recRes.json());
    } catch {
      addToast('Could not load data', 'error');
    } finally {
      setLoading(false);
    }
  }, [user.id, addToast]);

  useEffect(() => { loadData(); }, [loadData]);

  // Derived stats
  const totalCals = activities.reduce((s, a) => s + (a.caloriesBurned || 0), 0);
  const totalMins = activities.reduce((s, a) => s + (a.duration || 0), 0);

  const STATS = [
    { icon: '🏃', val: activities.length,             lbl: 'Total Workouts',  color: 'var(--cyan)'    },
    { icon: '🔥', val: totalCals.toLocaleString(),    lbl: 'Calories Burned', color: 'var(--coral)'   },
    { icon: '⏱️', val: `${Math.floor(totalMins/60)}h ${totalMins%60}m`, lbl: 'Total Time', color: 'var(--violet)' },
    { icon: '🤖', val: recommendations.length,        lbl: 'AI Insights',     color: '#fbbf24'        },
  ];

  return (
    <div className="page dashboard">
      {/* ── Header ── */}
      <div className="dash-header">
        <h1 className="dash-greeting">
          {getDayGreeting()},{' '}
          <span>{user.firstName || user.email.split('@')[0]}</span> 👋
        </h1>
        <div className="dash-date">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          })}
        </div>
      </div>

      {/* ── Stats cards ── */}
      <div className="stats-cards">
        {STATS.map((s) => (
          <div className="stat-card" key={s.lbl}>
            <div className="stat-card__icon">{s.icon}</div>
            <div className="stat-card__val" style={{ color: s.color }}>{s.val}</div>
            <div className="stat-card__lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs + CTA ── */}
      <div className="section-header">
        <div className="tabs">
          <button
            className={`tab${tab === 'activities' ? ' tab--active' : ''}`}
            onClick={() => setTab('activities')}
          >
            🏋️ Activities {activities.length > 0 && `(${activities.length})`}
          </button>
          <button
            className={`tab${tab === 'recommendations' ? ' tab--active' : ''}`}
            onClick={() => setTab('recommendations')}
          >
            🤖 AI Insights {recommendations.length > 0 && `(${recommendations.length})`}
          </button>
        </div>
        {tab === 'activities' && (
          <button
            className="btn-primary"
            style={{ padding: '0.6rem 1.4rem', fontSize: '0.9rem' }}
            onClick={() => setShowLog(true)}
          >
            + Log Activity
          </button>
        )}
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div className="loader-wrap"><div className="loader-big" /></div>
      ) : tab === 'activities' ? (
        activities.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏃</div>
            <div className="empty-title">No activities yet</div>
            <div className="empty-sub">Log your first workout to start tracking progress!</div>
            <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setShowLog(true)}>
              Log Your First Activity
            </button>
          </div>
        ) : (
          <div className="activities-grid">
            {[...activities].reverse().map((a) => (
              <ActivityCard
                key={a.id}
                activity={a}
                onGetInsights={setRecActivity}
              />
            ))}
          </div>
        )
      ) : (
        recommendations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🤖</div>
            <div className="empty-title">No AI insights yet</div>
            <div className="empty-sub">
              Log an activity then click "Get AI Coaching Insights" to receive personalised recommendations.
            </div>
          </div>
        ) : (
          <div className="activities-grid">
            {[...recommendations].reverse().map((r) => (
              <RecommendationCard key={r.id} rec={r} />
            ))}
          </div>
        )
      )}

      {/* ── Modals ── */}
      {showLog && (
        <LogActivityModal
          onClose={() => setShowLog(false)}
          onSuccess={(a) => { setActivities((prev) => [...prev, a]); setShowLog(false); }}
          addToast={addToast}
        />
      )}
      {recActivity && (
        <RecommendationModal
          activity={recActivity}
          userId={user.id}
          onClose={() => setRecActivity(null)}
          addToast={addToast}
        />
      )}
    </div>
  );
}
