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