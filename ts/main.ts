/**
 * Einstiegspunkt der App.
 * Verdrahtet die Navigation zwischen den Bildschirmen (Home -> Settings -> Spiel).
 */

import { startGame } from './game.js';
import { initSettings } from './settings.js';
import { showGameOver } from './gameover.js';
import { GameSettings } from './types.js';
import { Scores } from './hud.js';

interface Screens {
    home: HTMLElement;
    settings: HTMLElement;
    game: HTMLElement;
    gameover: HTMLElement;
}

/**
 * Liest alle Bildschirm-Container aus dem DOM.
 */
function getScreens(): Screens {
    return {
        home: document.getElementById('screen-home') as HTMLElement,
        settings: document.getElementById('screen-settings') as HTMLElement,
        game: document.getElementById('screen-game') as HTMLElement,
        gameover: document.getElementById('screen-gameover') as HTMLElement,
    };
}

/**
 * Blendet alle Bildschirme aus und zeigt nur den Ziel-Bildschirm an.
 */
function showScreen(target: HTMLElement, allScreens: HTMLElement[]): void {
    allScreens.forEach((screen) => {
        screen.hidden = true;
    });
    target.hidden = false;
}

document.addEventListener('DOMContentLoaded', () => {
    const screens = getScreens();
    const allScreens = Object.values(screens);
    const startButton = document.getElementById('btn-start') as HTMLButtonElement;

    function launchGame(settings: GameSettings): void {
        showScreen(screens.game, allScreens);
        startGame(
            settings,
            () => {
                showScreen(screens.home, allScreens);
            },
            (scores: Scores) => {
                showScreen(screens.gameover, allScreens);
                showGameOver(scores, settings, () => {
                    launchGame(settings);
                });
            }
        );
    }

    startButton.addEventListener('click', () => {
        showScreen(screens.settings, allScreens);
    });

    initSettings((settings) => {
        launchGame(settings);
    });
});