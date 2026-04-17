import React from 'react';
import { typeIcon, fmtDate } from '../utils/helpers';
import '../styles/pages.css';

export default function ActivityCard({ activity, onGetInsights }) {
  const { type, duration, caloriesBurned, startTime, additionalMetrics } = activity;
  const extraEntries = additionalMetrics ? Object.entries(additionalMetrics) : [];

  return (
    <div className="activity-card">
      <div className="activity-card__header">
        <span className={`activity-type-badge type-${type}`}>
          {typeIcon[type]} {type.replace('_', ' ')}
        </span>
        <span className="activity-card__date">{fmtDate(startTime)}</span>
      </div>

      <div className="activity-card__metrics">
        <div className="metric">
          <div className="metric__val" style={{ color: 'var(--cyan)' }}>
            {duration ?? '—'}
          </div>
          <div className="metric__lbl">⏱ Minutes</div>
        </div>
        <div className="metric">
          <div className="metric__val" style={{ color: 'var(--coral)' }}>
            {caloriesBurned ?? '—'}
          </div>
          <div className="metric__lbl">🔥 Calories</div>
        </div>
      </div>

      {extraEntries.length > 0 && (
        <div className="extra-metrics">
          {extraEntries.map(([k, v]) => (
            <span key={k} className="extra-metric-pill">
              {k}: {String(v)}
            </span>
          ))}
        </div>
      )}

      <button className="btn-rec" onClick={() => onGetInsights(activity)}>
        🤖 Get AI Coaching Insights
      </button>
    </div>
  );
}
