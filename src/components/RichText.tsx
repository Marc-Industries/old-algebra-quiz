import React, { useEffect, useRef } from 'react';
import katex from 'katex';

// Macro condivise con Math.tsx / QuizCard.tsx per coerenza visiva
const KATEX_MACROS: Record<string, string> = {
  '\\R': '\\mathbb{R}',
  '\\C': '\\mathbb{C}',
  '\\N': '\\mathbb{N}',
  '\\Z': '\\mathbb{Z}',
};

// Renderizza una singola riga con **bold**, $inline$ e $$display$$
const InlineRich: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';

    const regex = /(\*\*[^*]+\*\*|\$\$[\s\S]*?\$\$|\$[^$\n]*?\$)/g;
    let last = 0;
    let m: RegExpExecArray | null;

    while ((m = regex.exec(text)) !== null) {
      if (m.index > last) {
        ref.current.appendChild(document.createTextNode(text.slice(last, m.index)));
      }
      const raw = m[0];

      if (raw.startsWith('**')) {
        const b = document.createElement('strong');
        b.style.color = 'var(--text-primary)';
        b.style.fontWeight = '700';
        b.textContent = raw.slice(2, -2);
        ref.current.appendChild(b);
      } else if (raw.startsWith('$$')) {
        const span = document.createElement('div');
        span.style.margin = '10px 0';
        span.style.overflowX = 'auto';
        span.style.textAlign = 'center';
        try {
          katex.render(raw.slice(2, -2), span, {
            displayMode: true,
            throwOnError: false,
            strict: false,
            macros: KATEX_MACROS,
          });
        } catch {
          span.textContent = raw.slice(2, -2);
        }
        ref.current.appendChild(span);
      } else {
        const span = document.createElement('span');
        try {
          katex.render(raw.slice(1, -1), span, {
            displayMode: false,
            throwOnError: false,
            strict: false,
            macros: KATEX_MACROS,
          });
        } catch {
          span.textContent = raw.slice(1, -1);
        }
        ref.current.appendChild(span);
      }

      last = m.index + raw.length;
    }

    if (last < text.length) {
      ref.current.appendChild(document.createTextNode(text.slice(last)));
    }
  }, [text]);

  return <span ref={ref} />;
};

interface RichTextProps {
  text: string;
}

// Renderizza un blocco di testo multi-riga: paragrafi, elenchi puntati
// ("- " e "  - " annidato) e formule LaTeX, con lo stesso stile visivo
// già usato in ExplanationPanel per le spiegazioni dei quiz.
export const RichText: React.FC<RichTextProps> = ({ text }) => {
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  let key = 0;

  lines.forEach(line => {
    if (line.trim() === '') {
      blocks.push(<div key={key++} style={{ height: '10px' }} />);
      return;
    }

    // Elenco annidato: "  - testo"
    if (/^\s{2,}-\s/.test(line)) {
      blocks.push(
        <div key={key++} style={{ display: 'flex', gap: '8px', margin: '3px 0 3px 22px' }}>
          <span style={{ color: 'var(--accent2)', flexShrink: 0 }}>◦</span>
          <span style={{ flex: 1 }}>
            <InlineRich text={line.replace(/^\s*-\s/, '')} />
          </span>
        </div>
      );
      return;
    }

    // Elenco semplice: "- testo"
    if (/^-\s/.test(line)) {
      blocks.push(
        <div key={key++} style={{ display: 'flex', gap: '8px', margin: '4px 0' }}>
          <span style={{ color: 'var(--accent)', flexShrink: 0 }}>•</span>
          <span style={{ flex: 1 }}>
            <InlineRich text={line.replace(/^-\s/, '')} />
          </span>
        </div>
      );
      return;
    }

    blocks.push(
      <div key={key++} style={{ marginBottom: '2px' }}>
        <InlineRich text={line} />
      </div>
    );
  });

  return (
    <div style={{ color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: '1.75' }}>
      {blocks}
    </div>
  );
};
