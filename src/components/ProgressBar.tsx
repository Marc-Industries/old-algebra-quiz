import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  score: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, score }) => {
  const pct = Math.round((current / total) * 100);

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
      }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
          Domanda {current} di {total}
        </span>
        <span style={{ color: 'var(--accent2)', fontSize: '0.85rem', fontWeight: 700 }}>
          ✓ {score} corrette
        </span>
      </div>
      <div style={{
        width: '100%',
        height: '6px',
        background: 'var(--border)',
        borderRadius: '99px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
          borderRadius: '99px',
          transition: 'width 0.4s ease',
        }} />
      </div>
    </div>
  );
};
