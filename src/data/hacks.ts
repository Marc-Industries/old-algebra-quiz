import { HackTrick } from '../types';

// Trucchi e scorciatoie mentali per riconoscere al volo la risposta giusta,
// tratti e riorganizzati dal materiale "Trucchi per i quiz".
export const hackBank: HackTrick[] = [
  {
    id: 'vettori-basi',
    emoji: '🖐️',
    title: 'Vettori e basi — il gioco del conteggio',
    category: 'Spazi Vettoriali',
    summary: 'Utile per: "Questi vettori sono linearmente indipendenti?"',
    content: `**La situazione:** hai una lista di vettori dentro uno spazio $\\mathbb{R}^n$ (per esempio $\\mathbb{R}^4$).

**Il trucco:** prima di fare qualsiasi calcolo, conta semplicemente quanti vettori hai e confrontali con la dimensione dello spazio.

**La regola:**
- Se il numero di vettori è **maggiore** della dimensione dello spazio (es. 5 vettori in $\\mathbb{R}^4$) → sono **sicuramente dipendenti**. Se la domanda chiede "sono indipendenti?" la risposta è **falso**.
- Un insieme con troppi vettori non può mai essere una base, qualunque sia la loro forma.

**Perché funziona:** in uno spazio di dimensione $n$ non possono mai esistere più di $n$ vettori linearmente indipendenti.`,
  },
  {
    id: 'piani-rette',
    emoji: '🧭',
    title: 'Piani e rette — il furto dei numeri',
    category: 'Geometria Analitica',
    summary: 'Utile per: "Trova l\'equazione della retta/piano perpendicolare o parallelo"',
    content: `**La situazione:** ti danno l'equazione di un piano, per esempio $3x - y + 3z = 0$.

**Il trucco:** "ruba" i numeri davanti a $x, y, z$: quelli sono già il vettore normale al piano, non serve altro calcolo.

**La regola:**
- Il vettore **normale** al piano ($\\perp$) è $(3,-1,3)$.
- Se ti chiedono la **retta perpendicolare** al piano, la sua direzione deve essere proprio $(3,-1,3)$.
- Se ti chiedono il **piano parallelo**, deve avere gli stessi coefficienti $(3,-1,3)$ o un loro multiplo, es. $(6,-2,6)$.`,
  },
  {
    id: 'matrici-ortogonali',
    emoji: '🔒',
    title: 'Matrici ortogonali — il "club esclusivo"',
    category: 'Matrici Ortogonali',
    summary: 'Utile per: "Quale affermazione su A e B ortogonali è errata?"',
    content: `**La situazione:** $A$ e $B$ sono matrici ortogonali. Ti chiedono quale altra matrice costruita da loro resta ortogonale.

**Il trucco:** l'ortogonalità serve a **conservare la lunghezza** dei vettori. Chi cambia la lunghezza è fuori dal club.

**Chi entra (resta ortogonale) — VERO:**
- $A^{-1}$ (l'inversa)
- $A^T$ (la trasposta)
- $A \\cdot B$ (il prodotto)
- $-A$ (l'opposta)
- Nota tecnica: $\\det(AB)^2 = 1 \\Rightarrow \\det(AB) = \\pm 1$ (la "lunghezza" resta 1)

**Chi esce (non è ortogonale) — FALSO:**
- $A + B$ (la somma)
- $A - B$ (la differenza)
- $2A$, $3A$, $\\tfrac{1}{2}A$ (qualsiasi multiplo scalare diverso da $\\pm 1$)`,
  },
  {
    id: 'sistemi-lineari-semaforo',
    emoji: '🚦',
    title: 'Sistemi lineari — il semaforo del rango',
    category: 'Sistemi Lineari',
    summary: 'Utile per: "Il sistema ammette soluzioni? Quante?"',
    content: `**La situazione:** devi decidere se un sistema $Ax = b$ ha soluzioni, confrontando il rango di $A$ con il rango della matrice completa $(A|b)$.

**La regola (il semaforo):**
- 🔴 **Diversi** ($\\text{rk}(A) \\neq \\text{rk}(A|b)$) → **0 soluzioni**, sistema impossibile.
- 🟢 **Uguali e massimi** (= numero di incognite) → **1 sola soluzione**.
- 🟡 **Uguali ma bassi** (< numero di incognite) → **infinite soluzioni**.

**Nota furba:** se il sistema è **omogeneo** ($Ax = 0$), una soluzione c'è **sempre** (almeno quella banale $x=0$): "il sistema omogeneo può non avere soluzioni" è quindi sempre falsa.`,
  },
  {
    id: 'segno-coseno',
    emoji: '📐',
    title: 'Il segno del coseno',
    category: 'Prodotto Scalare',
    summary: 'Utile per: "L\'angolo tra u e v è acuto, ottuso o retto?"',
    content: `**La situazione:** hai due vettori $u$ e $v$ e ti chiedono che tipo di angolo formano, senza calcolarlo davvero.

**Il trucco:** basta il segno del **prodotto scalare** $u \\cdot v = u_1v_1 + u_2v_2 + u_3v_3 + \\dots$

**La regola:**
- $u \\cdot v > 0$ → coseno **positivo** → angolo **acuto**.
- $u \\cdot v < 0$ → coseno **negativo** → angolo **ottuso**.
- $u \\cdot v = 0$ → coseno **nullo** → vettori **ortogonali** ($u \\perp v$).`,
  },
  {
    id: 'complessi-anti-panico',
    emoji: '🧯',
    title: 'Numeri complessi — anti-panico',
    category: 'Numeri Complessi',
    summary: 'Utile per: "Quante soluzioni ha questa equazione in $\\mathbb{C}$?"',
    content: `**La situazione:** un'equazione con coniugato $\\bar{z}$ o modulo $|z|$ che sembra complicata, es. $z^2 + 4\\bar{z} + 3 = 0$.

**Il trucco:** non usare subito il $\\Delta$ classico. Prova prima a "far finta" che $z$ sia un numero reale.

**La regola, passo per passo:**
- Sostituisci $z$ con una $x$ reale: $x^2 + 4x + 3 = 0$. A mente trovi $x=-1$ e $x=-3$.
- Se trovi 2 soluzioni reali distinte, quasi sempre l'equazione originale in $\\mathbb{C}$ ne nasconde altre 2 complesse.
- Risposta standard nei quiz: se hai trovato radici reali distinte, la risposta giusta è quasi sempre **"ha 4 soluzioni distinte"**.
- Scarta sempre l'opzione **"non ha soluzioni"**: in $\\mathbb{C}$ un'equazione polinomiale ha (quasi) sempre soluzioni.`,
  },
  {
    id: 'applicazioni-esiste',
    emoji: '🔍',
    title: 'Applicazioni lineari — esiste o no?',
    category: 'Applicazioni Lineari',
    summary: 'Utile per: "Esiste un\'applicazione lineare f tale che f(v_i) = w_i?"',
    content: `**La situazione:** ti danno vettori di partenza $v_1,\\dots,v_k$ e vettori di arrivo $w_1,\\dots,w_k$, e ti chiedono se esiste $f$ lineare con $f(v_i)=w_i$.

**Il trucco:** guarda **solo** i vettori di partenza $v_i$. Quelli di arrivo non contano per l'esistenza.

**La regola:**
- Se i $v_i$ sono **linearmente indipendenti** (o base) → l'applicazione **esiste ed è unica**. Risposta: **vero**.
- Se i $v_i$ sono **dipendenti** → risposta: **falso** (o "non esiste sempre"), perché una relazione tra i $v_i$ dovrebbe valere anche per i $w_i$ corrispondenti, cosa non garantita.

**Nota:** i vettori di arrivo $w_i$ possono essere qualsiasi cosa: non influenzano se $f$ esiste, solo come sarà fatta $f$ una volta che esiste.`,
  },
  {
    id: 'teorema-spettrale',
    emoji: '⚖️',
    title: 'Il teorema spettrale — simmetria = potere',
    category: 'Diagonalizzabilità',
    summary: 'Utile per: "A è ortogonalmente diagonalizzabile" / "A è simmetrica"',
    content: `**La situazione:** nel testo leggi "simmetrica" oppure "ortogonalmente diagonalizzabile".

**Il trucco:** per una matrice reale, queste due espressioni sono **sinonimi**.

**La regola:**
- $A$ **simmetrica** ($A = A^T$) $\\iff$ $A$ **ortogonalmente diagonalizzabile**.
- "$A$ è reale simmetrica" → è **sempre** diagonalizzabile: **vero**.
- "$A$ è ortogonalmente diagonalizzabile" → allora $A$ è simmetrica: **vero**.
- "esiste una base ortonormale di autovettori di $A$" → stessa affermazione: vera se e solo se $A$ è simmetrica.`,
  },
  {
    id: 'leggi-isometria',
    emoji: '🪞',
    title: 'Le leggi dell\'isometria',
    category: 'Isometrie',
    summary: 'Utile per: "Quali proprietà ha un\'isometria f?"',
    content: `Un'isometria è un'applicazione lineare $f$ che **conserva le lunghezze**: $\\|f(v)\\| = \\|v\\|$ per ogni $v$.

**Proprietà sempre vere:**
- Conserva le lunghezze dei vettori.
- È sempre **invertibile** (biettiva) e **suriettiva**.
- Gli autovalori "unitari" hanno sempre modulo 1: $|\\lambda|=1$ (quindi $\\lambda=\\pm1$ se reali).
- Preserva sempre gli **angoli** tra i vettori.
- Vale $f(v)\\cdot f(w) = v\\cdot w$ per ogni $v,w \\in \\mathbb{R}^n$.
- Le **riflessioni** rispetto a un qualsiasi sottospazio sono isometrie: $f:\\mathbb{R}^n \\to \\mathbb{R}^n$.

**Attenzione:** un'isometria **non** è sempre diagonalizzabile su $\\mathbb{R}$! Una rotazione di $\\pi/2$ nel piano è un'isometria ma non ha autovalori reali.`,
  },
  {
    id: 'assiomi-prodotto-scalare',
    emoji: '✅',
    title: 'Assiomi del prodotto scalare — vero o falso',
    category: 'Prodotto Scalare',
    summary: 'Utile per: "Quale proprietà soddisfa il prodotto scalare?"',
    content: `**La situazione:** ti propongono formule con prodotti scalari $u\\cdot v$ tra vettori $u,v,w$ e devi dire quali sono vere.

**Il trucco:** cerca la **distributiva** tra le proprietà proposte e scarta subito l'**associativa** — il prodotto scalare non è mai associativo.

**Proprietà VERE:**
- $v \\cdot v \\geq 0$ (positività)
- $(u+v)\\cdot w = u\\cdot w + v\\cdot w$ (linearità/distributiva)
- $u \\cdot v = v \\cdot u$ (commutativa)
- $|u\\cdot v| \\leq \\|u\\|\\cdot\\|v\\|$ (disuguaglianza di Cauchy-Schwarz)
- $(u-w)\\cdot(u+w) = \\|u\\|^2 - \\|w\\|^2$

**Proprietà FALSE (inventate, occhio):**
- $(u\\cdot v)\\cdot w = u\\cdot(v\\cdot w)$ → **falso**: $u\\cdot v$ è già un numero, il prodotto scalare non è associativo.
- $\\|u+v\\| = \\|u\\|+\\|v\\|$ → **falso**: vale solo $\\leq$ (disuguaglianza triangolare), non l'uguaglianza in generale.`,
  },
  {
    id: 'teoria-matrici-gruppi',
    emoji: '🎲',
    title: 'Teoria delle matrici — gruppi e spazi',
    category: 'Matrici',
    summary: 'Utile per: "È un gruppo? Qual è l\'elemento neutro? Quanti generatori?"',
    content: `**La situazione:** domande astratte su insiemi di matrici (gruppi, elementi neutri, generatori).

**Il trucco:** memorizza queste risposte fisse, valgono quasi sempre.

**Le 4 risposte fisse:**
- "L'insieme delle matrici **non nulle** è un gruppo (col prodotto)?" → **falso**: le matrici con determinante $=0$ non hanno inversa.
- "Elemento neutro della **somma**?" → la matrice **nulla** $0$. Se la domanda dice "matrice identità $I$", quella è l'elemento neutro del **prodotto**, non della somma.
- "Esistono infinite basi di $M_2(\\mathbb{R})$?" → **vero**, come in ogni spazio vettoriale reale non banale.
- "Posso trovare 5 generatori di $M_2(\\mathbb{R})$?" → **vero**: la dimensione è 4, ma un sistema di generatori può averne di più (basta che non si chieda se sono una **base**).`,
  },
  {
    id: 'legge-dispari',
    emoji: '➗',
    title: 'La legge dei dispari — autovalori reali garantiti',
    category: 'Autovalori e Autovettori',
    summary: 'Utile per: matrici di ordine dispari (3, 5, 7…)',
    content: `**La regola:** se hai una matrice quadrata di dimensione **dispari** (es. $3\\times3$):
- Il suo polinomio caratteristico ha **grado dispari** (es. $x^3+\\dots$).
- Un polinomio di grado dispari va da $-\\infty$ a $+\\infty$ (o viceversa), quindi deve tagliare l'asse $x$ **almeno una volta**.
- **Conseguenza:** esiste **sempre** almeno un autovalore reale ($\\lambda \\in \\mathbb{R}$).
- **La catena logica:** se c'è un autovalore reale → c'è anche un autovettore reale associato.

Questo trucco ti fa rispondere "vero" a occhi chiusi ogni volta che una domanda afferma "esiste sempre un autovalore reale" per una matrice di ordine dispari.`,
  },
  {
    id: 'rango-schiacciato',
    emoji: '🥪',
    title: 'La regola del rango "schiacciato"',
    category: 'Rango e Nullità',
    summary: 'Utile per domande teoriche su rango, dimensioni e applicazioni $f:V\\to W$',
    content: `**La situazione:** hai un'applicazione lineare $f: V \\to W$, con $\\dim V = n$ e $\\dim W = m$.

**Il trucco:** il rango di $f$ è "schiacciato" da entrambi i lati: non può mai superare né lo spazio di partenza né quello di arrivo.

**La regola:**
- $\\text{rk}(f) \\leq \\dim V$ → **vero**.
- $\\text{rk}(f) \\leq \\dim W$ → **vero**.
- "la nullità è $\\leq \\dim W$" → **falso**: la nullità $\\dim\\text{Ker}(f)$ vive nello spazio di **partenza** $V$, non ha a che fare con $W$. Il confronto corretto è $\\dim\\text{Ker}(f) \\leq \\dim V$ (Teorema del rango: $\\dim\\text{Ker}(f) + \\text{rk}(f) = \\dim V$).`,
  },
  {
    id: 'angoli-complessi',
    emoji: '🕐',
    title: 'Angoli complessi — il metodo "chi vince?"',
    category: 'Numeri Complessi',
    summary: 'Utile per: "Qual è l\'argomento di questo numero complesso?"',
    content: `**La situazione:** hai un'espressione con potenze/rapporti di numeri complessi, es. $\\dfrac{A^n}{B^m}$, e devi trovare l'argomento finale senza calcoli lunghi.

**Passo 1 — Trova l'angolo base "a occhio":** guarda le due componenti (reale e immaginaria) senza segno: quale delle due è più grande in valore assoluto? (ricorda $\\sqrt3 \\approx 1{,}7$, quindi maggiore di 1)
- Vince la parte **immaginaria** (es. $1+i\\sqrt3$) → angolo $60°$.
- Vince la parte **reale** (es. $\\sqrt3+i$) → angolo $30°$.
- Sono **uguali** (es. $2+2i$) → angolo $45°$.

**Passo 2 — Sistema il segno**, guardando i segni originali:
- $(+,-)$ → angolo negativo (es. $-45°$)
- $(-,+)$ → $180° - \\text{angolo}$
- $(-,-)$ → $180° + \\text{angolo}$

**Passo 3 — Combina gli angoli** in base all'operazione:
- **Potenza** $z^n$ → l'argomento si **moltiplica**: $n\\cdot\\arg(z)$.
- **Divisione** → gli argomenti si **sottraggono** (sopra meno sotto).
- **Moltiplicazione** → gli argomenti si **sommano**.`,
  },
  {
    id: 'orologio-vettori',
    emoji: '🕒',
    title: 'L\'orologio dei vettori — prodotto vettoriale senza calcoli',
    category: 'Prodotto Scalare e Vettoriale',
    summary: 'Utile per: "A cosa è uguale $e_i \\times e_j$?"',
    content: `**La situazione:** hai i vettori della base canonica $e_1,e_2,e_3$ e devi calcolare velocemente un prodotto vettoriale, es. $e_3 \\times e_2$.

**L'immagine mentale:** un orologio con solo 3 numeri (1,2,3) che girano in senso orario: $1\\to2\\to3\\to1\\to\\dots$

**La regola:** guarda l'ordine dei due indici che moltiplichi.
- 🟢 **Senso orario** (l'ordine segue $1\\to2$, $2\\to3$, $3\\to1$) → **segno più**. Es. $e_3\\times e_1$ segue l'orologio (dopo il 3 si ricomincia dall'1) → $+e_2$.
- 🔴 **Senso antiorario** (va all'indietro) → **segno meno**. Es. $e_1\\times e_3$ va indietro rispetto all'orologio → $-e_2$.`,
  },
  {
    id: 'determinante-proprieta',
    emoji: '🧮',
    title: 'Determinante — cosa lo cambia e cosa no',
    category: 'Determinante',
    summary: 'Utile per: proprietà del determinante, mosse di Gauss, scambi di riga',
    content: `**✅ NON cambia se:**
- Fai la **trasposta**: $\\det(A) = \\det(A^T)$.
- Fai una **mossa di Gauss** (sommi a una riga un multiplo di un'altra, es. $R_2 \\to R_2+5R_1$): il determinante resta identico.
- $A$ è **simile** a $B$ (o diagonalizzabile): matrici simili hanno **sempre** lo stesso determinante.

**❌ CAMBIA se:**
- **Scambi due righe**: il segno si inverte, $\\det_{\\text{nuovo}} = -\\det_{\\text{vecchio}}$. Con un numero **dispari** di scambi il segno cambia, con un numero **pari** resta uguale.
- **Moltiplichi una sola riga** per uno scalare $k$: il determinante viene moltiplicato per $k$.
- **Moltiplichi tutta la matrice** per $k$ (cioè $kA$, con $A$ di ordine $n$): $\\det(kA)=k^n\\det(A)$. Es. per una $3\\times3$, $\\det(2A)=2^3\\det(A)=8\\det(A)$.`,
  },
  {
    id: 'gioco-torre',
    emoji: '🏗️',
    title: 'Il gioco della torre — chi butti giù?',
    category: 'Sistemi Generatori',
    summary: 'Utile per: troppi generatori con una relazione di dipendenza data',
    content: `**La situazione:** hai troppi vettori generatori (es. 6) per uno spazio più piccolo (es. $\\mathbb{R}^5$). C'è un "intruso" da eliminare per ottenere una base.

**La regola:** l'equazione di dipendenza data (es. $v_1 = v_2-v_4+v_5$) è la lista dei "colpevoli". Tutti i vettori che compaiono nella relazione sono collegati fra loro.
- **Chi puoi eliminare?** Uno **qualsiasi** dei vettori che compaiono nell'equazione.
- **Chi devi tenere per forza?** Tutti i vettori che **non compaiono** nell'equazione: quelli sono comunque indipendenti dal resto.`,
  },
  {
    id: 'due-livelli-diagonalizzazione',
    emoji: '🪜',
    title: 'I due livelli della diagonalizzazione',
    category: 'Diagonalizzabilità',
    summary: 'Utile per non confondere "diagonalizzabile" con "ortogonalmente diagonalizzabile"',
    content: `**Livello base — "Diagonalizzabile":**
- Esistono abbastanza autovettori indipendenti da formare una **base** (in $\\mathbb{R}^3$ servono 3 autovettori lin. indip.).
- Attenzione: questi autovettori possono formare angoli qualsiasi tra loro. **Non** devono essere ortogonali.

**Livello pro — "Ortogonalmente diagonalizzabile":**
- Gli autovettori non solo sono indipendenti, ma formano una **base ortonormale** (tutti perpendicolari e di lunghezza 1).
- Quando succede? **Solo** se la matrice è **simmetrica** ($A=A^T$) — vedi il trucco "Il teorema spettrale".`,
  },
  {
    id: 'basi-ortonormali-parametri',
    emoji: '🎯',
    title: 'Basi ortonormali con parametri — il cacciatore di zeri',
    category: 'Basi Ortonormali',
    summary: 'Utile per: "Per quali valori di (a,b) la terna forma una base ortonormale di $\\mathbb{R}^3$?"',
    content: `**La situazione:** ti danno 3 vettori, uno con incognite (es. $ae_1+be_3$), e devi trovare i valori corretti tra alcune opzioni date.

**Il trucco:** ignora la condizione sulla **lunghezza** e concentrati solo sull'**ortogonalità**: due vettori di una base ortonormale devono essere perpendicolari, quindi il loro prodotto scalare deve fare zero.

**La procedura:**
- Prendi il vettore con le incognite e uno degli altri due vettori "puri" dati nel testo.
- Fai il prodotto scalare: moltiplica solo le componenti sullo stesso asse ($e_1$ con $e_1$, ecc.) e sommale.
- Imponi che il risultato sia **zero**.
- Prova mentalmente le coppie proposte come opzioni: solo quella che annulla l'equazione è quella corretta.`,
  },
  {
    id: 'matrice-parametro-rango',
    emoji: '🔲',
    title: 'Matrice con parametro k e rango — il quadrato magico',
    category: 'Rango - Matrice',
    summary: 'Utile per: "Per quale valore di k il rango della matrice vale un certo numero?"',
    content: `**La situazione:** hai una matrice numerica con un parametro $k$ nascosto, e ti chiedono per quale $k$ il rango scende a un certo valore (es. rango 2 invece di 3).

**Il trucco:** non fare tutta l'eliminazione di Gauss. Se il rango deve fermarsi a $r$, ogni sottomatrice quadrata più grande di $r\\times r$ deve avere determinante nullo.

**La procedura:**
- Ritaglia un blocco quadrato (es. $3\\times3$) che contenga $k$, scegliendo righe/colonne con più zeri possibile.
- Calcola il determinante di questo blocco: sarà un'espressione in $k$.
- Imponi che sia **uguale a zero** e risolvi: trovi subito il valore di $k$ cercato.`,
  },
  {
    id: 'matrici-diagonali-sistemi',
    emoji: '0️⃣',
    title: 'Matrici diagonali/scalari e sistemi — occhio allo zero',
    category: 'Sistemi Lineari',
    summary: 'Utile per: "Sia A una matrice scalare/diagonale, quali affermazioni su Ax=b sono vere?"',
    content: `**La situazione:** ti propongono un sistema $Ax=b$ con $A$ diagonale o scalare, ma senza darti i numeri esatti.

**Il trucco:** tutto dipende da una parolina che il testo può includere o omettere: **"non nulli"**.

**La regola:**
- Se dice "$A$ ha coefficienti **non nulli** sulla diagonale" → rango massimo (invertibile). Risposta fissa: **$Ax=b$ ha sempre un'unica soluzione** ("$Ax=b$ può non avere soluzioni" è **falsa**).
- Se **non** specifica "non nulli" (es. "sia $A$ diagonale...") → potrebbe nascondersi uno zero. Risposta fissa: **il sistema $Ax=b$ può non avere soluzioni**.
- **Jolly universale:** in ogni scenario, "il sistema omogeneo $Ax=0$ ha sempre almeno una soluzione" è **sempre vera** ($x=0$ risolve sempre un sistema omogeneo).`,
  },
];
