import { GameSettings, LayoutName, PlayerColor } from './types.js';
import { PLAYER_COLOR_LABELS, Scores } from './hud.js';

/**
 * "Game over"-Anzeige: Endstand anzeigen, Gewinner (oder Draw) ermitteln und
 * Möglichkeit zum Start einer neuen Runde ("Play Again"/"Home") anbieten.
 */

// Figma-Assets fuer die drei moeglichen Ausgaenge, je einmal fuer das
// "Code vibes"- und einmal fuer das "Gaming"-Theme (zwei komplett eigene
// Bild-Sets). Jedes Bild enthaelt bereits einen eingezeichneten Button;
// "hit" beschreibt dessen Position/Groesse als Prozentwerte des jeweiligen
// Bildes (im Asset selbst pixelgenau vermessen), damit der echte Button
// exakt darueber sitzt.
interface OutcomeAsset {
    src: string;
    width: number;
    height: number;
    alt: string;
    hit: { left: number; top: number; width: number; height: number };
}

type OutcomeKey = 'winner-orange' | 'winner-blue' | 'draw';

const CODE_VIBES_OUTCOME_ASSETS: Record<OutcomeKey, OutcomeAsset> = {
    'winner-orange': {
        src: 'Img/Content2 (1).png',
        width: 522,
        height: 573,
        alt: 'Orange Player gewinnt!',
        hit: { left: 30.65, top: 89.35, width: 38.7, height: 10.47 },
    },
    'winner-blue': {
        src: 'Img/Content3 (1).png',
        width: 426,
        height: 573,
        alt: 'Blue Player gewinnt!',
        hit: { left: 26.29, top: 89.35, width: 47.42, height: 10.47 },
    },
    draw: {
        src: 'Img/Content4 (1).png',
        width: 432,
        height: 603,
        alt: 'Draw',
        hit: { left: 27.55, top: 89.55, width: 47.22, height: 10.28 },
    },
};

const GAMING_OUTCOME_ASSETS: Record<OutcomeKey, OutcomeAsset> = {
    'winner-orange': {
        src: 'Img/Content8.png',
        width: 470,
        height: 639,
        alt: 'Orange Player gewinnt!',
        hit: { left: 39.15, top: 92.64, width: 21.28, height: 7.04 },
    },
    'winner-blue': {
        src: 'Img/Content9.png',
        width: 579,
        height: 639,
        alt: 'Blue Player gewinnt!',
        hit: { left: 41.28, top: 92.64, width: 17.27, height: 7.04 },
    },
    draw: {
        src: 'Img/Content10.png',
        width: 586,
        height: 601,
        alt: 'Draw',
        hit: { left: 41.64, top: 91.01, width: 16.89, height: 6.99 },
    },
};

export function showGameOver(
    scores: Scores,
    settings: GameSettings,
    onNewRound: () => void
): void {
    const resultText = document.getElementById('gameover-result') as HTMLElement;
    const label1 = document.getElementById('gameover-label-1') as HTMLElement;
    const label2 = document.getElementById('gameover-label-2') as HTMLElement;
    const score1 = document.getElementById('gameover-score-1') as HTMLElement;
    const score2 = document.getElementById('gameover-score-2') as HTMLElement;
    const player1 = document.getElementById('gameover-player-1') as HTMLElement;
    const player2 = document.getElementById('gameover-player-2') as HTMLElement;
    const outcomeImage = document.getElementById('gameover-outcome-image') as HTMLImageElement;
    const outcomeHit = document.getElementById('btn-new-round') as HTMLButtonElement;

    label1.textContent = PLAYER_COLOR_LABELS[settings.player1Color];
    label2.textContent = PLAYER_COLOR_LABELS[settings.player2Color];
    score1.textContent = String(scores.player1);
    score2.textContent = String(scores.player2);

    player1.classList.remove(`hud__player--${settings.player1Color}`, `hud__player--${settings.player2Color}`);
    player2.classList.remove(`hud__player--${settings.player1Color}`, `hud__player--${settings.player2Color}`);
    player1.classList.add(`hud__player--${settings.player1Color}`);
    player2.classList.add(`hud__player--${settings.player2Color}`);

    const isDraw = scores.player1 === scores.player2;
    player1.classList.toggle('gameover__player--winner', !isDraw && scores.player1 > scores.player2);
    player2.classList.toggle('gameover__player--winner', !isDraw && scores.player2 > scores.player1);

    let outcomeKey: OutcomeKey;
    if (isDraw) {
        resultText.textContent = 'Draw';
        outcomeKey = 'draw';
    } else {
        const winnerColor = scores.player1 > scores.player2 ? settings.player1Color : settings.player2Color;
        resultText.textContent = `${PLAYER_COLOR_LABELS[winnerColor]} Player gewinnt!`;
        outcomeKey = winnerColor === PlayerColor.Orange ? 'winner-orange' : 'winner-blue';
    }

    // Welches der beiden Figma-Sets zeigt, richtet sich nach dem gespielten
    // Game-theme (Layout): "Gaming" bekommt die Pixel-/Pokal-Bilder, alle
    // anderen (Code vibes, DA Projects, Foods) das schlichtere Code-vibes-Set.
    const outcomeAssets = settings.layout === LayoutName.Gaming
        ? GAMING_OUTCOME_ASSETS
        : CODE_VIBES_OUTCOME_ASSETS;
    const asset = outcomeAssets[outcomeKey];

    outcomeImage.src = asset.src;
    outcomeImage.width = asset.width;
    outcomeImage.height = asset.height;
    outcomeImage.alt = asset.alt;
    outcomeHit.style.left = `${asset.hit.left}%`;
    outcomeHit.style.top = `${asset.hit.top}%`;
    outcomeHit.style.width = `${asset.hit.width}%`;
    outcomeHit.style.height = `${asset.hit.height}%`;

    outcomeHit.onclick = onNewRound;
}
