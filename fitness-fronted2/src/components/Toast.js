import React from 'react';
import '../styles/components.css';

export default function Toast({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.type}`}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
