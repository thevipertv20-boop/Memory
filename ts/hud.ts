import { GameSettings, PlayerColor } from './types.js';

/**
 * Kopfzeile über dem Spielfeld (HUD):
 * Punktestand beider Spieler und Anzeige des aktiven Spielers.
 */

export const PLAYER_COLOR_LABELS: Record<PlayerColor, string> = {
    [PlayerColor.Blau]: 'Blau',
    [PlayerColor.Orange]: 'Orange',
};

export interface HudElements {
    player1: HTMLElement;
    player2: HTMLElement;
    score1: HTMLElement;
    score2: HTMLElement;
}

export interface Scores {
    player1: number;
    player2: number;
}

/**
 * Liest die HUD-Elemente aus dem DOM und beschriftet sie mit den in den
 * Settings gewählten Spielerfarben.
 */
export function initHud(settings: GameSettings): HudElements {
    const player1 = document.getElementById('hud-player-1') as HTMLElement;
    const player2 = document.getElementById('hud-player-2') as HTMLElement;
    const score1 = document.getElementById('hud-score-1') as HTMLElement;
    const score2 = document.getElementById('hud-score-2') as HTMLElement;
    const label1 = document.getElementById('hud-label-1') as HTMLElement;
    const label2 = document.getElementById('hud-label-2') as HTMLElement;

    label1.textContent = PLAYER_COLOR_LABELS[settings.player1Color];
    label2.textContent = PLAYER_COLOR_LABELS[settings.player2Color];

    player1.classList.add(`hud__player--${settings.player1Color}`);
    player2.classList.add(`hud__player--${settings.player2Color}`);

    return { player1, player2, score1, score2 };
}

/**
 * Aktualisiert Punktestand und Hervorhebung des aktiven Spielers.
 */
export function updateHud(elements: HudElements, scores: Scores, activePlayer: 1 | 2): void {
    elements.score1.textContent = String(scores.player1);
    elements.score2.textContent = String(scores.player2);
    elements.player1.classList.toggle('hud__player--active', activePlayer === 1);
    elements.player2.classList.toggle('hud__player--active', activePlayer === 2);
}
