import { CardData } from './types.js';

/**
 * Darstellung und Zustand einer einzelnen Memory-Karte
 * (Motiv, Vorder-/Rückseite, Flip-Zustand).
 */

export function createCardElement(card: CardData, onClick: (id: number) => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'card';
    button.setAttribute('aria-label', 'Memory-Karte');
    button.setAttribute('aria-pressed', 'false');

    const inner = document.createElement('div');
    inner.className = 'card__inner';

    const back = document.createElement('div');
    back.className = 'card__face card__face--back';

    const front = document.createElement('div');
    front.className = 'card__face card__face--front';
    // "Code vibes"-Theme nutzt echte Icon-Grafiken (ganze Datei) als Motiv,
    // "Gaming"-Theme nutzt "Img/Icons/Game card N.png"-Sprites (je Datei
    // zwei uebereinander gestapelte Kacheln - hier wird per CSS-Hintergrund
    // gezielt nur die untere Motiv-Kachel gezeigt, siehe .card__face--sprite
    // in scss/components/_card.scss). Alle anderen Themes bleiben Emoji-Text.
    if (card.motif.includes('Game card ')) {
        front.classList.add('card__face--sprite');
        front.style.backgroundImage = `url("${card.motif}")`;
    } else if (card.motif.endsWith('.png')) {
        const image = document.createElement('img');
        image.className = 'card__motif-image';
        image.src = card.motif;
        image.alt = '';
        front.appendChild(image);
    } else {
        front.textContent = card.motif;
    }

    inner.append(back, front);
    button.append(inner);
    button.addEventListener('click', () => onClick(card.id));

    return button;
}

export function setCardFlipped(element: HTMLElement, flipped: boolean): void {
    element.classList.toggle('card--flipped', flipped);
    element.setAttribute('aria-pressed', String(flipped));
}

export function setCardMatched(element: HTMLElement, matched: boolean): void {
    element.classList.toggle('card--matched', matched);
}
