export interface Question {
  id: number;
  // text può contenere LaTeX tra $...$ o $$...$$
  text: string;
  // Per domande a scelta multipla singola o multipla
  type: 'single' | 'multi';
  options: string[];
  // Indici corretti (0-based)
  correctIndices: number[];
  explanation: string;
  // Categoria per il tracking
  category: string;
}

export enum AppView {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS',
  STATS = 'STATS',
  HACK = 'HACK',
  NOMENCLATURA = 'NOMENCLATURA',
}

export interface QuizResult {
  questionId: number;
  correct: boolean;
  selectedIndices: number[];
}

// ── Sezione "Hack" ───────────────────────────────────────────────────────────
// Un trucco/scorciatoia mentale per un argomento specifico. Il testo di
// "content" supporta la stessa sintassi delle spiegazioni dei quiz:
// **grassetto**, $LaTeX inline$, $$LaTeX display$$ e righe che iniziano con
// "- " (elenco puntato) o "  - " (elenco puntato annidato).
export interface HackTrick {
  id: string;
  emoji: string;
  title: string;
  // Categoria coerente con la Question.category, per riconoscerla al volo
  category: string;
  // Sottotitolo breve tipo "Utile per domande: ..."
  summary: string;
  // Spiegazione dettagliata (situazione / trucco / regola)
  content: string;
}

// ── Sezione "Nomenclatura" ───────────────────────────────────────────────────
// Un termine tecnico con definizione semplice + eventuale procedimento.
// "content" usa la stessa sintassi di HackTrick.content.
export interface NomenclaturaTerm {
  id: string;
  term: string;
  category: string;
  // Definizione in una riga, sempre visibile
  short: string;
  // Definizione estesa + eventuale piccolo procedimento tecnico
  content: string;
}
