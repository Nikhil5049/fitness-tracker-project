import React from 'react';
import '../styles/pages.css';

export default function RecommendationCard({ rec }) {
  const { type, activityId, recommendation, improvements, suggestions, safety } = rec;

  return (
    <div className="rec-card">
      <div className="rec-card__header">
        <span className="rec-card__icon">💡</span>
        <div>
          <div className="rec-card__type">{type || 'Coaching Analysis'}</div>
          <div className="rec-card__aid">Activity: {activityId?.slice(0, 8)}…</div>
        </div>
      </div>

      {recommendation && (
        <div className="rec-card__body">
          {recommendation.length > 180
            ? recommendation.slice(0, 180) + '…'
            : recommendation}
        </div>
      )}

      {improvements?.length > 0 && (
        <div className="rec-section">
          <div className="rec-section__title">📈 Improvements</div>
          <div className="rec-pills">
            {improvements.slice(0, 3).map((item, i) => (
              <span key={i} className="rec-pill rec-pill--improve">{item}</span>
            ))}
          </div>
        </div>
      )}

      {suggestions?.length > 0 && (
        <div className="rec-section">
          <div className="rec-section__title">💬 Suggestions</div>
          <div className="rec-pills">
            {suggestions.slice(0, 3).map((item, i) => (
              <span key={i} className="rec-pill rec-pill--suggest">{item}</span>
            ))}
          </div>
        </div>
      )}

      {safety?.length > 0 && (
        <div className="rec-section">
          <div className="rec-section__title">⚠️ Safety</div>
          <div className="rec-pills">
            {safety.slice(0, 3).map((item, i) => (
              <span key={i} className="rec-pill rec-pill--safety">{item}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
