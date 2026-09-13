/**
 * Zentrale Typen des Memory-Spiels.
 * Hier werden die aus der Checkliste abgeleiteten Einstellungen modelliert.
 */

export enum PlayerColor {
    Blau = 'blau',
    Orange = 'orange',
}

export enum BoardSize {
    VierxVier = '4x4',
    VierxSechs = '4x6',
    SechsexSechs = '6x6',
}

export enum LayoutName {
    Classic = 'classic',
    Neon = 'neon',
}

export enum ThemeName {
    Tiere = 'tiere',
    Obst = 'obst',
}

// Die vier waehlbaren "Game themes" aus dem Figma-Screen "Settings_theme
// coding vibes". Jedes davon wird ueber GAME_THEME_CONFIG (config.ts) auf
// ein bestehendes Layout+ThemeName-Paar abgebildet.
export enum GameThemeName {
    CodeVibes = 'codevibes',
    Gaming = 'gaming',
    DaProjects = 'daprojects',
    Foods = 'foods',
}

export interface GameSettings {
    player1Color: PlayerColor;
    player2Color: PlayerColor;
    boardSize: BoardSize;
    layout: LayoutName;
    theme: ThemeName;
}

export interface CardData {
    id: number;
    motif: string;
    isFlipped: boolean;
    isMatched: boolean;
}