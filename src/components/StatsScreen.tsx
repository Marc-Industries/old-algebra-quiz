import React from 'react';
import { questionBank } from '../data/questions';

interface StatsScreenProps {
  seenIds: Set<number>;
  onReset: () => void;
  onStartQuiz: () => void;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({ seenIds, onReset, onStartQuiz }) => {
  const total = questionBank.length;
  const seen = seenIds.size;
  const pct = total > 0 ? Math.round((seen / total) * 100) : 0;

  // Group by category
  const byCategory = questionBank.reduce<Record<string, { total: number; seen: number }>>((acc, q) => {
    if (!acc[q.category]) acc[q.category] = { total: 0, seen: 0 };
    acc[q.category].total++;
    if (seenIds.has(q.id)) acc[q.category].seen++;
    return acc;
  }, {});

  return (
    <div className="slide-up" style={{ maxWidth: '560px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>
        📊 Le tue statistiche
      </h2>

      {/* Overall progress */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '24px',
        marginBottom: '16px',
        boxShadow: 'var(--shadow)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '12px',
        }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Domande viste
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent)', lineHeight: 1.1 }}>
              {seen} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>/ {total}</span>
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent2)' }}>
            {pct}%
          </div>
        </div>
        <div style={{
          height: '8px',
          background: 'var(--border)',
          borderRadius: '99px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${pct}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
            borderRadius: '99px',
            transition: 'width 0.6s ease',
          }} />
        </div>
      </div>

      {/* By category */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '20px',
        marginBottom: '16px',
      }}>
        <div style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
          marginBottom: '14px',
        }}>
          Per argomento
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {Object.entries(byCategory).map(([cat, { total: t, seen: s }]) => {
            const p = Math.round((s / t) * 100);
            return (
              <div key={cat}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{cat}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>
                    {s}/{t}
                  </span>
                </div>
                <div style={{ height: '4px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${p}%`,
                    height: '100%',
                    background: p === 100 ? 'var(--correct)' : 'var(--accent)',
                    borderRadius: '99px',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info box */}
      <div style={{
        background: 'rgba(108,99,255,0.06)',
        border: '1px solid rgba(108,99,255,0.2)',
        borderRadius: 'var(--radius)',
        padding: '16px 20px',
        marginBottom: '20px',
        fontSize: '0.88rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.6',
      }}>
        <strong style={{ color: 'var(--accent)' }}>Come funziona:</strong> ogni quiz seleziona 20 domande
        casuali dal banco. Le domande già viste vengono evitate finché possibile, così copri
        gradualmente tutto il materiale.
      </div>

      {/* Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <button
          onClick={onStartQuiz}
          style={{
            padding: '13px',
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            fontFamily: 'var(--font)',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          ▶ Inizia Quiz
        </button>
        <button
          onClick={() => {
            if (window.confirm('Sei sicuro di voler azzerare tutti i progressi?')) onReset();
          }}
          style={{
            padding: '13px',
            background: 'transparent',
            color: 'var(--wrong)',
            border: '1.5px solid var(--wrong)',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            fontFamily: 'var(--font)',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          🗑 Reset progressi
        </button>
      </div>
    </div>
  );
};
