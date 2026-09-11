import { BOARD_SIZES, LAYOUTS, PLAYER_COLORS, THEMES } from './config.js';
import { THEME_MOTIFS } from './config.js';
import { BoardSize, GameSettings, LayoutName, PlayerColor, ThemeName } from './types.js';

/**
 * Verwaltung der Settings-Seite.
 * Verantwortlich für: Optionen rendern, Auswahlzustand merken und beim Start
 * ein vollständiges GameSettings-Objekt an den Aufrufer übergeben.
 */

interface SettingsState {
    player1Color: PlayerColor;
    boardSize: BoardSize;
    layout: LayoutName;
    theme: ThemeName;
}

const OPTION_LABELS: Record<string, string> = {
    [PlayerColor.Blau]: 'Blue',
    [PlayerColor.Orange]: 'Orange',
    [BoardSize.VierxVier]: '4x4 cards',
    [BoardSize.VierxSechs]: '4x6 cards',
    [BoardSize.SechsexSechs]: '6x6 cards',
    [LayoutName.Classic]: 'Classic',
    [LayoutName.Neon]: 'Neon',
    [ThemeName.Tiere]: 'Tiere',
    [ThemeName.Obst]: 'Obst',
};

/**
 * Ermittelt die Farbe des zweiten Spielers als Gegenstück zur gewählten Farbe.
 */
function getOtherPlayerColor(color: PlayerColor): PlayerColor {
    return PLAYER_COLORS.find((candidate) => candidate !== color) ?? PLAYER_COLORS[0];
}

/**
 * Rendert eine Gruppe wählbarer Optionen (z.B. Spielfeldgrößen) als Buttons
 * und markiert die aktuell gewählte Option.
 */
function renderOptionGroup<T extends string>(
    container: HTMLElement,
    options: T[],
    selected: T,
    onSelect: (value: T) => void
): void {
    container.innerHTML = '';

    options.forEach((option) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'option-tile';
        button.textContent = OPTION_LABELS[option] ?? option;
        button.setAttribute('aria-pressed', String(option === selected));
        button.classList.toggle('option-tile--selected', option === selected);
        button.addEventListener('click', () => onSelect(option));
        container.appendChild(button);
    });
}

export function initSettings(onStart: (settings: GameSettings) => void): void {
    const playerGroup = document.getElementById('settings-player') as HTMLElement;
    const sizeGroup = document.getElementById('settings-size') as HTMLElement;
    const layoutGroup = document.getElementById('settings-layout') as HTMLElement;
    const themeGroup = document.getElementById('settings-theme') as HTMLElement;
    const startButton = document.getElementById('btn-settings-start') as HTMLButtonElement;
    const previewBoard = document.getElementById('settings-preview-board') as HTMLElement;
    const previewMotif = document.getElementById('settings-preview-motif') as HTMLElement;

    const state: SettingsState = {
        player1Color: PLAYER_COLORS[0],
        boardSize: BOARD_SIZES[0],
        layout: LAYOUTS[0],
        theme: THEMES[0],
    };

    /**
     * Setzt die Layout-Klasse auf dem body, damit das Farbschema (CSS-Variablen
     * aus scss/themes/) sofort als Vorschau sichtbar wird.
     */
    function applyLayoutClass(layout: LayoutName): void {
        LAYOUTS.forEach((name) => document.body.classList.remove(`layout--${name}`));
        document.body.classList.add(`layout--${layout}`);
    }

    /**
     * Aktualisiert die Karten-Vorschau rechts im Settings-Screen: Theme-Klasse
     * (steuert die Vorderseiten-Farbe aus _card.scss) und erstes Motiv des
     * gewählten Themes. Die Kartenrückseite folgt dem Layout automatisch über
     * die CSS-Variable --color-card-back (siehe applyLayoutClass).
     */
    function updatePreview(theme: ThemeName): void {
        THEMES.forEach((name) => previewBoard.classList.remove(`theme--${name}`));
        previewBoard.classList.add(`theme--${theme}`);
        previewMotif.textContent = THEME_MOTIFS[theme][0];
    }

    function render(): void {
        renderOptionGroup(playerGroup, PLAYER_COLORS, state.player1Color, (value) => {
            state.player1Color = value;
            render();
        });
        renderOptionGroup(sizeGroup, BOARD_SIZES, state.boardSize, (value) => {
            state.boardSize = value;
            render();
        });
        renderOptionGroup(layoutGroup, LAYOUTS, state.layout, (value) => {
            state.layout = value;
            applyLayoutClass(value);
            render();
        });
        renderOptionGroup(themeGroup, THEMES, state.theme, (value) => {
            state.theme = value;
            updatePreview(value);
            render();
        });
    }

    applyLayoutClass(state.layout);
    updatePreview(state.theme);
    render();

    /**
     * Verdrahtet die drei Schritt-Buttons unten: Klick scrollt zum jeweiligen
     * Einstellungsbereich und setzt den Fokus auf dessen erste Option.
     * Rein navigatorisch – ändert keinen State und keine Auswahl-Logik.
     */
    const stepTargets: Array<[string, string]> = [
        ['settings-step-gametheme', 'settings-group-gametheme'],
        ['settings-step-player', 'settings-group-player'],
        ['settings-step-board', 'settings-group-board'],
    ];

    stepTargets.forEach(([buttonId, targetId]) => {
        const stepButton = document.getElementById(buttonId) as HTMLButtonElement;
        const target = document.getElementById(targetId) as HTMLElement;

        stepButton.addEventListener('click', () => {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.querySelector<HTMLElement>('.option-tile')?.focus();
        });
    });

    startButton.addEventListener('click', () => {
        onStart({
            player1Color: state.player1Color,
            player2Color: getOtherPlayerColor(state.player1Color),
            boardSize: state.boardSize,
            layout: state.layout,
            theme: state.theme,
        });
    });
}
