import { BOARD_SIZES, GAME_THEME_CONFIG, GAME_THEMES, PLAYER_COLORS } from './config.js';
import { BoardSize, GameSettings, GameThemeName, PlayerColor } from './types.js';

/**
 * Verwaltung der Settings-Seite.
 * Verantwortlich für: Optionen rendern, Auswahlzustand merken und beim Start
 * ein vollständiges GameSettings-Objekt an den Aufrufer übergeben.
 */

interface SettingsState {
    player1Color: PlayerColor;
    boardSize: BoardSize;
    gameTheme: GameThemeName;
}

const OPTION_LABELS: Record<string, string> = {
    [PlayerColor.Blau]: 'Blue',
    [PlayerColor.Orange]: 'Orange',
    [BoardSize.VierxVier]: '16 cards',
    [BoardSize.VierxSechs]: '24 cards',
    [BoardSize.SechsexSechs]: '36 cards',
    [GameThemeName.CodeVibes]: 'Code vibes theme',
    [GameThemeName.Gaming]: 'Gaming theme',
    [GameThemeName.DaProjects]: 'DA Projects theme',
    [GameThemeName.Foods]: 'Foods theme',
};

/**
 * Ermittelt die Farbe des zweiten Spielers als Gegenstück zur gewählten Farbe.
 */
function getOtherPlayerColor(color: PlayerColor): PlayerColor {
    return PLAYER_COLORS.find((candidate) => candidate !== color) ?? PLAYER_COLORS[0];
}

/**
 * Rendert eine Gruppe wählbarer Optionen (z.B. Spielfeldgrößen) als Buttons
 * und markiert die aktuell gewählte Option. `showSelectedMarker` blendet
 * zusätzlich die gelbe Linie+Raute hinter der gewählten Option ein (Figma:
 * nur bei "Game themes" sichtbar, siehe Img/Content5.png).
 */
function renderOptionGroup<T extends string>(
    container: HTMLElement,
    options: T[],
    selected: T,
    onSelect: (value: T) => void,
    showSelectedMarker = false
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

        if (showSelectedMarker && option === selected) {
            const marker = document.createElement('span');
            marker.className = 'option-tile__marker';
            marker.setAttribute('aria-hidden', 'true');
            button.appendChild(marker);
        }

        container.appendChild(button);
    });
}

export function initSettings(onStart: (settings: GameSettings) => void): void {
    const playerGroup = document.getElementById('settings-player') as HTMLElement;
    const sizeGroup = document.getElementById('settings-size') as HTMLElement;
    const gameThemeGroup = document.getElementById('settings-gametheme') as HTMLElement;
    const startButton = document.getElementById('btn-settings-start') as HTMLButtonElement;

    const state: SettingsState = {
        player1Color: PLAYER_COLORS[0],
        boardSize: BOARD_SIZES[0],
        gameTheme: GAME_THEMES[0],
    };

    /**
     * Setzt die Layout-Klasse auf dem body, damit das gewaehlte Game-theme
     * (siehe GAME_THEME_CONFIG) im eigentlichen Spiel als Farbschema greift.
     * Die Settings-Vorschau selbst ist eine statische Grafik (Img/Theme
     * Visual.png) und muss dafuer nicht mehr aktualisiert werden.
     */
    function applyLayout(gameTheme: GameThemeName): void {
        const { layout } = GAME_THEME_CONFIG[gameTheme];

        Object.values(GAME_THEME_CONFIG).forEach(({ layout: name }) =>
            document.body.classList.remove(`layout--${name}`)
        );
        document.body.classList.add(`layout--${layout}`);
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
        renderOptionGroup(gameThemeGroup, GAME_THEMES, state.gameTheme, (value) => {
            state.gameTheme = value;
            applyLayout(value);
            render();
        }, true);
    }

    applyLayout(state.gameTheme);
    render();

    startButton.addEventListener('click', () => {
        const { layout, theme } = GAME_THEME_CONFIG[state.gameTheme];
        onStart({
            player1Color: state.player1Color,
            player2Color: getOtherPlayerColor(state.player1Color),
            boardSize: state.boardSize,
            layout,
            theme,
        });
    });
}
