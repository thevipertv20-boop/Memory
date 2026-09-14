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
// Gaming-Layout mit den 18 "Img/Icons/Asset N@2x 1.png"/"play button@2x 1.png"-
// Kartenmotiven (ThemeName.GamingIcons). "DA Projects theme" bekommt das
// eigene DaProjects-Layout mit den 18 "Img/Icons/Property 1=Component N.png"
// (+ "front13.png")-Kartenmotiven (ThemeName.DaProjectsIcons). Fuer "Foods"
// liegt weiterhin kein vollstaendiges Kartenmotiv-Set vor (nur ein einzelnes
// Icon im Vorschaubild) - das eigentliche Spiel bleibt dafuer bewusst auf dem
// neutralen Classic-Schema mit Tier-Emoji, bis ein vollstaendiger Motiv-Satz
// als Figma-Referenz vorliegt.
export const GAME_THEME_CONFIG: Record<GameThemeName, { layout: LayoutName; theme: ThemeName }> = {
    [GameThemeName.CodeVibes]: { layout: LayoutName.Neon, theme: ThemeName.CodeIcons },
    [GameThemeName.Gaming]: { layout: LayoutName.Gaming, theme: ThemeName.GamingIcons },
    [GameThemeName.DaProjects]: { layout: LayoutName.DaProjects, theme: ThemeName.DaProjectsIcons },
    [GameThemeName.Foods]: { layout: LayoutName.Classic, theme: ThemeName.Tiere },
};

// Vorschau-Panel rechts auf der Settings-Seite: eigene Figma-Exportgrafiken
// pro Game-theme (HUD + zwei Karten, bereits fertig gerendert), muss beim
// Anklicken eines Themes sofort wechseln (siehe updatePreview in
// settings.ts). Zwei Asset-Formen liegen vor:
//  - 'image': ein bereits einzeln zugeschnittenes Vorschau-Asset in
//    Originalgroesse (Code vibes: "Img/Theme Visual.png", Gaming:
//    "Img/Frame 628 (1).png") - wird direkt als <img> angezeigt.
//  - 'crop': nur die volle Figma-Settings-Seitenreferenz liegt vor
//    (DA Projects: "Img/Content14.png", Foods: "Img/Content15.png", je
//    1112x668px) - das enthaltene Vorschau-Panel sitzt darin (wie auch in
//    der Code-vibes-Referenz Content5.png) exakt bei x=651/y=129 mit
//    460x412px Groesse; wird per CSS-Crop (siehe .settings__preview-crop in
//    _settings.scss) freigestellt, statt eine neue zugeschnittene Asset-
//    Datei anzulegen.
export type GameThemePreview =
    | { mode: 'image'; src: string; width: number; height: number; alt: string }
    | { mode: 'crop'; src: string; alt: string };

export const GAME_THEME_PREVIEW: Record<GameThemeName, GameThemePreview> = {
    [GameThemeName.CodeVibes]: {
        mode: 'image',
        src: 'Img/Theme Visual.png',
        width: 460,
        height: 412,
        alt: 'Vorschau: Code vibes theme',
    },
    [GameThemeName.Gaming]: {
        mode: 'image',
        src: 'Img/Frame 628 (1).png',
        width: 451,
        height: 361,
        alt: 'Vorschau: Gaming theme',
    },
    [GameThemeName.DaProjects]: {
        mode: 'crop',
        src: 'Img/Content14.png',
        alt: 'Vorschau: DA Projects theme',
    },
    [GameThemeName.Foods]: {
        mode: 'crop',
        src: 'Img/Content15.png',
        alt: 'Vorschau: Foods theme',
    },
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
    // "Gaming"-Kartenvorderseiten: 17 freigestellte Original-Icons
    // ("Img/Icons/Asset N@2x 1.png") plus "play button@2x 1.png" als 18.
    // Motiv - je ein eigenstaendiges Bild ohne Kartenrahmen (anders als die
    // fruehere Sprite-Loesung mit "Game card N.png", die es nicht mehr gibt).
    [ThemeName.GamingIcons]: [
        'Img/Icons/Asset 3@2x 1.png',
        'Img/Icons/Asset 4@2x 1.png',
        'Img/Icons/Asset 5@2x 1.png',
        'Img/Icons/Asset 6@2x 1.png',
        'Img/Icons/Asset 8@2x 1.png',
        'Img/Icons/Asset 8@2x 2.png',
        'Img/Icons/Asset 9@2x 1.png',
        'Img/Icons/Asset 10@2x 1.png',
        'Img/Icons/Asset 11@2x 1.png',
        'Img/Icons/Asset 12@2x 1.png',
        'Img/Icons/Asset 13@2x 1.png',
        'Img/Icons/Asset 14@2x 1.png',
        'Img/Icons/Asset 15@2x 1.png',
        'Img/Icons/Asset 16@2x 1.png',
        'Img/Icons/Asset 17@2x 1.png',
        'Img/Icons/Asset 18@2x 1.png',
        'Img/Icons/Asset 19@2x 1.png',
        'Img/Icons/play button@2x 1.png',
    ],
    // "DA Projects"-Kartenvorderseiten: 18 Original-Projekt-Icons aus
    // Img/Icons ("Property 1=Component N.png"-Serie + "front13.png"). "front12.png"
    // gehoert NICHT hierzu - anhand der Figma-Referenzen Img/Content16-18.png
    // (16/24/36-Spielfelder, ausschliesslich verdeckte Karten) pixelgenau
    // verifiziert: front12.png ist die Kartenrueckseite (siehe
    // .layout--daprojects .card__face--back in components/_card.scss), kein
    // Vorderseiten-Motiv.
    [ThemeName.DaProjectsIcons]: [
        'Img/Icons/Property 1=Component 2.png',
        'Img/Icons/Property 1=Component 3.png',
        'Img/Icons/Property 1=Component 4.png',
        'Img/Icons/Property 1=Component 5.png',
        'Img/Icons/Property 1=Component 7.png',
        'Img/Icons/Property 1=Component 8.png',
        'Img/Icons/Property 1=Component 9.png',
        'Img/Icons/Property 1=Component 10.png',
        'Img/Icons/Property 1=Component 11.png',
        'Img/Icons/Property 1=Component 12.png',
        'Img/Icons/Property 1=Component 13.png',
        'Img/Icons/Property 1=Component 14.png',
        'Img/Icons/Property 1=Component 15.png',
        'Img/Icons/Property 1=Component 16.png',
        'Img/Icons/Property 1=Component 17.png',
        'Img/Icons/Property 1=Component 18.png',
        'Img/Icons/Property 1=Component 19.png',
        'Img/Icons/front13.png',
    ],
};