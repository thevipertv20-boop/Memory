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

// Achtung: Content8.png zeigt tatsaechlich "Blue Player", Content9.png
// zeigt "Orange Player" (am Bildinhalt verifiziert, nicht am Dateinamen
// verlaesslich ablesbar) - die Zuordnung war zuvor vertauscht.
const GAMING_OUTCOME_ASSETS: Record<OutcomeKey, OutcomeAsset> = {
    'winner-orange': {
        src: 'Img/Content9.png',
        width: 579,
        height: 639,
        alt: 'Orange Player gewinnt!',
        hit: { left: 41.28, top: 92.64, width: 17.27, height: 7.04 },
    },
    'winner-blue': {
        src: 'Img/Content8.png',
        width: 470,
        height: 639,
        alt: 'Blue Player gewinnt!',
        hit: { left: 39.15, top: 92.64, width: 21.28, height: 7.04 },
    },
    draw: {
        src: 'Img/Content10.png',
        width: 586,
        height: 601,
        alt: 'Draw',
        hit: { left: 41.64, top: 91.01, width: 16.89, height: 6.99 },
    },
};

// "DA Projects": eigenes, schlichteres Bild-Set (Figma-Referenzen Content21.png
// [Winner] / Content22.png [Draw]). Content21.png enthaelt oben fest
// eingezeichneten weissen Text "The winner is/Blue Player" (auf Weiss
// unsichtbar) - der wird per CSS-Crop abgeschnitten (siehe
// .gameover__outcome--daprojects-winner in _gameover.scss), da er bei Orange
// (eingefaerbte Kopie derselben Datei) falsch waere. Die "hit"-Werte unten
// sind deshalb relativ zur BESCHNITTENEN Bildhoehe (372px, nicht 567px)
// vermessen. Dafuer bleibt der echte "Game Over"-HTML-Titel sichtbar (siehe
// showGameOver). Fuer "Winner Orange" liegt keine eigene Original-Datei vor:
// Content21.png zeigt nur Blau, die Orange-Variante nutzt dieselbe Datei per
// CSS eingefaerbt (siehe .gameover__outcome-image--recolor-orange) - keine
// neue Grafik, nur eine Farbvariante desselben Originals.
const DA_PROJECTS_OUTCOME_ASSETS: Record<OutcomeKey, OutcomeAsset> = {
    'winner-orange': {
        src: 'Img/Content21.png',
        width: 407,
        height: 567,
        alt: 'Orange Player gewinnt!',
        hit: { left: 38.08, top: 87.1, width: 23.83, height: 12.9 },
    },
    'winner-blue': {
        src: 'Img/Content21.png',
        width: 407,
        height: 567,
        alt: 'Blue Player gewinnt!',
        hit: { left: 38.08, top: 87.1, width: 23.83, height: 12.9 },
    },
    draw: {
        src: 'Img/Content22.png',
        width: 389,
        height: 600,
        alt: 'Draw',
        hit: { left: 37.28, top: 91.83, width: 24.68, height: 8.0 },
    },
};

export function showGameOver(
    scores: Scores,
    settings: GameSettings,
    onNewRound: () => void
): void {
    const title = document.getElementById('gameover-title') as HTMLElement;
    const resultText = document.getElementById('gameover-result') as HTMLElement;
    const label1 = document.getElementById('gameover-label-1') as HTMLElement;
    const label2 = document.getElementById('gameover-label-2') as HTMLElement;
    const score1 = document.getElementById('gameover-score-1') as HTMLElement;
    const score2 = document.getElementById('gameover-score-2') as HTMLElement;
    const player1 = document.getElementById('gameover-player-1') as HTMLElement;
    const player2 = document.getElementById('gameover-player-2') as HTMLElement;
    const outcomeWrapper = document.getElementById('gameover-outcome') as HTMLElement;
    const outcomeImage = document.getElementById('gameover-outcome-image') as HTMLImageElement;
    const outcomeHit = document.getElementById('btn-new-round') as HTMLButtonElement;
    const confetti = document.getElementById('gameover-confetti') as HTMLElement;

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

    // Figma: Konfetti nur bei Winner Orange/Blue, nicht bei Draw.
    confetti.hidden = isDraw;

    // Explosions-Animation bei jedem Winner-Ausgang neu abspielen (auch bei
    // wiederholten "Play Again"-Runden): Trigger-Klasse entfernen, Reflow
    // erzwingen, dann wieder hinzufuegen (siehe _gameover.scss).
    confetti.classList.remove('gameover__confetti--explode');
    if (!isDraw) {
        void confetti.offsetWidth;
        confetti.classList.add('gameover__confetti--explode');
    }

    let outcomeKey: OutcomeKey;
    if (isDraw) {
        title.hidden = false;
        title.textContent = 'Game Over';
        resultText.textContent = 'Draw';
        outcomeKey = 'draw';
    } else {
        const winnerColor = scores.player1 > scores.player2 ? settings.player1Color : settings.player2Color;
        // Code-vibes/Gaming zeichnen "The winner is/X Player" bereits ins Bild -
        // der HTML-Titel wuerde das doppeln, also dort ausblenden. Bei "DA
        // Projects" wird der (nur bei Blau vorhandene, bei Orange falsche)
        // eingezeichnete Text per CSS abgeschnitten (siehe
        // .gameover__outcome-image--daprojects-winner) - dafuer bleibt hier der
        // echte "Game Over"-Titel sichtbar.
        title.hidden = settings.layout !== LayoutName.DaProjects;
        if (!title.hidden) {
            title.textContent = 'Game Over';
        }
        resultText.textContent = `${PLAYER_COLOR_LABELS[winnerColor]} Player gewinnt!`;
        outcomeKey = winnerColor === PlayerColor.Orange ? 'winner-orange' : 'winner-blue';
    }

    // Welches Bild-Set zeigt, richtet sich nach dem gespielten Game-theme
    // (Layout): "Gaming" die Pixel-/Pokal-Bilder, "DA Projects" das eigene
    // Silhouetten-Set, alle anderen (Code vibes, Foods) das Code-vibes-Set.
    let outcomeAssets: Record<OutcomeKey, OutcomeAsset>;
    if (settings.layout === LayoutName.Gaming) {
        outcomeAssets = GAMING_OUTCOME_ASSETS;
    } else if (settings.layout === LayoutName.DaProjects) {
        outcomeAssets = DA_PROJECTS_OUTCOME_ASSETS;
    } else {
        outcomeAssets = CODE_VIBES_OUTCOME_ASSETS;
    }
    const asset = outcomeAssets[outcomeKey];

    outcomeImage.src = asset.src;
    outcomeImage.width = asset.width;
    outcomeImage.height = asset.height;
    outcomeImage.alt = asset.alt;
    const isDaProjectsWinner = settings.layout === LayoutName.DaProjects && outcomeKey !== 'draw';
    outcomeImage.classList.toggle('gameover__outcome-image--recolor-orange', isDaProjectsWinner && outcomeKey === 'winner-orange');
    outcomeWrapper.classList.toggle('gameover__outcome--daprojects-winner', isDaProjectsWinner);
    outcomeHit.style.left = `${asset.hit.left}%`;
    outcomeHit.style.top = `${asset.hit.top}%`;
    outcomeHit.style.width = `${asset.hit.width}%`;
    outcomeHit.style.height = `${asset.hit.height}%`;

    outcomeHit.onclick = onNewRound;
}
