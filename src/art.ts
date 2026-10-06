let sequence = 0;

/** Lightweight original vector artwork. No image downloads or layout shifts. */
export function fruit(kind: 'tropical' | 'spicy' | 'mystery', className = ''): string {
  const chalk = `fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
  const drawings = {
    tropical: `<g ${chalk}><path d="M111 79c-16-22-30-21-38-25l10 28-26-12 14 26-23 1 26 17"/><path d="M100 79c0-26 12-40 12-40l9 33 18-23-4 31 23-12-12 24"/><path d="M96 91c29-8 55 13 48 48-7 33-34 52-55 43-25-11-36-38-26-63 6-15 18-24 33-28Z"/><path d="m80 103 49 61m-62-40 40 51m-20-82 52 56m-62 10 58-39m-65 23 64-40m-42 75 41-28"/><path d="M146 160c32 0 46-19 56-49 5 55-27 91-57 64m56-64-6-7m-42 63 9-5"/><path d="M55 164c-32-3-48 28-32 48 14 21 40 18 55 2 17-19 5-46-12-48m-13-1c-1-10 4-17 10-22m-7 21c17 1 26-7 25-16-12-1-21 3-25 16"/></g>`,
    spicy: `<g ${chalk}><path d="M104 112c-26-20-64-9-65 20-3 35 25 54 53 46 30 10 57-17 45-43-6-14-17-22-33-23Z"/><path d="m91 112-12-14 15 3 6-17 5 19 18-5-13 16m-12-13 2-21"/><path d="M46 132c-6 10-2 22 5 30m83 32c43 11 68-17 71-50-21 26-50 20-65 36-8 8-9 12-6 14Zm63-45 12-13 10 5m-62 39 17-4"/><path d="M143 84c-15 12-14 37-3 52 15-4 28-13 33-26 8-21-3-38-14-36m-16 10 14 40m-5-44 14 30m-33-6 30-13m-30 26 33-13m-27 24 19-9m-7-40 9-20m-24 41-10-29m37 10 8-25"/><path d="M41 206c10-9 32-9 42 1m-35 5c7-6 21-6 27 0"/></g>`,
    mystery: `<g ${chalk}><path d="M96 70c-31-2-54 26-35 47m15-21c-10-13 5-28 20-25 24 2 25 26 11 36-19 12-22 17-22 34"/><path d="M90 159h1" stroke-width="8"/><path d="m163 91 7 16 17 4-16 8-4 17-7-15-18-4 17-8Zm-128 53 4 11 12 3-10 6-3 13-5-11-12-3 11-6m100 20 8 17 20 3-17 10-4 19-10-17-19-4 17-8"/><path d="m146 54 6-9m-98 13-9-5m24 133-6 10m121-44 11 3"/></g>`,
  };
  return `<svg class="fruit-art ${className}" width="240" height="240" viewBox="0 0 240 240" aria-hidden="true">${drawings[kind]}</svg>`;
}

export function pouch(kind: 'tropical' | 'spicy' | 'mystery', className = ''): string {
  const id = `pouch-${sequence++}`;
  const color = { tropical: '#edb344', spicy: '#e7745e', mystery: '#ad97c5' }[kind];
  const deep = { tropical: '#c58e23', spicy: '#bc4635', mystery: '#7e639b' }[kind];
  const title = { tropical: ['ISLAND', 'CRUSH'], spicy: ['HOT', 'MESS'], mystery: ['NEW', 'FLAVOR'] }[kind];
  const subtitle = { tropical: 'TROPICAL FRUIT CRUNCH', spicy: 'SWEET + SPICY CRUNCH', mystery: 'COMING SOON' }[kind];
  return `<svg class="pouch ${className}" viewBox="0 0 280 400" role="img" aria-label="KIIERO CRUNCH ${title.join(' ')} concept pouch, approximately 1.7 ounces">
    <defs>
      <linearGradient id="${id}-body" x1="0" x2="1"><stop stop-color="#10110f"/><stop offset=".13" stop-color="#30312a"/><stop offset=".3" stop-color="#20211d"/><stop offset=".78" stop-color="#181916"/><stop offset="1" stop-color="#38392f"/></linearGradient>
      <linearGradient id="${id}-band" x1="0" x2="1"><stop stop-color="${deep}"/><stop offset=".22" stop-color="${color}"/><stop offset=".72" stop-color="${color}"/><stop offset="1" stop-color="${deep}"/></linearGradient>
      <linearGradient id="${id}-shine"><stop stop-color="#ffffff" stop-opacity=".12"/><stop offset=".25" stop-color="#ffffff" stop-opacity="0"/><stop offset=".8" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#ffffff" stop-opacity=".06"/></linearGradient>
      <clipPath id="${id}-clip"><path d="M37 18Q140 10 243 18L239 47Q243 139 251 289L256 362Q250 385 225 388H55Q30 387 24 362L29 289Q37 140 41 47Z"/></clipPath>
    </defs>
    <path d="M37 18Q140 10 243 18L239 47Q243 139 251 289L256 362Q250 385 225 388H55Q30 387 24 362L29 289Q37 140 41 47Z" fill="url(#${id}-body)" stroke="#44443a" stroke-width=".7"/>
    <g clip-path="url(#${id}-clip)">
      <path d="M22 199Q98 177 165 201T261 205V359H20Z" fill="url(#${id}-band)"/>
      <path d="M30 351Q150 343 251 351L253 379H27Z" fill="${deep}" opacity=".3"/>
      <g transform="translate(79 136) scale(.50)" style="color:#f4f0df" opacity=".9">${fruit(kind).replace('class="fruit-art "', 'style="width:240px;height:240px"')}</g>
      <path d="M29 19h219v368H29Z" fill="url(#${id}-shine)"/>
      <path d="m47 49-8 298 17 29m180-326 9 300-15 26" fill="none" stroke="#fff" stroke-opacity=".07" stroke-width="2"/>
    </g>
    <path d="M42 27q98-5 195 0m-195 5q98-5 195 0m-195 7q98-5 195 0" stroke="#646354" stroke-width="1" opacity=".45"/>
    <path d="M42 49h196" stroke="#0b0c0a" stroke-width="3"/><path d="M37 21v7m206-7v7" stroke="#99917b" stroke-width="2"/>
    <text x="140" y="97" text-anchor="middle" fill="#f4f0df" font-family="'Barlow Condensed',Impact,sans-serif" font-size="50" font-weight="800" letter-spacing="-1">KIIERO</text>
    <text x="140" y="132" text-anchor="middle" fill="#f4f0df" font-family="'Barlow Condensed',Impact,sans-serif" font-size="38" font-weight="800" letter-spacing="2">CRUNCH</text>
    <text x="140" y="152" text-anchor="middle" fill="${color}" font-family="'DM Sans',sans-serif" font-size="8" font-weight="700" letter-spacing="2.2">CRUNCH DIFFERENT.</text>
    <text x="140" y="270" text-anchor="middle" fill="#25251e" font-family="'Permanent Marker',cursive" font-size="33" transform="rotate(-5 140 270)">${title[0]}</text>
    <text x="140" y="307" text-anchor="middle" fill="#25251e" font-family="'Permanent Marker',cursive" font-size="36" transform="rotate(-5 140 307)">${title[1]}</text>
    <text x="140" y="329" text-anchor="middle" fill="#25251e" font-family="'DM Sans',sans-serif" font-size="8" font-weight="700" letter-spacing="1">${subtitle}</text>
    <text x="140" y="370" text-anchor="middle" fill="#e6e1ce" font-family="'DM Sans',sans-serif" font-size="8" letter-spacing="1">FREEZE-DRIED SNACKS · 1.7 OZ (48g)</text>
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
