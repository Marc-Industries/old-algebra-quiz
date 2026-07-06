import React, { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import { Question } from '../types';
import { ExplanationPanel } from './ExplanationPanel';

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  isLast: boolean;
  questionNumber: number;
  totalQuestions: number;
}

// Inline renderer: renders text with $...$ and $$...$$ LaTeX
const MathRenderer: React.FC<{ text: string; style?: React.CSSProperties }> = ({ text, style }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';

    const regex = /(\$\$[\s\S]*?\$\$|\$[^$\n]*?\$)/g;
    let last = 0;
    let m: RegExpExecArray | null;

    while ((m = regex.exec(text)) !== null) {
      if (m.index > last) {
        ref.current.appendChild(document.createTextNode(text.slice(last, m.index)));
      }
      const raw = m[0];
      const isDisplay = raw.startsWith('$$');
      const inner = isDisplay ? raw.slice(2, -2) : raw.slice(1, -1);
      const span = document.createElement(isDisplay ? 'div' : 'span');
      if (isDisplay) {
        span.style.margin = '10px 0';
        span.style.overflowX = 'auto';
        span.style.textAlign = 'center';
      }
      try {
        katex.render(inner, span, {
          displayMode: isDisplay,
          throwOnError: false,
          strict: false,
          macros: {
            '\\R': '\\mathbb{R}',
            '\\C': '\\mathbb{C}',
          },
        });
      } catch { span.textContent = inner; }
      ref.current.appendChild(span);
      last = m.index + raw.length;
    }

    if (last < text.length) {
      ref.current.appendChild(document.createTextNode(text.slice(last)));
    }
  }, [text]);

  return <span ref={ref} style={style} />;
};

type AnswerState = 'idle' | 'answered';

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  onAnswer,
  isLast,
  questionNumber,
  totalQuestions,
}) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [state, setState] = useState<AnswerState>('idle');
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset when question changes
  useEffect(() => {
    setSelected([]);
    setState('idle');
    setIsCorrect(false);
  }, [question.id]);

  const toggleOption = (idx: number) => {
    if (state === 'answered') return;
    if (question.type === 'single') {
      setSelected([idx]);
    } else {
      setSelected(prev =>
        prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
      );
    }
  };

  const handleConfirm = () => {
    if (selected.length === 0) return;
    const correct =
      selected.length === question.correctIndices.length &&
      selected.every(i => question.correctIndices.includes(i));
    setIsCorrect(correct);
    setState('answered');
  };

  const handleNext = () => {
    onAnswer(isCorrect);
  };

  const getOptionStyle = (idx: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '14px 16px',
      borderRadius: 'var(--radius-sm)',
      border: '1.5px solid var(--border)',
      background: 'var(--bg-card2)',
      cursor: state === 'idle' ? 'pointer' : 'default',
      transition: 'all 0.15s ease',
      marginBottom: '10px',
      userSelect: 'none',
    };

    if (state === 'idle') {
      if (selected.includes(idx)) {
        return {
          ...base,
          border: '1.5px solid var(--accent)',
          background: 'var(--accent-glow)',
        };
      }
      return base;
    }

    // After answering
    const isSelectedByUser = selected.includes(idx);
    const isCorrectOption = question.correctIndices.includes(idx);

    if (isCorrectOption) {
      return {
        ...base,
        border: '1.5px solid var(--correct)',
        background: 'var(--correct-bg)',
        cursor: 'default',
      };
    }
    if (isSelectedByUser && !isCorrectOption) {
      return {
        ...base,
        border: '1.5px solid var(--wrong)',
        background: 'var(--wrong-bg)',
        cursor: 'default',
      };
    }
    return { ...base, opacity: 0.55, cursor: 'default' };
  };

  const getOptionIcon = (idx: number) => {
    if (state === 'idle') {
      const letter = String.fromCharCode(65 + idx); // A, B, C, D
      return (
        <span style={{
          flexShrink: 0,
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          background: selected.includes(idx) ? 'var(--accent)' : 'var(--border)',
          color: selected.includes(idx) ? '#fff' : 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.78rem',
          fontWeight: 700,
          fontFamily: 'var(--mono)',
          marginTop: '1px',
          transition: 'all 0.15s',
        }}>
          {letter}
        </span>
      );
    }

    const isCorrectOption = question.correctIndices.includes(idx);
    const isSelectedByUser = selected.includes(idx);

    if (isCorrectOption) return <span style={{ flexShrink: 0, fontSize: '1.1rem', marginTop: '2px' }}>✅</span>;
    if (isSelectedByUser && !isCorrectOption) return <span style={{ flexShrink: 0, fontSize: '1.1rem', marginTop: '2px' }}>❌</span>;

    const letter = String.fromCharCode(65 + idx);
    return (
      <span style={{
        flexShrink: 0,
        width: '26px',
        height: '26px',
        borderRadius: '50%',
        background: 'var(--border)',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.78rem',
        fontWeight: 700,
        fontFamily: 'var(--mono)',
        marginTop: '1px',
      }}>
        {letter}
      </span>
    );
  };

  return (
    <div className="fade-in">
      {/* Card */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        padding: '28px 24px',
        boxShadow: 'var(--shadow)',
      }}>
        {/* Category badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--accent)',
            background: 'var(--accent-glow)',
            padding: '4px 10px',
            borderRadius: '99px',
            border: '1px solid rgba(108,99,255,0.3)',
          }}>
            {question.category}
          </span>
          {question.type === 'multi' && (
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--warn)',
              background: 'rgba(245,158,11,0.1)',
              padding: '4px 10px',
              borderRadius: '99px',
              border: '1px solid rgba(245,158,11,0.3)',
            }}>
              ☑ Risposta multipla
            </span>
          )}
        </div>

        {/* Question text */}
        <div style={{
          fontSize: '1.05rem',
          lineHeight: '1.75',
          color: 'var(--text-primary)',
          marginBottom: '24px',
          fontWeight: 500,
        }}>
          <MathRenderer text={question.text} />
        </div>

        {/* Options */}
        <div>
          {question.options.map((opt, idx) => (
            <div
              key={idx}
              style={getOptionStyle(idx)}
              onClick={() => toggleOption(idx)}
              onMouseEnter={e => {
                if (state === 'idle') {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-light)';
                }
              }}
              onMouseLeave={e => {
                if (state === 'idle' && !selected.includes(idx)) {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                }
              }}
            >
              {getOptionIcon(idx)}
              <span style={{
                fontSize: '0.93rem',
                lineHeight: '1.65',
                color: 'var(--text-primary)',
                flex: 1,
              }}>
                <MathRenderer text={opt} />
              </span>
            </div>
          ))}
        </div>

        {/* Confirm button */}
        {state === 'idle' && (
          <button
            onClick={handleConfirm}
            disabled={selected.length === 0}
            style={{
              width: '100%',
              marginTop: '8px',
              padding: '13px',
              background: selected.length > 0 ? 'var(--accent)' : 'var(--border)',
              color: selected.length > 0 ? '#fff' : 'var(--text-muted)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
              fontFamily: 'var(--font)',
              transition: 'all 0.2s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => {
              if (selected.length > 0) (e.currentTarget.style.opacity = '0.85');
            }}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {selected.length === 0
              ? 'Seleziona una risposta'
              : question.type === 'multi'
              ? `Conferma (${selected.length} selezionat${selected.length === 1 ? 'a' : 'e'})`
              : 'Conferma risposta'}
          </button>
        )}
      </div>

      {/* Explanation */}
      {state === 'answered' && (
        <ExplanationPanel
          explanation={question.explanation}
          isCorrect={isCorrect}
          onNext={handleNext}
          isLast={isLast}
        />
      )}
    </div>
  );
};
