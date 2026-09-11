import { GameSettings } from './types.js';
import { PLAYER_COLOR_LABELS, Scores } from './hud.js';

/**
 * "Game over"-Anzeige: Endstand anzeigen, Gewinner (oder Draw) ermitteln und
 * Möglichkeit zum Start einer neuen Runde ("Play Again") anbieten.
 */

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
    const newRoundButton = document.getElementById('btn-new-round') as HTMLButtonElement;

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

    if (isDraw) {
        resultText.textContent = 'Draw';
    } else {
        const winnerColor = scores.player1 > scores.player2 ? settings.player1Color : settings.player2Color;
        resultText.textContent = `${PLAYER_COLOR_LABELS[winnerColor]} Player gewinnt!`;
    }

    newRoundButton.onclick = onNewRound;
}
