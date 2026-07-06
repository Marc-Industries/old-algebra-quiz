import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface ExplanationPanelProps {
  explanation: string;
  isCorrect: boolean;
  onNext: () => void;
  isLast: boolean;
}

// Renders explanation with full LaTeX support (block and inline)
const renderExplanation = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let key = 0;

  // Split on lines first to handle paragraphs and block math
  const lines = text.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line → paragraph break
    if (line.trim() === '') {
      parts.push(<div key={key++} style={{ height: '10px' }} />);
      i++;
      continue;
    }

    // Bold: **text**
    // Block math: $$...$$ spanning multiple lines handled via inline approach
    parts.push(
      <div key={key++} style={{ marginBottom: '4px' }}>
        <InlineRenderer text={line} />
      </div>
    );
    i++;
  }

  return parts;
};

// Renders a single line with inline $...$ math, **bold**, and ✓/✗
const InlineRenderer: React.FC<{ text: string }> = ({ text }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    // Tokenize: **bold**, $$display$$, $inline$, plain text
    const tokens: Array<{ type: 'text' | 'bold' | 'math' | 'display'; content: string }> = [];
    const regex = /(\*\*[^*]+\*\*|\$\$[\s\S]*?\$\$|\$[^$\n]*?\$)/g;
    let last = 0;
    let m: RegExpExecArray | null;

    while ((m = regex.exec(text)) !== null) {
      if (m.index > last) tokens.push({ type: 'text', content: text.slice(last, m.index) });
      const raw = m[0];
      if (raw.startsWith('**')) {
        tokens.push({ type: 'bold', content: raw.slice(2, -2) });
      } else if (raw.startsWith('$$')) {
        tokens.push({ type: 'display', content: raw.slice(2, -2) });
      } else {
        tokens.push({ type: 'math', content: raw.slice(1, -1) });
      }
      last = m.index + raw.length;
    }
    if (last < text.length) tokens.push({ type: 'text', content: text.slice(last) });

    // Build DOM
    tokens.forEach(tok => {
      if (tok.type === 'text') {
        containerRef.current!.appendChild(document.createTextNode(tok.content));
      } else if (tok.type === 'bold') {
        const b = document.createElement('strong');
        b.style.color = 'var(--text-primary)';
        b.style.fontWeight = '700';
        b.textContent = tok.content;
        containerRef.current!.appendChild(b);
      } else if (tok.type === 'math') {
        const span = document.createElement('span');
        try {
          katex.render(tok.content, span, { displayMode: false, throwOnError: false, strict: false });
        } catch { span.textContent = tok.content; }
        containerRef.current!.appendChild(span);
      } else if (tok.type === 'display') {
        const span = document.createElement('span');
        span.style.display = 'block';
        span.style.textAlign = 'center';
        span.style.margin = '8px 0';
        span.style.overflowX = 'auto';
        try {
          katex.render(tok.content, span, { displayMode: true, throwOnError: false, strict: false });
        } catch { span.textContent = tok.content; }
        containerRef.current!.appendChild(span);
      }
    });
  }, [text]);

  return <span ref={containerRef} />;
};

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
  explanation,
  isCorrect,
  onNext,
  isLast,
}) => {
  return (
    <div
      className="slide-up"
      style={{
        marginTop: '20px',
        background: isCorrect ? 'var(--correct-bg)' : 'var(--wrong-bg)',
        border: `1.5px solid ${isCorrect ? 'var(--correct)' : 'var(--wrong)'}`,
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '12px 20px',
        borderBottom: `1px solid ${isCorrect ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: isCorrect ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
      }}>
        <span style={{ fontSize: '1.2rem' }}>{isCorrect ? '✅' : '❌'}</span>
        <span style={{
          fontWeight: 700,
          color: isCorrect ? 'var(--correct)' : 'var(--wrong)',
          fontSize: '0.95rem',
          letterSpacing: '0.02em',
        }}>
          {isCorrect ? 'Risposta corretta!' : 'Risposta sbagliata'}
        </span>
      </div>

      {/* Explanation body */}
      <div style={{
        padding: '16px 20px',
        color: 'var(--text-primary)',
        fontSize: '0.92rem',
        lineHeight: '1.75',
      }}>
        <div style={{
          marginBottom: '4px',
          color: 'var(--text-secondary)',
          fontSize: '0.78rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          Spiegazione
        </div>
        <div style={{ color: 'var(--text-primary)' }}>
          {renderExplanation(explanation)}
        </div>
      </div>

      {/* Next button */}
      <div style={{ padding: '0 20px 16px' }}>
        <button
          onClick={onNext}
          style={{
            width: '100%',
            padding: '12px',
            background: isCorrect ? 'var(--correct)' : 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            fontFamily: 'var(--font)',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {isLast ? '🏁 Vedi risultato finale' : 'Prossima domanda →'}
        </button>
      </div>
    </div>
  );
};
