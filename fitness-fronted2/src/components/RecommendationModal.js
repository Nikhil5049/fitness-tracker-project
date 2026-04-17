import React, { useState, useEffect } from 'react';
import { authFetch } from '../utils/api';
import { typeIcon, fmtDate } from '../utils/helpers';
import '../styles/components.css';
import '../styles/pages.css';

export default function RecommendationModal({ activity, userId, onClose }) {
  const [rec, setRec]         = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await authFetch(
          `/api/recommendations/generate/${userId}/${activity.id}`,
          { method: 'POST' }
        );
        if (!res.ok) throw new Error('Could not generate recommendation');
        setRec(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [activity.id, userId]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <div className="modal-title">🤖 AI Coaching Insights</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
              {typeIcon[activity.type]} {activity.type.replace('_', ' ')} ·{' '}
              {fmtDate(activity.startTime)}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {loading && (
          <div className="loader-wrap">
            <div className="loader-big" />
          </div>
        )}

        {error && <div className="alert alert--error">⚠️ {error}</div>}

        {rec && (
          <div className="rec-card" style={{ marginBottom: 0 }}>
            <div className="rec-card__header">
              <span className="rec-card__icon">💡</span>
              <div>
                <div className="rec-card__type">{rec.type || 'Performance Analysis'}</div>
                <div className="rec-card__aid">Activity ID: {rec.activityId}</div>
              </div>
            </div>

            {rec.recommendation && (
              <>
                <div className="rec-section__title">📋 Recommendation</div>
                <div className="rec-card__body">{rec.recommendation}</div>
              </>
            )}

            {rec.improvements?.length > 0 && (
              <div className="rec-section">
                <div className="rec-section__title">📈 Improvements</div>
                <div className="rec-pills">
                  {rec.improvements.map((item, i) => (
                    <span key={i} className="rec-pill rec-pill--improve">{item}</span>
                  ))}
                </div>
              </div>
            )}

            {rec.suggestions?.length > 0 && (
              <div className="rec-section">
                <div className="rec-section__title">💬 Suggestions</div>
                <div className="rec-pills">
                  {rec.suggestions.map((item, i) => (
                    <span key={i} className="rec-pill rec-pill--suggest">{item}</span>
                  ))}
                </div>
              </div>
            )}

            {rec.safety?.length > 0 && (
              <div className="rec-section">
                <div className="rec-section__title">⚠️ Safety Notes</div>
                <div className="rec-pills">
                  {rec.safety.map((item, i) => (
                    <span key={i} className="rec-pill rec-pill--safety">{item}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
