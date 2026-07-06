# Algebra Lineare & Geometria — Quiz

Quiz interattivo per l'esame di Algebra Lineare e Geometria.

## Caratteristiche

- **90+ domande** dai quiz d'esame (Quiz_2025.pdf e quiz_algebra.pdf)
- **20 domande per sessione**, selezionate casualmente
- **Anti-ripetizione**: le domande non viste vengono prioritizzate
- **Formule LaTeX** renderizzate con KaTeX
- **Spiegazioni dettagliate** con tutti i passaggi matematici
- **Tracciamento progressi** tramite localStorage

## Sviluppo locale

```bash
npm install
npm run dev
```

## Deploy su Vercel

1. Fai push del progetto su GitHub
2. Vai su [vercel.com](https://vercel.com) → **New Project**
3. Importa il repository
4. Vercel rileva automaticamente Vite — clicca **Deploy**

Oppure via CLI:
```bash
npm i -g vercel
vercel
```

## Deploy su GitHub Pages (alternativa)

Aggiungi in `vite.config.ts`:
```ts
base: '/<nome-repo>/'
```

Poi:
```bash
npm run build
# copia dist/ in gh-pages branch
```

## Struttura

```
src/
├── data/
│   └── questions.ts      # Tutte le domande con spiegazioni
├── components/
│   ├── QuizCard.tsx      # Card domanda con opzioni
│   ├── ExplanationPanel.tsx  # Pannello spiegazione post-risposta
│   ├── ProgressBar.tsx   # Barra avanzamento
│   ├── ResultsScreen.tsx # Schermata risultati
│   ├── StatsScreen.tsx   # Statistiche e progressi
│   └── Math.tsx          # Renderer KaTeX
├── App.tsx               # Logica principale
├── types.ts              # TypeScript types
└── constants.ts          # Configurazione
```
