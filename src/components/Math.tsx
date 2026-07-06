import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathProps {
  math: string;
  display?: boolean;
  className?: string;
}

export const Math: React.FC<MathProps> = ({ math, display = false, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(math, ref.current, {
          displayMode: display,
          throwOnError: false,
          strict: false,
          trust: true,
          macros: {
            '\\R': '\\mathbb{R}',
            '\\C': '\\mathbb{C}',
            '\\N': '\\mathbb{N}',
            '\\Z': '\\mathbb{Z}',
          },
        });
      } catch (e) {
        if (ref.current) ref.current.textContent = math;
      }
    }
  }, [math, display]);

  return <span ref={ref} className={className} />;
};

// Parse a string that may contain LaTeX delimiters ($...$ and $$...$$)
// and render mixed text+math
export const MathText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  // Split on $$...$$ first (display), then $...$
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  // Regex to match $$...$$ or $...$
  const regex = /(\$\$[\s\S]*?\$\$|\$[^$\n]*?\$)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Text before this match
    if (match.index > lastIndex) {
      const before = text.slice(lastIndex, match.index);
      if (before) parts.push(<span key={key++}>{before}</span>);
    }

    const raw = match[0];
    if (raw.startsWith('$$')) {
      const inner = raw.slice(2, -2);
      parts.push(<Math key={key++} math={inner} display={true} />);
    } else {
      const inner = raw.slice(1, -1);
      parts.push(<Math key={key++} math={inner} display={false} />);
    }

    lastIndex = match.index + raw.length;
  }

  // Remaining text
  remaining = text.slice(lastIndex);
  if (remaining) parts.push(<span key={key++}>{remaining}</span>);

  return <span className={className}>{parts}</span>;
};
