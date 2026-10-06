import type { FlavorId } from './catalog';

/** Ingredient doodles complement the supplied pouch art. */
export function fruit(kind: FlavorId, className = ''): string {
  const chalk = 'fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
  const kiwiSeeds = Array.from({ length: 14 }, (_, index) => {
    const angle = index * Math.PI * 2 / 14;
    const x = 112 + Math.cos(angle) * 38;
    const y = 134 + Math.sin(angle) * 43;
    return `<path d="M${x.toFixed(1)} ${y.toFixed(1)}l${(Math.cos(angle) * 6).toFixed(1)} ${(Math.sin(angle) * 6).toFixed(1)}"/>`;
  }).join('');
  const drawings: Record<FlavorId, string> = {
    mango: '<path d="M102 71c-35-7-64 17-61 54 4 43 36 72 68 62 34-11 58-48 44-80-9-23-28-32-51-36Z"/><path d="M103 70c0-19 13-32 27-36m-19 22c17-1 36-9 39-27-19-3-39 11-39 27m-58 59c-3 27 12 50 32 59"/><path d="M148 125c14-22 46-28 53-9 8 26-12 62-32 72-14 6-27-3-26-19m16-23 20 31m-30-15 43-13m-34-17 16 52"/>',
    strawberry: '<path d="M118 85c-37-13-63-2-65 31-2 28 24 65 55 86 34-23 64-53 67-82 3-34-26-49-57-35Z"/><path d="m93 85-20-18 28 4 14-25 9 26 28-9-19 24m-18-15 3-34"/><path d="m78 114 2 5m30-8 1 5m31-1-2 5m-50 17 2 5m31-7-1 5m-22 25 2 5m39-19-2 4m-21 31-1 4"/>',
    blueberry: '<circle cx="88" cy="110" r="39"/><circle cx="151" cy="154" r="42"/><circle cx="71" cy="174" r="28"/><path d="m80 80 7 12 13-5-6 13 10 10-15-2-7 13-3-15-15-4 14-6Zm70 45 6 13 15-2-11 10 6 14-14-7-12 9 3-15-11-10 15 1m-93 18 7 10 12-2-7 11 4 10-11-5-9 6 2-11-7-7 10-2M134 73c20-26 45-22 59-15-8 24-32 31-59 15m6-3 30-8"/>',
    banana: '<path d="M63 66c-17 72 28 124 101 113 23-4 37-19 41-36-62 29-107 5-121-71Z"/><path d="m65 63 0-13 15-2 5 15m-17 20c-1 49 37 92 87 80m45-25 10-4 4 11-11 6"/><path d="M92 74c24-12 41-3 46 16-13-1-28 6-29 22m-27-43c-26-3-42 18-39 39 15-18 31-13 43-12m-7-27c-4-24 9-40 22-39l-1 44"/>',
    kiwi: `<ellipse cx="111" cy="134" rx="65" ry="74"/><ellipse cx="111" cy="134" rx="58" ry="67"/><ellipse cx="111" cy="134" rx="18" ry="24"/>${kiwiSeeds}<path d="M149 71c28-22 60-7 61 23 1 22-13 44-29 52m-18-69 5-5m19 14 3-3m-3 24 4-4m-15 25 3-3"/>`,
    tomato: '<path d="M115 86c-33-17-71-3-73 31-3 40 28 72 68 68 40 5 72-25 69-63-3-34-29-48-64-36Z"/><path d="m109 87-23-23 26 7 9-28 6 29 26-11-18 23 5 19-22-11-21 12 8-19m15-13 4-34"/><path d="M59 117c-4 18 3 37 14 46m105 10c17-18 40-16 43 6 3 19-8 35-26 34-18-2-27-21-17-40Zm7 9 25 13m-11-28-3 34m-17-1 34-21"/>',
  };
  return `<svg class="fruit-art ${className}" width="240" height="240" viewBox="0 0 240 240" aria-hidden="true"><g ${chalk}>${drawings[kind]}</g></svg>`;
}

/** One cached image contains all six reference-derived product cutouts. */
const spriteUrl = './products/kiiero-pouches.webp';
const spriteOrder: FlavorId[] = ['mango', 'strawberry', 'blueberry', 'banana', 'kiwi', 'tomato'];
const productNames: Record<FlavorId, string> = { mango: 'Mango', strawberry: 'Strawberry', blueberry: 'Blueberry', banana: 'Banana', kiwi: 'Kiwi', tomato: 'Tomato' };
// Follow the pouch silhouettes, excluding faint alpha residue around the sprite.
// Shadows are then cast by the bags themselves, rather than a rectangular crop.
const pouchOutlines: Record<FlavorId, string> = {
  mango: 'M25 32Q25 10 43 10H403Q422 10 422 32C422 147 400 282 404 475C404 490 355 503 222 503C87 503 41 490 41 475C44 288 25 147 25 32Z',
  strawberry: 'M27 32Q27 9 45 9H394Q413 9 413 32C413 147 393 282 397 475C397 490 348 502 220 502C90 502 43 490 43 475C46 288 27 147 27 32Z',
  blueberry: 'M10 32Q10 9 28 9H384Q404 9 404 32C404 147 384 282 388 475C388 490 339 503 208 503C78 503 29 490 29 475C32 288 10 147 10 32Z',
  banana: 'M25 26Q25 4 43 4H399Q419 4 419 26C419 147 400 282 403 472C403 487 353 499 219 499C89 499 38 487 38 472C41 288 25 147 25 26Z',
  kiwi: 'M25 26Q25 4 43 4H394Q414 4 414 26C414 147 397 282 400 472C400 487 352 500 219 500C88 500 41 487 41 472C44 288 25 147 25 26Z',
  tomato: 'M10 26Q10 3 28 3H383Q404 3 404 26C404 147 388 282 392 472C392 487 342 498 207 498C77 498 28 487 28 472C31 288 10 147 10 26Z',
};
let pouchSequence = 0;

export function pouch(kind: FlavorId, className = ''): string {
  const index = spriteOrder.indexOf(kind);
  const column = index % 3;
  const row = Math.floor(index / 3);
  const columnLeft = [108, 552, 1000][column];
  const clipId = `pouch-window-${kind}-${pouchSequence++}`;
  return `<svg class="pouch ${className}" viewBox="0 0 450 512" role="img" aria-label="KIIERO CRUNCH ${productNames[kind]} — packaging concept" data-flavor="${kind}">
    <defs><clipPath id="${clipId}"><path d="${pouchOutlines[kind]}" /></clipPath></defs>
    <image href="${spriteUrl}" x="${-columnLeft}" y="${-row * 512}" width="1536" height="1024" preserveAspectRatio="none" clip-path="url(#${clipId})" />
  </svg>`;
}

export const burst = `<svg class="burst-art" viewBox="0 0 100 100" aria-hidden="true"><path d="m50 2 9 25 23-14-9 25 25 12-25 9 14 23-25-9-12 25-9-25-23 14 9-25L2 50l25-9-14-23 25 9Z" fill="currentColor"/></svg>`;

export const benefitArt = (kind: string) => {
  const drawings: Record<string, string> = {
    ingredients: '<path d="M27 46c-15-12-12-33 4-36 10-2 17 4 17 13 1 14-8 21-21 23Z"/><path d="M28 45c-1-16 7-27 13-30M26 36C10 39 5 25 8 16c15-3 22 7 18 20Zm2 9-3 8"/>',
    dried: '<path d="M30 4v52M7 17l46 26M7 43l46-26M22 8l8 8 8-8m-16 44 8-8 8 8M8 26l11-3-3-11m28 36-3-11 11-3M8 34l11 3-3 11m28-36-3 11 11 3"/>',
    crunch: '<path d="m31 3-8 17-16-5 9 18L3 44l20-1 8 14 5-18 20-3-17-10 6-19-14 12Z"/><path d="m52 3 3-3M2 5l5 4m47 44 5 3"/>',
    flavors: '<path d="M8 42c1-12 17-22 31-19l8-10 9 2-6 9c3 23-18 36-42 18Z"/><path d="M13 42c9 0 17-4 23-12M46 15l4-9m-35 6 3 5M4 25l5 1m25-20-1 6"/>',
  };
  return `<svg viewBox="0 0 60 60" class="benefit-art" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${drawings[kind]}</svg>`;
};
