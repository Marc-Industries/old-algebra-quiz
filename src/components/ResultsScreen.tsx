import React from 'react';
import { QuizResult } from '../types';
import { questionBank } from '../data/questions';

interface ResultsScreenProps {
  results: QuizResult[];
  onRestart: () => void;
  onHome: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, onRestart, onHome }) => {
  const correct = results.filter(r => r.correct).length;
  const total = results.length;
  const pct = Math.round((correct / total) * 100);

  const grade = pct >= 90 ? { label: 'Eccellente! 🏆', color: '#f59e0b' }
    : pct >= 75 ? { label: 'Ottimo! 🎉', color: 'var(--correct)' }
    : pct >= 60 ? { label: 'Buono 👍', color: 'var(--accent2)' }
    : pct >= 50 ? { label: 'Sufficiente 📚', color: 'var(--accent)' }
    : { label: 'Da ripassare 💪', color: 'var(--wrong)' };

  return (
    <div className="slide-up" style={{ maxWidth: '560px', margin: '0 auto' }}>
      {/* Score card */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '36px 28px',
        textAlign: 'center',
        marginBottom: '20px',
        boxShadow: 'var(--shadow)',
      }}>
        {/* Circle score */}
        <div style={{
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          background: `conic-gradient(${grade.color} ${pct * 3.6}deg, var(--border) 0deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          position: 'relative',
        }}>
          <div style={{
            width: '86px',
            height: '86px',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 900, color: grade.color, lineHeight: 1 }}>
              {pct}%
            </span>
          </div>
        </div>

        <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
          {grade.label}
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Hai risposto correttamente a <strong style={{ color: 'var(--text-primary)' }}>{correct}</strong> domande su <strong style={{ color: 'var(--text-primary)' }}>{total}</strong>
        </div>
      </div>

      {/* Per-question breakdown */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '20px',
        marginBottom: '20px',
      }}>
        <div style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
          marginBottom: '14px',
        }}>
          Dettaglio domande
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {results.map((r, i) => {
            const q = questionBank.find(q => q.id === r.questionId);
            return (
              <div
                key={i}
                title={q?.category || ''}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  background: r.correct ? 'var(--correct-bg)' : 'var(--wrong-bg)',
                  border: `1.5px solid ${r.correct ? 'var(--correct)' : 'var(--wrong)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: r.correct ? 'var(--correct)' : 'var(--wrong)',
                  fontFamily: 'var(--mono)',
                  cursor: 'default',
                }}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <button
          onClick={onRestart}
          style={{
            padding: '14px',
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            fontFamily: 'var(--font)',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          🔄 Nuovo Quiz
        </button>
        <button
          onClick={onHome}
          style={{
            padding: '14px',
            background: 'var(--bg-card2)',
            color: 'var(--text-primary)',
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            fontFamily: 'var(--font)',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          🏠 Home
        </button>
      </div>
    </div>
  );
};
