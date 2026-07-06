import React, { useMemo, useState } from 'react';
import { hackBank } from '../data/hacks';
import { RichText } from './RichText';

interface HackScreenProps {
  quizInProgress: boolean;
  onBackToQuiz: () => void;
}

export const HackScreen: React.FC<HackScreenProps> = ({ quizInProgress, onBackToQuiz }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(hackBank.map(h => h.category))),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hackBank.filter(h => {
      const matchesCategory = !activeCategory || h.category === activeCategory;
      const matchesQuery =
        !q ||
        h.title.toLowerCase().includes(q) ||
        h.summary.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  return (
    <div className="slide-up" style={{ maxWidth: '640px', margin: '0 auto' }}>
      {quizInProgress && (
        <button
          onClick={onBackToQuiz}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '18px',
            padding: '10px 16px',
            background: 'var(--accent-glow)',
            border: '1px solid rgba(108,99,255,0.3)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--accent)',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            fontFamily: 'var(--font)',
          }}
        >
          ← Torna al quiz
        </button>
      )}

      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
        🧠 Hack &amp; Trucchi
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '18px', lineHeight: 1.6 }}>
        Scorciatoie mentali per riconoscere al volo la risposta giusta, organizzate per argomento.
      </p>

      {/* Search */}
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Cerca un trucco (es. 'determinante', 'isometria'…)"
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          border: '1.5px solid var(--border)',
          background: 'var(--bg-card2)',
          color: 'var(--text-primary)',
          fontSize: '0.9rem',
          fontFamily: 'var(--font)',
          marginBottom: '14px',
          outline: 'none',
        }}
      />

      {/* Category chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
        <button
          onClick={() => setActiveCategory(null)}
          style={chipStyle(activeCategory === null)}
        >
          Tutti
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(prev => (prev === cat ? null : cat))}
            style={chipStyle(activeCategory === cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.length === 0 && (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '24px 0' }}>
            Nessun trucco trovato.
          </div>
        )}
        {filtered.map(hack => {
          const isOpen = openId === hack.id;
          return (
            <div
              key={hack.id}
              style={{
                background: 'var(--bg-card)',
                border: `1.5px solid ${isOpen ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                transition: 'border-color 0.15s',
              }}
            >
              <button
                onClick={() => toggle(hack.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '15px 16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  fontFamily: 'var(--font)',
                }}
              >
                <span style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: '1px' }}>{hack.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '3px' }}>
                    {hack.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {hack.summary}
                  </div>
                  <span style={{
                    display: 'inline-block',
                    marginTop: '6px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--accent)',
                    background: 'var(--accent-glow)',
                    padding: '3px 8px',
                    borderRadius: '99px',
                    border: '1px solid rgba(108,99,255,0.3)',
                  }}>
                    {hack.category}
                  </span>
                </div>
                <span style={{
                  flexShrink: 0,
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  marginTop: '4px',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                }}>
                  ▾
                </span>
              </button>

              {isOpen && (
                <div className="fade-in" style={{ padding: '0 18px 18px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ paddingTop: '14px' }}>
                    <RichText text={hack.content} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {quizInProgress && (
        <button
          onClick={onBackToQuiz}
          style={{
            width: '100%',
            marginTop: '22px',
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
          ← Torna al quiz
        </button>
      )}
    </div>
  );
};

function chipStyle(active: boolean): React.CSSProperties {
  return {
    padding: '6px 12px',
    borderRadius: '99px',
    border: active ? '1px solid var(--accent)' : '1px solid var(--border)',
    background: active ? 'var(--accent-glow)' : 'var(--bg-card2)',
    color: active ? 'var(--accent)' : 'var(--text-secondary)',
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font)',
    whiteSpace: 'nowrap',
  };
}
