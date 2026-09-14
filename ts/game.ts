import { BOARD_DIMENSIONS, THEME_MOTIFS } from './config.js';
import { BoardSize, CardData, GameSettings, ThemeName } from './types.js';
import { createCardElement, setCardFlipped, setCardMatched } from './card.js';
import { initHud, updateHud, Scores } from './hud.js';

/**
 * Baut das Spielfeld für die gewählten Settings auf: Karten mischen und
 * darstellen, HUD mit dem Ausgangsstand anzeigen, Züge auswerten
 * (Punktevergabe, Spielerwechsel) und die Runde beenden, sobald alle
 * Karten aufgedeckt sind.
 */

const MISMATCH_DELAY_MS = 700;

function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function buildDeck(boardSize: BoardSize, theme: ThemeName): CardData[] {
    const { rows, cols } = BOARD_DIMENSIONS[boardSize];
    const pairCount = (rows * cols) / 2;
    const motifs = THEME_MOTIFS[theme].slice(0, pairCount);

    const deck = [...motifs, ...motifs].map((motif, index) => ({
        id: index,
        motif,
        isFlipped: false,
        isMatched: false,
    }));

    return shuffle(deck);
}

/**
 * Baut das Spielfeld auf und zeigt den HUD mit dem Ausgangsstand an.
 * `onExit` wird beim Klick auf "Exit Game" aufgerufen.
 * `onGameOver` wird aufgerufen, sobald alle Karten aufgedeckt sind
 * (liefert den finalen Punktestand).
 */
export function startGame(
    settings: GameSettings,
    onExit: () => void,
    onGameOver: (scores: Scores) => void
): void {
    const board = document.getElementById('board') as HTMLElement;
    const exitButton = document.getElementById('btn-exit-game') as HTMLButtonElement;
    const exitPopup = document.getElementById('exit-popup') as HTMLElement;
    const exitCancelButton = document.getElementById('btn-exit-cancel') as HTMLButtonElement;
    const exitConfirmButton = document.getElementById('btn-exit-confirm') as HTMLButtonElement;
    const { cols } = BOARD_DIMENSIONS[settings.boardSize];

    board.innerHTML = '';
    board.className = `board theme--${settings.theme}`;
    board.style.setProperty('--board-columns', String(cols));

    const deck = buildDeck(settings.boardSize, settings.theme);
    const cardElements = new Map<number, HTMLElement>();
    const scores: Scores = { player1: 0, player2: 0 };
    let activePlayer: 1 | 2 = 1;
    let openCards: CardData[] = [];
    let locked = false;

    const hud = initHud(settings);
    updateHud(hud, scores, activePlayer);

    function handleCardClick(id: number): void {
        if (locked) {
            return;
        }
        const clicked = deck.find((entry) => entry.id === id);
        if (!clicked || clicked.isFlipped || clicked.isMatched) {
            return;
        }

        clicked.isFlipped = true;
        setCardFlipped(cardElements.get(id) as HTMLElement, true);
        openCards.push(clicked);

        if (openCards.length < 2) {
            return;
        }

        const [first, second] = openCards;

        if (first.motif === second.motif) {
            first.isMatched = true;
            second.isMatched = true;
            setCardMatched(cardElements.get(first.id) as HTMLElement, true);
            setCardMatched(cardElements.get(second.id) as HTMLElement, true);
            scores[activePlayer === 1 ? 'player1' : 'player2'] += 1;
            openCards = [];
            updateHud(hud, scores, activePlayer);

            if (deck.every((card) => card.isMatched)) {
                onGameOver(scores);
            }
            return;
        }

        locked = true;
        window.setTimeout(() => {
            first.isFlipped = false;
            second.isFlipped = false;
            setCardFlipped(cardElements.get(first.id) as HTMLElement, false);
            setCardFlipped(cardElements.get(second.id) as HTMLElement, false);
            openCards = [];
            activePlayer = activePlayer === 1 ? 2 : 1;
            updateHud(hud, scores, activePlayer);
            locked = false;
        }, MISMATCH_DELAY_MS);
    }

    deck.forEach((card) => {
        const element = createCardElement(card, handleCardClick);
        cardElements.set(card.id, element);
        board.appendChild(element);
    });

    // "Exit Game" oeffnet erst die Bestaetigungs-Popup (Bild + Trefferflaechen
    // oben bereits passend zum Game-theme gesetzt), statt das Spiel sofort zu
    // beenden. "Yes, quit game" ruft "onExit" auf (Runde beenden, zurueck zu
    // Settings - siehe ts/main.ts), "No, back to game" schliesst die Popup nur
    // wieder und das laufende Spiel bleibt unveraendert.
    exitButton.onclick = () => {
        exitPopup.hidden = false;
    };
    exitCancelButton.onclick = () => {
        exitPopup.hidden = true;
    };
    exitConfirmButton.onclick = () => {
        exitPopup.hidden = true;
        onExit();
    };
}
