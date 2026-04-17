import React, { useState } from 'react';
import { authFetch } from '../utils/api';
import { typeIcon, ACTIVITY_TYPES } from '../utils/helpers';
import '../styles/components.css';
import '../styles/pages.css';

export default function LogActivityModal({ onClose, onSuccess, addToast }) {
  const [form, setForm] = useState({
    type: 'RUNNING',
    duration: '',
    caloriesBurned: '',
    startTime: new Date().toISOString().slice(0, 16),
    additionalMetrics: {},
  });
  const [loading, setLoading]     = useState(false);
  const [metricKey, setMetricKey] = useState('');
  const [metricVal, setMetricVal] = useState('');

  const addMetric = () => {
    if (!metricKey.trim()) return;
    setForm((f) => ({
      ...f,
      additionalMetrics: { ...f.additionalMetrics, [metricKey.trim()]: metricVal },
    }));
    setMetricKey('');
    setMetricVal('');
  };

  const removeMetric = (key) => {
    const copy = { ...form.additionalMetrics };
    delete copy[key];
    setForm((f) => ({ ...f, additionalMetrics: copy }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        type: form.type,
        duration: form.duration ? parseInt(form.duration, 10) : null,
        caloriesBurned: form.caloriesBurned ? parseInt(form.caloriesBurned, 10) : null,
        startTime: form.startTime ? form.startTime + ':00' : null,
        additionalMetrics: form.additionalMetrics,
      };
      const res = await authFetch('/api/activities', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save activity');
      const data = await res.json();
      addToast('Activity logged! 🎯', 'success');
      onSuccess(data);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <div className="modal-title">🏋️ Log Activity</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Track your latest workout
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Activity Type */}
          <div className="form-group">
            <label className="form-label">Activity Type</label>
            <select
              className="form-input"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              {ACTIVITY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {typeIcon[t]} {t.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Duration + Calories */}
          <div className="metrics-grid">
            <div className="form-group">
              <label className="form-label">Duration (min)</label>
              <input
                className="form-input"
                type="number"
                min="1"
                placeholder="45"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Calories Burned</label>
              <input
                className="form-input"
                type="number"
                min="0"
                placeholder="320"
                value={form.caloriesBurned}
                onChange={(e) => setForm({ ...form, caloriesBurned: e.target.value })}
              />
            </div>
          </div>

          {/* Start Time */}
          <div className="form-group">
            <label className="form-label">Start Time</label>
            <input
              className="form-input"
              type="datetime-local"
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            />
          </div>

          {/* Additional Metrics */}
          <div className="form-group">
            <label className="form-label">Additional Metrics (optional)</label>
            <div className="add-metric-row">
              <input
                className="form-input"
                placeholder="e.g. distance"
                style={{ flex: 1 }}
                value={metricKey}
                onChange={(e) => setMetricKey(e.target.value)}
              />
              <input
                className="form-input"
                placeholder="5km"
                style={{ flex: 1 }}
                value={metricVal}
                onChange={(e) => setMetricVal(e.target.value)}
              />
              <button type="button" className="add-metric-btn" onClick={addMetric}>
                +
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {Object.entries(form.additionalMetrics).map(([k, v]) => (
                <span key={k} className="metric-tag">
                  {k}: {v}
                  <span
                    className="metric-tag__remove"
                    onClick={() => removeMetric(k)}
                  >
                    ✕
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-full"
              style={{ flex: 2, marginTop: 0 }}
              disabled={loading}
            >
              {loading ? <span className="spinner" /> : 'Save Activity ✓'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
