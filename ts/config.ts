import { BoardSize, GameThemeName, LayoutName, PlayerColor, ThemeName } from './types.js';

/**
 * Zentrale Datenquellen der App.
 * Definiert alle auswählbaren Optionen (Farben, Größen, Layouts, Themes).
 */

export const PLAYER_COLORS: PlayerColor[] = [
    PlayerColor.Blau,
    PlayerColor.Orange,
];

export const BOARD_SIZES: BoardSize[] = [
    BoardSize.VierxVier,
    BoardSize.VierxSechs,
    BoardSize.SechsexSechs,
];

export const LAYOUTS: LayoutName[] = [
    LayoutName.Classic,
    LayoutName.Neon,
];

export const THEMES: ThemeName[] = [
    ThemeName.Tiere,
    ThemeName.Obst,
];

// Sichtbare "Game themes"-Liste (Figma: eine flache Liste aus 4 Eintraegen).
// Nur "Code vibes theme" hat aktuell ein eigenes Farbschema (Neon-Layout,
// siehe scss/themes/_theme-neon.scss); die anderen drei nutzen bewusst das
// neutrale Classic-Schema, bis dafuer eigene Figma-Referenzen vorliegen.
export const GAME_THEMES: GameThemeName[] = [
    GameThemeName.CodeVibes,
    GameThemeName.Gaming,
    GameThemeName.DaProjects,
    GameThemeName.Foods,
];

export const GAME_THEME_CONFIG: Record<GameThemeName, { layout: LayoutName; theme: ThemeName }> = {
    [GameThemeName.CodeVibes]: { layout: LayoutName.Neon, theme: ThemeName.Tiere },
    [GameThemeName.Gaming]: { layout: LayoutName.Classic, theme: ThemeName.Tiere },
    [GameThemeName.DaProjects]: { layout: LayoutName.Classic, theme: ThemeName.Tiere },
    [GameThemeName.Foods]: { layout: LayoutName.Classic, theme: ThemeName.Tiere },
};

export const BOARD_DIMENSIONS: Record<BoardSize, { rows: number; cols: number }> = {
    [BoardSize.VierxVier]: { rows: 4, cols: 4 },
    [BoardSize.VierxSechs]: { rows: 4, cols: 6 },
    [BoardSize.SechsexSechs]: { rows: 6, cols: 6 },
};

// Kartenmotive je Theme. Es werden immer nur so viele Motive verwendet,
// wie das gewählte Spielfeld an Paaren benötigt (siehe game.ts).
export const THEME_MOTIFS: Record<ThemeName, string[]> = {
    [ThemeName.Tiere]: [
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊',
        '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
        '🐷', '🐸', '🐵', '🐔', '🐧', '🦉',
    ],
    [ThemeName.Obst]: [
        '🍎', '🍐', '🍊', '🍋', '🍌', '🍉',
        '🍇', '🍓', '🫐', '🍈', '🍒', '🍑',
        '🥭', '🍍', '🥥', '🥝', '🍅', '🍆',
    ],
};