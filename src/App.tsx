import React, { useState, useEffect, useCallback } from 'react';
import { questionBank } from './data/questions';
import { Question, AppView, QuizResult } from './types';
import { QuizCard } from './components/QuizCard';
import { ProgressBar } from './components/ProgressBar';
import { ResultsScreen } from './components/ResultsScreen';
import { StatsScreen } from './components/StatsScreen';
import { HackScreen } from './components/HackScreen';
import { NomenclaturaScreen } from './components/NomenclaturaScreen';
import { QUIZ_SIZE, STORAGE_KEY_SEEN } from './constants';

// ── Quiz selection logic ─────────────────────────────────────────────────────
// Priority: unseen questions first, then seen. Shuffle within each group.
function selectQuestions(seen: Set<number>, size: number): Question[] {
  const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  const unseen = shuffle(questionBank.filter(q => !seen.has(q.id)));
  const seenArr = shuffle(questionBank.filter(q => seen.has(q.id)));

  const pool = [...unseen, ...seenArr];
  return pool.slice(0, Math.min(size, pool.length));
}

// ── App ──────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [score, setScore] = useState(0);
  const [seenIds, setSeenIds] = useState<Set<number>>(new Set());

  // Load seen IDs from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SEEN);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setSeenIds(new Set(parsed as number[]));
      }
    } catch { /* ignore */ }
  }, []);

  // Persist seen IDs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SEEN, JSON.stringify([...seenIds]));
    } catch { /* ignore */ }
  }, [seenIds]);

  const startQuiz = useCallback(() => {
    const questions = selectQuestions(seenIds, QUIZ_SIZE);
    setActiveQuestions(questions);
    setCurrentIndex(0);
    setResults([]);
    setScore(0);
    setView(AppView.QUIZ);
    window.scrollTo(0, 0);
  }, [seenIds]);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    const q = activeQuestions[currentIndex];

    // Mark as seen
    setSeenIds(prev => new Set([...prev, q.id]));

    // Save result
    const result: QuizResult = {
      questionId: q.id,
      correct: isCorrect,
      selectedIndices: [],
    };
    setResults(prev => [...prev, result]);
    if (isCorrect) setScore(s => s + 1);

    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView(AppView.RESULTS);
      window.scrollTo(0, 0);
    }
  }, [activeQuestions, currentIndex]);

  const handleReset = () => {
    setSeenIds(new Set());
  };

  // Un quiz è "in corso" finché non è stata registrata una risposta per
  // ogni domanda selezionata. Serve per mostrare "Torna al quiz" in Hack/
  // Nomenclatura e per riprendere esattamente da dove si era arrivati,
  // senza toccare activeQuestions/currentIndex/results/score.
  const quizInProgress = activeQuestions.length > 0 && results.length < activeQuestions.length;
  const backToQuiz = useCallback(() => setView(AppView.QUIZ), []);

  // ── Navbar ────────────────────────────────────────────────────────────────
  const NavBar = () => (
    <nav style={{
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '0 20px',
        height: '58px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}>
        {/* Logo */}
        <button
          onClick={() => setView(AppView.HOME)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: 0,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '1.35rem' }}>∑</span>
          <span style={{
            fontWeight: 800,
            fontSize: '1.05rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}>
            Algebra <span style={{ color: 'var(--accent)' }}>Quiz</span>
          </span>
        </button>

        {/* Nav links */}
        <div style={{
          display: 'flex',
          gap: '2px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}>
          {[
            { label: 'Home', v: AppView.HOME },
            { label: 'Statistiche', v: AppView.STATS },
            { label: 'Hack', v: AppView.HACK },
            { label: 'Nomenclatura', v: AppView.NOMENCLATURA },
          ].map(({ label, v }) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                background: view === v ? 'var(--accent-glow)' : 'none',
                border: view === v ? '1px solid rgba(108,99,255,0.3)' : '1px solid transparent',
                borderRadius: 'var(--radius-sm)',
                color: view === v ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: view === v ? 700 : 500,
                fontSize: '0.82rem',
                padding: '6px 11px',
                cursor: 'pointer',
                fontFamily: 'var(--font)',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  // ── Home screen ───────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const seen = seenIds.size;
    const total = questionBank.length;

    return (
      <div className="fade-in" style={{
        maxWidth: '520px',
        margin: '0 auto',
        textAlign: 'center',
        paddingTop: '48px',
      }}>
        {/* Hero */}
        <div style={{
          fontSize: '3.5rem',
          marginBottom: '16px',
          filter: 'drop-shadow(0 0 20px rgba(108,99,255,0.4))',
        }}>
          ∫
        </div>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 900,
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
          marginBottom: '10px',
          lineHeight: 1.15,
        }}>
          Algebra Lineare<br />
          <span style={{ color: 'var(--accent)' }}>& Geometria</span>
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          marginBottom: '36px',
          lineHeight: '1.65',
        }}>
          {total} domande d'esame con soluzioni dettagliate.<br />
          20 domande per sessione, mai le stesse due volte di fila.
        </p>

        {/* Progress pill */}
        {seen > 0 && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '99px',
            padding: '8px 18px',
            marginBottom: '28px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
          }}>
            <span style={{ color: 'var(--accent2)', fontWeight: 700 }}>{seen}/{total}</span>
            domande già viste
          </div>
        )}

        {/* Start button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '280px', margin: '0 auto' }}>
          <button
            onClick={startQuiz}
            style={{
              padding: '16px 28px',
              background: 'linear-gradient(135deg, var(--accent) 0%, #8b5cf6 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius)',
              fontWeight: 800,
              fontSize: '1.05rem',
              cursor: 'pointer',
              fontFamily: 'var(--font)',
              boxShadow: '0 8px 32px rgba(108,99,255,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(108,99,255,0.45)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(108,99,255,0.35)';
            }}
          >
            ▶&nbsp;&nbsp;Inizia Quiz
          </button>
          <button
            onClick={() => setView(AppView.STATS)}
            style={{
              padding: '12px 20px',
              background: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              fontFamily: 'var(--font)',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-light)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            📊&nbsp;&nbsp;I miei progressi
          </button>

          {/* Quick access: Hack & Nomenclatura */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              onClick={() => setView(AppView.HACK)}
              style={{
                padding: '11px 14px',
                background: 'var(--bg-card)',
                color: 'var(--text-secondary)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'var(--font)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-light)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              🧠 Hack
            </button>
            <button
              onClick={() => setView(AppView.NOMENCLATURA)}
              style={{
                padding: '11px 14px',
                background: 'var(--bg-card)',
                color: 'var(--text-secondary)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'var(--font)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-light)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              📖 Nomenclatura
            </button>
          </div>
        </div>

        {/* Feature pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '40px',
        }}>
          {[
            '🔢 Formule in LaTeX',
            '📝 Spiegazioni dettagliate',
            '🎲 Domande miste',
            '📈 Traccia i progressi',
            '🧠 Hack & Nomenclatura',
          ].map(f => (
            <span key={f} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '99px',
              padding: '6px 14px',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
            }}>
              {f}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <NavBar />
      <main style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '28px 20px 80px',
      }}>

        {view === AppView.HOME && <HomeScreen />}

        {view === AppView.QUIZ && activeQuestions.length > 0 && (
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <ProgressBar
              current={currentIndex + 1}
              total={activeQuestions.length}
              score={score}
            />
            <QuizCard
              key={activeQuestions[currentIndex].id}
              question={activeQuestions[currentIndex]}
              onAnswer={handleAnswer}
              isLast={currentIndex === activeQuestions.length - 1}
              questionNumber={currentIndex + 1}
              totalQuestions={activeQuestions.length}
            />
          </div>
        )}

        {view === AppView.RESULTS && (
          <ResultsScreen
            results={results}
            onRestart={startQuiz}
            onHome={() => setView(AppView.HOME)}
          />
        )}

        {view === AppView.STATS && (
          <StatsScreen
            seenIds={seenIds}
            onReset={handleReset}
            onStartQuiz={startQuiz}
          />
        )}

        {view === AppView.HACK && (
          <HackScreen
            quizInProgress={quizInProgress}
            onBackToQuiz={backToQuiz}
          />
        )}

        {view === AppView.NOMENCLATURA && (
          <NomenclaturaScreen
            quizInProgress={quizInProgress}
            onBackToQuiz={backToQuiz}
          />
        )}
      </main>
    </div>
  );
};

export default App;
