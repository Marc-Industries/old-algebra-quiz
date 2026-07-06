import { NomenclaturaTerm } from '../types';

// Glossario dei termini tecnici usati nei quiz, con definizione semplice
// ed eventuale piccolo procedimento tecnico.
export const nomenclaturaBank: NomenclaturaTerm[] = [
  {
    id: 'lin-indipendenti',
    term: 'Vettori linearmente indipendenti / dipendenti',
    category: 'Spazi Vettoriali',
    short: 'Nessuno dei vettori si può scrivere come combinazione degli altri.',
    content: `**Definizione:** un insieme di vettori $v_1,\\dots,v_k$ è **linearmente indipendente** se l'unico modo di ottenere il vettore nullo combinandoli è prendere tutti i coefficienti uguali a zero:
$$c_1v_1+c_2v_2+\\dots+c_kv_k=0 \\implies c_1=c_2=\\dots=c_k=0$$
Se invece esiste una combinazione non banale che dà zero, i vettori sono **dipendenti**.

**Come verificarlo:** metti i vettori come righe (o colonne) di una matrice e calcola il rango: se è uguale al numero di vettori, sono indipendenti; se è minore, sono dipendenti.

**Scorciatoia:** se il numero di vettori supera la dimensione dello spazio, sono automaticamente dipendenti.`,
  },
  {
    id: 'base',
    term: 'Base di uno spazio vettoriale',
    category: 'Spazi Vettoriali',
    short: 'Un insieme di vettori indipendenti che genera tutto lo spazio.',
    content: `**Definizione:** una base di $V$ è un insieme di vettori che è contemporaneamente:
- un **sistema di generatori** (ogni vettore di $V$ è combinazione lineare di loro), e
- **linearmente indipendente**.

**Numero di elementi:** ogni base di uno stesso spazio ha lo stesso numero di vettori: la **dimensione** dello spazio ($\\dim V$).

**Procedimento pratico:** per verificare se $n$ vettori formano una base di uno spazio di dimensione $n$, basta controllare **una sola** delle due condizioni: se il numero di vettori è già esattamente $n$, indipendenza e generazione si implicano a vicenda.`,
  },
  {
    id: 'sistema-generatori',
    term: 'Sistema di generatori',
    category: 'Sistemi Generatori',
    short: 'Un insieme di vettori che, combinati, permette di ottenere qualsiasi vettore dello spazio.',
    content: `**Definizione:** $\\{v_1,\\dots,v_k\\}$ genera $V$ se ogni $w \\in V$ si scrive come $w=c_1v_1+\\dots+c_kv_k$.

**Differenza con la base:** un sistema di generatori può avere più vettori del necessario, mentre una base ne ha il numero esatto e minimo. Ogni base è un sistema di generatori, ma non viceversa.`,
  },
  {
    id: 'dimensione',
    term: 'Dimensione di uno spazio vettoriale',
    category: 'Spazi Vettoriali',
    short: 'Il numero di vettori in una qualsiasi base dello spazio.',
    content: `**Definizione:** $\\dim V$ è il numero di vettori di una (qualsiasi) base di $V$: è ben definito perché tutte le basi di uno stesso spazio hanno la stessa cardinalità.

**Esempi:** $\\dim \\mathbb{R}^n = n$; $\\dim M_2(\\mathbb{R}) = 4$ (matrici $2\\times2$).`,
  },
  {
    id: 'sottospazio',
    term: 'Sottospazio vettoriale',
    category: 'Sottospazi Vettoriali',
    short: 'Un sottoinsieme di uno spazio che è a sua volta uno spazio vettoriale.',
    content: `**Definizione:** $W \\subseteq V$ è un sottospazio se: contiene $0$; è chiuso rispetto alla somma ($u,v\\in W \\Rightarrow u+v\\in W$); è chiuso rispetto al prodotto per scalare.

**In pratica:** insiemi descritti da equazioni **lineari omogenee** (senza termine noto) sono sottospazi. Rette e piani passanti per l'origine lo sono; quelli che non passano per l'origine no.`,
  },
  {
    id: 'somma-diretta',
    term: 'Somma diretta',
    category: 'Somma Diretta',
    short: 'Due sottospazi che "completano" lo spazio senza sovrapporsi.',
    content: `**Definizione:** $V = U \\oplus W$ se $V=U+W$ e $U \\cap W = \\{0\\}$ (l'unico vettore in comune è quello nullo).

**Conseguenza:** $\\dim V = \\dim U + \\dim W$, e ogni vettore si scrive in **un unico modo** come somma di un elemento di $U$ e uno di $W$.`,
  },
  {
    id: 'rango',
    term: 'Rango di una matrice',
    category: 'Rango - Matrice',
    short: 'Il numero massimo di righe (o colonne) linearmente indipendenti.',
    content: `**Definizione:** $\\text{rk}(A)$ è la dimensione dello spazio generato dalle righe (o colonne) di $A$; coincide con la dimensione dell'**immagine** dell'applicazione lineare associata.

**Come calcolarlo:** riduci $A$ a scala con Gauss: il rango è il numero di righe non nulle (pivot).

**Legame col determinante:** una matrice quadrata $n\\times n$ ha rango $n$ se e solo se $\\det(A)\\neq 0$ (invertibile).`,
  },
  {
    id: 'nullita',
    term: 'Nullità (dimensione del nucleo)',
    category: 'Rango e Nullità',
    short: 'Quanti "gradi di libertà" vengono annullati da un\'applicazione lineare.',
    content: `**Definizione:** $\\text{null}(f) = \\dim \\text{Ker}(f)$.

**Teorema del rango (Rango-Nullità):**
$$\\dim \\text{Ker}(f) + \\text{rk}(f) = \\dim V$$
La formula più usata nei quiz: conoscendo due dei tre valori, trovi subito il terzo.`,
  },
  {
    id: 'nucleo',
    term: 'Nucleo (Kernel) di un\'applicazione lineare',
    category: 'Nucleo e Immagine',
    short: 'L\'insieme dei vettori che f manda nel vettore nullo.',
    content: `**Definizione:** $\\text{Ker}(f) = \\{v \\in V : f(v)=0\\}$. È sempre un sottospazio del dominio (contiene almeno $0$).

**Come si trova:** risolvi il sistema omogeneo $f(v)=0$ (o $Av=0$); i coefficienti liberi della soluzione parametrizzata danno subito una base del nucleo.

**Legame con l'iniettività:** $f$ è iniettiva $\\iff \\text{Ker}(f)=\\{0\\}$.`,
  },
  {
    id: 'immagine',
    term: 'Immagine di un\'applicazione lineare',
    category: 'Nucleo e Immagine',
    short: 'L\'insieme dei vettori che f riesce effettivamente a "raggiungere".',
    content: `**Definizione:** $\\text{Im}(f)=\\{f(v):v\\in V\\}\\subseteq W$, sottospazio del codominio generato dalle immagini di una base del dominio.

**Dimensione:** $\\dim \\text{Im}(f) = \\text{rk}(f)$.

**Legame con la suriettività:** $f$ è suriettiva $\\iff \\text{Im}(f)=W \\iff \\text{rk}(f)=\\dim W$.`,
  },
  {
    id: 'applicazione-lineare',
    term: 'Applicazione lineare (endomorfismo)',
    category: 'Applicazioni Lineari',
    short: 'Una funzione tra spazi vettoriali che rispetta somma e moltiplicazione per scalare.',
    content: `**Definizione:** $f:V\\to W$ è lineare se per ogni $u,v\\in V$, $\\lambda\\in\\mathbb{R}$:
$$f(u+v)=f(u)+f(v), \\qquad f(\\lambda v)=\\lambda f(v)$$
Un **endomorfismo** è un'applicazione lineare da uno spazio in sé stesso ($f:V\\to V$), come quelle rappresentate da una matrice quadrata.

**In pratica:** rispetto a basi fissate, ogni applicazione lineare si scrive come $f(v)=Av$.`,
  },
  {
    id: 'iniettiva',
    term: 'Iniettiva',
    category: 'Applicazioni Lineari',
    short: 'A vettori diversi corrispondono sempre immagini diverse.',
    content: `**Definizione:** $f$ è iniettiva se $f(u)=f(v) \\implies u=v$ (non manda mai due vettori distinti nello stesso vettore).

**Criterio pratico (il più usato nei quiz):**
$$f \\text{ iniettiva} \\iff \\text{Ker}(f)=\\{0\\} \\iff \\text{null}(f)=0$$

**Quando è impossibile:** se $\\dim V > \\dim W$, $f$ non può mai essere iniettiva (per il teorema del rango la nullità sarebbe necessariamente positiva).`,
  },
  {
    id: 'suriettiva',
    term: 'Suriettiva',
    category: 'Applicazioni Lineari',
    short: 'Ogni vettore del codominio viene raggiunto da almeno un vettore del dominio.',
    content: `**Definizione:** $f:V\\to W$ è suriettiva se per ogni $w\\in W$ esiste $v\\in V$ con $f(v)=w$, cioè $\\text{Im}(f)=W$.

**Criterio pratico:** $f$ è suriettiva $\\iff \\text{rk}(f)=\\dim W$.

**Quando è impossibile:** se $\\dim V < \\dim W$, $f$ non può mai essere suriettiva.`,
  },
  {
    id: 'biettiva',
    term: 'Biiettiva (isomorfismo)',
    category: 'Applicazioni Lineari',
    short: 'Iniettiva e suriettiva insieme: una corrispondenza uno a uno.',
    content: `**Definizione:** $f$ è biiettiva se è sia iniettiva che suriettiva. In questo caso è invertibile ed è chiamata **isomorfismo**.

**Condizione necessaria:** se $\\dim V \\neq \\dim W$, $f$ non può mai essere biiettiva. Se $\\dim V=\\dim W$, basta verificare una sola delle due proprietà: il teorema del rango garantisce automaticamente anche l'altra.`,
  },
  {
    id: 'autovalore',
    term: 'Autovalore',
    category: 'Autovalori e Autovettori',
    short: 'Un numero che dice "quanto" una direzione viene stirata o compressa da una matrice.',
    content: `**Definizione:** $\\lambda$ è un autovalore di $A$ se esiste $v\\neq0$ (l'**autovettore**) con $Av=\\lambda v$.

**Come si trovano:** sono le radici del **polinomio caratteristico** $p(\\lambda)=\\det(A-\\lambda I)$.`,
  },
  {
    id: 'autovettore',
    term: 'Autovettore',
    category: 'Autovalori e Autovettori',
    short: 'Un vettore non nullo la cui direzione non cambia sotto la trasformazione.',
    content: `**Definizione:** $v\\neq0$ è autovettore relativo a $\\lambda$ se $Av=\\lambda v$.

**Come si trovano:** risolvi il sistema omogeneo $(A-\\lambda I)v=0$: le soluzioni non nulle sono gli autovettori relativi a $\\lambda$.`,
  },
  {
    id: 'autospazio',
    term: 'Autospazio',
    category: 'Autovalori e Autovettori',
    short: 'L\'insieme di tutti gli autovettori relativi a un certo autovalore, più il vettore nullo.',
    content: `**Definizione:** dato $\\lambda$, l'autospazio è $E_\\lambda = \\text{Ker}(A-\\lambda I)$.

**Dimensione:** $\\dim E_\\lambda$ è la **molteplicità geometrica** di $\\lambda$.`,
  },
  {
    id: 'polinomio-caratteristico',
    term: 'Polinomio caratteristico',
    category: 'Autovalori e Autovettori',
    short: 'Il polinomio che, uguagliato a zero, dà tutti gli autovalori di una matrice.',
    content: `**Definizione:** $p(\\lambda)=\\det(A-\\lambda I)$. Per una matrice $n\\times n$ ha grado $n$; le radici sono gli autovalori.

**Scorciatoia:** se $n$ è dispari, il polinomio ha grado dispari e ha sempre almeno una radice reale → esiste sempre almeno un autovalore reale.`,
  },
  {
    id: 'molteplicita-algebrica',
    term: 'Molteplicità algebrica',
    category: 'Diagonalizzabilità',
    short: 'Quante volte un autovalore compare come radice del polinomio caratteristico.',
    content: `**Definizione:** $m_a(\\lambda)$ è l'esponente con cui $(\\lambda-\\lambda_0)$ compare nella fattorizzazione di $p(x)$.

**Esempio:** se $p(x)=x^2(x-1)$, allora $\\lambda=0$ ha $m_a(0)=2$ e $\\lambda=1$ ha $m_a(1)=1$.`,
  },
  {
    id: 'molteplicita-geometrica',
    term: 'Molteplicità geometrica',
    category: 'Diagonalizzabilità',
    short: 'La dimensione dell\'autospazio associato a un autovalore.',
    content: `**Definizione:** $m_g(\\lambda) = \\dim E_\\lambda = \\dim \\text{Ker}(A-\\lambda I)$: quanti autovettori indipendenti trovi davvero per quell'autovalore.

**Regola sempre valida:** $1 \\leq m_g(\\lambda) \\leq m_a(\\lambda)$.

**Legame con la diagonalizzabilità:** $A$ è diagonalizzabile $\\iff m_g(\\lambda)=m_a(\\lambda)$ per **tutti** gli autovalori.`,
  },
  {
    id: 'diagonalizzabile',
    term: 'Diagonalizzabile',
    category: 'Diagonalizzabilità',
    short: 'Si possono trovare abbastanza autovettori indipendenti da formare una base.',
    content: `**Definizione:** $A$ è diagonalizzabile se esiste una base di autovettori, cioè $A=PDP^{-1}$ con $D$ diagonale.

**Criterio pratico:** $A$ è diagonalizzabile $\\iff m_g(\\lambda)=m_a(\\lambda)$ per ogni autovalore.

**Attenzione:** questi autovettori possono formare angoli qualsiasi tra loro. Per l'ortogonalità serve il livello "pro": vedi **Ortogonalmente diagonalizzabile**.`,
  },
  {
    id: 'ortogonalmente-diagonalizzabile',
    term: 'Ortogonalmente diagonalizzabile',
    category: 'Diagonalizzabilità',
    short: 'Diagonalizzabile con autovettori anche perpendicolari tra loro e di lunghezza 1.',
    content: `**Definizione:** esiste una base **ortonormale** di autovettori, cioè $A=PDP^T$ con $P$ ortogonale ($P^{-1}=P^T$).

**Quando succede (teorema spettrale):** se e solo se $A$ è **simmetrica** ($A=A^T$). "Matrice simmetrica" e "ortogonalmente diagonalizzabile" vanno sempre insieme.`,
  },
  {
    id: 'matrice-simmetrica',
    term: 'Matrice simmetrica',
    category: 'Matrici',
    short: 'Una matrice uguale alla propria trasposta.',
    content: `**Definizione:** $A=A^T$, cioè $a_{ij}=a_{ji}$ per ogni $i,j$.

**Proprietà chiave (teorema spettrale):** ogni matrice simmetrica reale è ortogonalmente diagonalizzabile e ha tutti gli **autovalori reali**.`,
  },
  {
    id: 'matrice-ortogonale',
    term: 'Matrice ortogonale',
    category: 'Matrici Ortogonali',
    short: 'Una matrice le cui colonne (e righe) formano una base ortonormale.',
    content: `**Definizione:** $A^TA=AA^T=I$, cioè $A^{-1}=A^T$.

**Proprietà utile:** conserva lunghezze e angoli (isometria); $\\det(A)=\\pm1$.

**Cosa resta ortogonale (se $A,B$ lo sono):** $A^{-1}$, $A^T$, $A\\cdot B$, $-A$. Non resta ortogonale: $A+B$, $A-B$, $kA$ con $k\\neq\\pm1$.`,
  },
  {
    id: 'matrice-trasposta',
    term: 'Matrice trasposta',
    category: 'Matrici',
    short: 'La stessa matrice con righe e colonne scambiate.',
    content: `**Definizione:** $(A^T)_{ij}=A_{ji}$. Non cambia il determinante: $\\det(A)=\\det(A^T)$.`,
  },
  {
    id: 'matrice-inversa',
    term: 'Matrice inversa',
    category: 'Matrici',
    short: 'La matrice che "annulla" l\'effetto di A: A per la sua inversa dà l\'identità.',
    content: `**Definizione:** $A^{-1}$ è l'unica matrice tale che $AA^{-1}=A^{-1}A=I$.

**Esiste se e solo se:** $\\det(A)\\neq0$ (matrice invertibile / non singolare), cioè se e solo se $A$ ha rango massimo.`,
  },
  {
    id: 'determinante',
    term: 'Determinante',
    category: 'Determinante',
    short: 'Un numero che misura come una matrice "deforma i volumi" e dice se è invertibile.',
    content: `**Definizione:** funzione $\\det: M_n(\\mathbb{R}) \\to \\mathbb{R}$, calcolabile con sviluppo di Laplace o riduzione a scala.

**Proprietà da ricordare:** $\\det(AB)=\\det(A)\\det(B)$; $\\det(A^T)=\\det(A)$; $\\det(kA)=k^n\\det(A)$; scambiare due righe cambia il segno; $A$ invertibile $\\iff \\det(A)\\neq0$.`,
  },
  {
    id: 'matrici-simili',
    term: 'Matrici simili',
    category: 'Matrici Simili',
    short: 'Due matrici che rappresentano la stessa trasformazione lineare, viste da basi diverse.',
    content: `**Definizione:** $A$ e $B$ sono simili se esiste $P$ invertibile tale che $B=P^{-1}AP$.

**Cosa hanno in comune:** stesso determinante, stessa traccia, stesso polinomio caratteristico, stessi autovalori (con le stesse molteplicità).`,
  },
  {
    id: 'prodotto-scalare',
    term: 'Prodotto scalare (prodotto interno)',
    category: 'Prodotto Scalare',
    short: 'Un\'operazione tra due vettori che restituisce un numero, legato ad angolo e lunghezza.',
    content: `**Definizione (in $\\mathbb{R}^n$):** $u\\cdot v = u_1v_1+u_2v_2+\\dots+u_nv_n$.

**Proprietà fondamentali:** positività ($v\\cdot v\\geq0$), simmetria, linearità/distributiva. **Non è associativo** (non ha senso $(u\\cdot v)\\cdot w$, perché $u\\cdot v$ è già un numero).

**Legame con l'angolo:** il segno di $u\\cdot v$ dice se l'angolo è acuto (positivo), ottuso (negativo) o retto (zero).`,
  },
  {
    id: 'prodotto-vettoriale',
    term: 'Prodotto vettoriale',
    category: 'Prodotto Scalare e Vettoriale',
    short: 'Un\'operazione (solo in dimensione 3) che restituisce un vettore perpendicolare a entrambi.',
    content: `**Definizione:** in $\\mathbb{R}^3$, $u\\times v$ è perpendicolare sia a $u$ che a $v$, con lunghezza $\\|u\\|\\|v\\|\\sin\\theta$ e verso dato dalla regola della mano destra.

**Regola pratica sulla base canonica:** $e_1\\times e_2=e_3$, $e_2\\times e_3=e_1$, $e_3\\times e_1=e_2$ (ordine "in avanti" → segno positivo); invertendo l'ordine il segno cambia, es. $e_2\\times e_1=-e_3$.`,
  },
  {
    id: 'norma',
    term: 'Norma di un vettore',
    category: 'Prodotto Scalare',
    short: 'La "lunghezza" di un vettore.',
    content: `**Definizione:** $\\|v\\| = \\sqrt{v\\cdot v}$. Un vettore si dice **unitario** (o normalizzato) se $\\|v\\|=1$.`,
  },
  {
    id: 'ortogonali-ortonormali',
    term: 'Vettori ortogonali / ortonormali',
    category: 'Basi Ortonormali',
    short: 'Ortogonali = perpendicolari; ortonormali = anche di lunghezza 1.',
    content: `**Ortogonali:** $u \\perp v \\iff u\\cdot v = 0$.

**Ortonormali:** un insieme di vettori è ortonormale se sono a due a due ortogonali **e** ciascuno ha norma 1.

**Base ortonormale:** una base i cui vettori sono tutti ortonormali tra loro.`,
  },
  {
    id: 'complemento-ortogonale',
    term: 'Complemento ortogonale',
    category: 'Complemento Ortogonale',
    short: 'Tutti i vettori perpendicolari a un intero sottospazio.',
    content: `**Definizione:** dato $U \\subseteq V$, $U^\\perp = \\{v\\in V : v\\cdot u=0 \\ \\forall u\\in U\\}$.

**Proprietà:** $\\dim U + \\dim U^\\perp = \\dim V$, e $V = U \\oplus U^\\perp$.`,
  },
  {
    id: 'proiezione-ortogonale',
    term: 'Proiezione ortogonale',
    category: 'Proiezione Ortogonale',
    short: 'L\'"ombra" più vicina di un vettore su un sottospazio.',
    content: `**Definizione:** data una base ortonormale $\\{u_1,\\dots,u_k\\}$ di $U$:
$$\\text{proj}_U(v) = (v\\cdot u_1)u_1 + \\dots + (v\\cdot u_k)u_k$$
È il punto di $U$ più vicino a $v$ (minimizza la distanza).`,
  },
  {
    id: 'isometria',
    term: 'Isometria',
    category: 'Isometrie',
    short: 'Una trasformazione lineare che conserva sempre le lunghezze (e quindi gli angoli).',
    content: `**Definizione:** $f$ è un'isometria se $\\|f(v)\\|=\\|v\\|$ per ogni $v$. È sempre rappresentata da una matrice **ortogonale**.

Vedi il trucco "Le leggi dell'isometria" per l'elenco completo delle proprietà.`,
  },
  {
    id: 'coniugato-modulo-argomento',
    term: 'Coniugato, modulo e argomento (numeri complessi)',
    category: 'Numeri Complessi',
    short: 'Coniugato: cambi segno alla parte immaginaria. Modulo: distanza dall\'origine. Argomento: l\'angolo.',
    content: `Per $z=a+bi$:
- **Coniugato:** $\\bar{z}=a-bi$.
- **Modulo:** $|z|=\\sqrt{a^2+b^2}$.
- **Argomento:** $\\arg(z)$, l'angolo che $z$ forma con l'asse reale positivo (senso antiorario).

**Relazione utile:** $z\\bar{z}=|z|^2$.`,
  },
  {
    id: 'gruppo',
    term: 'Gruppo (struttura algebrica)',
    category: 'Matrici',
    short: 'Un insieme con un\'operazione che ha elemento neutro e in cui ogni elemento ha un inverso.',
    content: `**Definizione:** $(G,*)$ è un gruppo se l'operazione è associativa, esiste un elemento neutro $e$ ($g*e=e*g=g$), e ogni elemento ha un inverso.

**Trappola classica:** "l'insieme delle matrici non nulle è un gruppo rispetto al prodotto?" → **falso**: quelle con determinante 0 non hanno inversa.`,
  },
  {
    id: 'elemento-neutro',
    term: 'Elemento neutro',
    category: 'Matrici',
    short: 'L\'elemento che, combinato con qualsiasi altro, lo lascia invariato.',
    content: `**Rispetto alla somma di matrici:** la matrice **nulla** $0$: $A+0=A$.

**Rispetto al prodotto (matrici quadrate):** la matrice **identità** $I$: $AI=IA=A$.

**Attenzione:** sono due elementi neutri diversi, per due operazioni diverse.`,
  },
  {
    id: 'sistema-omogeneo',
    term: 'Sistema lineare omogeneo',
    category: 'Sistemi Lineari',
    short: 'Un sistema Ax=0, che ha sempre almeno la soluzione banale.',
    content: `**Definizione:** sistema $Ax=0$ (termine noto nullo). Ha sempre almeno la soluzione banale $x=0$: non è mai impossibile.

**Quando ha altre soluzioni:** se e solo se $\\text{rk}(A) < n$ (numero di incognite).`,
  },
  {
    id: 'rouche-capelli',
    term: 'Teorema di Rouché-Capelli',
    category: 'Sistemi Lineari',
    short: 'Il criterio ufficiale per sapere se un sistema lineare ha soluzioni, e quante.',
    content: `Dato $Ax=b$, confronta $\\text{rk}(A)$ con $\\text{rk}(A|b)$:
- diversi → **nessuna soluzione**.
- uguali $= n$ (incognite) → **una sola soluzione**.
- uguali $< n$ → **infinite soluzioni** (con $n-\\text{rk}(A)$ parametri liberi).`,
  },
];
