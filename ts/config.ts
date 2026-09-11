import { BoardSize, LayoutName, PlayerColor, ThemeName } from './types.js';

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