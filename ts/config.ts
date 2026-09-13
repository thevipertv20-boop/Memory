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

// "Code vibes theme" bekommt das Neon-Layout mit echten Icon-Kartenvorder-
// seiten (ThemeName.CodeIcons); "Gaming theme" bekommt das eigene pinke
// Gaming-Layout mit den 18 "Img/Icons/Game card N.png"-Kartenmotiven
// (ThemeName.GamingIcons). DA Projects/Foods haben weiterhin keine eigenen
// Figma-Assets und bleiben auf dem neutralen Classic-Schema mit Tier-Emoji.
export const GAME_THEME_CONFIG: Record<GameThemeName, { layout: LayoutName; theme: ThemeName }> = {
    [GameThemeName.CodeVibes]: { layout: LayoutName.Neon, theme: ThemeName.CodeIcons },
    [GameThemeName.Gaming]: { layout: LayoutName.Gaming, theme: ThemeName.GamingIcons },
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
    // "Code vibes"-Kartenvorderseiten: vorhandene Original-Icon-Grafiken aus
    // Img/Icons (Dev-Tool-Logos), keine Emoji. 19 Stueck vorhanden, das
    // 36er-Board braucht maximal 18 Paare.
    [ThemeName.CodeIcons]: [
        'Img/Icons/Property 1=Component 21.png',
        'Img/Icons/Property 1=Component 22.png',
        'Img/Icons/Property 2=Component 22.png',
        'Img/Icons/Property 3=Component 22.png',
        'Img/Icons/Property 4=Component 22.png',
        'Img/Icons/Property 5=Component 22.png',
        'Img/Icons/Property 6=Component 22.png',
        'Img/Icons/Property 7=Component 22.png',
        'Img/Icons/Property 8=Component 22.png',
        'Img/Icons/Property 9=Component 22.png',
        'Img/Icons/Property 10=Component 22 (1).png',
        'Img/Icons/Property 11=Component 22.png',
        'Img/Icons/Property 12=Component 22.png',
        'Img/Icons/Property 13=Component 22.png',
        'Img/Icons/Property 14=Component 22.png',
        'Img/Icons/Property 15=Component 22.png',
        'Img/Icons/Front.png',
        'Img/Icons/Front1.png',
        'Img/Icons/Front2.png',
    ],
    // "Gaming"-Kartenvorderseiten: die 18 "Img/Icons/Game card N.png"-Dateien
    // enthalten je zwei uebereinander gestapelte Kacheln (oben Kartenrueck-
    // seite, unten das Motiv-Icon) - card.ts/scss/components/_card.scss
    // zeigen per CSS-Hintergrund gezielt nur die untere Kachel an.
    [ThemeName.GamingIcons]: [
        'Img/Icons/Game card 1.png',
        'Img/Icons/Game card 2.png',
        'Img/Icons/Game card 3.png',
        'Img/Icons/Game card 4.png',
        'Img/Icons/Game card 5.png',
        'Img/Icons/Game card 6.png',
        'Img/Icons/Game card 7.png',
        'Img/Icons/Game card 8.png',
        'Img/Icons/Game card 9.png',
        'Img/Icons/Game card 10.png',
        'Img/Icons/Game card 11.png',
        'Img/Icons/Game card 12.png',
        'Img/Icons/Game card 13.png',
        'Img/Icons/Game card 14.png',
        'Img/Icons/Game card 15.png',
        'Img/Icons/Game card 16.png',
        'Img/Icons/Game card 17.png',
        'Img/Icons/Game card 18.png',
    ],
};